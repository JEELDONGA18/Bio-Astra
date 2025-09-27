# Bio-Astra Dashboard Backend

Flask API server for the Bio-Astra Dashboard, handling search functionality and research paper data.

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. Navigate to the BACKEND directory:
```bash
cd BACKEND
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the server:
```bash
python run.py
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
BACKEND/
├── app.py                 # Main Flask application
├── run.py                 # Server startup script
├── requirements.txt       # Python dependencies
├── SEARCHES/             # Search data files (JSON)
│   └── sample_search.json
├── RESEARCH_PAPER_DATA/  # Research paper data files (JSON)
│   ├── PMC1234567.json
│   └── PMC1234568.json
└── README.md
```

## 🔗 API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status and data statistics

### Search
- **POST** `/api/search`
- Body: `{"type": "all", "query": "search term", "filters": {"year": 2023}}`
- Returns search results with PMCID

### Research Paper
- **GET** `/api/research/<pmcid>`
- Returns detailed research paper data

### Categories
- **GET** `/api/categories`
- Returns available research categories

### Years
- **GET** `/api/years`
- Returns available publication years

## 📊 Data Format

### Search Results
```json
{
  "success": true,
  "results": [
    {
      "pmcid": "PMC1234567",
      "title": "Research Title",
      "author": "Author Name",
      "year": 2023,
      "category": "Plant Biology",
      "abstract": "Abstract text...",
      "keywords": ["keyword1", "keyword2"]
    }
  ],
  "total": 1
}
```

### Research Paper Data
```json
{
  "pmcid": "PMC1234567",
  "title": "Research Title",
  "authors": [...],
  "keywords": [...],
  "category": "Plant Biology",
  "year": 2023,
  "abstract": "Full abstract...",
  "results": "Research results...",
  "conclusion": "Research conclusion...",
  "explore_more": [...],
  "knowledge_graph": {...}
}
```

## 🔧 Configuration

The server automatically loads data from:
- `SEARCHES/` directory for search data
- `RESEARCH_PAPER_DATA/` directory for research papers

Add your own JSON files to these directories to extend the dataset.

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 is already in use, modify `run.py` to use a different port:
```python
app.run(debug=True, host='0.0.0.0', port=5001)
```

### Data Not Loading
Ensure your JSON files are properly formatted and located in the correct directories.

### CORS Issues
The server includes CORS headers for cross-origin requests from the frontend.

## 📝 Development

To add new endpoints or modify existing ones, edit `app.py` and restart the server.

For production deployment, consider using a WSGI server like Gunicorn instead of the Flask development server.
