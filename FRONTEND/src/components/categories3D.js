"use client";
import React, { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
// Fetch research paper data from backend instead of importing local JSON
const API_BASE_URL =
  (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_BASE_URL) ||
  "http://localhost:5000";

const categoryConfig = {
  "Animal Studies": { color: "#93c5fd", x: -20 },
  "Human & Human Cell Studies": { color: "#6ee7b7", x: -10 },
  "Cross-Cutting Themes & Technologies": { color: "#fde047", x: 0 },
  "Plant Studies": { color: "#fca5a5", x: 10 },
  "Microbial Studies": { color: "#c4b5fd", x: 20 },
  Default: { color: "#9ca3af", x: 0 },
};

function CanvasLoader() {
  return (
    <Html center>
      <span style={{ color: "white", fontSize: "1.2rem" }}>Loading...</span>
    </Html>
  );
}

function Star({ data, hovered, selected, onHover, onClick, isSelected, abstractMap }) {
  const meshRef = useRef();
  const time = useRef(Math.random() * 100);

  useFrame((_, delta) => {
    if (meshRef.current) {
      time.current += delta;
      const baseIntensity = hovered || selected ? 1.5 : 0.5;
      const twinkle = Math.sin(time.current * 2) * 0.25 + 0.25;
      meshRef.current.material.emissiveIntensity = baseIntensity + twinkle;
    }
  });

  const scale = hovered ? 1.5 : 1;
  const color = selected ? "#ffffff" : data.color;

  // Lookup abstract from fetched map
  const abstract = abstractMap?.[data.id] || "No abstract available.";

  return (
    <group
      position={data.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(data.id);
      }}
      onPointerOut={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        onClick(data.id); // Pass node id for selection
      }}
    >
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
      {/* Show info box only on hover if not selected */}
      {hovered && !isSelected && (
        <Html position={[0, 0.5, 0]} center>
          <div
            style={{
              background: "rgba(0, 10, 20, 0.8)",
              color: "white",
              padding: "12px 18px",
              borderRadius: "8px",
              border: `1px solid ${data.color}`,
              width: "400px",
              maxWidth: "90vw",
              fontSize: "15px",
              pointerEvents: "none",
              textAlign: "center",
              wordBreak: "break-word",
              whiteSpace: "pre-line",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            <div>
              <strong>Experiment No.:</strong> {data.id}
            </div>
            <div style={{ fontWeight: "bold", marginTop: "8px" }}>
              Abstract:
            </div>
            <div style={{ marginTop: "6px" }}>{abstract}</div>
          </div>
        </Html>
      )}
      {/* Show info box on click, scrollable and interactive */}
      {isSelected && (
        <Html position={[0, 0.5, 0]} center>
          <div
            style={{
              background: "rgba(0, 10, 20, 0.95)",
              color: "white",
              padding: "16px 22px",
              borderRadius: "10px",
              border: `2px solid ${data.color}`,
              width: "420px",
              maxWidth: "95vw",
              fontSize: "16px",
              pointerEvents: "auto", // allow interaction
              textAlign: "center",
              wordBreak: "break-word",
              whiteSpace: "pre-line",
              maxHeight: "350px",
              overflowY: "auto",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              WebkitOverflowScrolling: "touch", // enables smooth scrolling on mobile
            }}
            // Enable scrolling by mouse wheel over the box
            onWheel={(e) => {
              e.stopPropagation();
              const el = e.currentTarget;
              el.scrollTop += e.deltaY;
            }}
          >
            <div>
              <strong>Experiment No.:</strong> {data.id}
            </div>
            <div style={{ fontWeight: "bold", marginTop: "10px" }}>
              Abstract:
            </div>
            <div style={{ marginTop: "8px" }}>{abstract}</div>
            <button
              style={{
                marginTop: "16px",
                padding: "6px 18px",
                background: data.color,
                color: "#222",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onClick(null); // Deselect on close
              }}
            >
              Close
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}

function SpaceBackground() {
  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <ambientLight intensity={0.5} />
    </>
  );
}

function FloatingLabel({ text, position, color, opacity }) {
  const groupRef = useRef();

  // Floating animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.3; // gentle float
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Background plate */}
      <mesh>
        <planeGeometry args={[text.length * 0.7, 1.2]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2} // light background
        />
      </mesh>
      {/* Text */}
      <Text
        fontSize={1.2}
        color={color}
        anchorX="center"
        anchorY="middle"
        material-opacity={opacity}
      >
        {text}
      </Text>
    </group>
  );
}

export default function ConstellationOfProgressViz({ animateIntro = false, preSelectAll = false }) {
  const [rawPapers, setRawPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredStarId, setHoveredStarId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/research-papers`);
        const json = await res.json();
        if (!res.ok || json.success === false) {
          throw new Error(json.error || `Failed to load research papers`);
        }
        if (isMounted) {
          setRawPapers(Array.isArray(json.data) ? json.data : []);
        }
      } catch (e) {
        if (isMounted) setError(e.message || String(e));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const publicationsData = useMemo(
    () =>
      rawPapers.map((item, idx) => ({
        "Experiment No.": item["Experiment No."] || idx + 1,
        Title: item.Title || item.Summary?.slice(0, 60) || "Untitled",
        Link: item.Link || "",
        PMCId: item.PMCId || "",
        Category: item.Category || "Unknown",
        "Study Year": item["Study Year"] || 2020,
      })),
    [rawPapers]
  );

  const abstractMap = useMemo(() => {
    const map = {};
    rawPapers.forEach((item, idx) => {
      const id = item["Experiment No."] || idx + 1;
      map[id] = item.Abstract || "";
    });
    return map;
  }, [rawPapers]);

  const allCategories = useMemo(() => {
    return [...new Set(publicationsData.map((p) => p.Category))];
  }, [publicationsData]);
  const [visibleCategories, setVisibleCategories] = useState(
    () => preSelectAll ? new Set(allCategories) : new Set(allCategories)
  );

  const yearRange = useMemo(() => {
    const years = publicationsData.map((p) => p["Study Year"]).filter(Boolean);
    if (!years.length) return { min: 2000, max: 2000 };
    return { min: Math.min(...years), max: Math.max(...years) };
  }, [publicationsData]);
  const [filterYearRange, setFilterYearRange] = useState([
    yearRange.min,
    yearRange.max,
  ]);

  useEffect(() => {
    // Sync filter range when yearRange updates (e.g., after data load)
    setFilterYearRange([yearRange.min, yearRange.max]);
  }, [yearRange.min, yearRange.max]);

  // Update visible categories when data loads and preSelectAll is true
  useEffect(() => {
    if (preSelectAll && allCategories.length > 0) {
      setVisibleCategories(new Set(allCategories));
    }
  }, [allCategories, preSelectAll]);

  const toggleCategory = (category) => {
    setVisibleCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Animation state for intro transition
  const [introProgress, setIntroProgress] = useState(0);

  useEffect(() => {
    if (!animateIntro) return;
    let start = null;
    let frameId;
    function animate(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / 15000, 1); // 15 seconds
      setIntroProgress(progress);
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    }
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [animateIntro]);

  // Modify processedData to animate node positions
  const processedData = useMemo(() => {
    const minYear = yearRange.min;
    const maxYear = yearRange.max;
    const zDepth = 40;

    return publicationsData.map((pub, idx) => {
      const config = categoryConfig[pub.Category] || categoryConfig.Default;
      const year = pub["Study Year"];
      const targetZ =
        -((year - minYear) / (maxYear - minYear)) * zDepth + zDepth / 2;
      const targetX = config.x + (Math.random() - 0.5) * 5;
      const targetY = (Math.random() - 0.5) * 15;

      // Initial random positions for intro
      let x = targetX,
        y = targetY,
        z = targetZ;
      if (animateIntro && introProgress < 1) {
        // Start at random positions, move to target
        const randX = (Math.random() - 0.5) * 40;
        const randY = (Math.random() - 0.5) * 40;
        const randZ = (Math.random() - 0.5) * 40;
        x = randX + (targetX - randX) * introProgress;
        y = randY + (targetY - randY) * introProgress;
        z = randZ + (targetZ - randZ) * introProgress;
      }
      return {
        id: pub["Experiment No."],
        title: pub.Title,
        category: pub.Category,
        year: pub["Study Year"],
        position: new THREE.Vector3(x, y, z),
        color: config.color,
      };
    });
  }, [yearRange.min, yearRange.max, introProgress, animateIntro]);

  const filteredData = useMemo(() => {
    return processedData.filter(
      (d) =>
        visibleCategories.has(d.category) &&
        d.year >= filterYearRange[0] &&
        d.year <= filterYearRange[1]
    );
  }, [processedData, visibleCategories, filterYearRange]);

  const constellations = useMemo(() => {
    const groups = {};
    filteredData.forEach((star) => {
      if (!groups[star.category]) {
        groups[star.category] = {
          points: [],
          color: star.color,
        };
      }
      groups[star.category].points.push(star.position);
    });
    return Object.values(groups);
  }, [filteredData]);

  const handleCanvasClick = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
        color: "white",
      }}
    >
      {isLoading && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
          <div style={{ background: "rgba(0,0,0,0.6)", padding: "12px 16px", borderRadius: 8 }}>Loading research papers...</div>
        </div>
      )}
      {error && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
          <div style={{ background: "rgba(120,0,0,0.8)", padding: "12px 16px", borderRadius: 8 }}>Failed to load data: {error}</div>
        </div>
      )}
      {/* Only the rotating stars background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
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

      {/* Overlay your UI and 3D visualization */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            padding: "20px 40px",
            zIndex: 10,
            textAlign: "center",
            color: "#ffffff", //color: "#1e88e5",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "2rem" }}>
            Constellation of Researches
          </h1>
          <p style={{ margin: "4px 0 0", color: "#od47a1" }}>
            An interactive visualization of NASA's scientific Researches in
            space life sciences As per Years and Category wise.
          </p>
        </header>

        <div style={{ flex: 1, display: "flex", position: "relative" }}>
          {/* --- CONTROLS PANEL --- */}
          <div
            style={{
              width: "300px",
              minWidth: "260px",
              padding: "18px 16px",
              background: "rgba(11, 18, 32, 0.65)",
              backdropFilter: "blur(10px)",
              borderRight: "1px solid #1f2a44",
              overflowY: "auto",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flexGrow: 1}}>
              <h3
                style={{
                  marginTop: 0,
                  borderBottom: "1px solid #1f2a44",
                  paddingBottom: "10px",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  fontSize: "12px",
                  color: "#9fb3c8",
                }}
              >
                Filters
              </h3>

              {/* Year Filter */}
              <div style={{ marginBottom: "24px", marginTop:"15px"}}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontWeight: 700,
                    color: "#e6eef7",
                    fontSize: "14px",
                  }}
                >
                  Study Year
                </label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    color: "#a9bdd4",
                    fontSize: "12px",
                  }}
                >
                  <span>{filterYearRange[0]}</span>
                  <span>{filterYearRange[1]}</span>
                </div>
                <input
                  type="range"
                  min={yearRange.min}
                  max={yearRange.max}
                  value={filterYearRange[0]}
                  onChange={(e) =>
                    setFilterYearRange([
                      parseInt(e.target.value),
                      filterYearRange[1],
                    ])
                  }
                  style={{
                    width: "100%",
                    accentColor: "#22d3ee",
                    cursor: "pointer",
                  }}
                />
                <input
                  type="range"
                  min={yearRange.min}
                  max={yearRange.max}
                  value={filterYearRange[1]}
                  onChange={(e) =>
                    setFilterYearRange([
                      filterYearRange[0],
                      parseInt(e.target.value),
                    ])
                  }
                  style={{
                    width: "100%",
                    accentColor: "#a78bfa",
                    cursor: "pointer",
                  }}
                />
                <p>The difference between the two Sliders is the year range which will be displayed in the 3D visualization.</p>
              </div>

              {/* Category Filter */}
              <div>
                <h4 style={{ marginBottom: "10px", fontWeight: 700, color: "#e6eef7", fontSize: "14px" }}>
                  Categories
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {allCategories.map((cat) => {
                    const active = visibleCategories.has(cat);
                    const color = categoryConfig[cat]?.color || "#94a3b8";
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "9999px",
                          border: `1px solid ${active ? color : "#24324d"}`,
                          background: active ? "rgba(34, 211, 238, 0.08)" : "rgba(15, 23, 42, 0.6)",
                          color: "#dce7f3",
                          boxShadow: active ? `0 0 0 2px rgba(34, 211, 238, 0.12)` : "none",
                          cursor: "pointer",
                          transition: "all 150ms ease",
                        }}
                      >
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: color,
                            borderRadius: "50%",
                          }}
                        />
                        <span style={{ fontSize: "12px" }}>{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "16px",
                  borderTop: "1px solid #1f2a44",
                  fontSize: "12px",
                  color: "#a9bdd4",
                  lineHeight: "1.6",
                }}
              >
                <p style={{ marginTop: "6px" }}>Hover to preview abstracts.</p>
                <p style={{ marginTop: "6px" }}>Click a node to open details.</p>
                <p style={{ marginTop: "6px" }}>Drag to rotate. Scroll to zoom.</p>
              </div>
            </div>

            {/* Instructional Text Block */}
          </div>

          {/* --- 3D CANVAS --- */}
          <div
            style={{
              flex: 1,
              position: "relative",
              width: "100%",
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 30], fov: 60 }}
              onClick={handleCanvasClick}
              style={{ width: "100%", height: "100vh" }}
            >
              <Suspense fallback={<CanvasLoader />}>
                <ambientLight intensity={0.5} />
                <pointLight
                  position={[0, 0, 35]}
                  intensity={2}
                  color="#ffffff"
                />

                {/* Category Labels */}
                {Object.entries(categoryConfig).map(([name, config], index) => {
                  if (name === "Default") return null;
                  const isVisible = visibleCategories.has(name);
                  const isSelected = selectedCategory === name;

                  // Alternate Y offset: even indexes up, odd indexes down
                  const yOffset = index % 2 === 0 ? 1.5 : -1.5;

                  return (
                    <FloatingLabel
                      key={name}
                      text={name.replace(/ and /g, " & ")}
                      position={[config.x, -9 + yOffset, 0]}
                      color={config.color}
                      opacity={isSelected ? 1 : isVisible ? 0.7 : 0.1}
                    />
                  );
                })}

                {/* Render Stars */}
                {filteredData.map((starData) => (
                  <Star
                    key={starData.id}
                    data={starData}
                    hovered={hoveredStarId === starData.id}
                    selected={selectedCategory === starData.category}
                    onHover={setHoveredStarId}
                    onClick={setSelectedNodeId}
                    isSelected={selectedNodeId === starData.id}
                    abstractMap={abstractMap}
                  />
                ))}

                {/* Render Constellation Lines */}
                {constellations.map((constellation, i) => {
                  const isSelected =
                    selectedCategory ===
                    filteredData.find((d) => d.color === constellation.color)
                      ?.category;
                  return (
                    <line key={i}>
                      <bufferGeometry attach="geometry">
                        <bufferAttribute
                          attach="attributes-position"
                          array={
                            new Float32Array(
                              constellation.points.flatMap((p) => p.toArray())
                            )
                          }
                          count={constellation.points.length}
                          itemSize={3}
                        />
                      </bufferGeometry>
                      <lineBasicMaterial
                        attach="material"
                        color={constellation.color}
                        linewidth={1}
                        transparent
                        opacity={isSelected ? 0.8 : 0.2}
                      />
                    </line>
                  );
                })}
              </Suspense>
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                zoomSpeed={0.8}
                minDistance={5}
                maxDistance={80}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={(3 * Math.PI) / 4}
              />
            </Canvas>
            {/* Removed bottom selected-category bar to keep layout clean */}
          </div>
        </div>
      </div>
    </div>
  );
}

// NOTE: To make this file work in a React project, you'll need to install the following dependencies:
// npm install react react-dom three @react-three/fiber @react-three/drei
// If your JSON data is larger, it would be better to load it from an external file,
// but for a single-file component as requested, pasting it directly is the approach.
