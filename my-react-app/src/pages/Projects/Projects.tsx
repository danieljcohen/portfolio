import React from "react";
import { Link } from "react-router-dom";
import huffman from '../../assets/huffman.png';
import cpu from '../../assets/cpu.png';
import linear from '../../assets/linear.png';
import arcGIS from '../../assets/arcGIS.png';
import pathPetal from '../../assets/pathPetal.png';
import psychaide from '../../assets/psychaide.png';
import beattorrent from '../../assets/beattorrent.png';


// Define the project structure using TypeScript
interface Project {
  imgPath: string;
  title: string;
  description: string;
  route: string;
  date: string;
  technologies: string[];
  githubUrl?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      imgPath: beattorrent, // Placeholder - replace with BeatTorrent image
      title: "BeatTorrent",
      date: "Nov 2025",
      description:
        "A distributed peer-to-peer music streaming platform using WebRTC for direct chunk transfer between peers, implementing a BitTorrent-inspired protocol with real-time D3.js mesh topology visualization.",
      route: "beattorrent",
      technologies: ["Python", "FastAPI", "WebRTC", "JavaScript", "D3.js"],
      githubUrl: "https://github.com/danieljcohen/beat-torrent"
    },
    {
      imgPath: psychaide, // Replace with actual image
      title: "PsychAIde",
      date: "Jan-May 2025",
      description:
        "A HIPAA-compliant web application for forensic psychologists to manage court-ordered evaluations, streamlining invoicing time tracking, and case management workflows. 30+ active users",
      route: "psychaide",
      technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Azure AD"],
    },
    {
      imgPath: pathPetal, // Replace with actual image later
      title: "Path and Petal",
      date: "Feb 2025",
      description:
        "Placed second in HackDuke 2025, an environmental conservation platform that allows hikers to identify and report invasive plant species using AI-powered image recognition, creating crowdsourced data for removal initiatives.",
      route: "petal-path",
      technologies: ["React", "Firebase", "Flask", "Google Maps API", "Plant.ID API"],
      githubUrl: "https://github.com/Kethan-p/HackDuke2025"
    },
    {
      imgPath: arcGIS,
      title: "ArcGIS Care",
      date: "Jul 2024",
      description:
        "Medical equipment tracking app using computer vision that achieved 91% accuracy in identifying gurneys and crash carts, presented to 500+ attendees in hackathon finalist round.",
      route: "arcgis-care",
      technologies: ["YOLOv8", "FastAPI", "TypeScript", "React.js", "ArcGIS JS"],
      githubUrl: "https://github.com/danieljcohen/EsriHackathon"
    },
    {
      imgPath: linear,
      title: "OCR Linear Algebra Calculator",
      date: "May 2024",
      description:
        "Command-line Python tool that solves matrix problems from images without external math libraries, achieving 97% accuracy in character recognition.",
      route: "ocr-calculator",
      technologies: ["Python", "OCR", "Computer Vision", "Linear Algebra"],
      githubUrl: "https://github.com/danieljcohen/Linear-Coding"
    },
    {
      imgPath: cpu,
      title: "Logisim CPU",
      date: "Dec 2023",
      description:
        "Designed and implemented a 16-bit CPU with 9 functional units including ALU and control unit, supporting a set of 16 instructions for arithmetic and logical operations.",
      route: "logisim-cpu",
      technologies: ["Digital Logic", "Computer Architecture", "Logisim"],
    },
    {
      imgPath: huffman,
      title: "Huffman Compression Program",
      date: "Mar 2023",
      description:
        "Java implementation of Huffman Compression algorithm using binary tree traversal, achieving data compression for files up to 12 GB with 43% better efficiency than traditional methods.",
      route: "huffman-compression",
      technologies: ["Java", "Data Structures", "Algorithms", "Binary Trees"],
      githubUrl: "https://gitfront.io/r/user-4257705/ntyjaLzjW2Ff/huffman-compression/"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-5">
        <h1 className="text-4xl font-bold text-white text-center mb-6">
          My <span className="text-purple-400">Projects</span>
        </h1>
        <p className="text-gray-300 text-center mb-8 max-w-3xl mx-auto text-sm">
          Here's a collection of projects I've developed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              <div className="relative">
                <img
                  src={project.imgPath}
                  alt={`${project.title} thumbnail`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {project.date}
                </div>
              </div>
              
              <Link
                to={`/projects/${project.route}`}
                className="p-4 flex-grow flex flex-col"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-white">
                    {project.title}
                  </h2>
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-gray-700 hover:bg-purple-600 text-white p-1.5 rounded-full transition-colors border border-gray-600 shadow-md flex-shrink-0 ml-2"
                      onClick={(e) => e.stopPropagation()}
                      title="View on GitHub"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>

                <p className="text-gray-300 text-xs mb-3">
                  {project.description}
                </p>
                
                <div className="mt-auto pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-1.5 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              
                <div className="mt-3 py-2 flex justify-between items-center text-xs">
                  <span className="text-purple-300">View details</span>
                  <span className="text-white">→</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
