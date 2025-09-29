from flask import Flask, request, jsonify, render_template, send_file, session
from flask_cors import CORS
import json
import os
from datetime import datetime
import google.generativeai as genai
from dotenv import load_dotenv
import re
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
import tempfile
import io
import uuid
import hashlib

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Set secret key for sessions
app.secret_key = os.getenv('SECRET_KEY', 'bio-astra-dashboard-secret-key-2024')

# In-memory storage for user sessions (in production, use Redis or database)
user_sessions = {}

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
print(f"🔍 GEMINI_API_KEY found: {'Yes' if GEMINI_API_KEY else 'No'}")
if GEMINI_API_KEY:
    print(f"🔑 API Key: {GEMINI_API_KEY[:10]}...")
    genai.configure(api_key=GEMINI_API_KEY)
    # Try different model names (using latest available models)
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        # Test the model
        test_response = model.generate_content("Hello")
        print("✅ Gemini API configured successfully with gemini-2.5-flash")
    except Exception as e:
        print(f"❌ Error with gemini-2.5-flash: {e}")
        try:
            model = genai.GenerativeModel('gemini-2.0-flash')
            test_response = model.generate_content("Hello")
            print("✅ Gemini API configured successfully with gemini-2.0-flash")
        except Exception as e2:
            print(f"❌ Error with gemini-2.0-flash: {e2}")
            try:
                model = genai.GenerativeModel('gemini-pro-latest')
                test_response = model.generate_content("Hello")
                print("✅ Gemini API configured successfully with gemini-pro-latest")
            except Exception as e3:
                print(f"❌ All model attempts failed: {e3}")
                model = None
else:
    print("❌ No GEMINI_API_KEY found in environment variables")
    model = None

def markdown_to_html(text):
    """
    Convert markdown formatting to HTML for better display
    """
    if not text:
        return text
    
    # Convert **bold** to <strong>bold</strong>
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    
    # Convert *italic* to <em>italic</em>
    text = re.sub(r'\*(.*?)\*', r'<em>\1</em>', text)
    
    # Convert bullet points (- or * at start of line) to HTML list
    lines = text.split('\n')
    html_lines = []
    in_list = False
    
    for line in lines:
        stripped = line.strip()
        
        # Check if line starts with bullet point
        if stripped.startswith('- ') or stripped.startswith('* '):
            if not in_list:
                html_lines.append('<ul>')
                in_list = True
            # Remove bullet and add list item
            content = stripped[2:].strip()
            html_lines.append(f'<li>{content}</li>')
        else:
            if in_list:
                html_lines.append('</ul>')
                in_list = False
            html_lines.append(line)
    
    # Close list if still open
    if in_list:
        html_lines.append('</ul>')
    
    # Convert numbered lists (1. 2. etc.)
    text = '\n'.join(html_lines)
    text = re.sub(r'^(\d+)\.\s+(.*)$', r'<li><strong>\1.</strong> \2</li>', text, flags=re.MULTILINE)
    
    # Wrap numbered list items in <ol> tags
    lines = text.split('\n')
    html_lines = []
    in_ordered_list = False
    
    for line in lines:
        if '<li><strong>' in line and '.</strong>' in line:
            if not in_ordered_list:
                html_lines.append('<ol>')
                in_ordered_list = True
            html_lines.append(line)
        else:
            if in_ordered_list:
                html_lines.append('</ol>')
                in_ordered_list = False
            html_lines.append(line)
    
    if in_ordered_list:
        html_lines.append('</ol>')
    
    # Convert line breaks to <br> tags
    text = '\n'.join(html_lines)
    text = text.replace('\n', '<br>')
    
    return text

def clean_html_for_pdf(html_text):
    """
    Clean HTML text for PDF generation by removing HTML tags and converting to plain text
    """
    if not html_text:
        return html_text
    
    # Remove HTML tags
    clean_text = re.sub(r'<[^>]+>', '', html_text)
    
    # Convert HTML entities
    clean_text = clean_text.replace('&nbsp;', ' ')
    clean_text = clean_text.replace('&lt;', '<')
    clean_text = clean_text.replace('&gt;', '>')
    clean_text = clean_text.replace('&amp;', '&')
    
    # Clean up extra whitespace
    clean_text = re.sub(r'\s+', ' ', clean_text)
    clean_text = clean_text.replace('<br>', '\n')
    
    return clean_text.strip()

def get_or_create_user_session():
    """
    Get or create a user session to prevent chat mixing between users
    """
    if 'user_id' not in session:
        # Create new user session
        user_id = str(uuid.uuid4())
        session['user_id'] = user_id
        user_sessions[user_id] = {
            'created_at': datetime.now(),
            'chat_history': [],
            'last_activity': datetime.now()
        }
    
    user_id = session['user_id']
    
    # Initialize session if not exists
    if user_id not in user_sessions:
        user_sessions[user_id] = {
            'created_at': datetime.now(),
            'chat_history': [],
            'last_activity': datetime.now()
        }
    
    # Update last activity
    user_sessions[user_id]['last_activity'] = datetime.now()
    
    return user_id

def add_to_chat_history(user_id, message_type, content, paper_context=None):
    """
    Add message to user's chat history
    """
    if user_id not in user_sessions:
        return
    
    message = {
        'type': message_type,
        'content': content,
        'timestamp': datetime.now().isoformat(),
        'paper_context': paper_context or {}
    }
    
    user_sessions[user_id]['chat_history'].append(message)
    
    # Keep only last 50 messages to prevent memory issues
    if len(user_sessions[user_id]['chat_history']) > 50:
        user_sessions[user_id]['chat_history'] = user_sessions[user_id]['chat_history'][-50:]

def get_user_chat_history(user_id):
    """
    Get user's chat history
    """
    if user_id not in user_sessions:
        return []
    
    return user_sessions[user_id]['chat_history']

def create_chat_pdf(chat_data, paper_title="Research Paper Discussion", user_id=None):
    """
    Create a PDF from chat conversation data with custom filename
    """
    # Create in-memory PDF buffer and filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"Bio_Astra_{timestamp}.pdf"
    pdf_buffer = io.BytesIO()
    
    # Create PDF document
    doc = SimpleDocTemplate(pdf_buffer, pagesize=A4, 
                          rightMargin=72, leftMargin=72, 
                          topMargin=72, bottomMargin=18)
    
    # Get styles
    styles = getSampleStyleSheet()
    
    # Create custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=16,
        spaceAfter=30,
        alignment=1,  # Center alignment
        textColor=colors.darkblue
    )
    
    question_style = ParagraphStyle(
        'Question',
        parent=styles['Normal'],
        fontSize=12,
        spaceAfter=12,
        leftIndent=20,
        textColor=colors.darkgreen,
        fontName='Helvetica-Bold'
    )
    
    answer_style = ParagraphStyle(
        'Answer',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=20,
        leftIndent=40,
        textColor=colors.black
    )
    
    paper_info_style = ParagraphStyle(
        'PaperInfo',
        parent=styles['Normal'],
        fontSize=10,
        spaceAfter=20,
        textColor=colors.grey,
        fontName='Helvetica-Oblique'
    )
    
    # Build content
    story = []
    
    # Title
    story.append(Paragraph("Bio-Astra Dashboard - Chat Export", title_style))
    story.append(Spacer(1, 20))
    
    # User session info
    if user_id:
        story.append(Paragraph(f"<b>Session ID:</b> {user_id[:8]}...", paper_info_style))
        story.append(Spacer(1, 10))
    
    # Paper information
    if paper_title and paper_title != "Research Paper Discussion":
        story.append(Paragraph(f"<b>Paper:</b> {paper_title}", paper_info_style))
        story.append(Spacer(1, 10))
    
    # Date and time
    current_time = datetime.now().strftime("%B %d, %Y at %I:%M %p")
    story.append(Paragraph(f"<b>Exported on:</b> {current_time}", paper_info_style))
    story.append(Spacer(1, 20))
    
    # Chat messages
    for i, message in enumerate(chat_data):
        if message.get('type') == 'question':
            # User question
            question_text = clean_html_for_pdf(message.get('content', ''))
            story.append(Paragraph(f"<b>Question {i//2 + 1}:</b> {question_text}", question_style))
            story.append(Spacer(1, 10))
            
        elif message.get('type') == 'answer':
            # AI response
            answer_text = clean_html_for_pdf(message.get('content', ''))
            story.append(Paragraph(f"<b>Answer:</b>", answer_style))
            story.append(Paragraph(answer_text, answer_style))
            story.append(Spacer(1, 20))
    
    # Build PDF
    doc.build(story)
    pdf_buffer.seek(0)
    
    return pdf_buffer, filename

# Load search data
def load_search_data():
    searches_path = os.path.join(os.path.dirname(__file__), 'SEARCHES')
    search_data = {}
    
    if os.path.exists(searches_path):
        for filename in os.listdir(searches_path):
            if filename.endswith('.json'):
                search_type = filename.replace('.json', '')
                with open(os.path.join(searches_path, filename), 'r') as f:
                    search_data[search_type] = json.load(f)
    
    return search_data

# Load research paper data
def load_research_data():
    research_path = os.path.join(os.path.dirname(__file__), 'RESEARCH_PAPER_DATA')
    research_data = {}
    
    if os.path.exists(research_path):
        for filename in os.listdir(research_path):
            if filename.endswith('.json'):
                with open(os.path.join(research_path, filename), 'r') as f:
                    data = json.load(f)
                    
                    # Handle both single objects and arrays of objects
                    if isinstance(data, list):
                        # If it's an array, process each item
                        for item in data:
                            pmcid = item.get('PMCId', item.get('pmcid', ''))
                            if pmcid:
                                # Convert the data to our expected format
                                research_data[pmcid] = {
                                    'pmcid': pmcid,
                                    'title': item.get('Title', ''),
                                    'authors': item.get('Authors', []),
                                    'keywords': item.get('Keywords', []),
                                    'category': item.get('Category', ''),
                                    'year': item.get('Study Year', item.get('year', 2023)),
                                    'doi': f"10.1038/spacebio.{pmcid}",
                                    'abstract': item.get('Abstract', ''),
                                    'results': 'Research results and findings from the study.',
                                    'conclusion': item.get('Conclusion', 'Research conclusions and implications.'),
                                    'explore_more': [
                                        {
                                            'title': 'NCBI Publication',
                                            'url': item.get('Link', 'https://www.ncbi.nlm.nih.gov/')
                                        },
                                        {
                                            'title': 'Related NASA Research',
                                            'url': 'https://www.nasa.gov/space-biology'
                                        }
                                    ],
                                    'knowledge_graph': {
                                        'authors': [{'name': 'Research Team', 'expertise': [item.get('Category', 'Space Biology')], 'publications': 1, 'collaborations': 1}],
                                        'keywords': [{'term': keyword, 'frequency': 1, 'related_terms': []} for keyword in item.get('Keywords', [])],
                                        'category': {
                                            'name': item.get('Category', 'Space Biology'),
                                            'subcategories': [item.get('Category', 'Space Biology')],
                                            'related_categories': ['Space Biology', 'Research']
                                        }
                                    }
                                }
                    else:
                        # If it's a single object, process it directly
                        pmcid = data.get('PMCId', data.get('pmcid', ''))
                        if pmcid:
                            research_data[pmcid] = data
    
    return research_data

# Global data storage
search_data = load_search_data()
research_data = load_research_data()

print(f"Loaded {len(search_data)} search types")
print(f"Loaded {len(research_data)} research papers")
if research_data:
    print(f"Sample PMCIDs: {list(research_data.keys())[:5]}")
    # Show available categories
    categories = set()
    for paper_data in research_data.values():
        if paper_data.get('category'):
            categories.add(paper_data['category'])
    print(f"Available categories: {sorted(list(categories))}")
if search_data:
    print(f"Search types: {list(search_data.keys())}")
    for key, value in search_data.items():
        print(f"  {key}: {type(value)} with {len(value) if isinstance(value, list) else 'N/A'} items")

@app.route('/')
def home():
    return jsonify({
        "message": "Bio-Astra Dashboard API",
        "version": "1.0.0",
        "endpoints": {
            "search": "/api/search",
            "research": "/api/research/<pmcid>",
            "health": "/api/health",
            "chat": "/api/chat"
        }
    })

@app.route('/api/health')
def health():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "search_types": list(search_data.keys()),
        "research_papers": len(research_data),
        "gemini_configured": model is not None
    })

@app.route('/api/gemini-models')
def list_gemini_models():
    try:
        if not GEMINI_API_KEY:
            return jsonify({
                "success": False,
                "error": "GEMINI_API_KEY not set"
            }), 400
        
        # List available models
        models = genai.list_models()
        model_names = [model.name for model in models]
        
        return jsonify({
            "success": True,
            "models": model_names,
            "total_models": len(model_names)
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/test')
def test_data():
    # Return sample data for testing
    sample_papers = []
    for i, (pmcid, paper_data) in enumerate(research_data.items()):
        if i < 5:  # First 5 papers
            sample_papers.append({
                "pmcid": pmcid,
                "title": paper_data.get('title', ''),
                "category": paper_data.get('category', ''),
                "year": paper_data.get('year', ''),
                "has_abstract": bool(paper_data.get('abstract', ''))
            })
    
    return jsonify({
        "total_papers": len(research_data),
        "sample_papers": sample_papers,
        "available_categories": list(set(paper.get('category', '') for paper in research_data.values() if paper.get('category')))
    })

@app.route('/api/search', methods=['POST'])
def search():
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "success": False,
                "error": "No JSON data provided"
            }), 400
            
        search_type = data.get('type', 'all')
        query = data.get('query', '')
        filters = data.get('filters', {})
        
        print(f"Search request: type={search_type}, query='{query}', filters={filters}")
        print(f"Total research papers available: {len(research_data)}")
        
        results = []
        
        # Search through research data
        for pmcid, paper_data in research_data.items():
            # Check if this paper matches our criteria
            matches = False
            
            # If we have a query, check if it matches title, abstract, or keywords
            if query and query.strip():
                # Handle keywords as either string or list
                keywords = paper_data.get('keywords', [])
                if isinstance(keywords, list):
                    keywords_match = any(query.lower() in str(keyword).lower() for keyword in keywords)
                else:
                    keywords_match = query.lower() in str(keywords).lower()
                
                matches = (query.lower() in paper_data.get('title', '').lower() or 
                          query.lower() in paper_data.get('abstract', '').lower() or 
                          keywords_match)
            else:
                # If no query, include all papers (will be filtered by other criteria)
                matches = True
            
            if matches:
                # Apply additional filters
                if filters.get('year') and str(paper_data.get('year', '')) != str(filters['year']):
                    continue
                if filters.get('category') and paper_data.get('category') != filters['category']:
                    continue
                
                # Get author name from knowledge graph or use default
                author_name = 'Research Team'
                if paper_data.get('knowledge_graph', {}).get('authors'):
                    author_name = paper_data['knowledge_graph']['authors'][0].get('name', 'Research Team')
                
                results.append({
                    'pmcid': pmcid,
                    'title': paper_data.get('title', ''),
                    'author': author_name,
                    'year': paper_data.get('year', ''),
                    'category': paper_data.get('category', ''),
                    'abstract': paper_data.get('abstract', '')[:200] + '...' if len(paper_data.get('abstract', '')) > 200 else paper_data.get('abstract', ''),
                    'keywords': paper_data.get('keywords', [])
                })
        
        # Also search through search data if available
        for search_type_key, search_results in search_data.items():
            if search_type != 'all' and search_type_key != search_type:
                continue
                
            # Ensure search_results is a list
            if not isinstance(search_results, list):
                continue
                
            for result in search_results:
                # Ensure result is a dictionary
                if not isinstance(result, dict):
                    continue
                    
                # Check if this result matches our criteria
                matches = False
                
                # If we have a query, check if it matches title, abstract, or keywords
                if query and query.strip():
                    # Handle keywords as either string or list
                    keywords = result.get('keywords', '')
                    if isinstance(keywords, list):
                        keywords_str = ' '.join(keywords)
                    else:
                        keywords_str = str(keywords)
                    
                    matches = (query.lower() in result.get('title', '').lower() or 
                              query.lower() in result.get('abstract', '').lower() or 
                              query.lower() in keywords_str.lower())
                else:
                    # If no query, include all results (will be filtered by other criteria)
                    matches = True
                
                if matches:
                    
                    # Apply additional filters
                    if filters.get('year') and result.get('year') != filters['year']:
                        continue
                    if filters.get('category') and result.get('category') != filters['category']:
                        continue
                    
                    results.append({
                        'pmcid': result.get('pmcid'),
                        'title': result.get('title'),
                        'author': result.get('author'),
                        'year': result.get('year'),
                        'category': result.get('category'),
                        'abstract': result.get('abstract', '')[:200] + '...' if len(result.get('abstract', '')) > 200 else result.get('abstract', ''),
                        'keywords': result.get('keywords', [])
                    })
        
        print(f"Found {len(results)} results")
        return jsonify({
            "success": True,
            "results": results,
            "total": len(results),
            "query": query,
            "filters": filters
        })
        
    except Exception as e:
        print(f"Search error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/research/<pmcid>')
def get_research_paper(pmcid):
    try:
        if pmcid in research_data:
            paper = research_data[pmcid]
            return jsonify({
                "success": True,
                "data": paper
            })
        else:
            return jsonify({
                "success": False,
                "error": "Research paper not found"
            }), 404
            
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/categories')
def get_categories():
    categories = set()
    
    # Get categories from research data
    for paper_data in research_data.values():
        if paper_data.get('category'):
            categories.add(paper_data['category'])
    
    # Get categories from search data
    for search_results in search_data.values():
        for result in search_results:
            if result.get('category'):
                categories.add(result['category'])
    
    return jsonify({
        "success": True,
        "categories": sorted(list(categories))
    })

@app.route('/api/years')
def get_years():
    years = set()
    
    # Get years from research data
    for paper_data in research_data.values():
        if paper_data.get('year'):
            years.add(paper_data['year'])
    
    # Get years from search data
    for search_results in search_data.values():
        for result in search_results:
            if result.get('year'):
                years.add(result['year'])
    
    return jsonify({
        "success": True,
        "years": sorted(list(years), reverse=True)
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        # Get or create user session
        user_id = get_or_create_user_session()
        
        data = request.get_json()
        user_message = data.get('message', '')
        paper_context = data.get('paper_context', {})
        
        if not user_message:
            return jsonify({
                "success": False,
                "error": "Message is required"
            }), 400
        
        if not model:
            return jsonify({
                "success": False,
                "error": "Gemini API not configured. Please set GEMINI_API_KEY environment variable."
            }), 500
        
        # Add user question to chat history
        add_to_chat_history(user_id, 'question', user_message, paper_context)
        
        # Helper function to safely format lists
        def format_list(items):
            if not items:
                return 'N/A'
            if isinstance(items, list):
                # Handle both strings and dictionaries
                formatted_items = []
                for item in items:
                    if isinstance(item, dict):
                        # Extract name or term from dictionary
                        if 'name' in item:
                            formatted_items.append(item['name'])
                        elif 'term' in item:
                            formatted_items.append(item['term'])
                        else:
                            formatted_items.append(str(item))
                    else:
                        formatted_items.append(str(item))
                return ', '.join(formatted_items)
            return str(items)

        # Create context-aware prompt with formatting instructions
        context_prompt = f"""
You are a specialized AI assistant for space biology research papers. You have access to the following research paper information:

Title: {paper_context.get('title', 'N/A')}
Category: {paper_context.get('category', 'N/A')}
Authors: {format_list(paper_context.get('authors', []))}
Keywords: {format_list(paper_context.get('keywords', []))}
Abstract: {paper_context.get('abstract', 'N/A')}
Conclusion: {paper_context.get('conclusion', 'N/A')}
PMCID: {paper_context.get('pmcid', 'N/A')}

User Question: {user_message}

Please provide a helpful, accurate response based on the research paper information provided. If the question is not directly related to this specific paper, you can still provide general information about space biology topics, but make it clear when you're doing so.

IMPORTANT FORMATTING INSTRUCTIONS:
- Use **bold text** for important terms, concepts, and key findings
- Use *italic text* for emphasis and technical terms
- Use bullet points (- or *) for lists and key points
- Use numbered lists (1. 2. 3.) for step-by-step processes
- Structure your response with clear headings and sections
- Make the response easy to read and well-formatted

Guidelines:
1. Be specific and reference the paper when relevant
2. Use scientific terminology appropriately
3. Provide clear explanations
4. If you don't have enough information from the paper, say so
5. Keep responses concise but informative
6. Focus on space biology and research methodology when relevant
7. Use proper markdown formatting for better readability
"""
        
        # Generate response using Gemini
        response = model.generate_content(context_prompt)
        
        # Convert markdown to HTML for better display
        formatted_response = markdown_to_html(response.text)
        
        # Add AI response to chat history
        add_to_chat_history(user_id, 'answer', response.text, paper_context)
        
        return jsonify({
            "success": True,
            "response": formatted_response,
            "raw_response": response.text,  # Keep original for debugging
            "user_id": user_id[:8] + "..."  # Return partial user ID for debugging
        })
        
    except Exception as e:
        print(f"Chat error: {str(e)}")
        return jsonify({
            "success": False,
            "error": f"Failed to generate response: {str(e)}"
        }), 500

@app.route('/api/export-chat', methods=['POST'])
def export_chat():
    """
    Export chat conversation as PDF with user session management
    """
    try:
        # Get user session
        user_id = get_or_create_user_session()
        
        data = request.get_json()
        paper_title = data.get('paper_title', 'Research Paper Discussion')
        
        # Get user's chat history
        chat_messages = get_user_chat_history(user_id)
        
        if not chat_messages:
            return jsonify({
                "success": False,
                "error": "No chat messages found for this session"
            }), 400
        
        # Create PDF in-memory and stream to client
        pdf_buffer, filename = create_chat_pdf(chat_messages, paper_title, user_id)
        
        return send_file(
            pdf_buffer,
            as_attachment=True,
            download_name=filename,
            mimetype='application/pdf'
        )
        
    except Exception as e:
        print(f"Export error: {str(e)}")
        return jsonify({
            "success": False,
            "error": f"Failed to export chat: {str(e)}"
        }), 500

@app.route('/api/chat-history', methods=['GET'])
def get_chat_history():
    """
    Get user's chat history
    """
    try:
        user_id = get_or_create_user_session()
        chat_history = get_user_chat_history(user_id)
        
        return jsonify({
            "success": True,
            "chat_history": chat_history,
            "user_id": user_id[:8] + "..."
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to get chat history: {str(e)}"
        }), 500

@app.route('/api/clear-chat', methods=['POST'])
def clear_chat():
    """
    Clear user's chat history
    """
    try:
        user_id = get_or_create_user_session()
        
        if user_id in user_sessions:
            user_sessions[user_id]['chat_history'] = []
        
        return jsonify({
            "success": True,
            "message": "Chat history cleared"
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to clear chat: {str(e)}"
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)