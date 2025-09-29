import React from 'react';
import ResourceCard from '../components/ResourceCard';

const NSLSL = () => {
  const nslslResources = [
    {
      title: "NASA Space Life Sciences Library",
      description: "Comprehensive digital library containing NASA's space life sciences publications, research reports, and technical documents spanning decades of space biology research.",
      link: "https://public.ksc.nasa.gov/nslsl/",
      category: "Digital Library",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: [
        "Historical research documents",
        "Technical reports and studies",
        "Mission-specific publications",
        "Advanced search capabilities"
      ]
    },
    {
      title: "Research Archive",
      description: "Extensive archive of NASA space biology research spanning from early space missions to current International Space Station studies, including unpublished reports and data.",
      link: "https://public.ksc.nasa.gov/nslsl/",
      category: "Research Archive",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      features: [
        "Mission-specific research collections",
        "Historical data preservation",
        "Digital preservation standards",
        "Metadata and cataloging"
      ]
    },
    {
      title: "Publication Database",
      description: "Searchable database of peer-reviewed publications, conference proceedings, and technical papers from NASA space biology research programs and collaborations.",
      link: "https://data.nasa.gov/",
      category: "Publications",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: [
        "Peer-reviewed journal articles",
        "Conference proceedings",
        "Technical reports",
        "Citation tracking and metrics"
      ]
    },
    {
      title: "Educational Resources",
      description: "Educational materials, tutorials, and learning resources for students, educators, and researchers interested in space life sciences and NASA research.",
      link: "https://www.nasa.gov/learning-resources/",
      category: "Education",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: [
        "Learning modules and tutorials",
        "Educational case studies",
        "Curriculum resources",
        "Student research projects"
      ]
    }
  ];

  const quickLinks = [
    {
      title: "Browse Collections",
      description: "Explore research collections by topic",
      link: "https://science.nasa.gov/researchers/sara/library-and-useful-links/",
      icon: "📚"
    },
    {
      title: "Search Publications",
      description: "Find specific research papers",
      link: "https://science.nasa.gov/researchers/sara/library-and-useful-links/",
      icon: "🔍"
    },
    {
      title: "Download Resources",
      description: "Access educational materials",
      link: "https://www.nasa.gov/learning-resources/",
      icon: "⬇️"
    },
    {
      title: "Submit Content",
      description: "Contribute to the library",
      link: "https://science.nasa.gov/researchers/sara/how-to-guide/nspires-submission/",
      icon: "📝"
    }
  ];

  const collections = [
    {
      title: "Apollo Era Research",
      description: "Historical documents from the Apollo program's life sciences experiments",
      count: "150+ documents",
      period: "1960s-1970s"
    },
    {
      title: "Space Shuttle Studies",
      description: "Research conducted during the Space Shuttle program",
      count: "300+ studies",
      period: "1980s-2010s"
    },
    {
      title: "ISS Research",
      description: "Current International Space Station life sciences research",
      count: "500+ publications",
      period: "2000s-present"
    },
    {
      title: "Ground-Based Studies",
      description: "Earth-based analog research and simulation studies",
      count: "200+ studies",
      period: "Ongoing"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            NASA Space Life Sciences Library (NSLSL)
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access NASA's comprehensive collection of space life sciences publications, 
            research documents, and educational resources spanning decades of space exploration.
          </p>
        </div>

        {/* Overview Section */}
        <div className="card mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Preserving Space Biology Knowledge
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The NASA Space Life Sciences Library serves as the definitive repository for 
                space biology research, housing decades of scientific knowledge from early 
                space missions to current International Space Station studies. Our collection 
                includes peer-reviewed publications, technical reports, educational materials, 
                and historical documents that chronicle the evolution of space life sciences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://public.ksc.nasa.gov/nslsl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit NSLSL
                </a>
                <button className="btn-secondary">
                  Browse Collections
                </button>
              </div>
            </div>
            <div className="bg-cosmos-gradient/10 rounded-lg p-8 text-center">
              <div className="w-32 h-32 bg-cosmos-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Knowledge Preservation
              </h3>
              <p className="text-gray-300">
                Safeguarding decades of space biology research for future generations
              </p>
            </div>
          </div>
        </div>

        {/* Main Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Library Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nslslResources.map((resource, index) => (
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

        {/* Collections Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Research Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-cosmos-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {collection.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {collection.description}
                </p>
                <div className="space-y-1">
                  <div className="text-cosmos-cyan font-semibold text-sm">
                    {collection.count}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {collection.period}
                  </div>
                </div>
              </div>
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
              NSLSL Collection Statistics
            </h2>
            <p className="text-gray-300">
              Comprehensive coverage of space life sciences research
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">1,200+</div>
              <div className="text-white font-semibold mb-1">Publications</div>
              <div className="text-gray-400 text-sm">Peer-reviewed articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">500+</div>
              <div className="text-white font-semibold mb-1">Technical Reports</div>
              <div className="text-gray-400 text-sm">NASA research documents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">50+</div>
              <div className="text-white font-semibold mb-1">Years</div>
              <div className="text-gray-400 text-sm">Of research history</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">10,000+</div>
              <div className="text-white font-semibold mb-1">Downloads</div>
              <div className="text-gray-400 text-sm">Monthly access</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Explore the NSLSL Collection
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover decades of space biology research and contribute to the growing 
            knowledge base of space life sciences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://nslsl.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              Browse Library
            </a>
            <button className="btn-secondary text-lg px-8 py-4">
              Search Publications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NSLSL;
