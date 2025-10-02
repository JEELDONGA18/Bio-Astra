import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Cylinder, Text, Preload, Html, useProgress } from "@react-three/drei";

// Loader for Canvas
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

const organisms = [
  {
    id: "mouse",
    name: "Mouse",
    position: [-3, 0, 0],
    color: "#8b5cf6",
    microgravityEffects: { effect: "Bone/muscle loss", experiments: [27, 590] },
    immuneEffects: { effect: "T-cell dysfunction", experiments: [191, 239] },
  },
  {
    id: "fly",
    name: "Fruit Fly",
    position: [-1, 0, 0],
    color: "#f59e0b",
    microgravityEffects: { effect: "Cardiac remodeling", experiments: [34] },
    immuneEffects: { effect: "Toll pathway impairment", experiments: [19] },
  },
  {
    id: "plant",
    name: "Plant",
    position: [1, 0, 0],
    color: "#22c55e",
    microgravityEffects: { effect: "Altered root growth", experiments: [153, 379] },
    immuneEffects: { effect: "Stress response changes", experiments: [13, 15] },
  },
  {
    id: "worm",
    name: "C. elegans",
    position: [3, 0, 0],
    color: "#06b6d4",
    microgravityEffects: { effect: "Neuronal/muscle decline", experiments: [496, 501] },
    immuneEffects: { effect: "Immune gene expression", experiments: [496] },
  },
]

function MouseModel({ time, highlightStrength, stressorWeightMicro, stressorWeightImmune }) {
  const chestRef = useRef();
  const baseColor = "#8b5cf6";
  const coatColor = "#a78bfa";
  const skeletonColor = "#93c5fd"; // bluish for bone overlay

  useFrame(() => {
    if (chestRef.current) {
      const breathing = 0.03 * Math.sin(time.current * 2.0);
      chestRef.current.position.y = 0.3 + breathing;
      chestRef.current.scale.setScalar(1 + breathing * 0.5);
    }
  });

  const skeletonOpacity = 0.15 + 0.35 * stressorWeightMicro; // more visible in microgravity
  const immuneGlow = 0.0 + 0.6 * stressorWeightImmune; // reddish glow when immune

  return (
    <group>
      {/* chest/head */}
      <Sphere ref={chestRef} args={[0.3, 16, 16]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color={baseColor} emissive={immuneGlow > 0 ? "#7f1d1d" : baseColor} emissiveIntensity={immuneGlow} />
      </Sphere>
      {/* body */}
      <Sphere args={[0.4, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color={coatColor} />
      </Sphere>
      {/* simple bone overlay for microgravity */}
      <Box args={[0.55, 0.08, 0.08]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color={skeletonColor} transparent opacity={skeletonOpacity} />
      </Box>
    </group>
  )
}

function FlyModel({ time, highlightStrength, stressorWeightMicro, stressorWeightImmune }) {
  const leftWing = useRef();
  const rightWing = useRef();
  const heart = useRef();

  useFrame(() => {
    const slowFlutter = 0.15 * Math.sin(time.current * 3.0);
    if (leftWing.current) leftWing.current.rotation.z = 0.4 + slowFlutter;
    if (rightWing.current) rightWing.current.rotation.z = -0.4 - slowFlutter;
    if (heart.current) {
      const pulse = 1 + 0.15 * stressorWeightMicro * Math.sin(time.current * 6.0);
      heart.current.scale.setScalar(pulse);
    }
  });

  const bodyColor = "#f59e0b";
  const wingColor = "#fbbf24";
  const immuneHemolymph = stressorWeightImmune;

  return (
    <group>
      {/* body */}
      <Sphere args={[0.15, 16, 16]}>
        <meshStandardMaterial color={bodyColor} emissive={immuneHemolymph > 0 ? "#7c2d12" : bodyColor} emissiveIntensity={immuneHemolymph * 0.6} />
      </Sphere>
      {/* wings */}
      <Box ref={rightWing} args={[0.05, 0.3, 0.05]} position={[0.15, 0, 0]}>
        <meshStandardMaterial color={wingColor} />
      </Box>
      <Box ref={leftWing} args={[0.05, 0.3, 0.05]} position={[-0.15, 0, 0]}>
        <meshStandardMaterial color={wingColor} />
      </Box>
      {/* dorsal vessel (heart) for microgravity remodeling */}
      <Sphere ref={heart} args={[0.06, 16, 16]} position={[0, 0.05, 0.02]}>
        <meshStandardMaterial color="#fde68a" transparent opacity={0.6 * stressorWeightMicro} />
      </Sphere>
    </group>
  )
}

function PlantModel({ time, highlightStrength, stressorWeightMicro, stressorWeightImmune }) {
  const leaf1 = useRef();
  const leaf2 = useRef();
  const swayAmplitude = 0.1;
  useFrame(() => {
    const sway = swayAmplitude * Math.sin(time.current * 0.8);
    if (leaf1.current) leaf1.current.rotation.z = sway;
    if (leaf2.current) leaf2.current.rotation.z = -sway * 0.8;
  });

  const immuneSpots = stressorWeightImmune; // discoloration spots when immune

  return (
    <group>
      {/* stem */}
      <Cylinder args={[0.05, 0.05, 0.6, 8]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#16a34a" />
      </Cylinder>
      {/* leaves */}
      <Sphere ref={leaf1} args={[0.2, 16, 16]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#22c55e" emissive={immuneSpots > 0 ? "#14532d" : "#22c55e"} emissiveIntensity={immuneSpots * 0.6} />
      </Sphere>
      <Sphere ref={leaf2} args={[0.15, 16, 16]} position={[0.15, 0.3, 0]}>
        <meshStandardMaterial color="#4ade80" />
      </Sphere>
      {/* tangled roots for microgravity */}
      <group position={[0, -0.35, 0]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Cylinder key={i} args={[0.01, 0.01, 0.5 + 0.1 * i, 6]} rotation={[Math.PI / 2, 0, 0]} position={[Math.sin(i) * 0.1, -0.1 - i * 0.03, Math.cos(i) * 0.1]}>
            <meshStandardMaterial color="#065f46" transparent opacity={0.2 + 0.6 * stressorWeightMicro} />
          </Cylinder>
        ))}
      </group>
    </group>
  )
}

function WormModel({ time, highlightStrength, stressorWeightMicro, stressorWeightImmune }) {
  const bodyRef = useRef();
  const neurons = useMemo(() => Array.from({ length: 6 }).map((_, i) => ({
    position: [Math.sin(i) * 0.1, -0.3 + i * 0.1, 0],
  })), []);

  useFrame(() => {
    if (bodyRef.current) {
      const wave = 0.25 * Math.sin(time.current * 2.5);
      bodyRef.current.rotation.z = Math.PI / 4 + wave;
    }
  });

  const neuronFlicker = stressorWeightMicro; // more flicker under microgravity
  const intestineGlow = stressorWeightImmune; // glow under immune

  return (
    <group>
      <Cylinder ref={bodyRef} args={[0.05, 0.05, 0.8, 8]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#06b6d4" />
      </Cylinder>
      {/* neurons */}
      {neurons.map((n, i) => (
        <Sphere key={i} args={[0.03, 12, 12]} position={n.position}>
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.1 + 0.9 * neuronFlicker * Math.max(0, Math.sin(time.current * (3 + i)))} transparent opacity={0.6} />
        </Sphere>
      ))}
      {/* intestine path */}
      <Cylinder args={[0.015, 0.015, 0.75, 8]} rotation={[0, 0, Math.PI / 4]} position={[0, 0, 0.01]}>
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.0 + 1.0 * intestineGlow} transparent opacity={0.2 + 0.5 * intestineGlow} />
      </Cylinder>
    </group>
  )
}

export default function OrganismComparator() {
  const [selectedOrganisms, setSelectedOrganisms] = useState(["mouse"]);
  const [stressor, setStressor] = useState("microgravity");
  const [hoveredOrganism, setHoveredOrganism] = useState(null);
  const time = useRef(0);
  const effectBurstStart = useRef(0);
  const [burstToken, setBurstToken] = useState(0); // increments to rerender on trigger
  const [showEffectBox, setShowEffectBox] = useState(false);

  // smooth stressor transition
  const [transitionProgress, setTransitionProgress] = useState(1); // 0..1

  useEffect(() => {
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const delta = (now - last) / 1000;
      last = now;
      time.current += delta;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // kick off transition when stressor changes
    setTransitionProgress(0);
    let raf;
    const start = performance.now();
    const duration = 1000; // 1s
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setTransitionProgress(t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stressor]);

  const toggleOrganism = (id) => {
    setSelectedOrganisms((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const triggerEffectBurst = () => {
    effectBurstStart.current = time.current;
    setBurstToken((t) => t + 1);
    setShowEffectBox((v) => !v); // toggle visibility until next click
  };

  const EffectHangingBox = ({ text, baseColor, timeRef, verticalOffset = 0 }) => {
    const now = timeRef.current;
    const bob = 0.12 * Math.sin(now * 2.0);
    const swing = 0.06 * Math.sin(now * 1.6);
    const pulse = 1 + 0.03 * Math.sin(now * 3.2);
    const width = 2.1;
    const height = 0.7;
    return (
      <group position={[0, 1.2 + verticalOffset + bob, 0]} rotation={[0, 0, swing]} scale={[pulse, pulse, pulse]}>
        {/* string */}
        <Cylinder args={[0.005, 0.005, 0.3, 6]} position={[0, height / 2 + 0.25, 0]}>
          <meshStandardMaterial color="#94a3b8" />
        </Cylinder>
        {/* box */}
        <mesh>
          <boxGeometry args={[width, height, 0.05]} />
          <meshStandardMaterial color="#0b1220" transparent opacity={0.85} />
        </mesh>
        {/* soft glow/backdrop tint */}
        <mesh>
          <boxGeometry args={[width + 0.12, height + 0.12, 0.02]} />
          <meshStandardMaterial color={baseColor} transparent opacity={0.18} emissive={baseColor} emissiveIntensity={0.15} />
        </mesh>
        {/* border overlay */}
        <mesh>
          <boxGeometry args={[width + 0.02, height + 0.02, 0.01]} />
          <meshStandardMaterial color={baseColor} transparent opacity={0.35} />
        </mesh>
        {/* text */}
        <Text position={[0, 0, 0.04]} fontSize={0.22} color={baseColor} maxWidth={2.1} lineHeight={1.2} anchorX="center" anchorY="middle">
          {text}
        </Text>
      </group>
    );
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 to-background py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center bg-[#0d1117] text-white rounded-2xl shadow-lg p-6 gap-8">
      {/* LEFT: 3D Model Viewer */}
      <div className="w-full md:w-1/2 h-[500px] bg-black rounded-xl cursor-pointer">
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }} shadows>
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

            {/* 3D Models */}
            {organisms.map((org) => {
              if (!selectedOrganisms.includes(org.id)) return null;

              // selection/hover effects
              const isHovered = hoveredOrganism === org.id;
              const isSelected = selectedOrganisms.includes(org.id);
              const scale = 1 * (isSelected ? 1.12 : 1) * (isHovered ? 1.04 : 1);
              const forwardZ = (isSelected ? 0.5 : 0) + (isHovered ? 0.1 : 0);
              const position = [org.position[0], org.position[1], org.position[2] + forwardZ];

              // stressor blending
              const toImmune = stressor === "immune" ? transitionProgress : 1 - transitionProgress;
              const toMicro = 1 - toImmune;

              return (
                <group
                  key={org.id}
                  position={position}
                  scale={[scale, scale, scale]}
                  onPointerOver={(e) => { e.stopPropagation(); setHoveredOrganism(org.id); }}
                  onPointerOut={(e) => { e.stopPropagation(); setHoveredOrganism((prev) => prev === org.id ? null : prev); }}
                >
                  {org.id === "mouse" && (
                    <MouseModel time={time} highlightStrength={isHovered ? 1 : 0} stressorWeightMicro={toMicro} stressorWeightImmune={toImmune} />
                  )}
                  {org.id === "fly" && (
                    <FlyModel time={time} highlightStrength={isHovered ? 1 : 0} stressorWeightMicro={toMicro} stressorWeightImmune={toImmune} />
                  )}
                  {org.id === "plant" && (
                    <PlantModel time={time} highlightStrength={isHovered ? 1 : 0} stressorWeightMicro={toMicro} stressorWeightImmune={toImmune} />
                  )}
                  {org.id === "worm" && (
                    <WormModel time={time} highlightStrength={isHovered ? 1 : 0} stressorWeightMicro={toMicro} stressorWeightImmune={toImmune} />
                  )}

                  {/* Nameplate */}
                  <Text position={[0, -0.8, 0]} fontSize={0.3} color={isHovered ? "#ffffff" : org.color}>
                    {org.name}
                  </Text>

                  {/* Effect indicator with transition */}
                  {!showEffectBox && (
                    <Sphere args={[0.1, 16, 16]} position={[0, 1, 0]}>
                      <meshStandardMaterial
                        color={stressor === "microgravity" ? "#ef4444" : "#3b82f6"}
                        emissive={stressor === "microgravity" ? "#ef4444" : "#3b82f6"}
                        emissiveIntensity={0.2 + 0.8 * (stressor === "microgravity" ? toMicro : toImmune)}
                      />
                    </Sphere>
                  )}

                  {/* Effect hanging box */}
                  {showEffectBox && (
                    <EffectHangingBox
                      text={(stressor === "microgravity" ? org.microgravityEffects.effect : org.immuneEffects.effect)}
                      baseColor={org.color}
                      timeRef={time}
                      verticalOffset={(org.id === "mouse" || org.id === "plant") ? 0.35 : -0.15}
                    />
                  )}

                  {/* subtle outline glow when hovered/selected */}
                  {(isHovered || isSelected) && (
                    <Sphere args={[0.52, 16, 16]} position={[0, 0.2, 0]}>
                      <meshStandardMaterial color={org.color} transparent opacity={0.12} emissive={org.color} emissiveIntensity={0.6} />
                    </Sphere>
                  )}
                </group>
              );
            })}

            {/* Platform */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
              <planeGeometry args={[12, 6]} />
              <meshStandardMaterial color="#0f172a" transparent opacity={0.5} />
            </mesh>

            <Preload all />
          </Suspense>

          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* RIGHT: Organism Details and Controls */}
      <div className="w-full md:w-1/2 bg-white rounded-xl p-6 min-h-[500px]">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Organism Comparator</h2>
        <p className="text-blue-900 text-lg mb-6">
          Compare spaceflight responses across model organisms
        </p>

        {/* Organism Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-600 mb-3">Select Organisms</h3>
          <div className="grid grid-cols-2 gap-2">
            {organisms.map((org) => (
              <div key={org.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedOrganisms.includes(org.id)}
                  onChange={() => toggleOrganism(org.id)}
                  className="w-4 h-4 accent-blue-500"
                />
                <span className="text-sm text-black">{org.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stressor Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-600 mb-3">Stressor Type</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setStressor("microgravity")}
              className={`px-4 py-2 rounded text-sm font-medium ${
                stressor === "microgravity"
                  ? "bg-blue-600 text-white"
                  : "border bg-black border-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              Microgravity
            </button>
            <button
              onClick={() => setStressor("immune")}
              className={`px-4 py-2 rounded text-sm font-medium ${
                stressor === "immune"
                  ? "bg-blue-600 text-white"
                  : "border bg-black border-gray-600  text-white hover:bg-gray-700"
              }`}
            >
              Immune System
            </button>
            <button
              onClick={triggerEffectBurst}
              className="px-4 py-2 rounded text-sm font-semibold bg-green-600 text-white hover:bg-green-700"
            >
              Trigger Effect Burst
            </button>
          </div>
        </div>

        {/* Effect Details */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-blue-600">Effects</h3>
          {selectedOrganisms.length > 0 ? (
            selectedOrganisms.map((orgId) => {
              const org = organisms.find((o) => o.id === orgId);
              if (!org) return null;
              const effect = stressor === "microgravity" ? org.microgravityEffects : org.immuneEffects;

              return (
                <div
                  key={orgId}
                  className={`p-3 bg-gray-700 rounded-lg transition-all duration-300 ${
                    hoveredOrganism === orgId
                      ? "border-2 border-blue-400 scale-[1.01]"
                      : "border border-gray-700 scale-100"
                  }`}
                  onMouseEnter={() => setHoveredOrganism(orgId)}
                  onMouseLeave={() => setHoveredOrganism((prev) => (prev === orgId ? null : prev))}
                >
                  <h4 className="font-semibold text-gray-100">{org.name}</h4>
                  <p className="text-sm text-gray-300 mt-1">{effect.effect}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Experiments: {effect.experiments.join(", ")}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col justify-center items-center h-32 text-center">
              <p className="text-gray-400 text-lg">
                👆 Select organisms to view their effects here.
              </p>
            </div>
          )}
<div className="mt-6 space-y-4 border-t border-border pt-6">
  <div>
    <h4 className="mb-2 font-semibold text-blue-900">Impacts of Spaceflight on Different Organisms</h4>

    {/* Scrollable container */}
    <div className="max-h-64 overflow-y-scroll pr-2 space-y-6 text-sm text-blue-900">

      {/* Accelerated Aging */}
      <div>
        <h5 className="font-semibold text-blue-700">A Theory of Accelerated Aging and Pathological Remodeling</h5>
        <p className="text-xs leading-relaxed mt-1">
          Spaceflight is interpreted by the human body as chronic, multi-system injury leading to accelerated aging. 
          This is an active, pathological remodeling process in the absence of gravity and familiar environmental cues.
        </p>
        <p className="text-xs leading-relaxed mt-2">
          <strong>Musculoskeletal Decline Mirrors Disease:</strong> Rapid bone and muscle loss in microgravity parallels 
          osteoporosis and sarcopenia on Earth. Osteoblasts are inhibited, osteoclasts are activated, and osteocytic 
          osteolysis occurs. Vertebral bone loss weakens spine bending strength, contributing to a quadrupled risk of 
          disc herniation. Muscle gene expression is mined for drug targets, with sex-dependent differences observed.
        </p>
        <p className="text-xs leading-relaxed mt-2">
          <strong>Cardiovascular & Neurological Stress:</strong> The heart shows oxidative stress and cell cycle gene changes; 
          cerebral arteries show reduced stiffness, increasing intracranial pressure and vision risk. Peripheral arteries 
          lose constriction ability, causing orthostatic intolerance—mimicking age-related vascular dysfunction.
        </p>
        <p className="text-xs leading-relaxed mt-2">
          <strong>Cellular Senescence & Frailty:</strong> Molecular changes indicate a "frailty-like" condition. 
          Epigenetic clocks are tissue-specific, e.g., the mouse retina shows decelerated aging, highlighting non-uniform 
          space aging processes.
        </p>
      </div>

      {/* Immune System */}
      <div>
        <h5 className="font-semibold text-blue-700">The Theory of the Dysregulated Immune Response</h5>
        <p className="text-xs leading-relaxed mt-1">
          Spaceflight induces simultaneous immune impairment and chronic inflammation, increasing susceptibility to infections 
          and autoimmune-like damage.
        </p>
        <p className="text-xs leading-relaxed mt-2">
          <strong>Specific Immune Deficits:</strong> T-cell activation and immune tolerance are impaired. NK cell cytotoxicity 
          is reduced, raising cancer risk.
        </p>
        <p className="text-xs leading-relaxed mt-2">
          <strong>Viral Reactivation:</strong> Latent herpesviruses (EBV, CMV) reactivate in astronauts. Space-relevant 
          radiation triggers reactivation directly in latently infected cells.
        </p>
        <p className="text-xs leading-relaxed mt-2">
          <strong>Biomarker of Stress:</strong> Neutrophil-to-Lymphocyte Ratio (NLR) is consistently elevated, serving as a 
          marker for systemic inflammation and immune stress.
        </p>
      </div>

      {/* Host-Microbe Ecosystem */}
      <div>
        <h5 className="font-semibold text-blue-700">The Theory of the Altered Host-Microbe Ecosystem</h5>
        <p className="text-xs leading-relaxed mt-1">
          The spacecraft environment alters human-microbe interactions, increasing pathogenic risk and disrupting beneficial 
          host-gut microbiome symbiosis.
        </p>
        <p className="text-xs leading-relaxed mt-2">
          <strong>Increased Microbial Virulence:</strong> Pathogens like <em>Pseudomonas aeruginosa</em> and 
          <em>Serratia marcescens</em> become more virulent post-spaceflight. Biofilm formation and horizontal gene transfer 
          of antibiotic resistance are enhanced, raising multi-drug resistance risks.
        </p>
        <p className="text-xs leading-relaxed mt-2">
          <strong>Gut-Liver Axis Disruption:</strong> Beneficial gut bacteria decrease, altering bile acid metabolism and butyrate 
          production. These microbial changes correlate with host gene expression in colon and liver, contributing to 
          metabolic and immune dysfunction.
        </p>
      </div>

      {/* Plant Response */}
      <div>
        <h5 className="font-semibold text-blue-700">The Theory of a "Confused" Plant Response</h5>
        <p className="text-xs leading-relaxed mt-1">
          Plants in space show complex, sometimes counterproductive molecular responses. Adaptation may require genetic 
          manipulation to optimize growth.
        </p>
        <p className="text-xs leading-relaxed mt-2">
          <strong>Non-Adaptive Gene Expression:</strong> Removing key photosensory gene (phyD) reduces transcriptional stress 
          responses without harming survival, showing plants waste energy on unnecessary responses.
        </p>
        <p className="text-xs leading-relaxed mt-2">
          <strong>Organ-Specific Remodeling:</strong> Roots and leaves show largely separate proteomic and transcriptomic changes, 
          especially in genes related to cell wall remodeling and stress responses.
        </p>
        <p className="text-xs leading-relaxed mt-2">
          <strong>Rewriting Gravitropism:</strong> ISS imaging shows root auxin gradients form independently of gravity. Microgravity 
          unmasks positive phototropism to blue light, normally masked by Earth's gravity.
        </p>
      </div>

    </div>
  </div>
</div>

        </div>

        </div>
        
      </div>
      
      </div>
    </section>
  );
}
