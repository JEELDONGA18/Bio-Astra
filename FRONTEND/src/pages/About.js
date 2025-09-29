import React from "react";

const About = () => {
  const ccEmails = [
    "bintu.kadhiwala@scet.ac.in",
    "meetpaladiya.co23d2@scet.ac.in",
    "vishalshingala.co23d2@scet.ac.in",
    "dhyeydesai.co23d2@scet.ac.in",
    "dhrumilkhatiwala.co23d2@scet.ac.in",
    "parthgevariya.co23d2@scet.ac.in",
  ].join(",");

  const buildMailto = (subject, body = "") => {
    const to = "jeeldonga.co23d2@scet.ac.in";
    const params = new URLSearchParams({
      cc: ccEmails,
      subject,
      body,
    });
    return `mailto:${to}?${params.toString()}`;
  };

  const handleContactClick = () => {
    const mailto = buildMailto(
      "Bio-Astra Contact",
      "Hello Bio-Astra Team,"
    );
    window.location.href = mailto;
  };

  const handleReportClick = () => {
    const mailto = buildMailto(
      "Bio-Astra Issue Report",
      "Hello Bio-Astra Team,%0D%0A%0D%0AI would like to report the following issue:%0D%0A- Description:%0D%0A- Steps to reproduce:%0D%0A- Expected behavior:%0D%0A- Actual behavior:%0D%0A%0D%0AThanks!"
    );
    window.location.href = mailto;
  };

  const teamMembers = [
    {
      name: "Jeel Donga",
      role: "Backend Developer",
      bio: "Jeel specializes in backend development and API systems for the dashboard. He has extensive experience in database design, with a focus on handling large-scale scientific datasets.",
      image: "👨‍💻",
      link: "https://www.linkedin.com/in/jeel-hasmukhbhai-donga-226441290/",
      expertise: [
        "API Development",
        "Python",
        "Flask",
        "NASA APIs",
        "Gemini APIs",
      ],
    },
        {
      name: "Meet Paladiya",
      role: "Frontend Developer",
      bio: "Meet specializes in React.js development and user experience design. He's passionate about creating intuitive interfaces for scientific data visualization..",
      image: "👨‍💻",
      link: "https://www.linkedin.com/in/meet-paladiya-953052271/",
      expertise: [
        "React.js",
        "UI/UX Design",
        "Data Visualization",
        "Web Development",
      ],
    },
    {
      name: "Vishal Shingala",
      role: "Data & Insights Lead",
      bio: "Vishal handles data pipeline development and integration with NASA databases. He ensures data quality and implements automated processing workflows for real-time data updates.",
      image: "👨‍🔧",
      link: "https://www.linkedin.com/in/vishal-shingala-382a20295/",
      expertise: [
        "Python",
        "Data Processing",
        "Data Visualization",
        "Chart.js",
      ],
    },
    {
      name: "Dhyey Desai",
      role: "Research & Storytelling Strategist",
      bio: "Dhyey provides domain expertise by researching NASA content and crafting clear narratives to connect complex scientific data with end users. He ensures the information presented is accurate and accessible to the target audience.",
      image: "👨‍🔬",
      link: "https://www.linkedin.com/in/dhyey-desai-625256286/",
      expertise: [
        "Space Data Research",
        "Documentation",
        "Technical Writing",
      ],
    },
    {
      name: "Dhrumil Khatiwala",
      role: "Quality & Reliability Champion",
      bio: "Dhrumil ensures the quality and reliability of every feature by rigorously testing and refining the application, delivering a smooth and user-friendly experience for hackathon judges. He brings extensive expertise in software testing and quality assurance.",
      image: "🕵️‍♂️",
      // No LinkedIn provided; will use email link
      link: "mailto:dhrumilkhatiwala.co23d2@scet.ac.in",
      expertise: [
        "Software Testing",
        "Bug Tracking",
        "Performance Analysis",
      ],
    },
    {
      name: "Parth Gevariya",
      role: "Project Representation & Documentation Lead",
      bio: "Parth ensures the project is well-presented online via GitHub README, project website, and documentation, highlighting features and impact.",
      image: "👨‍💼",
      link: "https://www.linkedin.com/in/parth-gevariya-3b2a592aa/",
      expertise: [
        "GitHub Documentation",
        "Website Content",
        "Project Presentation",
        "Communication",
      ],
    },
  ];

  const mentor = {
    name: "Dr. Bintu Kadhiwala",
    role: "Program Leadership",
    bio: "Dr. Bintu Kadhiwala is an Assistant Professor of Computer Engineering at SCET, Surat, with over 19 years of experience. He holds a Ph.D. from SVNIT, Surat, specializing in data mining, privacy-preserving data publishing, algorithms, and information security.",
    image: "👨‍🏫",
    link: "https://www.linkedin.com/in/prof-dr-bintu-kadhiwala-69729782/",
    expertise: [
      "Domain Expertise",
      "Technical Guidance",
      "Team Mentoring",
      "Project Strategy",
      "Review & Feedback",
      "Hackathon Insights",
    ],
    affiliation: "SCET, Surat",
  };

  const technologies = [
    { name: "React.js", category: "Frontend" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Python Flask", category: "Backend" },
    { name: "Python", category: "Data Processing" },
    { name: "Chart.js", category: "Visualization" },
    { name: "NASA APIs", category: "Data Sources" },
    { name: "Gemini APIs", category: "ChatBot" },
    { name: "Vercel & Render", category: "Deployment" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            About Bio-Astra Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the team behind the Bio-Astra Dashboard and learn about our
            mission to advance NASA Space Biology research through innovative
            technology.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="card mb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-cosmos-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To create an innovative, user-friendly platform that democratizes
              access to NASA Space Biology research, enabling scientists,
              students, and space enthusiasts worldwide to discover, analyze,
              and contribute to our understanding of life in space. We believe
              that open access to research data and intelligent tools can
              accelerate scientific discovery and inspire the next generation of
              space biologists.
            </p>
          </div>
        </div>

        {/* Mentor Section */}
        <div className="card mb-16 bg-cosmos-gradient/10 border-cosmos-cyan/30">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Project Mentor
            </h2>
            <div className="max-w-2xl mx-auto">
              <a
                href={mentor.link}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open LinkedIn: ${mentor.name}`}
                className="inline-block"
              >
                <div className="text-6xl mb-6">{mentor.image}</div>
              </a>
              <h3 className="text-2xl font-semibold text-white mb-2">
                <a
                  href={mentor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open LinkedIn: ${mentor.name}`}
                  className="hover:underline"
                >
                  {mentor.name}
                </a>
              </h3>
              <div className="text-cosmos-cyan font-medium mb-2">{mentor.role}</div>
              <div className="text-gray-400 text-sm mb-4">
                {mentor.affiliation}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">{mentor.bio}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {mentor.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-cosmos-cyan/20 text-cosmos-cyan px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Development Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card text-center">
                <a
                  href={member.link}
                  target={member.link?.startsWith('http') ? "_blank" : undefined}
                  rel={member.link?.startsWith('http') ? "noopener noreferrer" : undefined}
                  title={`Open profile: ${member.name}`}
                  className="inline-block"
                >
                  <div className="text-6xl mb-4">{member.image}</div>
                </a>
                <h3 className="text-xl font-semibold text-white mb-2">
                  <a
                    href={member.link}
                    target={member.link?.startsWith('http') ? "_blank" : undefined}
                    rel={member.link?.startsWith('http') ? "noopener noreferrer" : undefined}
                    title={`Open profile: ${member.name}`}
                    className="hover:underline"
                  >
                    {member.name}
                  </a>
                </h3>
                <div className="text-cosmos-cyan font-medium mb-4">
                  {member.role}
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Used */}
        <div className="mb-16 ">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Technologies & Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="card text-center">
                <div className="text-2xl mb-2">🔧</div>
                <div className="text-sm font-semibold text-white mb-1">
                  {tech.name}
                </div>
                <div className="text-xs text-gray-400">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Impact */}
        <div className="card bg-cosmos-gradient/10 border-cosmos-cyan/30 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Project Impact & Vision
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Research Acceleration
                </h3>
                <p className="text-gray-300 text-sm">
                  Streamlining literature review and data discovery for space
                  biology researchers
                </p>
              </div>
              <div className="text-center">
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Education & Outreach
                </h3>
                <p className="text-gray-300 text-sm">
                  Making NASA research accessible to students and the general
                  public
                </p>
              </div>
              <div className="text-center">
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
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Collaboration
                </h3>
                <p className="text-gray-300 text-sm">
                  Fostering connections between researchers and institutions
                  worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Support */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Have questions about the Bio-Astra Dashboard? We'd love to hear from
            you and learn how we can improve the platform for the space biology
            community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="btn-primary text-lg px-8 py-4"
              onClick={handleContactClick}
              title="Email Bio-Astra Team"
            >
              Contact Us
            </button>
            <button
              className="btn-secondary text-lg px-8 py-4"
              onClick={handleReportClick}
              title="Report an issue via email"
            >
              Report Issues
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
