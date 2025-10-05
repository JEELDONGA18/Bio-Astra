import React, { useState } from 'react';
const API_BASE = "https://bio-astra-backend.onrender.com";

const Chatbot = ({ paperContext = {} }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Bio-Astra AI assistant. I can help you understand this research paper, answer questions about space biology, and guide you through related topics. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call Gemini API through backend
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session management
        body: JSON.stringify({
          message: inputMessage,
          paper_context: paperContext
        })
      });

      const data = await response.json();

      if (data.success) {
        const botResponse = {
          id: messages.length + 2,
          text: data.response,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        const errorResponse = {
          id: messages.length + 2,
          text: `Sorry, I encountered an error: ${data.error}. Please try again.`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorResponse]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorResponse = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting to the AI service. Please check your internet connection and try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "What is the main finding of this research?",
    "How does this relate to space biology?",
    "What are the implications for future research?",
    "Can you explain the methodology used?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleExportChat = async () => {
    setIsExporting(true);
    setExportStatus('Preparing PDF export...');

    try {
      const response = await fetch(`${API_BASE}/api/export-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session management
        body: JSON.stringify({
          paper_title: paperContext.title || 'Research Paper Discussion'
        })
      });

      if (response.ok) {
        // Get the PDF blob
        const blob = await response.blob();
        
        // Create download link with custom filename
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Generate filename: Bio_Astra_DATE_TIME.pdf
        const now = new Date();
        const timestamp = now.toISOString().slice(0,19).replace(/:/g, '-').replace('T', '_');
        a.download = `Bio_Astra_${timestamp}.pdf`;
        
        // Trigger download
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setExportStatus('✅ PDF exported successfully! Check your Downloads folder.');
        setTimeout(() => setExportStatus(''), 5000);
      } else {
        const error = await response.text();
        setExportStatus(`❌ Export failed: ${error}`);
        setTimeout(() => setExportStatus(''), 5000);
      }
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus(`❌ Error: ${error.message}`);
      setTimeout(() => setExportStatus(''), 5000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Export Status */}
      {exportStatus && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          exportStatus.includes('✅') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : exportStatus.includes('❌')
            ? 'bg-red-100 text-red-800 border border-red-200'
            : 'bg-blue-100 text-blue-800 border border-blue-200'
        }`}>
          {exportStatus}
        </div>
      )}

      {/* Export Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleExportChat}
          disabled={isExporting || messages.length <= 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isExporting || messages.length <= 1
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export Chat as PDF</span>
            </>
          )}
        </button>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-4 mb-4 bg-gray-700 rounded-lg">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-cosmos-gradient text-white'
                  : 'bg-gray-600 text-gray-100'
              }`}
            >
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: message.text }} />
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-600 text-gray-100 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-xs bg-gray-600 hover:bg-gray-500 text-gray-300 px-3 py-1 rounded-full transition-colors duration-200"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask about this research paper..."
          className="flex-1 input-field"
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={isTyping || !inputMessage.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2"
        >
          <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
