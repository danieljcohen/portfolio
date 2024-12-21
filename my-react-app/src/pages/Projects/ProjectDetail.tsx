import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProjectDetail: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();

  const projectDetails: Record<
    string,
    {
      title: string;
      content: string;
      features: string[];
      technologies: string[];
      challenges: string;
      links: {
        github: string;
        demo?: string;
      };
    }
  > = {
    "arcgis-care": {
      title: "ArcGIS Care",
      content:
        "ArcGIS Care is a project focused on improving patient outcomes by reducing wait times. It utilizes geospatial data for real-time tracking of medical equipment and optimizing hospital workflows.",
      features: [
        "Real-time tracking of medical equipment",
        "Geospatial analytics to reduce delays",
        "Intuitive UI for hospital staff",
      ],
      technologies: ["React", "ArcGIS API", "Node.js", "MongoDB"],
      challenges: "Integrating geospatial analytics with real-time data visualization.",
      links: {
        github: "https://github.com/example/ArcGIS-Care",
        demo: "https://arcgiscare.example.com",
      },
    },
    "fintech-app": {
      title: "Fintech App",
      content:
        "The Fintech App helps users track their personal finances and investments. It includes features like portfolio management, expense tracking, and goal setting for achieving financial milestones.",
      features: [
        "Portfolio management",
        "Expense tracking",
        "Goal setting and visualization",
      ],
      technologies: ["React", "TypeScript", "Firebase", "Chart.js"],
      challenges: "Ensuring data security while maintaining performance.",
      links: {
        github: "https://github.com/example/Fintech-App",
        demo: "https://fintechapp.example.com",
      },
    },
  };

  const project = projectName ? projectDetails[projectName] : null;

  if (!project) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Project not found</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-purple-500 px-4 py-2 rounded-md text-sm hover:bg-purple-600"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white px-5">
      <button
        onClick={() => navigate(-1)}
        className="bg-purple-500 px-4 py-2 rounded-md text-sm mb-5 hover:bg-purple-600"
      >
        Back
      </button>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-300 mb-4">{project.content}</p>
        <div>
          <h2 className="text-xl font-semibold text-purple-400 mb-2">
            Features
          </h2>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-purple-400 mb-2">
            Technologies Used
          </h2>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            {project.technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-purple-400 mb-2">
            Challenges
          </h2>
          <p className="text-gray-300 mb-4">{project.challenges}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Links</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                GitHub Repository
              </a>
            </li>
            {project.links.demo && (
              <li>
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  Live Demo
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
