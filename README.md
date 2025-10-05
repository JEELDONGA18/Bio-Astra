<h1 align="center" style="font-size: 100px; font-family: 'Arial';"><strong> Bio-Astra DashBoard</strong></h1>

---

## Contents:

- [Introduction](#introduction)
- [Challenge: Democratizing NASA Space Biology Data](#challenge-democratizing-nasa-space-biology-data)
  - [Challenge Overview](#challenge-overview)
  - [Summary](#summary)
- [Impact](#impact)
- [Challenge Faced and Solutions](#challenge-faced-and-solutions)
- [Tools We Use](#tools-we-use)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Application](#application)
  - [Home Page](#home-page)
  - [Find Your Interest Page](#find-your-interest-page)
  - [Impact Page](#impact-page)
  - [OSDR Page](#osdr-page)
  - [NSLSL Page](#nslsl-page)
  - [NASA Task Book Page](#nasa-task-book-page)
  - [About Page](#about-page)
- [Schematics](#schematics)
  - [Flowchart 1: Application Architecture](#flowchart-1-application-architecture)
  - [Flowchart 2: Backend API Request Handling](#flowchart-2-backend-api-request-handling)
- [Team](#team)
  - [Members](#members)
  - [Mentors](#mentors)
  - [Special Thanks](#special-thanks)

---

## Introduction

Bio-Astra Dashboard is an innovative platform that bridges the gap between NASA's complex Space Biology research data and the global scientific community. We aim to make extensive collections of space biology publications accessible, searchable, and understandable for researchers, students, and space enthusiasts worldwide. Through advanced search capabilities, interactive visualizations, and AI-powered insights, we foster deeper understanding and collaboration in the field of space life sciences.

---

## Challenge: Democratizing NASA Space Biology Data

We are participating in the NASA Space Biology research accessibility challenge, which focuses on transforming vast amounts of scientific publications and data from NASA's Space Biology program into user-friendly, interactive educational and research tools.

### Challenge Overview

NASA's Space Biology program generates Hundreds of research publications covering topics from microgravity effects on human physiology to plant growth in space environments. However, this wealth of knowledge is often buried in technical jargon and scattered across multiple databases, making it difficult for researchers, students, and institutions to discover and utilize effectively.

Our goal is to create an intelligent dashboard that democratizes access to this critical research, enabling faster discovery, better collaboration, and accelerated scientific advancement in space biology.

### Summary

NASA's Space Biology research encompasses critical studies on life in space, including astronaut health, plant biology in microgravity, and microbial behavior in extreme environments. However, the sheer volume and technical complexity of this data creates significant barriers to access and utilization.

Our project transforms this challenge into an opportunity by developing Bio-Astra Dashboard, an interactive platform that makes space biology research discoverable, understandable, and actionable for the global scientific community.

---

## Impact


With our comprehensive dashboard, we aim to:

- **Accelerate Research Discovery**: Enable faster access to relevant space biology publications and studies
- **Foster Scientific Collaboration**: Connect researchers worldwide through shared data and insights
- **Enhance Education**: Make complex space biology concepts accessible to students and educators
- **Drive Innovation**: Support the development of new space biology research and applications
- **Promote Interdisciplinary Work**: Bridge gaps between space science, biology, and related fields

---

## Challenge Faced and Solutions
- *Challenge*: Processing and organizing thousands of NASA research publications with varying data formats.
  - *Solution*: Developed robust data processing pipelines in Flask backend that load JSON-formatted research data into memory, with standardized data structures for consistent search and retrieval across different publication formats.

- *Challenge*: Making complex scientific content accessible to non-expert users.
  - *Solution*: Implemented AI-powered chat assistance using Google Gemini API for answering questions about individual research papers, combined with simplified 3D visualizations and interactive UI elements to explain technical concepts.

- *Challenge*: Managing large datasets efficiently for real-time search and visualization.
  - *Solution*: Optimized backend architecture with in-memory data storage, efficient token-based search algorithms, and session-based caching mechanisms. Included JSON files for easy data retrieval and structured data organization.

- *Challenge*: Creating engaging and interactive user interfaces for complex scientific data.
    - *Solution*: Built responsive React frontend with Three.js 3D visualizations, interactive charts, and modern UI components that allow users to explore astronaut anatomy, gene expression,DNA Helix of Stress & Adaptation and gravity effects through intuitive interfaces.

- *Challenge*: Integrating AI chat functionality with research paper context.
  - *Solution*: Developed session-based chat system with user-specific conversation history, context-aware prompts that include paper metadata, and markdown-to-HTML conversion for rich text formatting in responses.

- *Challenge*: Handling cross-origin requests between frontend and backend services.
  - *Solution*: Configured Flask-CORS middleware and proper session management to enable secure communication between the Vercel-hosted frontend and Render-hosted backend.

---

## Tools We Use

- *Frontend*: React.js, Tailwind CSS, Three.js, Chart.js/Recharts
- *Backend*: Python-Flask, Gemini AI APIs, Node.js
- *Data Processing*: Python, JSON data handling
- *Deployment*: Vercel (Frontend), Render (Backend), GoDaddy Free Domain
- *Version Control*: Git, GitHub
- *AI/ML*: Google Gemini for intelligent chat assistance
- *Visualization*: Custom 3D components, interactive charts

---

## Features

- *Advanced Multi-Faceted Search*: Search by title, author, category, keywords, and publication year
- *Interactive Data Visualizations*: Trend charts, category distributions, and 3D knowledge graphs
- *AI-Powered Research Assistant*: Intelligent chatbot for answering questions about space biology researches
- *NASA Resource Integration*: Direct links to OSDR, NSLSL, and NASA Task Book databases
- *Responsive Modern UI*: Dark/light theme support with cosmos-inspired design
- *Research Paper Exploration*: Detailed views of publications with abstracts, keywords, and related resources
- *Impact Metrics Dashboard*: Visual representations of space biology research impacts
- *Export Functionality*: PDF export of chat conversations and research insights

---

## Installation and Setup

- *Clone the Repository:*

```bash
git clone https://github.com/JEELDONGA18/Bio-Astra.git
cd bio-astra
```

- *Backend Setup:*
```bash
cd BACKEND
pip install -r requirements.txt
python app.py
```

- *Frontend Setup:*
```bash
cd FRONTEND
npm install
npm run dev
```

---

## Application

### Home Page:

- Immersive space-themed landing experience with animated starfield background
- Project mission overview and key features showcase
- Interactive 3D Constellation of All 5 Categories of Researches
- Publications by Time(Trend analysis) charts and Publications by Category(data) insights
- Key Features and Call-to-Action sections for exploration

https://github.com/user-attachments/assets/6f852260-a3ec-426e-915c-2a67aeb265e5

### Find Your Interest Page:

- Advanced search interface with multiple filter options(Search by title, author, category, and keywords)
- Real-time search results with publication details
- Interactive Knowledge Graph for Individual Researches 
- Direct access to detailed paper views
- Direct Link For specific Research Paper and Related Research Paper
- AI chatbot Intigrated To get direct Info About Individual Research Paper



https://github.com/user-attachments/assets/811cad2b-d5bb-4a0a-822b-424c51de5424


### Impact Page:

 - Comprehensive metrics dashboard for space biology research impact

- *3D Astronaut Anatomy Viewer*: Interactive 3D model of human body showing spaceflight impacts on different organs and systems

- *DNA Helix of Stress & Adaptation*: 3D DNA visualization with radiation simulation, showing genetic damage and gene expression changes

- *Gravity & Bone Morphology*: Interactive gravity slider demonstrating bone density loss at different gravity levels (Earth, Mars, Moon, Microgravity)

- *Gene Expression Matrix*: 3D heatmap visualization of gene expression changes across tissues, with filtering and detailed research insights



https://github.com/user-attachments/assets/aa972e0f-e7a7-4c6d-9aa0-f5b43d16a1b7


### OSDR Page:

- Open Science Data Repository:
NASA's comprehensive repository for space biology data, including experimental results, datasets, and research findings from space missions and ground-based studies.
- Interactive TrendChart for Studies by Organism and Piecharts for Different Fields(OSD,Title,Assay,Organism,Tissue,Factor,)

- Direct links to full research Pages(Open Science Data Repository,GeneLab Data System,Space Biology Data Standards,Research Data API)



https://github.com/user-attachments/assets/41e259fb-4adf-47c7-9aff-9c19764d4193


### NSLSL Page:

- Comprehensive digital library containing NASA's space life sciences publications, research reports, and technical documents spanning decades of space biology research.
- Extensive archive of NASA space biology research spanning from early space missions to current International Space Station studies, including unpublished reports and data.
- Searchable database of peer-reviewed publications, conference proceedings, and technical papers from NASA space biology research programs and collaborations.
- Educational materials, tutorials, and learning resources for students, educators, and researchers interested in space life sciences and NASA research.



https://github.com/user-attachments/assets/e697de50-81cf-4043-95dd-2ab019fd44a4


### NASA Task Book Page:

- Comprehensive database of NASA-funded research projects, including project descriptions, principal investigators, funding amounts, and research outcomes across all NASA programs.
- Research program studying how microgravity, radiation, and spaceflight environments affect living systems including microbes, plants, animals, and humans.
- Database of NASA-funded human health and performance research to mitigate risks to astronauts during space exploration missions.
- Collection of NASA-funded research projects in biological and physical sciences to advance fundamental knowledge and support future space missions.



https://github.com/user-attachments/assets/cc26ff22-fa1c-41c9-9b08-75c64cbc768c


### About Page:

- About Bio-Astra Dashboard
- Special Thanks
- Project mentor information
- Team member profiles and expertise
- Technology stack overview
- Project impact and vision statements
- Contact and collaboration opportunities


https://github.com/user-attachments/assets/5f221303-fa96-48ad-8a88-a715ba37ac0b


---

## Schematics

### Flowchart 1: Application Architecture

This flowchart represents the architecture of the Bio-Astra Dashboard application with a focus on the interaction between the frontend, backend, and data sources.

1. *Frontend (React + Vite on Vercel)*
    - The frontend is built using React and Vite, deployed on Vercel.
It handles user interactions, data visualization, and API communication.React +Vite Project on Vercel (Frontend)
    - The frontend framework handles user inputs and sends API requests to the backend for search, chat, and data retrieval operations.

2. *Backend (Python Flask on Render)*
    - The backend is a Python Flask project hosted on Render.
It handles API requests from the frontend, processes research data, and integrates with AI services.
    - Python Flask Project on Render (Backend)
    - The backend processes search queries, manages chat sessions, and serves JSON responses with research paper data and AI-generated insights.

3. *Data Layer*
    - JSON-based research paper datasets are used for data storage and retrieval.
JSON Data Files (Data Layer)
    - Research data is stored in JSON files, loaded into memory for efficient access, with search indexes and metadata for quick retrieval.

4. *AI Integration (Gemini APIs)*
    - Google Gemini AI is integrated for intelligent chat assistance.
Gemini AI Integration
    - Provides context-aware responses based on research paper content and natural language processing for research queries.

5. *External NASA Resources*
    - Direct integration with NASA databases for enhanced research capabilities.
External NASA Resources
    - Includes connections to OSDR, NSLSL, and NASA Task Book for real-time data fetching and cross-referencing.

6. *Data Flow*
    - Data flows between the frontend, backend, and data sources through API requests.
Flow of Data
    - User interactions trigger API requests from frontend to backend, backend processes data and AI responses, retrieves from JSON data sources and external NASA APIs, then returns processed results to frontend for visualization.


### Flowchart 2: Backend API Request Handling

This flowchart outlines how backend API requests are processed in the Bio-Astra system.

1. *API Request Reception*
   - Flask server receives HTTP requests from frontend
   - Request parsing and validation

2. *Authentication & Session Management*
   - User session creation and management
   - Chat history tracking and persistence

3. *Data Processing*
   - Search queries processed against research databases
   - Filter application and result ranking
   - Data formatting for frontend consumption

4. *AI Chat Processing*
   - Gemini API integration for intelligent responses
   - Context building from research paper data
   - Response formatting and markdown processing

5. *Response Generation*
   - JSON response creation with success/error handling
   - Data serialization and optimization

6. *Export Functionality*
   - PDF generation for chat conversations
   - File streaming and download handling

7. *Error Handling & Logging*
   - Comprehensive error catching and logging
   - Graceful failure responses
   - Performance monitoring and debugging

---

## Team

### Members:

- *Jeel Donga* - Full Stack Developer (Backend & API Systems)
- *Meet Paladiya* - Full Stack Developer (Frontend & Data Gathering,Cleaning,Visualization)
- *Vishal Shingala* - Full Stack Developer (Data Pipeline & Integration To Create Visuals)
- *Dhyey Desai* - Research & Storytelling Strategist
- *Dhrumil Khatiwala* - Quality & Reliability Champion
- *Parth Gevariya* - Project Representation & Documentation Lead

We are Third Year Computer Engineering students from SCET, Surat.

### Mentor:

- *Prof. (Dr.) Bintu Kadhiwala* -  Assistant Professor, Computer Engineering Department, SCET, Surat.

### Special Thanks:

- Special thanks to *NASA* for providing access to Space Biology research data and resources and Domain From Godday.

---

Built with ❤ for advancing Space Biology research and discovery
