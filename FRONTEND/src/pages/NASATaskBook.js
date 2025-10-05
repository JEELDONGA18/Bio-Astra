import React from "react";
import ResourceCard from "../components/ResourceCard";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

// 3D Star Background Component
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
      <ambientLight intensity={1} />
    </>
  );
}

const NASATaskBook = () => {
  const taskBookResources = [
    {
      title: "NASA Task Book Database",
      description:
        "Comprehensive database of NASA-funded research projects, including project descriptions, principal investigators, funding amounts, and research outcomes across all NASA programs.",
      link: "https://taskbook.nasaprs.com/tbp/index.cfm",
      category: "Project Database",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      features: [
        "Project search and filtering",
        "Principal investigator profiles",
        "Funding history and outcomes",
        "Research collaboration networks",
      ],
    },
    {
      title: "Space Biology Program",
      description:
        "Research program studying how microgravity, radiation, and spaceflight environments affect living systems including microbes, plants, animals, and humans.",
      link: "https://taskbook.nasaprs.com/tbp/highlights.cfm",
      category: "Space Biology",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4m16 0a8 8 0 11-16 0 8 8 0 0116 0z"
          />
        </svg>
      ),
      features: [
        "Biological effects of microgravity",
        "Spaceflight experiments on living systems",
        "Ground-based simulation studies",
        "Project database and research outcomes",
      ],
    },
    {
      title: "Human Research Program (HRP)",
      description:
        "Database of NASA-funded human health and performance research to mitigate risks to astronauts during space exploration missions.",
      link: "https://humanresearchroadmap.nasa.gov/",
      category: "Human Research",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      ),
      features: [
        "Human health and performance studies",
        "Countermeasure development",
        "Risk assessment and mitigation",
        "Searchable database of funded projects",
      ],
    },
    {
      title: "Biological and Physical Sciences (BPS)",
      description:
        "Collection of NASA-funded research projects in biological and physical sciences to advance fundamental knowledge and support future space missions.",
      link: "https://science.nasa.gov/biological-physical/data/",
      category: "Physical Sciences",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
          />
        </svg>
      ),
      features: [
        "Biological sciences research",
        "Physical sciences investigations",
        "Spaceflight and ground studies",
        "Project details and outcomes",
      ],
    },
  ];

  const quickLinks = [
    {
      title: "Search Projects",
      description: "search for projects",
      link: "https://taskbook.nasaprs.com/tbp/index.cfm",
      icon: "🔍",
    },
    {
      title: "Search Bibliography",
      description: "Explore Bibliography",
      link: "https://taskbook.nasaprs.com/tbp/index.cfm?action=bib_search",
      icon: "🔬",
    },
    {
      title: "Find Researchers",
      description: "Search for principal investigators",
      link: "https://science.nasa.gov/science-people/",
      icon: "👥",
    },
    {
      title: "Submit Project",
      description: "Add your research project",
      link: "https://taskbook.nasaprs.com/exploration/taskbook//",
      icon: "📝",
    },
  ];

  const projectCategories = [
    {
      title: "Human Research",
      description:
        "The challenges to human health and performance in space, focusing on risks, gaps, and research elements related to keeping astronauts safe and healthy during missions.",
      count: "150+ projects",
      funding: "$50M+",
    },
    {
      title: "Space Biology",
      description:
        "Study of biological systems in space, including human adaptation and the effects of the space environment on living organisms.",
      count: "80+ projects",
      funding: "$25M+",
    },
    {
      title: "Physical Sciences",
      description:
        "Fluid physics, combustion science, materials science, and fundamental physics,",
      count: "40+ projects",
      funding: "$20M+",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Rotating 3D Star Background */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        style={{ minHeight: "500px" }}
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-cosmos-gradient bg-clip-text text-transparent">
                NASA Task Book
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore NASA's comprehensive database of funded research projects,
              principal investigators, and funding opportunities in space life
              sciences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://taskbook.nasaprs.com/tbp/welcome.cfm"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                Access NASA Task Book
              </a>
            </div>
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

      <div className="max-w-7xl my-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overview Section */}
        <div className="card mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Tracking NASA Research Excellence
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The NASA Task Book is an online database of research projects
                supported by NASA's Biological and Physical Sciences (BPS)
                Division and Human Research Program (HRP). Users can view
                project descriptions, annual progress, final reports, and
                bibliographical listings of publications resulting from
                NASA-funded studies in Space Biology, Physical Sciences, and
                Human Research. Visitors can also learn about the potential
                impact of these studies and the anticipated benefits that such
                research could offer to us on Earth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://taskbook.nasaprs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit Task Book
                </a>
              </div>
            </div>
            <div className="bg-cosmos-gradient/10 rounded-lg p-8 text-center">
              <div className="w-32 h-32 bg-cosmos-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Research Transparency
              </h3>
              <p className="text-gray-300">
                Comprehensive tracking of NASA research investments and outcomes
              </p>
            </div>
          </div>
        </div>

        {/* Main Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Task Book Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {taskBookResources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                link={resource.link}
                category={resource.category}
                icon={resource.icon}
                features={resource.features}
              />
            ))}
          </div>
        </div>

        {/* Project Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Research Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectCategories.map((category, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-cosmos-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {category.description}
                </p>
                <div className="space-y-1">
                  <div className="text-cosmos-cyan font-semibold text-sm">
                    {category.count}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {category.funding}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card hover:border-cosmos-cyan/50 transition-all duration-300 group text-center"
              >
                <div className="text-4xl mb-4">{link.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cosmos-cyan transition-colors duration-200">
                  {link.title}
                </h3>
                <p className="text-gray-400 text-sm">{link.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="card bg-cosmos-gradient/10 border-cosmos-cyan/30 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              NASA Task Book Statistics
            </h2>
            <p className="text-gray-300">
              Comprehensive tracking of NASA research investments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">
                3,000+
              </div>
              <div className="text-white font-semibold mb-1">
                Active Projects
              </div>
              <div className="text-gray-400 text-sm">Currently funded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">
                $2.5B+
              </div>
              <div className="text-white font-semibold mb-1">Total Funding</div>
              <div className="text-gray-400 text-sm">Research investments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">
                500+
              </div>
              <div className="text-white font-semibold mb-1">Institutions</div>
              <div className="text-gray-400 text-sm">
                Participating organizations
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmos-cyan mb-2">
                2,000+
              </div>
              <div className="text-white font-semibold mb-1">Researchers</div>
              <div className="text-gray-400 text-sm">
                Principal investigators
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Explore NASA Research Projects
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover funded research projects, connect with investigators, and
            find collaboration opportunities in space life sciences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://taskbook.nasaprs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              Browse Task Book
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NASATaskBook;
