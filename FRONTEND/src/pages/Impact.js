import React from "react";
import AnatomyViewer from "../components/IMPACT/astronaut/AstronautCard";
import DNAHelixViz from "../components/IMPACT/DNAHelixViz";
import GravitySliderViz from "../components/IMPACT/Bone";
import GeneExpression from "../components/IMPACT/GeneExpression";

const Impact = () => {

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden universal-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <span className="bg-cosmos-gradient bg-clip-text text-transparent">
            Impact & Metrics
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Measuring how Bio-Astra advances NASA Space Biology research and discovery.
          </p>
        </div>

        <div className="space-y-10">
          <section className="bg-gray-800/80 rounded-xl shadow-xl ring-1 ring-gray-700/50 p-5 sm:p-6 lg:p-8">
            <AnatomyViewer />
          </section>

          <section className="bg-gray-800/80 rounded-xl shadow-xl ring-1 ring-gray-700/50 p-5 sm:p-6 lg:p-8">
            <DNAHelixViz />
          </section>

          <section className="bg-gray-800/80 rounded-xl shadow-xl ring-1 ring-gray-700/50 p-5 sm:p-6 lg:p-8">
            <GravitySliderViz />
          </section>

          <section className="bg-gray-800/80 rounded-xl shadow-xl ring-1 ring-gray-700/50 p-5 sm:p-6 lg:p-8">
            <GeneExpression />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Impact;
