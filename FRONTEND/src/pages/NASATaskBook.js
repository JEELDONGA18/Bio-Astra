import React from 'react';
import ResourceCard from '../components/ResourceCard';

const NASATaskBook = () => {
  const taskBookResources = [
    {
      title: "NASA Task Book Database",
      description: "Comprehensive database of NASA-funded research projects, including project descriptions, principal investigators, funding amounts, and research outcomes across all NASA programs.",
      link: "https://taskbook.nasaprs.com",
      category: "Project Database",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      features: [
        "Project search and filtering",
        "Principal investigator profiles",
        "Funding history and outcomes",
        "Research collaboration networks"
      ]
    },
    {
      title: "Space Biology Projects",
      description: "Specialized collection of NASA-funded space biology research projects, including current and historical studies on the effects of spaceflight on living systems.",
      link: "https://taskbook.nasaprs.com/space-biology",
      category: "Space Biology",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      features: [
        "Space biology project catalog",
        "Research methodology details",
        "Publication and data links",
        "Project timeline tracking"
      ]
    },
    {
      title: "Principal Investigator Directory",
      description: "Comprehensive directory of NASA-funded researchers, including their affiliations, research interests, and project portfolios across space life sciences.",
      link: "https://taskbook.nasaprs.com/investigators",
      category: "Researchers",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      features: [
        "Researcher profiles and CVs",
        "Research interest matching",
        "Collaboration opportunities",
        "Contact information"
      ]
    },
    {
      title: "Funding Opportunities",
      description: "Current and upcoming NASA funding opportunities for space biology research, including grant announcements, application guidelines, and submission deadlines.",
      link: "https://taskbook.nasaprs.com/funding",
      category: "Funding",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      features: [
        "Active funding announcements",
        "Application guidelines",
        "Deadline tracking",
        "Eligibility requirements"
      ]
    }
  ];

  const quickLinks = [
    {
      title: "Browse Projects",
      description: "Explore funded research projects",
      link: "https://taskbook.nasaprs.com/projects",
      icon: "🔬"
    },
    {
      title: "Find Researchers",
      description: "Search for principal investigators",
      link: "https://taskbook.nasaprs.com/search",
      icon: "👥"
    },
    {
      title: "Funding Calendar",
      description: "Track upcoming opportunities",
      link: "https://taskbook.nasaprs.com/calendar",
      icon: "📅"
    },
    {
      title: "Submit Project",
      description: "Add your research project",
      link: "https://taskbook.nasaprs.com/submit",
      icon: "📝"
    }
  ];

  const projectCategories = [
    {
      title: "Human Research",
      description: "Studies on human physiology and psychology in space",
      count: "150+ projects",
      funding: "$50M+"
    },
    {
      title: "Plant Biology",
      description: "Research on plant growth and development in space",
      count: "80+ projects",
      funding: "$25M+"
    },
    {
      title: "Microbiology",
      description: "Microbial studies in space environments",
      count: "60+ projects",
      funding: "$15M+"
    },
    {
      title: "Animal Studies",
      description: "Animal research for space biology insights",
      count: "40+ projects",
      funding: "$20M+"
    }
  ];

  const recentProjects = [
    {
      title: "Effects of Microgravity on Human Immune System",
      pi: "Dr. Sarah Johnson",
      institution: "NASA Johnson Space Center",
      duration: "2022-2025",
      funding: "$2.5M"
    },
    {
      title: "Plant Growth Optimization in Space",
      pi: "Dr. Michael Chen",
      institution: "University of California",
      duration: "2023-2026",
      funding: "$1.8M"
    },
    {
      title: "Microbial Communities in Space",
      pi: "Dr. Elena Rodriguez",
      institution: "MIT",
      duration: "2021-2024",
      funding: "$2.1M"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            NASA Task Book
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore NASA's comprehensive database of funded research projects, 
            principal investigators, and funding opportunities in space life sciences.
          </p>
        </div>

        {/* Overview Section */}
        <div className="card mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Tracking NASA Research Excellence
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The NASA Task Book serves as the central repository for all NASA-funded research 
                projects, providing transparency and accountability in research funding. It 
                tracks project progress, outcomes, and impacts across NASA's diverse research 
                portfolio, with special emphasis on space life sciences and space biology research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://taskbook.nasaprs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit Task Book
                </a>
                <button className="btn-secondary">
                  Browse Projects
                </button>
              </div>
            </div>
            <div className="bg-cosmos-gradient/10 rounded-lg p-8 text-center">
              <div className="w-32 h-32 bg-cosmos-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Research Transparency
              </h3>
              <p className="text-gray-300">
                Comprehensive tracking of NASA research investments and outcomes
              </p>
            </div>
          </div>
        </div>

        {/* Main Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Task Book Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {taskBookResources.map((resource, index) => (
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

        {/* Project Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Research Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectCategories.map((category, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-cosmos-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {category.description}
                </p>
                <div className="space-y-1">
                  <div className="text-cosmos-cyan font-semibold text-sm">
                    {category.count}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {category.funding}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Recent Space Biology Projects
          </h2>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {project.pi}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {project.institution}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {project.duration}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cosmos-cyan mb-1">
                        {project.funding}
                      </div>
                      <div className="text-sm text-gray-400">Total Funding</div>
                    </div>
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
              NASA Task Book Statistics
            </h2>
            <p className="text-gray-300">
              Comprehensive tracking of NASA research investments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">3,000+</div>
              <div className="text-white font-semibold mb-1">Active Projects</div>
              <div className="text-gray-400 text-sm">Currently funded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">$2.5B+</div>
              <div className="text-white font-semibold mb-1">Total Funding</div>
              <div className="text-gray-400 text-sm">Research investments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">500+</div>
              <div className="text-white font-semibold mb-1">Institutions</div>
              <div className="text-gray-400 text-sm">Participating organizations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">2,000+</div>
              <div className="text-white font-semibold mb-1">Researchers</div>
              <div className="text-gray-400 text-sm">Principal investigators</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Explore NASA Research Projects
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover funded research projects, connect with investigators, and find 
            collaboration opportunities in space life sciences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://taskbook.nasaprs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              Browse Task Book
            </a>
            <button className="btn-secondary text-lg px-8 py-4">
              Find Researchers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NASATaskBook;
