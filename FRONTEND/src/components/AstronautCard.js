// src/components/AnatomyViewer.js
import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, Html, useProgress } from "@react-three/drei";
import Astronaut from "./Astronaut.js";
// Loader for Canvas - No changes needed here
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span style={{ color: "white", fontSize: "1.2rem" }}>
        Loading {progress.toFixed(0)}%
      </span>
    </Html>
  );
}

export default function AnatomyViewer() {
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  console.log(selectedOrgan);
  

  const organDetails = {
    Advanced_Crew_Escape_Suit001_6:
      "The control center of the nervous system, responsible for thought, memory, and controlling the body.",
    Heart:
      "A muscular organ that pumps blood through the circulatory system by rhythmic contraction and dilation.",
    Lungs:
      "A pair of spongy, air-filled organs that are responsible for respiration and gas exchange.",
    Stomach:
      "A muscular organ located on the left side of the upper abdomen; it receives food from the esophagus and begins digestion.",
    Liver:
      "A large, vital organ that performs many essential biological functions such as detoxification and protein synthesis.",
    Intestines:
      "The segment of the alimentary canal extending from the stomach to the anus, responsible for absorbing nutrients and water.",
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 to-background py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center bg-[#0d1117] text-white rounded-2xl shadow-lg p-6 gap-8">
      {/* LEFT: 3D Model Viewer */}
      <div className="w-full md:w-1/2 h-[500px] bg-black rounded-xl cursor-pointer">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
          <Suspense fallback={<Loader />}>
            {/* Lights */}
            <ambientLight intensity={0.8} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.5}
              castShadow
            />
            <pointLight
              position={[-10, 0, -20]}
              intensity={1}
              color="#ffffff"
            />

            {/* 3D Model */}
            {/* CHANGED: Using the new AnatomyModel component */}
            <Astronaut
              selectedOrgan={selectedOrgan}
              onSelectOrgan={setSelectedOrgan}
            />
            <Preload all />
          </Suspense>

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true} // Optional: allow manual rotation
            autoRotate={false} // Disable orbiting around target
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* RIGHT: Organ Details */}
      <div className="w-full md:w-1/2 bg-[#11182c] rounded-xl p-6 min-h-[500px]">
        {selectedOrgan ? (
          <>
            <h2 className="text-2xl font-bold mb-2">{selectedOrgan}</h2>
            <p className="text-gray-300 text-lg">
              {organDetails[selectedOrgan] ||
                "No information available for this part."}
            </p>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-center">
            <p className="text-gray-400 text-lg">
              👆 Click on a body part in the 3D model to view details here.
            </p>
            <p className="text-gray-500 text-sm mt-4">
              You can rotate the model by dragging it.
            </p>
          </div>
        )}
        </div>
      </div>
      </div>
    </section>
  );
}
