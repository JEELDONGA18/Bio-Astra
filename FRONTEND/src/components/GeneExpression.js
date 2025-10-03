import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Box,
  Text,
  Preload,
  Html,
  useProgress,
} from "@react-three/drei";

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

// Reusable axis label with white background box and red text
function AxisLabel({
  text,
  position,
  rotation = [0, 0, 0],
  planeSize = [2.2, 0.6],
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={planeSize} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <Text fontSize={0.3} color="#ef4444" anchorX="center" anchorY="middle">
        {text}
      </Text>
    </group>
  );
}

// Sample gene data (updated)
const geneData = [
  { name: "CDKN1a/p21", tissue: "Bone", expression: 3.31, experiments: [2] },
  { name: "VEGFA", tissue: "Bone", expression: 15.0, experiments: [216] },
  { name: "Tnf", tissue: "Heart", expression: -1.5, experiments: [6] },
  {
    name: "Catalase",
    tissue: "Bone Marrow",
    expression: 1.5,
    experiments: [7],
  },
  { name: "Mcp1", tissue: "Bone Marrow", expression: 11.9, experiments: [187] },
  { name: "Tnf", tissue: "Bone Marrow", expression: 1.7, experiments: [187] },
  {
    name: "IFN-γ",
    tissue: "Immune Cells",
    expression: 5.0,
    experiments: [239],
  },
  {
    name: "IL-17",
    tissue: "Immune Cells",
    expression: 10.0,
    experiments: [239],
  },
  { name: "Nox1", tissue: "Heart", expression: 1.0, experiments: [6] },
  { name: "Myc", tissue: "Heart", expression: 2.0, experiments: [6] },
  { name: "MMP1", tissue: "Bone", expression: 12.94, experiments: [2] },
  { name: "MMP3", tissue: "Bone", expression: 2.98, experiments: [2] },
  { name: "MMP10", tissue: "Bone", expression: 16.85, experiments: [2] },
  { name: "Trp53", tissue: "Bone", expression: -1.54, experiments: [2] },
  { name: "Nfe2l2", tissue: "Heart", expression: -1.2, experiments: [6] },
  { name: "Ptgs2", tissue: "Heart", expression: -1.2, experiments: [6] },
  { name: "Gadd45", tissue: "Bone Marrow", expression: 1.5, experiments: [7] },
  { name: "Tet2", tissue: "Heart", expression: -2.0, experiments: [81] },
  { name: "Rankl", tissue: "Bone Marrow", expression: 4.1, experiments: [187] },
  { name: "BMP-2", tissue: "Bone", expression: 11.0, experiments: [216] },
  {
    name: "miR-21",
    tissue: "Immune Cells",
    expression: -2.0,
    experiments: [238],
  },
  { name: "Tet2", tissue: "Lung", expression: -2.0, experiments: [81] },
  { name: "Uck2", tissue: "Hemocytes", expression: -2.0, experiments: [89] },
  { name: "san", tissue: "Fat body", expression: -2.0, experiments: [89] },
  { name: "IL-6", tissue: "Heart", expression: 2.0, experiments: [592] },
  {
    name: "Amy1",
    tissue: "Salivary Gland",
    expression: 1.5,
    experiments: [327],
  },
  { name: "AHA2", tissue: "Seedling", expression: 1.8, experiments: [571] },
  { name: "FERONIA", tissue: "Seedling", expression: 1.8, experiments: [571] },
  {
    name: "Nfatc1",
    tissue: "Bone Marrow",
    expression: 1.5,
    experiments: [187],
  },
  { name: "Csf1", tissue: "Bone Marrow", expression: 1.5, experiments: [187] },
  { name: "SM1", tissue: "Heart", expression: -1.5, experiments: [128] },
  { name: "rpS6", tissue: "Heart", expression: 1.5, experiments: [128] },
  { name: "EndoG", tissue: "Plantaris", expression: 1.53, experiments: [270] },
  {
    name: "Dysferlin",
    tissue: "Plantaris",
    expression: 1.5,
    experiments: [271],
  },
  { name: "nNOS", tissue: "Plantaris", expression: -1.5, experiments: [271] },
  { name: "Aqp5", tissue: "Salivary Gland", expression: 0, experiments: [327] },
  { name: "Ano1", tissue: "Salivary Gland", expression: 0, experiments: [327] },
];

const tissues = [
  "Bone",
  "Heart",
  "Bone Marrow",
  "Immune Cells",
  "Lung",
  "Hemocytes",
  "Fat body",
  "Salivary Gland",
  "Plantaris",
  "Seedling",
];
const genes = [
  "CDKN1a/p21",
  "VEGFA",
  "Tnf",
  "Catalase",
  "Mcp1",
  "IFN-γ",
  "IL-17",
  "Nox1",
  "Myc",
  "MMP1",
  "MMP3",
  "MMP10",
  "Trp53",
  "Nfe2l2",
  "Ptgs2",
  "Gadd45",
  "Tet2",
  "Rankl",
  "BMP-2",
  "miR-21",
  "Uck2",
  "san",
  "IL-6",
  "Amy1",
  "AHA2",
  "FERONIA",
  "Nfatc1",
  "Csf1",
  "SM1",
  "rpS6",
  "EndoG",
  "Dysferlin",
  "nNOS",
  "Aqp5",
  "Ano1",
];

function GeneBar({ gene, tissue, data, onHover }) {
  const expression = data?.expression || 0;
  const height = Math.abs(expression) * 0.5 + 0.1;
  const color =
    expression > 0 ? "#22c55e" : expression < 0 ? "#ef4444" : "#64748b";

  const geneIndex = genes.indexOf(gene);
  const tissueIndex = tissues.indexOf(tissue);

  return (
    <group position={[geneIndex * 1.5 - 3, height / 2, tissueIndex * 1.5 - 2]}>
      <Box
        args={[0.4, height, 0.4]}
        onPointerEnter={() => data && onHover(data)}
        onPointerLeave={() => onHover(null)}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Box>
      {data && (
        <Text
          position={[0, height / 2 + 0.3, 0]}
          fontSize={0.22}
          color="#f1f5f9"
        >
          {expression.toFixed(1)}x
        </Text>
      )}
    </group>
  );
}

export default function GeneExpression() {
  const [selectedTissue, setSelectedTissue] = useState("all");
  const [hoveredGene, setHoveredGene] = useState(null);

  const filteredData =
    selectedTissue === "all"
      ? geneData
      : geneData.filter((d) => d.tissue === selectedTissue);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 to-background py-10">
      <div className="mb-10 ml-10 mr-10 p-6 bg-blue-50 rounded-xl text-blue-900 text-base leading-relaxed shadow">
        In biological terms, gene expression is the fundamental process by which
        the genetic information encoded within a gene's DNA sequence is used to
        synthesize a functional product, which is either a protein or a
        functional RNA molecule. This process begins with transcription, where
        an enzyme reads the DNA and creates a complementary messenger RNA (mRNA)
        copy. This mRNA transcript is then processed and serves as a template
        for translation, where ribosomes decode the mRNA's sequence to assemble
        a specific chain of amino acids, forming a protein. The regulation of
        which genes are expressed, and to what degree, is critical for cellular
        differentiation and adaptation. For example, environmental stressors
        like microgravity can cause certain genes to be upregulated (producing
        more product) or downregulated (producing less product), altering the
        cell's proteome and, consequently, its function and the organism's
        overall physiology.
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center bg-[#0d1117] text-white rounded-2xl shadow-lg p-6 gap-8">
          {/* LEFT: 3D Model Viewer */}
          <div className="w-full md:w-2.5/3 h-[750px] bg-black rounded-xl cursor-pointer">
            <Canvas camera={{ position: [6, 4, 6], fov: 50 }} shadows>
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

                {/* 3D Gene Expression Bars */}
                {genes.map((gene) =>
                  tissues.map((tissue) => {
                    const data = filteredData.find(
                      (d) => d.name === gene && d.tissue === tissue
                    );
                    return (
                      <GeneBar
                        key={`${gene}-${tissue}`}
                        gene={gene}
                        tissue={tissue}
                        data={data}
                        onHover={setHoveredGene}
                      />
                    );
                  })
                )}

                {/* Axis labels */}
                <AxisLabel
                  text="Genes ➡️"
                  position={[0, -0.5, -3]}
                  planeSize={[2.2, 0.6]}
                />
                <AxisLabel
                  text="Tissues ➡️"
                  position={[-4, -0.5, 0]}
                  rotation={[0, Math.PI / 2, 0]}
                  planeSize={[2.6, 0.6]}
                />
                <AxisLabel
                  text="Gene Expression ⬆️"
                  position={[-4, 2.5, 0]}
                  rotation={[0, Math.PI / 2, 0]}
                  planeSize={[3.4, 0.6]}
                />

                {/* Grid floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                  <planeGeometry args={[10, 8]} />
                  <meshStandardMaterial
                    color="#0f172a"
                    transparent
                    opacity={0.3}
                  />
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

          {/* RIGHT: Gene Expression Details and Controls */}
          <div className="w-[] md:w-1/2 bg-white rounded-xl p-6 min-h-[500px]">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Gene Expression Matrix
            </h2>
            <p className="text-blue-900 text-lg mb-6 ">
              3D heatmap showing gene expression changes across tissues
            </p>

            {/* Tissue Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">
                Filter by Tissue
              </h3>
              <select
                value={selectedTissue}
                onChange={(e) => setSelectedTissue(e.target.value)}
                className="w-full p-3 bg-blue-600 text-white rounded border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Tissues</option>
                {tissues.map((tissue) => (
                  <option key={tissue} value={tissue}>
                    {tissue}
                  </option>
                ))}
              </select>
            </div>

            {/* Legend */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">
                Expression Legend
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded" />
                  <span className="text-green-300">Upregulated (Positive)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded" />
                  <span className="text-red-300">Downregulated (Negative)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-500 rounded" />
                  <span className="text-gray-300">Places</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-blue-600">
                Gene Information
              </h3>
              {hoveredGene ? (
                <div
                  className={`p-4 border rounded-lg ${
                    hoveredGene.expression > 0
                      ? "bg-green-500 border-green-900"
                      : "bg-red-500 border-red-900"
                  }`}
                >
                  <h4 className="font-semibold text-gray-100 text-lg">
                    {hoveredGene.name}
                  </h4>
                  <p className="text-white mt-2">
                    <span className="font-medium">Tissue:</span>{" "}
                    {hoveredGene.tissue}
                  </p>
                  <p className="text-white">
                    <span className="font-medium">Expression:</span>{" "}
                    {hoveredGene.expression.toFixed(2)}x
                  </p>
                  <p className="text-white text-sm mt-2">
                    <span className="font-medium">Experiments:</span>{" "}
                    {hoveredGene.experiments.join(", ")}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-32 text-center">
                  <p className="text-gray-400 text-lg">
                    👆 Hover over bars in the 3D model to view gene details
                    here.
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    You can rotate the model by dragging it.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4 border-t border-border pt-6">
              <div>
                <h4 className="mb-2 font-semibold text-blue-600">
                  impacts According To Researches
                </h4>

                {/* Scrollable container */}
                <div className="max-h-64 overflow-y-scroll pr-2 space-y-6 text-sm text-blue-900">
                  {/* Bone and Bone Marrow */}
                  <div>
                    <h5 className="font-semibold text-blue-700">
                      Bone and Bone Marrow
                    </h5>
                    <p className="text-xs leading-relaxed mt-1">
                      <strong>CDKN1a/p21 (Bone):</strong> Microgravity was found
                      to halt the cell cycle of bone-forming osteoblasts by
                      upregulating this gene, contributing to the inhibition of
                      bone regeneration. (Experiment 2)
                    </p>
                    <p className="text-xs leading-relaxed mt-2">
                      <strong>VEGFA & BMP-2 (Bone):</strong> Long-duration
                      spaceflight (30 days) dramatically increased the
                      expression of VEGFA (15-fold) and BMP-2 (11-fold) in the
                      skull, suggesting that cephalad fluid shift in
                      microgravity triggers angiogenic and bone-growing
                      responses in non-weight-bearing bones. (Experiment 216)
                    </p>
                    <p className="text-xs leading-relaxed mt-2">
                      <strong>MMPs (Bone):</strong> Spaceflight triggered
                      osteocytic osteolysis, evidenced by the significant
                      upregulation of matrix metalloproteinases MMP1, MMP3, and
                      MMP10. (Experiment 2)
                    </p>
                    <p className="text-xs leading-relaxed mt-2">
                      <strong>Trp53 (Bone):</strong> The apoptosis-inducing gene
                      Trp53 was downregulated during spaceflight, possibly
                      linked to the survival-promoting role of CDKN1a/p21.
                      (Experiment 2)
                    </p>
                    <p className="text-xs leading-relaxed mt-2">
                      <strong>
                        Catalase, Gadd45, Rankl, Mcp1, Tnf (Bone Marrow):
                      </strong>{" "}
                      Ionizing radiation causes a rapid and persistent increase
                      in RANKL within bone marrow, initiating a cascade that
                      leads to radiation-induced bone deterioration.
                      (Experiments 7, 187)
                    </p>
                  </div>

                  {/* Heart */}
                  <div>
                    <h5 className="font-semibold text-blue-700">Heart</h5>
                    <p className="text-xs leading-relaxed mt-1">
                      <strong>Tnf, Nox1, Myc, Nfe2l2, Ptgs2:</strong>{" "}
                      Spaceflight alters key cardiac genes. Nox1 (oxidative
                      stress) and Myc (cell cycle) are upregulated, while the
                      protective transcription factor Nfe2l2 is downregulated,
                      suggesting mechanisms for cardiac dysfunction. (Experiment
                      6)
                    </p>
                    <p className="text-xs leading-relaxed mt-2">
                      <strong>IL-6:</strong> Vaccination on the ISS can
                      stimulate heightened cardiac inflammation via NF-κB
                      signaling, leading to the release of IL-6. (Experiment
                      592)
                    </p>
                    <p className="text-xs leading-relaxed mt-2">
                      <strong>SM1, rpS6:</strong> Aging impairs coronary
                      arteriole contractile function, shifting vascular smooth
                      muscle toward a proliferative, noncontractile state.
                      Exercise training can reverse this dysfunction, restoring
                      a youthful phenotype. (Experiment 128)
                    </p>
                    <p className="text-xs leading-relaxed mt-2">
                      <strong>Tet2 (Heart & Lung):</strong> After a 37-day
                      spaceflight, mRNA expression of cytoskeletal components
                      was altered despite stable protein levels, linked to
                      increased genome methylation and decreased Tet2
                      expression. (Experiment 81)
                    </p>
                  </div>

                  {/* Immune System */}
                  <div>
                    <h5 className="font-semibold text-blue-700">
                      Immune System
                    </h5>
                    <p className="text-xs leading-relaxed mt-1">
                      <strong>IFN-γ & IL-17 (Immune Cells):</strong> Spaceflight
                      impairs immune tolerance, leading to an excessive
                      inflammatory response with a 5-fold increase in IFN-γ and
                      10-fold increase in IL-17. (Experiment 239)
                    </p>
                    <p className="text-xs leading-relaxed mt-2">
                      <strong>miR-21 (Immune Cells):</strong> Spaceflight
                      suppressed the normal upregulation of microRNA miR-21
                      during T-cell activation, revealing a new epigenetic
                      mechanism for immune dysfunction. (Experiment 238)
                    </p>
                  </div>

                  {/* Other Tissues */}
                  <div>
                    <h5 className="font-semibold text-blue-700">
                      Other Tissues
                    </h5>
                    <p className="text-xs leading-relaxed mt-1">
                      <strong>Uck2 & san (Hemocytes & Fat Body):</strong> The
                      bacterium <em>Ehrlichia chaffeensis</em> replicates in
                      hemocytes and fat body. Suppressing Uck2 or san in these
                      tissues inhibited bacterial growth, clarifying tissue
                      tropism in an invertebrate model. (Experiment 89)
                    </p>
                    <p className="text-xs leading-relaxed mt-2">
                      <strong>Amy1, Aqp5, Ano1 (Salivary Gland):</strong> Lunar
                      gravity (1/6 g) exposure induced expression of salivary
                      amylase (Amy1) but not water secretion genes (Aqp5, Ano1),
                      making Amy1 a potential biomarker for lunar stress.
                      (Experiment 327)
                    </p>
                    <p className="text-xs leading-relaxed mt-2">
                      <strong>
                        EndoG, Dysferlin, nNOS (Plantaris Muscle):
                      </strong>{" "}
                      Lifelong exercise and caloric restriction attenuate
                      age-related muscle wasting, protect membranes, preserve
                      nNOS, and reduce nuclear translocation of EndoG.
                      (Experiments 270, 271)
                    </p>
                    <p className="text-xs leading-relaxed mt-2">
                      <strong>AHA2 & FERONIA (Seedling):</strong> Space-grown
                      Arabidopsis seedlings showed unique cell wall adaptations,
                      with AHA2 and FERONIA identified as central regulators.
                      (Experiment 571)
                    </p>
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
