import React from "react";
import AstronautOrganCard from "../components/AstronautCard";

const Impact = () => {
  const metrics = [
    {
      title: "Publications Analyzed",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      description: "NASA Space Biology publications processed and indexed",
    },
    {
      title: "Research Categories",
      value: "15",
      change: "+3",
      changeType: "positive",
      description: "Different fields of space biology research covered",
    },
    {
      title: "Active Researchers",
      value: "1,234",
      change: "+8%",
      changeType: "positive",
      description: "Scientists and researchers using the platform",
    },
    {
      title: "Data Points",
      value: "45,672",
      change: "+23%",
      changeType: "positive",
      description: "Individual data points extracted and analyzed",
    },
  ];

  const impactStories = [
    {
      title: "Accelerated Research Discovery",
      description:
        "Researchers report 40% faster literature review process using our intelligent search and filtering capabilities.",
      icon: "🔍",
      category: "Efficiency",
    },
    {
      title: "Enhanced Collaboration",
      description:
        "Cross-institutional research teams have increased collaboration by 60% through our networking features.",
      icon: "🤝",
      category: "Collaboration",
    },
    {
      title: "Data-Driven Insights",
      description:
        "Publication trend analysis has revealed 3 new research directions in space biology.",
      icon: "📊",
      category: "Innovation",
    },
    {
      title: "Educational Impact",
      description:
        "Over 500 students have used the platform for space biology coursework and research projects.",
      icon: "🎓",
      category: "Education",
    },
  ];

  const achievements = [
    {
      year: "2024",
      title: "NASA Partnership",
      description: "Official collaboration with NASA Space Biology program",
      status: "completed",
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Advanced AI chatbot for research assistance",
      status: "in-progress",
    },
    {
      year: "2023",
      title: "Platform Launch",
      description: "Initial release of Bio-Astra Dashboard",
      status: "completed",
    },
    {
      year: "2023",
      title: "Data Collection",
      description: "Comprehensive NASA publication database",
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Impact & Metrics
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Measuring the success and impact of the Bio-Astra Dashboard in
            advancing NASA Space Biology research and discovery.
          </p>
        </div>
        <div>
          <AstronautOrganCard />
        </div>
      </div>
    </div>
  );
};

export default Impact;
