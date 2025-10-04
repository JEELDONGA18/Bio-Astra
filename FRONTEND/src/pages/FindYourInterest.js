import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const API_BASE = "https://bio-astra-backend.onrender.com";

const FindYourInterest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [overviewOpenMap, setOverviewOpenMap] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [showRestoredMessage, setShowRestoredMessage] = useState(false);
  const [searchParams, setSearchParams] = useState({
    title: '',
    author: '',
    category: '',
    keywords: '',
    timeRange: 'all'
  });

  // Load search state from localStorage on component mount
  useEffect(() => {
    const savedSearchResults = localStorage.getItem('searchResults');
    const savedSearchParams = localStorage.getItem('searchParams');
    
    if (savedSearchResults) {
      try {
        const parsedResults = JSON.parse(savedSearchResults);
        if (parsedResults.length > 0) {
          setSearchResults(parsedResults);
          setShowRestoredMessage(true);
          // Hide the message after 5 seconds
          setTimeout(() => setShowRestoredMessage(false), 5000);
        }
      } catch (error) {
        console.error('Error parsing saved search results:', error);
      }
    }
    
    if (savedSearchParams) {
      try {
        setSearchParams(JSON.parse(savedSearchParams));
      } catch (error) {
        console.error('Error parsing saved search params:', error);
      }
    }
  }, []);

  // Save search state to localStorage whenever it changes
  useEffect(() => {
    if (searchResults.length > 0) {
      localStorage.setItem('searchResults', JSON.stringify(searchResults));
    }
  }, [searchResults]);

  useEffect(() => {
    localStorage.setItem('searchParams', JSON.stringify(searchParams));
  }, [searchParams]);

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
    
    try {
      const response = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: searchParams.category || 'all',
          query: searchParams.title || searchParams.author || searchParams.keywords,
          filters: {
            year: searchParams.timeRange !== 'all' ? searchParams.timeRange : null,
            category: searchParams.category || null
          }
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        let results = data.results || [];
        const q = (searchParams.title || searchParams.author || searchParams.keywords || '').toLowerCase();
        if (q && q.trim()) {
          results = results.filter(r => {
            const inTitle = (r.title || '').toLowerCase().includes(q);
            const inAuthor = (r.author || '').toLowerCase().includes(q);
            const inCategory = (r.category || '').toLowerCase().includes(q);
            const inKeywords = Array.isArray(r.keywords) ? r.keywords.join(' ').toLowerCase().includes(q) : (r.keywords || '').toLowerCase().includes(q);
            return inTitle || inAuthor || inCategory || inKeywords;
          });
        }
        setSearchResults(results);
      } else {
        console.error('Search failed:', data.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    localStorage.removeItem('searchResults');
  };

  const clearAllSearch = () => {
    setSearchResults([]);
    setOverviewOpenMap({});
    setSearchParams({
      title: '',
      author: '',
      category: '',
      keywords: '',
      timeRange: 'all'
    });
    localStorage.removeItem('searchResults');
    localStorage.removeItem('searchParams');
  };

  const getPreviewText = (text, lines = 3) => {
    if (!text) return '';
    const words = text.split(' ');
    const wordsPerLine = 15;
    const maxWords = lines * wordsPerLine;
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const toggleOverview = async (pmcid) => {
    setOverviewOpenMap(prev => ({ ...prev, [pmcid]: !prev[pmcid] }));
  };

  const categories = [
    'All Categories',
    'Cross-Cutting Themes & Technologies',
    'Animal Studies',
    'Human & Human Cell Studies',
    'Plant Studies',
    'Microbial Studies',
  ];

  const timeRanges = [
    { value: 'all', label: 'All Time' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' },
    { value: '2013', label: '2013' },
    { value: '2012', label: '2012' },
    { value: '2011', label: '2011' },
    { value: '2010', label: '2010' }
  ];

  const OverviewLoader = ({ pmcid, onLoaded }) => {
    useEffect(() => {
      let isMounted = true;
      const fetchOverview = async () => {
        try {
          const resp = await fetch(`http://localhost:5000/api/research/${pmcid}`);
          const data = await resp.json();
          if (data && data.success && isMounted) {
            const payload = data.data || {};
            const overviewText = payload.Overview || payload.overview || '';
            onLoaded(overviewText || '');
          } else if (isMounted) {
            onLoaded('');
          }
        } catch (e) {
          if (isMounted) onLoaded('');
        }
      };
      fetchOverview();
      return () => { isMounted = false; };
    }, [pmcid, onLoaded]);

    return (
      <div className="text-gray-400 text-sm">Loading overview...</div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
          <span className="bg-cosmos-gradient bg-clip-text text-transparent">
            Find Your Interest
            </span>
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

            {/* Search Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              
              {searchResults.length > 0 && (
                <button
                  type="button"
                  onClick={clearSearchResults}
                  className="btn-secondary text-lg px-6 py-3"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear Results
                  </div>
                </button>
              )}
              
              <button
                type="button"
                onClick={clearAllSearch}
                className="border border-gray-500 text-gray-300 hover:bg-gray-600 text-lg px-6 py-3 rounded transition-colors duration-200"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset All
                </div>
              </button>
            </div>
          </form>
        </div>

        {/* Restored Results Notification */}
        {showRestoredMessage && (
          <div className="mb-6 p-4 bg-cosmos-cyan/20 border border-cosmos-cyan/50 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-cosmos-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-cosmos-cyan font-medium">
                  Previous search results restored
                </p>
                <p className="text-gray-300 text-sm">
                  Your last search results have been restored. You can continue browsing or perform a new search.
                </p>
              </div>
              <button
                onClick={() => setShowRestoredMessage(false)}
                className="ml-auto text-cosmos-cyan hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6">
              Search Results ({searchResults.length} publications found)
            </h2>
            
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div key={result.pmcid || index} className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-cosmos-cyan/50 transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                        {result.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {result.year}
                        </span>
                        <span className="text-xs text-gray-500">
                          PMCID: {result.pmcid}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleOverview(result.pmcid)}
                        className="text-sm px-6 py-2 border border-cosmos-cyan text-cosmos-cyan bg-gray-800 hover:bg-gray-700 rounded transition-colors duration-200"
                      >
                        {overviewOpenMap[result.pmcid] ? 'Hide Overview' : 'Overview'}
                      </button>
                      <button 
                        onClick={() => navigate(`/research/${result.pmcid}`)}
                        className="btn-primary text-sm px-6 py-2"
                      >
                        View Full Text
                      </button>
                    </div>
                  </div>
                  {overviewOpenMap[result.pmcid] && (
                    <div className="mt-4 bg-gray-800 border border-gray-600 rounded p-3">
                      {result.overviewFull ? (
                        <>
                          <p className="text-gray-200">{result.overviewFull}</p>
                          <button
                            type="button"
                            onClick={() => {
                              const half = getPreviewText(result.overviewFull, 4);
                              setSearchResults(prev => prev.map(r => r.pmcid === result.pmcid ? { ...r, overviewPreview: half, overviewFull: undefined } : r));
                            }}
                            className="mt-2 text-cosmos-cyan hover:text-white transition-colors duration-200"
                          >
                            Show Less
                          </button>
                        </>
                      ) : result.overviewPreview ? (
                        <>
                          <p className="text-gray-200">{result.overviewPreview}</p>
                          <button
                            type="button"
                            onClick={() => setSearchResults(prev => prev.map(r => r.pmcid === result.pmcid ? { ...r, overviewFull: r.overview || r.overviewPreview } : r))}
                            className="mt-2 text-cosmos-cyan hover:text-white transition-colors duration-200"
                          >
                            Read Full Overview
                          </button>
                        </>
                      ) : result.overviewLoaded ? (
                        <p className="text-gray-400">Overview not available.</p>
                      ) : (
                        <OverviewLoader pmcid={result.pmcid} onLoaded={(overviewText) => {
                          const preview = getPreviewText(overviewText, 4);
                          setSearchResults(prev => prev.map(r => r.pmcid === result.pmcid ? { ...r, overview: overviewText, overviewPreview: preview, overviewLoaded: true } : r));
                        }} />
                      )}
                    </div>
                  )}
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
