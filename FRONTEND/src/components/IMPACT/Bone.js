"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

// ✅ Inline Card component
function Card({ children, className = "" }) {
  return (
    <div
      className={` rounded-xl border border-gray-200 bg-gray shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

// ✅ Inline Slider component
function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
}) {
  const handleChange = (e) => {
    const newValue = [Number(e.target.value)];
    onValueChange(newValue);
  };

  return (
    <input
      type="range"
      value={value[0]}
      min={min}
      max={max}
      step={step}
      onChange={handleChange}
      className={`w-full cursor-pointer ${className}`}
    />
  );
}

function BoneModel({ morphValue }) {
  const groupRef = useRef(null);

  useFrame(() => {});

  const boneColor = new THREE.Color().lerpColors(
    new THREE.Color(0xf0f0f0), // Healthy
    new THREE.Color(0x8b4513), // Degraded
    morphValue
  );

  const opacity = 1 - morphValue * 0.3;

  return (
    <group ref={groupRef}>
      {/* Title label */}
      <Text position={[0, 3.5, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
        Bone
      </Text>

      {/* Shaft */}
      <mesh>
        <cylinderGeometry
          args={[0.3 - morphValue * 0.1, 0.3 - morphValue * 0.1, 4, 16]}
        />
        <meshStandardMaterial
          color={boneColor}
          roughness={0.4 + morphValue * 0.3}
          metalness={0.1}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Ends */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.5 - morphValue * 0.15, 16, 16]} />
        <meshStandardMaterial color={boneColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, -2.2, 0]}>
        <sphereGeometry args={[0.5 - morphValue * 0.15, 16, 16]} />
        <meshStandardMaterial color={boneColor} transparent opacity={opacity} />
      </mesh>

      {/* Inner trabecular structure */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              (i - 4) * 0.4,
              Math.sin(angle) * radius,
            ]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.3, 4]} />
            <meshStandardMaterial
              color={boneColor}
              transparent
              opacity={opacity * (1 - morphValue * 0.8)}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function GravitySliderViz() {
  const [gravityValue, setGravityValue] = useState([100]);
  const [gravityLabel, setGravityLabel] = useState("1.00g (Earth)");

  const updateGravityLabel = (value) => {
    const gravityLevel = value / 100;
    let labelText = `${gravityLevel.toFixed(2)}g`;

    if (gravityLevel > 0.99) labelText += " (Earth)";
    else if (Math.abs(gravityLevel - 0.38) < 0.02) labelText += " (Mars)";
    else if (Math.abs(gravityLevel - 0.16) < 0.02) labelText += " (Moon)";
    else if (gravityLevel < 0.01) labelText += " (Microgravity)";

    setGravityLabel(labelText);
  };

  const handleSliderChange = (value) => {
    setGravityValue(value);
    updateGravityLabel(value[0]);
  };

  const morphValue = 1 - gravityValue[0] / 100;

  const boneHealthData = [
    {
      gravity: 1.0,
      label: "Earth",
      loss: "0%",
      description: "Normal bone density",
    },
    {
      gravity: 0.38,
      label: "Mars",
      loss: "~30%",
      description: "Moderate bone loss",
    },
    {
      gravity: 0.16,
      label: "Moon",
      loss: "~50%",
      description: "Significant bone loss",
    },
    {
      gravity: 0.0,
      label: "Microgravity",
      loss: "~70%",
      description: "Severe bone degradation",
    },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 to-background py-10">
      <div className="container mx-auto px-4">
        <div className="mb-5 text-center">
          <h2 className="mb-2 font-[family-name:var(--font-montserrat)] text-blue-600 text-4xl font-black text-foreground md:text-4xl">
            Gravity & Bone Morphology
          </h2>
          <p className="mx-auto text-whites max-w-2xl text-lg text-muted-foreground">
            Explore how different gravity levels affect bone structure and
            density
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* 3D Bone Viz */}
          <div className="lg:col-span-1">
            <div className="h-[600px] w-full overflow-hidden rounded-lg bg-slate-950 shadow-2xl">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 5]} intensity={1} />
                <pointLight position={[-5, -5, -5]} intensity={0.5} />
                <BoneModel morphValue={morphValue} />
                <OrbitControls enableZoom minDistance={5} maxDistance={15} />
              </Canvas>
            </div>
          </div>

          {/* Vertical Gravity Level */}
          <div className="lg:col-span-1">
            <Card className="p-6 h-[600px] flex flex-col">
              <h3 className="mb-4 text-2xl font-black text-blue-600">
                Gravity Level
              </h3>
              <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                <div className="text-center">
                  <span className="font-mono text-2xl font-bold text-green-600">
                    {gravityLabel}
                  </span>
                </div>
                
                {/* Vertical Slider Container */}
                <div className="flex items-center space-x-6">
                  {/* Vertical Labels */}
                  <div className="h-80 flex flex-col justify-between items-end space-y-2">
                    <span className="text-sm text-green-500 font-semibold">1.0g (Earth)</span>
                    <span className="text-sm text-red-400 font-semibold">0.38g (Mars)</span>
                    <span className="text-sm text-red-600 font-semibold">0.16g (Moon)</span>
                    <span className="text-sm text-red-900 font-semibold">0g (Microgravity)</span>
                  </div>
                  
                  {/* Vertical Slider Track */}
                  <div 
                    className="h-80 w-2 bg-blue-600 rounded-full relative cursor-pointer"
                    onMouseDown={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const y = e.clientY - rect.top;
                      const percentage = Math.max(0, Math.min(100, ((rect.height - y) / rect.height) * 100));
                      handleSliderChange([Math.round(percentage)]);
                    }}
                    onMouseMove={(e) => {
                      if (e.buttons === 1) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const y = e.clientY - rect.top;
                        const percentage = Math.max(0, Math.min(100, ((rect.height - y) / rect.height) * 100));
                        handleSliderChange([Math.round(percentage)]);
                      }
                    }}
                  >
                    {/* Slider Thumb Position */}
                    <div 
                      className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg z-10 pointer-events-none"
                      style={{ 
                        bottom: `${gravityValue[0]}%`,
                        transform: 'translateY(50%)',
                        left: '-6px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Bone Health Data */}
          <div className="lg:col-span-1">
            <Card className="p-6 h-[600px] flex flex-col">
              <h3 className="mb-4 text-2xl font-black text-blue-600">
                Bone Health Data
              </h3>
              <p className="mb-6 text-sm text-blue-500">
                Research shows dose-dependent bone loss correlates with gravity
                levels
              </p>

              <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-4">
                  {boneHealthData.map((data, index) => {
                    // Color mapping by label
                    const labelColors = {
                      Earth: "text-green-500",
                      Mars: "text-red-400",
                      Moon: "text-red-600",
                      Microgravity: "text-red-900",
                    }

                    const textColor = labelColors[data.label] || "text-blue-600" // fallback if unknown

                    return (
                      <div
                        key={index}
                        className={`rounded-lg border border-border p-3 ${textColor}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{data.label}</span>
                          <span className="font-mono text-sm">{data.gravity}g</span>
                        </div>
                        <div className="mt-1 text-sm">
                          Bone Loss:{" "}
                          <span className="font-semibold text-destructive">{data.loss}</span>
                        </div>
                        <div className="mt-1 text-xs">{data.description}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Research Section - Below the slider */}
        <div className="mt-8">
          <Card className="p-6">
            <div className="space-y-4 border-t border-border pt-6">
              <div>
                <h4 className="mb-2 font-semibold text-blue-600">Impacts on Bone & Muscle According to Researches</h4>

                {/* Scrollable container */}
                <div className="max-h-86 overflow-y-auto pr-2 space-y-6 text-sm text-blue-900">

                  {/* Dose-Dependent Bone Loss */}
                  <div>
                    <h5 className="font-semibold text-blue-700">Dose-Dependent Bone Loss: A Gravity Continuum</h5>
                    <p className="text-xs text-gray-300 leading-relaxed mt-1">
                      Your visualization shows that the severity of bone loss is directly proportional to the reduction in gravity. 
                      Studies using partial weight-bearing rodent models confirm that skeletal properties—bone mineral density, 
                      trabecular bone volume, and cortical area—decrease linearly with unloading. Even a 70% reduction in weight-bearing 
                      causes significant deterioration.
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed mt-2">
                      Bone loss is progressive over time with no plateau observed after a month of reduced loading. Experiments on 
                      the ISS comparing microgravity (μg), lunar gravity (1/6g), and Earth gravity (1g) show that lunar gravity 
                      partially mitigates bone loss but does not fully prevent it, highlighting the necessity of full 1 g load to 
                      maintain bone density.
                    </p>
                  </div>

                  {/* Cellular Mechanisms */}
                  <div>
                    <h5 className="font-semibold text-blue-700">Cellular Mechanisms: How Microgravity Degrades Bone</h5>
                    <p className="text-xs text-gray-300 leading-relaxed mt-1">
                      Microgravity triggers an imbalance in bone remodeling. Osteoclast activity increases rapidly—one study reported 
                      a 170% increase in mice after 15 days in space—driven by pro-osteoclastogenic genes like RANKL. Simultaneously, 
                      osteoblast function is inhibited, preventing effective bone regeneration.
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed mt-2">
                      This imbalance leads to structural deterioration in weight-bearing bones such as the femur, with reduced trabecular 
                      thickness and overall bone volume fraction. The weakening of internal scaffolding reduces bending strength and 
                      increases fracture risk, represented in your model by fading internal structure.
                    </p>
                  </div>

                  {/* Muscle-Bone Connection */}
                  <div>
                    <h5 className="font-semibold text-blue-700">The Muscle-Bone Connection: A Coupled System</h5>
                    <p className="text-xs text-gray-300 leading-relaxed mt-1">
                      Muscle atrophy is a parallel consequence of unloading. Postural muscles like the soleus undergo significant wasting, 
                      driven by energy-saving gene expression changes, oxidative stress, and disrupted calcium signaling.
                    </p>
                    <p className="text-xs  text-gray-300 leading-relaxed mt-2">
                      Studies show sex-based differences, with females maintaining muscle function better during unloading. Muscle and 
                      bone health are intertwined: targeting specific genes in muscle, such as inhibiting GSK3, can preserve muscle 
                      mass and simultaneously increase bone mineral density, demonstrating powerful muscle-bone crosstalk. Countermeasures 
                      for muscle preservation may therefore protect the skeleton as well.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
