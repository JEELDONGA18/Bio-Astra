import React, { useState } from 'react';
import ResourceCard from '../components/ResourceCard';
import { Link } from 'react-router-dom';

const OSDR = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const osdrResources = [
    {
      title: "Open Science Data Repository",
      description: "NASA's comprehensive repository for space biology data, including experimental results, datasets, and research findings from space missions and ground-based studies.",
      link: "https://osdr.nasa.gov/bio/repo",
      category: "Data Repository",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      features: [
        "Multi-omics datasets from space missions",
        "Standardized data formats and metadata",
        "Open access to research data",
        "Integration with NASA research programs"
      ]
    },
    {
      title: "GeneLab Data System",
      description: "Advanced platform for analyzing space biology omics data, providing tools for data visualization, statistical analysis, and collaborative research.",
      link: "https://genelab-data.ndc.nasa.gov/genelab/projects",
      category: "Analysis Platform",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: [
        "Genomics and transcriptomics analysis",
        "Interactive data visualization tools",
        "Collaborative research environment",
        "Real-time data processing capabilities"
      ]
    },
    {
      title: "Space Biology Data Standards",
      description: "Comprehensive guidelines and standards for space biology data collection, formatting, and sharing to ensure reproducibility and interoperability.",
      link: "https://www.nasa.gov/osdr-services-sequencing-and-sample-processing-genelab-sequencing-standards-and-services/",
      category: "Standards & Guidelines",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Data collection protocols",
        "Metadata standards",
        "Quality assurance guidelines",
        "Interoperability specifications"
      ]
    },
    {
      title: "Research Data Portal",
      description: "User-friendly interface for discovering and accessing space biology datasets, with advanced search capabilities and data preview features.",
      link: "https://science.data.nasa.gov/bio-physical/ ",
      category: "Data Discovery",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      features: [
        "Advanced search and filtering",
        "Data preview and metadata",
        "Download and export options",
        "User account management"
      ]
    }
  ];

  const quickLinks = [
    {
      title: "Browse Datasets",
      description: "Explore available space biology datasets",
      link: "https://osdr.nasa.gov/bio/repo/",
      icon: "📊"
    },
    {
      title: "Submit Data",
      description: "Contribute your research data",
      link: "https://science.nasa.gov/biological-physical/data/osdr/osdr-submission-portal/",
      icon: "📤"
    },
    {
      title: "Visulization Portal",
      description: "for mining and analyzing space life science data",
      link: "https://visualization.osdr.nasa.gov/",
      icon: "🔗"
    },
    {
      title: "User Guide",
      description: "Learn how to use OSDR effectively",
      link: "https://osdr-tutorials.readthedocs.io/en/latest/",
      icon: "📖"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Starfield Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Animated Background Stars */}
        <div className="absolute inset-0 bg-star-field bg-[length:300px_300px] animate-pulse-slow"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-cosmos-gradient bg-clip-text text-transparent">
                NASA Open Science Data Repository
              </span>
              <br />
              <span className="text-white">(OSDR)</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore space biology datasets, tools and resources through NASA's premier 
              open science platform for advancing space life sciences research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://science.nasa.gov/biological-physical/data/osdr/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Access OSDR
              </a>
              <button className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cosmos-cyan/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-cosmos-purple/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-cosmos-blue/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Overview Section */}
        <div className="card mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Advancing Space Biology Through Open Data
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The NASA Open Science Data Repository (OSDR) is a comprehensive platform that 
                provides access to space biology research data, analysis tools, and collaborative 
                resources. It serves as the central hub for space biology data sharing and discovery, 
                enabling researchers worldwide to access, analyze, and contribute to our understanding 
                of life in space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://osdr.nasa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit OSDR
                </a>
                <button className="btn-secondary">
                  Learn More
                </button>
              </div>
            </div>
            <div className="bg-cosmos-gradient/10 rounded-lg p-8 text-center">
              <div className="w-32 h-32 bg-cosmos-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Open Science Initiative
              </h3>
              <p className="text-gray-300">
                Promoting transparency, reproducibility, and collaboration in space biology research
              </p>
            </div>
          </div>
        </div>

        {/* Main Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Key Resources & Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {osdrResources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                link={resource.link}
                category={resource.category}
                icon={resource.icon}
                features={resource.features}
              />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card hover:border-cosmos-cyan/50 transition-all duration-300 group text-center"
              >
                <div className="text-4xl mb-4">{link.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cosmos-cyan transition-colors duration-200">
                  {link.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {link.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Search OSDR Datasets */}
        <div className="card mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Search OSDR Datasets
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Search and discover space biology datasets directly from OSDR. 
              This feature will be integrated with the OSDR API for real-time data access.
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search datasets inside OSDR..."
                  className="flex-1 input-field"
                />
                <button className="btn-primary px-6 py-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                🔮 Future Integration: Direct API connection to OSDR search functionality
              </p>
            </div>
          </div>
        </div>

        {/* Dataset Growth Trend Chart */}
        <div className="card mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Dataset Growth Over Time
          </h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-cosmos-gradient/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-16 h-16 text-cosmos-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Interactive Trend Chart
                </h3>
                <p className="text-gray-400 mb-4">
                  Visual representation of OSDR dataset growth and research activity over time
                </p>
                <div className="flex justify-center space-x-4 text-sm text-gray-500">
                  <span>📈 500+ datasets</span>
                  <span>📊 50+ institutions</span>
                  <span>🔬 2,000+ researchers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="card bg-cosmos-gradient/10 border-cosmos-cyan/30 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              OSDR Impact Statistics
            </h2>
            <p className="text-gray-300">
              Measuring the success of open science in space biology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">500+</div>
              <div className="text-white font-semibold mb-1">Datasets</div>
              <div className="text-gray-400 text-sm">Available for research</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">2,000+</div>
              <div className="text-white font-semibold mb-1">Researchers</div>
              <div className="text-gray-400 text-sm">Active users worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">50+</div>
              <div className="text-white font-semibold mb-1">Institutions</div>
              <div className="text-gray-400 text-sm">Partner organizations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">100+</div>
              <div className="text-white font-semibold mb-1">Publications</div>
              <div className="text-gray-400 text-sm">Based on OSDR data</div>
            </div>
          </div>
        </div>

        {/* Cross-links to Other NASA Resources */}
        <div className="card mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            See Also: Related NASA Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/nslsl"
              className="card hover:border-cosmos-cyan/50 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-cosmos-gradient rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-cosmos-cyan transition-colors duration-200">
                    NASA Space Life Sciences Library
                  </h3>
                  <p className="text-gray-400 text-sm">NSLSL</p>
                </div>
              </div>
              <p className="text-gray-300">
                Access NASA's comprehensive collection of space life sciences publications, 
                research documents, and educational resources.
              </p>
            </Link>

            <Link
              to="/nasa-task-book"
              className="card hover:border-cosmos-cyan/50 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-cosmos-gradient rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-cosmos-cyan transition-colors duration-200">
                    NASA Task Book
                  </h3>
                  <p className="text-gray-400 text-sm">Research Projects Database</p>
                </div>
              </div>
              <p className="text-gray-300">
                Explore NASA's database of funded research projects, principal investigators, 
                and funding opportunities in space life sciences.
              </p>
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore OSDR?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the global community of researchers advancing space biology through open data sharing and collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://osdr.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              Access OSDR Now
            </a>
            <button className="btn-secondary text-lg px-8 py-4">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OSDR;
