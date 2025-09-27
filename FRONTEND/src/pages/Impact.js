import React from 'react';

const Impact = () => {
  const metrics = [
    {
      title: "Publications Analyzed",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      description: "NASA Space Biology publications processed and indexed"
    },
    {
      title: "Research Categories",
      value: "15",
      change: "+3",
      changeType: "positive",
      description: "Different fields of space biology research covered"
    },
    {
      title: "Active Researchers",
      value: "1,234",
      change: "+8%",
      changeType: "positive",
      description: "Scientists and researchers using the platform"
    },
    {
      title: "Data Points",
      value: "45,672",
      change: "+23%",
      changeType: "positive",
      description: "Individual data points extracted and analyzed"
    }
  ];

  const impactStories = [
    {
      title: "Accelerated Research Discovery",
      description: "Researchers report 40% faster literature review process using our intelligent search and filtering capabilities.",
      icon: "🔍",
      category: "Efficiency"
    },
    {
      title: "Enhanced Collaboration",
      description: "Cross-institutional research teams have increased collaboration by 60% through our networking features.",
      icon: "🤝",
      category: "Collaboration"
    },
    {
      title: "Data-Driven Insights",
      description: "Publication trend analysis has revealed 3 new research directions in space biology.",
      icon: "📊",
      category: "Innovation"
    },
    {
      title: "Educational Impact",
      description: "Over 500 students have used the platform for space biology coursework and research projects.",
      icon: "🎓",
      category: "Education"
    }
  ];

  const achievements = [
    {
      year: "2024",
      title: "NASA Partnership",
      description: "Official collaboration with NASA Space Biology program",
      status: "completed"
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Advanced AI chatbot for research assistance",
      status: "in-progress"
    },
    {
      year: "2023",
      title: "Platform Launch",
      description: "Initial release of Bio-Astra Dashboard",
      status: "completed"
    },
    {
      year: "2023",
      title: "Data Collection",
      description: "Comprehensive NASA publication database",
      status: "completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Impact & Metrics
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Measuring the success and impact of the Bio-Astra Dashboard in advancing 
            NASA Space Biology research and discovery.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className="card text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-gray-400 mb-2">
                {metric.title}
              </div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                metric.changeType === 'positive' 
                  ? 'bg-green-900/30 text-green-400' 
                  : 'bg-red-900/30 text-red-400'
              }`}>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {metric.change}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactStories.map((story, index) => (
              <div key={index} className="card">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{story.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {story.title}
                      </h3>
                      <span className="bg-cosmos-cyan/20 text-cosmos-cyan px-2 py-1 rounded text-xs font-medium">
                        {story.category}
                      </span>
                    </div>
                    <p className="text-gray-300">
                      {story.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Project Timeline
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="absolute left-3 w-3 h-3 bg-cosmos-gradient rounded-full border-4 border-gray-900"></div>
                  <div className="ml-8 card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cosmos-cyan font-semibold">
                        {achievement.year}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        achievement.status === 'completed'
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        {achievement.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-300">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future Goals */}
        <div className="card bg-cosmos-gradient/10 border-cosmos-cyan/30">
          <div className="text-center">
            <div className="w-20 h-20 bg-cosmos-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Future Impact Goals
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our vision for the next phase of Bio-Astra Dashboard development
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-cosmos-cyan mb-2">10,000+</div>
                <div className="text-white font-semibold mb-2">Publications</div>
                <div className="text-gray-400 text-sm">Target publications to be indexed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cosmos-cyan mb-2">50+</div>
                <div className="text-white font-semibold mb-2">Institutions</div>
                <div className="text-gray-400 text-sm">Partner institutions worldwide</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cosmos-cyan mb-2">5,000+</div>
                <div className="text-white font-semibold mb-2">Researchers</div>
                <div className="text-gray-400 text-sm">Active users on the platform</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the Impact
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of advancing space biology research. Explore publications, 
            contribute insights, and help shape the future of space life sciences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">
              Start Exploring
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
