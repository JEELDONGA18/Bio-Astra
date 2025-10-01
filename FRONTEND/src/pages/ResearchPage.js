import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import KnowledgeGraph from '../components/KnowledgeGraph';

const ResearchPage = () => {
  const { pmcid } = useParams();
  const navigate = useNavigate();
  const [researchData, setResearchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    abstract: false,
    conclusion: false,
    summary: false
  });

  useEffect(() => {
    fetchResearchData();
  }, [pmcid]);

  const fetchResearchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/research/${pmcid}`);
      const data = await response.json();
      
      if (data.success) {
        setResearchData(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch research data');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const truncateText = (text, maxLength = 200) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getPreviewText = (text, lines = 3) => {
    if (!text) return '';
    const words = text.split(' ');
    const wordsPerLine = 15; // Approximate words per line
    const maxWords = lines * wordsPerLine;
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const getInitials = (name) => {
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-cosmos-gradient rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading research paper...</p>
        </div>
      </div>
    );
  }

  if (error || !researchData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-white text-xl mb-4">Error loading research paper</p>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/find-your-interest')}
            className="btn-primary"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/find-your-interest')}
            className="flex items-center text-cosmos-cyan hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Search Results
          </button>
        </div>

        {/* Title */}
        <div className="card mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {researchData.Title || researchData.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {researchData['Study Year'] || researchData.year}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {researchData.Category || researchData.category}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PMCID: {researchData.PMCId || researchData.pmcid}
            </span>
          </div>
        </div>

        {/* Knowledge Graph */}
        <div className="mb-8">
          <KnowledgeGraph 
            data={{
              title: researchData.Title || researchData.title,
              category: researchData.Category || researchData.category,
              authors: researchData.Authors || researchData.authors || [],
              keywords: researchData.Keywords || researchData.keywords || []
            }}
          />
        </div>

        {/* Keywords */}
        {Array.isArray(researchData.Keywords || researchData.keywords) && (researchData.Keywords || researchData.keywords).length > 0 && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {(researchData.Keywords || researchData.keywords).map((kw, idx) => (
                <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-200 border border-gray-600">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Abstract */}
        {(researchData.Abstract || researchData.abstract) && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Abstract</h2>
            <div className="text-gray-300 leading-relaxed relative">
              {expandedSections.abstract ? (
                <p>{researchData.Abstract || researchData.abstract}</p>
              ) : (
                <div className="relative">
                  <p className="relative z-10">{getPreviewText(researchData.Abstract || researchData.abstract, 4)}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent via-gray-800/50 to-gray-800 pointer-events-none"></div>
                </div>
              )}
              <button
                onClick={() => toggleSection('abstract')}
                className="mt-4 text-cosmos-cyan hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                {expandedSections.abstract ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Show Less
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Read Full Abstract
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Conclusion */}
        {(researchData.Conclusion || researchData.conclusion) && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Conclusion</h2>
            <div className="text-gray-300 leading-relaxed relative">
              {expandedSections.conclusion ? (
                <p>{researchData.Conclusion || researchData.conclusion}</p>
              ) : (
                <div className="relative">
                  <p className="relative z-10">{getPreviewText(researchData.Conclusion || researchData.conclusion, 4)}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent via-gray-800/50 to-gray-800 pointer-events-none"></div>
                </div>
              )}
              <button
                onClick={() => toggleSection('conclusion')}
                className="mt-4 text-cosmos-cyan hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                {expandedSections.conclusion ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Show Less
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Read Full Conclusion
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Summary */}
        {(researchData.Summary || researchData.summary || researchData.SUMMARY) && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Summary</h2>
            <div className="text-gray-300 leading-relaxed relative">
              {expandedSections.summary ? (
                <p>{researchData.Summary || researchData.summary || researchData.SUMMARY}</p>
              ) : (
                <div className="relative">
                  <p className="relative z-10">{getPreviewText(researchData.Summary || researchData.summary || researchData.SUMMARY, 4)}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent via-gray-800/50 to-gray-800 pointer-events-none"></div>
                </div>
              )}
              <button
                onClick={() => toggleSection('summary')}
                className="mt-4 text-cosmos-cyan hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                {expandedSections.summary ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Show Less
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Read Full Summary
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Explore More */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {researchData.explore_more.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 transition-colors duration-200 group"
              >
                <h3 className="text-white font-semibold mb-2 group-hover:text-cosmos-cyan transition-colors duration-200">
                  {link.title}
                </h3>
                <div className="flex items-center text-cosmos-cyan text-sm">
                  <span>Visit Link</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Do Inquiry Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Do Inquiry</h2>
          <p className="text-gray-300 mb-6">
            Have questions about this research? Use our AI assistant below to get instant answers 
            about the paper, related research, or space biology topics.
          </p>
          
              {/* Chatbot Component */}
              <div className="bg-gray-800 rounded-lg p-6">
                <Chatbot 
                  paperContext={{
                    title: researchData.Title || researchData.title,
                    category: researchData.Category || researchData.category,
                    authors: researchData.Authors || researchData.authors || [],
                    keywords: researchData.Keywords || researchData.keywords || [],
                    abstract: researchData.Abstract || researchData.abstract,
                    conclusion: researchData.Conclusion || researchData.conclusion,
                    pmcid: researchData.PMCId || researchData.pmcid,
                    year: researchData['Study Year'] || researchData.year
                  }}
                />
              </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;
