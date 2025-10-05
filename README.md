# Bio-Astra

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Frontend Flow](#frontend-flow)
- [Backend Flow](#backend-flow)
- [How to Run the Project](#how-to-run-the-project)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)

## Overview
Bio-Astra is a web application designed to provide insights into research papers, trends, and data visualization. It consists of a **frontend** built with React and a **backend** powered by Python.

## Project Structure
```
Bio-Astra/
├── BACKEND/
│   ├── app.py
│   ├── requirements.txt
│   ├── RESEARCH_PAPER_DATA/
│   ├── SEARCHES/
│   └── temp_exports/
├── FRONTEND/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── data/
│   ├── public/
│   └── package.json
```

## Frontend Flow
The frontend is built using React and is responsible for rendering the user interface and interacting with the backend API.

1. **Home Page** ([Home.js](FRONTEND/src/pages/Home.js))
   - Displays an overview of the application.
   - Links to other sections like research papers and trends.

2. **Research Page** ([ResearchPage.js](FRONTEND/src/pages/ResearchPage.js))
   - Allows users to search for research papers by title, author, category, etc.
   - Displays results in a card format using the `ResourceCard` component.

3. **Visualization Components**
   - **CategoryPieChart** ([CategoryPieChart.js](FRONTEND/src/components/CategoryPieChart.js)): Displays research paper distribution by category.
   - **TrendChart** ([TrendChart.js](FRONTEND/src/components/TrendChart.js)): Shows trends over time.
   - **KnowledgeGraph** ([KnowledgeGraph.js](FRONTEND/src/components/KnowledgeGraph.js)): Visualizes relationships between topics.

4. **Chatbot** ([Chatbot.js](FRONTEND/src/components/Chatbot.js))
   - Provides an interactive assistant for user queries.

## Backend Flow
The backend is built using Python and Flask. It handles data processing, API requests, and serves the frontend.

1. **Main Application** ([app.py](BACKEND/app.py))
   - Defines the Flask app and routes.
   - Serves data from JSON files in the `RESEARCH_PAPER_DATA` and `SEARCHES` directories.

2. **API Endpoints**
   - `/search`: Handles search queries for research papers.
   - `/data`: Provides data for visualizations.

3. **Data Storage**
   - **RESEARCH_PAPER_DATA**: Contains research paper data in JSON format.
   - **SEARCHES**: Stores search results by various criteria (author, category, etc.).

## How to Run the Project

### Prerequisites
- Node.js and npm
- Python 3.x

### Steps
1. **Backend**
   ```bash
   cd BACKEND
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```
   The backend will run on `http://127.0.0.1:5000`.

2. **Frontend**
   ```bash
   cd FRONTEND
   npm install
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

## API Endpoints
- **GET /search**: Search for research papers.
- **GET /data**: Fetch data for visualizations.

## Technologies Used
- **Frontend**: React, Tailwind CSS, Recharts, Three.js
- **Backend**: Flask, Python
- **Database**: JSON files (for simplicity)

## Future Enhancements
- Add user authentication.
- Integrate a database for better scalability.
- Enhance chatbot capabilities with AI models.
- Add more visualization options.

---

This README provides a detailed understanding of the project flow and structure. Use the bookmarks in the Table of Contents to navigate quickly.