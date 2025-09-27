import React, { useState } from 'react';
import TrendChart from '../components/TrendChart';

const FindYourInterest = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useState({
    title: '',
    author: '',
    category: '',
    keywords: '',
    timeRange: 'all'
  });

  // Sample search results for demonstration
  const sampleResults = [
    {
      id: 1,
      title: "Effects of Microgravity on Plant Growth and Development",
      author: "Dr. Sarah Johnson",
      category: "Plant Biology",
      year: 2023,
      abstract: "This study examines the impact of microgravity conditions on Arabidopsis thaliana growth patterns and gene expression...",
      keywords: ["microgravity", "plant biology", "space agriculture", "gene expression"],
      doi: "10.1038/spacebio.2023.001"
    },
    {
      id: 2,
      title: "Radiation Effects on Human Cells in Space Environment",
      author: "Dr. Michael Chen",
      category: "Human Biology",
      year: 2023,
      abstract: "Comprehensive analysis of cosmic radiation effects on human cellular structures during long-duration space missions...",
      keywords: ["radiation", "human biology", "space medicine", "cellular damage"],
      doi: "10.1038/spacebio.2023.002"
    },
    {
      id: 3,
      title: "Microbial Communities in Closed Ecological Systems",
      author: "Dr. Elena Rodriguez",
      category: "Microbiology",
      year: 2022,
      abstract: "Investigation of microbial diversity and interactions in simulated closed ecological life support systems...",
      keywords: ["microbiology", "closed systems", "life support", "ecosystem dynamics"],
      doi: "10.1038/spacebio.2022.015"
    }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(sampleResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const categories = [
    'All Categories',
    'Plant Biology',
    'Human Biology',
    'Microbiology',
    'Animal Biology',
    'Biotechnology',
    'Life Support Systems'
  ];

  const timeRanges = [
    { value: 'all', label: 'All Time' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Find Your Interest
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover NASA Space Biology publications through advanced search and filtering. 
            Explore trends, find specific research, and connect with the latest discoveries.
          </p>
        </div>

        {/* Search Form */}
        <div className="card mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search by Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search by Title
                </label>
                <input
                  type="text"
                  value={searchParams.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter publication title..."
                  className="input-field w-full"
                />
              </div>

              {/* Search by Author */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search by Author
                </label>
                <input
                  type="text"
                  value={searchParams.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Enter author name..."
                  className="input-field w-full"
                />
              </div>

              {/* Search by Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search by Category
                </label>
                <select
                  value={searchParams.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="input-field w-full"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'All Categories' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search by Time */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search by Time
                </label>
                <select
                  value={searchParams.timeRange}
                  onChange={(e) => handleInputChange('timeRange', e.target.value)}
                  className="input-field w-full"
                >
                  {timeRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search by Keywords
              </label>
              <input
                type="text"
                value={searchParams.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                placeholder="Enter keywords (comma-separated)..."
                className="input-field w-full"
              />
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSearching}
                className="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search Publications
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Trend Chart */}
        <div className="mb-8">
          <TrendChart />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6">
              Search Results ({searchResults.length} publications found)
            </h2>
            
            <div className="space-y-6">
              {searchResults.map((result) => (
                <div key={result.id} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {result.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {result.author}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {result.category}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {result.year}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <span className="inline-block bg-cosmos-cyan text-white px-3 py-1 rounded-full text-sm font-medium">
                        {result.year}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {result.abstract}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {result.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="btn-primary text-sm px-4 py-2">
                      View Full Text
                    </button>
                    <button className="btn-secondary text-sm px-4 py-2">
                      Download PDF
                    </button>
                    <button className="border border-gray-500 text-gray-300 hover:bg-gray-600 px-4 py-2 rounded text-sm transition-colors duration-200">
                      Cite
                    </button>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    DOI: {result.doi}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results State */}
        {searchResults.length === 0 && !isSearching && (
          <div className="card text-center py-12">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Search Results Yet</h3>
            <p className="text-gray-400 mb-6">
              Use the search form above to find NASA Space Biology publications that match your interests.
            </p>
            <p className="text-sm text-gray-500">
              Try searching by title, author, category, or keywords to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindYourInterest;
