import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-cosmos-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BA</span>
              </div>
              <span className="text-xl font-bold bg-cosmos-gradient bg-clip-text text-transparent">
                Bio-Astra Dashboard
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Exploring NASA Space Biology publications through an interactive dashboard. 
              Discover research, connect with data, and advance space life sciences.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/JEELDONGA18/Bio-Astra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 .5C5.73.5.98 5.25.98 11.52c0 4.85 3.15 8.96 7.52 10.41.55.1.75-.24.75-.53 0-.26-.01-.95-.02-1.86-3.06.66-3.71-1.48-3.71-1.48-.5-1.27-1.23-1.61-1.23-1.61-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.72-1.49-2.44-.28-5-1.22-5-5.43 0-1.2.43-2.18 1.14-2.95-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.13.89-.25 1.85-.37 2.81-.38.96.01 1.92.13 2.81.38 2.14-1.43 3.08-1.13 3.08-1.13.61 1.54.23 2.68.11 2.96.71.77 1.14 1.75 1.14 2.95 0 4.22-2.56 5.15-5 5.43.4.34.76 1.02.76 2.06 0 1.49-.01 2.69-.01 3.06 0 .29.2.64.75.53 4.37-1.45 7.52-5.56 7.52-10.41C23.02 5.25 18.27.5 12 .5z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/find-your-interest" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200">
                  Find Your Interest
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200">
                  Impact
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* NASA Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">NASA Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/osdr" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200">
                  OSDR
                </Link>
              </li>
              <li>
                <Link to="/nslsl" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200">
                  NSLSL
                </Link>
              </li>
              <li>
                <Link to="/nasa-task-book" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200">
                  NASA Task Book
                </Link>
              </li>
              <li>
                <a href="https://www.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200">
                  NASA.gov
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Bio-Astra Dashboard. Built for NASA Space Biology research.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-cosmos-cyan transition-colors duration-200 text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
