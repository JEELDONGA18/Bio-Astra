import React from 'react';

const ResourceCard = ({ title, description, link, category, icon, features = [] }) => {
  return (
    <div className="card hover:border-cosmos-cyan/50 transition-all duration-300 group">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 bg-cosmos-gradient rounded-lg flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cosmos-cyan transition-colors duration-200">
            {title}
          </h3>
          <span className="inline-block bg-cosmos-cyan/20 text-cosmos-cyan px-2 py-1 rounded text-xs font-medium mb-3">
            {category}
          </span>
        </div>
      </div>
      
      <p className="text-gray-300 mb-6 leading-relaxed">
        {description}
      </p>
      
      {features.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Key Features:</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-300">
                <svg className="w-4 h-4 text-cosmos-cyan mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm px-4 py-2 text-center"
        >
          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Visit Resource
        </a>
        <button className="border border-gray-500 text-gray-300 hover:bg-gray-600 px-4 py-2 rounded text-sm transition-colors duration-200">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;
