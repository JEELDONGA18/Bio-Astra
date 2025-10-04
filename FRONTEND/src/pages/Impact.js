import React from "react";
import AnatomyViewer from "../components/IMPACT/astronaut/AstronautCard";
import DNAHelixViz from "../components/IMPACT/DNAHelixViz";
import GravitySliderViz from "../components/IMPACT/Bone";
import GeneExpression from "../components/IMPACT/GeneExpression";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

function SpaceBackground() {
  return (
    <>
      <Stars
        radius={100}
        depth={50}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <ambientLight intensity={1} />
    </>
  );
}
const Impact = () => {

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
          {/* Hero Section with Rotating 3D Star Background */}
        <section
          className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          style={{ minHeight: "600px" }}
        >
          {/* 3D Rotating Stars Background */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
              <SpaceBackground />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.2}
              />
            </Canvas>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 z-10">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-white">Impact & Metrics of</span>
                <br />
                <span className="bg-cosmos-gradient bg-clip-text text-transparent">
                  NASA Space Biology Research
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Measuring how Bio-Astra advances NASA Space Biology research and discovery.
              </p>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-cosmos-cyan/20 rounded-full animate-float"></div>
          <div
            className="absolute top-40 right-20 w-16 h-16 bg-cosmos-purple/20 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-12 h-12 bg-cosmos-blue/20 rounded-full animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </section>
  

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
