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
- [Router Pages](#router-pages)

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

## Router Pages

The application includes the following router pages, each serving a specific purpose:

### 1. Home Page ([Home.js](FRONTEND/src/pages/Home.js))
- **Purpose**: Serves as the landing page of the application.
- **Features**:
  - Overview of the application.
  - Links to explore research papers, trends, and visualizations.

### 2. Research Page ([ResearchPage.js](FRONTEND/src/pages/ResearchPage.js))
- **Purpose**: Allows users to search and explore research papers.
- **Features**:
  - Search by title, author, category, keyword, or year.
  - Displays results using the `ResourceCard` component.

### 3. About Page ([About.js](FRONTEND/src/pages/About.js))
- **Purpose**: Provides information about the project and its goals.
- **Features**:
  - Details about the mission and vision of the application.
  - Highlights the importance of the research data.

### 4. Find Your Interest Page ([FindYourInterest.js](FRONTEND/src/pages/FindYourInterest.js))
- **Purpose**: Helps users discover topics of interest.
- **Features**:
  - Interactive tools to guide users to relevant research areas.

### 5. Impact Page ([Impact.js](FRONTEND/src/pages/Impact.js))
- **Purpose**: Showcases the impact of research and data.
- **Features**:
  - Visualizations and statistics on research contributions.

### 6. NASA Task Book Page ([NASATaskBook.js](FRONTEND/src/pages/NASATaskBook.js))
- **Purpose**: Provides access to NASA's task book data.
- **Features**:
  - Displays detailed information about NASA's research tasks.

### 7. NSLSL Page ([NSLSL.js](FRONTEND/src/pages/NSLSL.js))
- **Purpose**: Focuses on NSLSL-related research.
- **Features**:
  - Highlights key findings and data from NSLSL studies.

### 8. OSDR Page ([OSDR.js](FRONTEND/src/pages/OSDR.js))
- **Purpose**: Dedicated to OSDR (Organism Studies Data Repository).
- **Features**:
  - Displays organism-related research data and visualizations.

---

This README provides a detailed understanding of the project flow and structure. Use the bookmarks in the Table of Contents to navigate quickly.