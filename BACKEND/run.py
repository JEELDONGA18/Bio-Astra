#!/usr/bin/env python3
"""
Bio-Astra Dashboard Backend Server
Flask API server for handling search and research data
"""

import os
import sys
from app import app

if __name__ == '__main__':
    # Ensure we're in the correct directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print("🚀 Starting Bio-Astra Dashboard Backend Server...")
    print("📍 Server will run on: http://localhost:5000")
    print("🔗 API endpoints:")
    print("   - GET  /api/health")
    print("   - POST /api/search")
    print("   - GET  /api/research/<pmcid>")
    print("   - GET  /api/categories")
    print("   - GET  /api/years")
    print("\n" + "="*50)
    
    try:
        app.run(debug=True, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)
