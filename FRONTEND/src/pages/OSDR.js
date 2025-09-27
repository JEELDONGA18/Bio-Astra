import React from 'react';
import ResourceCard from '../components/ResourceCard';

const OSDR = () => {
  const osdrResources = [
    {
      title: "Open Science Data Repository",
      description: "NASA's comprehensive repository for space biology data, including experimental results, datasets, and research findings from space missions and ground-based studies.",
      link: "https://osdr.nasa.gov",
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
      link: "https://genelab.nasa.gov",
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
      link: "https://osdr.nasa.gov/standards",
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
      link: "https://osdr.nasa.gov/portal",
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
      link: "https://osdr.nasa.gov/browse",
      icon: "📊"
    },
    {
      title: "Submit Data",
      description: "Contribute your research data",
      link: "https://osdr.nasa.gov/submit",
      icon: "📤"
    },
    {
      title: "API Documentation",
      description: "Access data programmatically",
      link: "https://osdr.nasa.gov/api",
      icon: "🔗"
    },
    {
      title: "User Guide",
      description: "Learn how to use OSDR effectively",
      link: "https://osdr.nasa.gov/guide",
      icon: "📖"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            NASA Open Science Data Repository (OSDR)
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access comprehensive space biology datasets, analysis tools, and research resources 
            through NASA's premier open science platform.
          </p>
        </div>

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
