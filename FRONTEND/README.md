# Bio-Astra Dashboard

A modern React.js dashboard for exploring NASA Space Biology publications with advanced search, visualization, and AI-powered features.

## 🌟 Features

- **Advanced Search System**: Search by title, author, category, keywords, and time
- **Interactive Visualizations**: Trend charts and data visualization using Chart.js/Recharts
- **AI-Powered Chatbot**: Intelligent assistant for research questions
- **NASA Resource Integration**: Direct links to OSDR, NSLSL, and NASA Task Book
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark/Light Theme**: Toggle between dark and light themes
- **Modern UI/UX**: Clean, professional interface with cosmos-inspired design

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bio-astra-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation component
│   ├── Footer.js          # Footer component
│   ├── ResourceCard.js    # Reusable NASA resource cards
│   └── TrendChart.js      # Chart component for data visualization
├── pages/
│   ├── Home.js            # Landing page with hero section
│   ├── FindYourInterest.js # Search and discovery page
│   ├── Chatbot.js         # AI chatbot interface
│   ├── Impact.js          # Impact metrics and statistics
│   ├── OSDR.js            # NASA Open Science Data Repository
│   ├── NSLSL.js           # NASA Space Life Sciences Library
│   ├── NASATaskBook.js    # NASA Task Book projects
│   └── About.js           # Team profiles and project info
├── App.js                 # Main application component
├── index.js               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Data visualization library
- **React Icons** - Icon library

## 🎨 Design System

### Color Palette
- **Primary**: Cosmos Blue (#1e3a8a)
- **Secondary**: Cosmos Purple (#7c3aed)
- **Accent**: Cosmos Cyan (#06b6d4)
- **Background**: Dark Gray (#111827)
- **Text**: White/Light Gray

### Typography
- **Headings**: Bold, modern sans-serif
- **Body**: Clean, readable text
- **Code**: Monospace for technical content

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🌐 Pages Overview

### Home
- Hero section with animated background
- Project overview and mission statement
- Key features showcase
- Call-to-action sections

### Find Your Interest
- Advanced search form with multiple filters
- Interactive trend chart
- Search results display
- Real-time search suggestions

### Chatbot
- AI-powered chat interface
- Quick question templates
- Message history
- Integration ready for AI models

### Impact
- Project metrics and statistics
- Success stories
- Timeline of achievements
- Future goals

### NASA Resources
- **OSDR**: Open Science Data Repository
- **NSLSL**: Space Life Sciences Library
- **NASA Task Book**: Research projects database

### About
- Team member profiles
- Project timeline
- Technologies used
- Contact information

## 🚀 Deployment

The app can be deployed to any static hosting service:

1. Build the production version:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service

## 🔮 Future Enhancements

- [ ] Real API integration with NASA databases
- [ ] Advanced AI chatbot with natural language processing
- [ ] User authentication and personalization
- [ ] Data export functionality
- [ ] Collaborative features
- [ ] Mobile app version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- NASA for providing access to space biology research data
- The React.js community for excellent documentation
- Tailwind CSS for the utility-first approach
- All contributors and mentors

## 📞 Contact

For questions or support, please contact the development team through the About page or create an issue in the repository.

---

Built with ❤️ for the NASA Space Biology community
