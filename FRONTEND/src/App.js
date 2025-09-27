import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FindYourInterest from './pages/FindYourInterest';
import Chatbot from './pages/Chatbot';
import Impact from './pages/Impact';
import OSDR from './pages/OSDR';
import NSLSL from './pages/NSLSL';
import NASATaskBook from './pages/NASATaskBook';
import About from './pages/About';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-900 text-white">
        <Router>
          <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/find-your-interest" element={<FindYourInterest />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/osdr" element={<OSDR />} />
              <Route path="/nslsl" element={<NSLSL />} />
              <Route path="/nasa-task-book" element={<NASATaskBook />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
