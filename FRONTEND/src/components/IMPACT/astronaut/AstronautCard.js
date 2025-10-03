import React, { useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, Html, useProgress } from "@react-three/drei";
import Astronaut from "../astronaut/Astronaut";
import impactData from "../astronaut/astronaut_impact.json";

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
  const [impact, setImpact] = useState([]);

  useEffect(() => {
    if (selectedOrgan && impactData[selectedOrgan]) {
      setImpact(impactData[selectedOrgan]);
    } else {
      setImpact([]);
    }
  }, [selectedOrgan]);

  return (
    <div className="flex flex-col md:flex-row items-center bg-[#0d1117] text-white rounded-2xl shadow-lg p-6 gap-8">
      {/* LEFT: 3D Model Viewer */}
      <div className="w-full md:w-1/2 h-[400px] bg-black rounded-xl cursor-pointer">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
          <Suspense fallback={<Loader />}>
            {/* Lights */}
            <ambientLight intensity={0.8} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
              castShadow
            />
            <pointLight
              position={[-10, 0, -20]}
              intensity={1}
              color="#ffffff"
            />

            {/* 3D Model */}
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
      <div className="w-full md:w-1/2 bg-[#11182c] rounded-xl p-6 min-h-[25rem] max-h-[25rem] overflow-y-auto">
        {selectedOrgan ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{selectedOrgan}</h2>
            {impact.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                {impact.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">
                No detailed spaceflight impact data available.
              </p>
            )}
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
  );
}
