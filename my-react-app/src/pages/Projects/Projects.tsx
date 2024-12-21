import React from "react";
import { Link } from "react-router-dom";

// Define the project structure using TypeScript
interface Project {
  imgPath: string;
  title: string;
  description: string;
  route: string; // Add a route property for dynamic routing
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      imgPath: "/images/arcgis.png", // Replace with actual image paths
      title: "ArcGIS Care",
      description:
        "A project to improve patient outcomes by reducing wait times. Utilizes geospatial data for real-time tracking of medical equipment.",
      route: "arcgis-care",
    },
    {
      imgPath: "/images/fintech.png", // Replace with actual image paths
      title: "Fintech App",
      description:
        "An app for tracking personal finances and investments. Features include portfolio management, expense tracking, and goal setting.",
      route: "fintech-app",
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen py-10">
      <div className="container mx-auto px-5">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          My Recent <span className="text-purple-400">Projects</span>
        </h1>
        <p className="text-gray-300 text-center mb-12">
          Here are a few projects I've worked on recently.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              to={`/projects/${project.route}`} // Use the route property for navigation
              key={index}
              className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={project.imgPath}
                alt={`${project.title} thumbnail`}
                className="rounded-md w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
