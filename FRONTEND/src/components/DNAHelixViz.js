"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
function Button({
  children,
  onClick,
  disabled,
  className = "",
  variant = "default",
}) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

// ✅ Inline Card component
function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-[#11182c] ${className}`}
    >
      {children}
    </div>
  );
}

function DNAHelix({ onSegmentClick, radiationActive }) {
  const dnaGroupRef = useRef(null);
  const basePairRefs = useRef([]);
  const numPairs = 50;
  const helixRadius = 1;
  const verticalSpacing = 0.4;
  const twistPerPair = Math.PI / 8;

  const [damageStates, setDamageStates] = useState(
    Array.from({ length: numPairs }, (_, i) => ({
      damaged: false,
      crackProgress: 0,
      originalColor: [0xff8888, 0x88ff88, 0x8888ff, 0xffff88][i % 4],
    }))
  );

  useFrame((state) => {
    if (dnaGroupRef.current) {
      dnaGroupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }

    if (radiationActive && Math.random() < 0.05) {
      const randomIndex = Math.floor(Math.random() * numPairs);
      setDamageStates((prev) => {
        const newStates = [...prev];
        if (!newStates[randomIndex].damaged) {
          newStates[randomIndex] = {
            ...newStates[randomIndex],
            damaged: true,
            crackProgress: 0,
          };
        }
        return newStates;
      });
    }

    basePairRefs.current.forEach((mesh, i) => {
      if (mesh && damageStates[i].damaged) {
        const progress = damageStates[i].crackProgress;

        const crackScale = 1 - progress * 0.5;
        mesh.scale.set(crackScale, 1, crackScale);

        mesh.rotation.z =
          Math.sin(state.clock.elapsedTime * 10) * progress * 0.3;

        const material = mesh.material;
        material.color.setHex(
          THREE.MathUtils.lerp(
            damageStates[i].originalColor,
            0xff0000,
            progress
          )
        );
        material.emissiveIntensity = 0.2 + progress * 0.8;

        if (progress < 1) {
          setDamageStates((prev) => {
            const newStates = [...prev];
            newStates[i] = {
              ...newStates[i],
              crackProgress: Math.min(progress + 0.02, 1),
            };
            return newStates;
          });
        }
      }
    });
  });

  const { curve1, curve2 } = useMemo(() => {
    const points1 = [];
    const points2 = [];

    for (let i = 0; i < numPairs; i++) {
      const angle = i * twistPerPair;
      points1.push(
        new THREE.Vector3(
          Math.cos(angle) * helixRadius,
          i * verticalSpacing,
          Math.sin(angle) * helixRadius
        )
      );
      points2.push(
        new THREE.Vector3(
          Math.cos(angle + Math.PI) * helixRadius,
          i * verticalSpacing,
          Math.sin(angle + Math.PI) * helixRadius
        )
      );
    }

    return {
      curve1: new THREE.CatmullRomCurve3(points1),
      curve2: new THREE.CatmullRomCurve3(points2),
    };
  }, []);

  const colors = [0xff8888, 0x88ff88, 0x8888ff, 0xffff88];

  return (
    <group
      ref={dnaGroupRef}
      position={[0, -(numPairs * verticalSpacing) / 2, 0]}
    >
      <mesh>
        <tubeGeometry args={[curve1, 100, 0.1, 8]} />
        <meshStandardMaterial
          color="#5555ff"
          emissive="#5555ff"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve2, 100, 0.1, 8]} />
        <meshStandardMaterial
          color="#5555ff"
          emissive="#5555ff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {Array.from({ length: numPairs }).map((_, i) => {
        const angle = i * twistPerPair;
        const y = i * verticalSpacing;

        return (
          <group key={i}>
            <mesh
              ref={(el) => (basePairRefs.current[i] = el)}
              position={[0, y, 0]}
              rotation={[0, angle, Math.PI / 2]}
              onClick={() => onSegmentClick(i)}
              userData={{ segmentIndex: i }}
            >
              <cylinderGeometry args={[0.05, 0.05, helixRadius * 2, 8]} />
              <meshStandardMaterial
                color={colors[i % 4]}
                emissive={colors[i % 4]}
                emissiveIntensity={0.2}
              />
            </mesh>

            {damageStates[i].damaged && damageStates[i].crackProgress > 0.3 && (
              <CrackParticles
                position={[0, y, 0]}
                intensity={damageStates[i].crackProgress}
              />
            )}
          </group>
        );
      })}
    </group>
  );
}

function CrackParticles({ position, intensity }) {
  const particlesRef = useRef(null);
  const particleCount = 20;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.2;

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i * 3];
        pos[i * 3 + 1] += velocities[i * 3 + 1];
        pos[i * 3 + 2] += velocities[i * 3 + 2];
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff4400"
        size={0.08}
        sizeAttenuation
        opacity={intensity}
        transparent
      />
    </points>
  );
}

function RadiationParticles({ active }) {
  const particlesRef = useRef(null);
  const particleCount = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (particlesRef.current && active) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += 0.05;
        if (positions[i * 3] > 15) positions[i * 3] = -15;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!active) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffaa00" size={0.15} sizeAttenuation />
    </points>
  );
}

export default function DNAHelixViz() {
  const [radiationActive, setRadiationActive] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [infoType, setInfoType] = useState(null);

  const handleSegmentClick = (index) => {
    setSelectedSegment(index);
    setInfoType("gene");
  };

  const triggerRadiation = () => {
    setRadiationActive(true);
    setInfoType("radiation");
    setTimeout(() => setRadiationActive(false), 3000);
  };

  const researchInfo = {
    radiation: {
      title: "DNA Damage & Radiation",
      content:
        "Space radiation, a significant hazard beyond Earth's magnetosphere, includes galactic cosmic rays (GCR) and solar particle events (SPEs) composed of protons and heavy ions like iron (56Fe). This ionizing radiation is a known risk factor that can cause various forms of DNA damage, including double-strand breaks and chromosomal aberrations. Research shows these effects can be long-lasting, contributing to cardiovascular issues, central nervous system damage, and skeletal deterioration. Studies indicate that different types of radiation have distinct biological impacts, with high-energy heavy ions (HZE) often being more damaging than protons or gamma rays. Furthermore, the combination of radiation and microgravity may have a synergistic effect, increasing cellular damage more than either stressor alone.",
      studies: [
        7, 10, 21, 23, 24, 28, 31, 61, 78, 79, 186, 187, 204, 280, 283, 285,
        287, 289, 328, 334, 440, 562, 563, 567, 568, 569, 586, 597,
      ],
    },
    gene: {
      title: "Gene Expression Changes",
      content:
        "Spaceflight and simulated microgravity trigger widespread changes in gene expression across various organisms and tissues, including bone, heart, liver, and muscle. A common theme in this transcriptional reprogramming is the response to cellular stress. For example, the gene CDKN1a (also known as p21), a key inhibitor of the cell cycle, is frequently upregulated. Studies have shown its increased expression in bone tissue, where it may halt the regeneration of bone-forming osteoblasts, and in cardiac tissue, where its upregulation is linked to oxidative stress and cellular senescence.",
      studies: [
        2, 5, 6, 27, 81, 101, 106, 109, 143, 144, 147, 150, 153, 207, 262, 263,
        267, 282, 287, 288, 290, 309, 311, 340, 379, 381, 383, 385, 389, 400,
        401, 413, 567, 570, 571, 590, 592,
      ],
    },
  };

  return (
    <section className="w-full bg-[#11182c] max-h-[50rem] rounded-xl p-6 overflow-y-auto">
      <div className="container mx-auto px-4">
        <div className="mb-5 text-center">
          <h2 className=" text-blue-600 mb-4 font-[family-name:var(--font-montserrat)] text-2xl font-black text-foreground md:text-4xl">
            DNA Helix of Stress & Adaptation
          </h2>
          <p className=" text-blue-900 mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore how spaceflight stressors affect genetic code at the
            molecular level
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="h-[700px] max-h-[800px] w-full  overflow-hidden rounded-lg bg-slate-950 shadow-2xl">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 12]} />
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={1} />
                <pointLight position={[-5, -5, -5]} intensity={0.5} />
                <DNAHelix
                  onSegmentClick={handleSegmentClick}
                  radiationActive={radiationActive}
                />
                <RadiationParticles active={radiationActive} />
                <OrbitControls
                  enableZoom={true}
                  minDistance={8}
                  maxDistance={20}
                />
              </Canvas>
            </div>
          </div>

          <div className="w-full bg-[#11182c] rounded-xl p-6 overflow-y-auto">
            <Card className="p-6">
              <h3 className="mb-4 font-[family-name:var(--font-montserrat)] text-2xl font-black text-white">
                Stress Simulations
              </h3>
              <p className="mb-6 text-sm text-blue-900">
                Click DNA segments or trigger radiation events to explore
                spaceflight stressors affect genetic code at the molecular level
              </p>

              <div className="space-y-4">
                <Button
                  onClick={triggerRadiation}
                  variant="default"
                  className="w-full"
                  disabled={radiationActive}
                >
                  Trigger Radiation Event
                </Button>
              </div>

              {infoType && (
                <div className="mt-6 space-y-4 border-t border-border pt-6">
                  <div>
                    <h4 className="mb-2 font-semibold text-pink-400">
                      {researchInfo[infoType].title}
                    </h4>
                    <p className="mb-3 text-sm text-gray-300">
                      {researchInfo[infoType].content}
                    </p>

                    <div className="text-xs text-blue-900">
                      Related Studies:{" "}
                      {researchInfo[infoType].studies.slice(0, 5).join(", ")}...
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-4 border-t border-border pt-6">
                <div>
                  <h4 className="mb-2 font-semibold text-blue-600">
                    impacts on DNA According To Researches
                  </h4>

                  {/* Scrollable container */}
                  <div className="max-h-64 overflow-y-scroll pr-2 space-y-6 text-sm text-blue-900">
                    {/* DNA Damage & Radiation */}
                    <div>
                      <h5 className="font-semibold text-cyan-400">
                        DNA Damage & Radiation
                      </h5>
                      <p className="text-xs text-gray-200 leading-relaxed">
                        Exposure to the space radiation environment, which
                        includes galactic cosmic rays and solar particle events,
                        poses a significant threat to the integrity of
                        astronauts' DNA. This constant bombardment of
                        high-energy particles can lead to a variety of DNA
                        lesions, most notably double-strand breaks, which are
                        particularly difficult for cells to repair accurately.
                      </p>
                      <p className="text-xs text-gray-200 leading-relaxed">
                        The cumulative impact of this DNA damage is a primary
                        concern for long-term space travel, as it is directly
                        linked to an increased lifetime risk of developing
                        cancer. Beyond cancer, radiation-induced cellular damage
                        can accelerate the aging process and contribute to
                        degenerative diseases affecting the cardiovascular and
                        central nervous systems. Seminal research, including the
                        NASA Twins Study, has provided unprecedented insights
                        into these genomic changes, observing alterations in
                        chromosome structure and DNA repair mechanisms.
                        Understanding this damage is paramount for developing
                        shielding and biomedical countermeasures to protect
                        future space explorers.
                      </p>
                    </div>

                    {/* Gene Expression */}
                    <div>
                      <h5 className="font-semibold text-blue-700">
                        Gene Expression
                      </h5>
                      <p className="text-xs leading-relaxed">
                        The absence of Earth's gravity triggers a cascade of
                        changes in gene expression, affecting a vast array of
                        cellular functions. Studies on astronauts and model
                        organisms show that microgravity causes widespread
                        reprogramming of the transcriptome, altering thousands
                        of genes and impacting critical biological processes.
                      </p>
                      <p className="text-xs leading-relaxed mt-2">
                        These changes are linked to muscle atrophy, bone density
                        loss, and immune dysregulation. Furthermore, circadian
                        rhythm—the normal 24-hour rhythmic expression of
                        genes—is often disrupted, leading to sleep disturbances
                        and metabolic issues. Research here is crucial for
                        identifying the most affected molecular pathways,
                        providing a roadmap for therapies to counteract the
                        negative health consequences of living in space.
                      </p>
                    </div>

                    {/* Epigenetics & RNA */}
                    <div>
                      <h5 className="font-semibold text-blue-700">
                        Epigenetics & RNA
                      </h5>
                      <p className="text-xs leading-relaxed">
                        The space environment leaves its mark on the epigenome,
                        the chemical modifications that regulate gene expression
                        without altering DNA sequence. These include DNA
                        methylation and histone changes, which can have
                        long-lasting and even heritable effects on cellular
                        function.
                      </p>
                      <p className="text-xs leading-relaxed mt-2">
                        Spaceflight has also been shown to alter the expression
                        of RNA molecules, such as microRNAs, that fine-tune gene
                        activity. These epigenetic and RNA modifications
                        contribute to changes in immune function, bone
                        metabolism, and other physiological systems during and
                        after missions. Research into the space epigenome is
                        rapidly growing, holding the potential to unlock
                        strategies for mitigating health risks through
                        personalized medicine.
                      </p>
                    </div>

                    {/* Mitochondrial Stress */}
                    <div>
                      <h5 className="font-semibold text-blue-700">
                        Mitochondrial Stress
                      </h5>
                      <p className="text-xs leading-relaxed">
                        Mitochondria—the powerhouses of our cells—are profoundly
                        affected by spaceflight. The lack of gravity leads to
                        mitochondrial dysfunction, characterized by reduced
                        energy production efficiency and increased reactive
                        oxygen species (ROS). This imbalance creates oxidative
                        stress, damaging DNA, proteins, and lipids.
                      </p>
                      <p className="text-xs leading-relaxed mt-2">
                        Mitochondrial stress acts as a central hub for many
                        negative health effects of space travel, including
                        cardiovascular deconditioning, immune dysfunction, and
                        accelerated aging. Understanding these mechanisms is key
                        to developing antioxidant therapies and other
                        countermeasures to protect astronauts on Moon, Mars, and
                        deep-space missions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
