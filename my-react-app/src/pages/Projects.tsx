import React, { useState } from 'react';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects = [
    { name: 'ArcGIS Care', description: 'A project to improve patient outcomes by reducing wait times...' },
    { name: 'Fintech App', description: 'An app to track personal finances and investments...' },
    // Add more projects here
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <div className="flex space-x-4">
        {projects.map((project) => (
          <button
            key={project.name}
            onClick={() => setSelectedProject(project.name)}
            className={`p-2 border ${selectedProject === project.name ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            {project.name}
          </button>
        ))}
      </div>
      {selectedProject && (
        <div className="mt-4 p-4 border">
          {projects.find((project) => project.name === selectedProject)?.description}
        </div>
      )}
    </div>
  );
};

export default Projects;