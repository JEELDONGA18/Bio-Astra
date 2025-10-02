import React from "react";
import AnatomyViewer from "../components/AstronautCard";
import DNAHelixViz from "../components/DNAHelixViz";
import GravitySliderViz from "../components/Bone";
import GeneExpression from "../components/GeneExpression";
import OrganismComparator from "../components/OrganismComparator";
const Impact = () => {

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Impact & Metrics
          </h1>
          <p className="text-xl text-blue-900 max-w-3xl mx-auto">
            Measuring the success and impact of the Bio-Astra Dashboard in
            advancing NASA Space Biology research and discovery.
          </p>
        </div>
        <div>
          <AnatomyViewer />
        </div>
        <div className="mt-16">
          <DNAHelixViz />
        </div>
        <div className="mt-16">
          <GravitySliderViz /> 
        </div>
        <div className="mt-16">
          <GeneExpression />
        </div>
        <div className="mt-16">
          <OrganismComparator />
        </div>
       
      </div>
    </div>
  );
};

export default Impact;
