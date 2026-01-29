import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import huffman from '../../assets/huffman.png';
import cpu from '../../assets/cpu.png';
import linear from '../../assets/linear.png';
import arcGIS from '../../assets/arcGIS.png';
import pathPetal from '../../assets/pathPetal.png';
import psychaide from '../../assets/psychaide.png';
import beattorrent from '../../assets/beattorrent.png';




interface ProjectDetails {
  title: string;
  date: string;
  imgPath: string;
  description: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: string[];
  outcome: string;
  githubUrl?: string;
  devpostUrl?: string;
  websiteUrl?: string;
  demoUrl?: string;
}

const ProjectDetail: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();

  const projectDetails: Record<string, ProjectDetails> = {
    'beattorrent': {
      title: 'BeatTorrent',
      date: 'Nov 2025',
      imgPath: beattorrent, 
      description: 'A distributed peer-to-peer music streaming system where peers collaboratively stream audio chunks from one another using WebRTC, minimizing server bandwidth while enabling distributed content delivery.',
      challenge: 'Traditional music streaming relies on centralized servers, creating high bandwidth costs and single points of failure. Additionally, keeping multiple listeners synchronized during collaborative playback is challenging.',
      solution: 'Built a BitTorrent-inspired P2P streaming system using WebRTC DataChannels for direct peer-to-peer chunk transfer, with a WebSocket signaling server handling only control signals and peer discovery.',
      features: [
        'WebRTC DataChannels for direct peer-to-peer audio chunk transfer',
        'BitTorrent-inspired chunk distribution with bitmap-based piece availability and rarity-weighted selection',
        'Multi-phase scheduling (startup, stable, endgame) for optimal download performance',
        'Browser-based playback using Media Source Extensions (MSE) with automatic rebuffering',
        'Playback synchronization across peers with drift correction (±100ms accuracy)',
        'TURN server fallback for NAT traversal on restrictive networks',
        'Real-time D3.js network visualization of P2P mesh topology'
      ],
      technologies: [
        'Python',
        'FastAPI',
        'WebSockets',
        'JavaScript (ES6 Modules)',
        'WebRTC',
        'Media Source Extensions (MSE)',
        'D3.js',
        'Docker',
        'Fly.io'
      ],
      outcome: 'Deployed a fully functional P2P streaming platform that reduces server bandwidth by enabling direct peer-to-peer content delivery while maintaining synchronized playback across all connected viewers.',
      githubUrl: 'https://github.com/danieljcohen/beat-torrent',
      websiteUrl: 'https://beat-torrent.fly.dev/'
    },
    'psychaide': {
      title: 'PsychAIde',
      date: 'Jan-May 2025',
      imgPath: psychaide,
      description: 'Worked as a product manager and developer to develop a comprehensive HIPAA-compliant web application designed for forensic psychologists and mental health professionals who conduct court-ordered evaluations.',
      challenge: 'Forensic psychologists face significant administrative burdens managing court-ordered evaluations, including document preparation, time tracking, and maintaining HIPAA compliance while handling sensitive case information.',
      solution: 'PsychAIde provides an all-in-one platform that streamlines case management, automates document generation, simplifies time tracking, and ensures secure file storage in a HIPAA-compliant environment.',
      features: [
        'Case management system for tracking evaluations from referral to completion',
        'Automated invoice generation',
        'Time tracking and categorization of evaluation activities',
        'Invoice management with billing status tracking',
        'HIPAA-compliant secure file storage for case documents',
        'Dashboard analytics for visual tracking of case progress and workload'
      ],
      technologies: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'PostgreSQL',
        'NextAuth.js with Azure AD',
        'jsPDF for document generation',
        'Natural language processing libraries'
      ],
      outcome: 'Developed a secure, efficient platform that reduces administrative overhead for mental health professionals, enabling them to focus more on evaluation quality while maintaining proper documentation and billing practices, used by 30+ professionals.',
      websiteUrl: 'https://psychaide.vercel.app/',
      demoUrl: 'https://youtu.be/7mu6JrY0n7I'

    },
    'petal-path': {
      title: 'Petal and Path',
      date: 'Feb 2025',
      imgPath: pathPetal, // Replace with actual image
      description: 'An environmental conservation platform that enables hikers to identify and track invasive plant species, contributing to ecosystem preservation through crowdsourced data collection.',
      challenge: 'Invasive plant species are causing significant damage to local ecosystems, with studies showing a 25-40% reduction in native plant diversity in affected areas. Hikers often encounter these plants but lack the knowledge to identify them or a way to report sightings to relevant authorities.',
      solution: 'We created a web platform that uses AI-powered image recognition to help users identify potentially invasive plants. When confirmed invasive, these plants are marked on an interactive map, creating a crowdsourced database accessible to both hikers and environmental organizations.',
      features: [
        'Camera-based plant identification using Plant.ID API',
        'Interactive map showing reported invasive species locations',
        'User-friendly interface for reporting and tracking invasive plants',
        'Data dashboard for environmental organizations',
        'Removal verification system to update the map when plants are removed'
      ],
      technologies: [
        'React.js',
        'Firebase',
        'Flask',
        'Google Maps API',
        'Plant.ID API',
        'OpenAI integration',
        'Google Cloud'
      ],
      outcome: 'Placed second in HackDuke2025, successfully created a platform that enables the identification and tracking of invasive plant species. The project demonstrates the potential of crowdsourced environmental data collection to support conservation efforts.',
      githubUrl: 'https://github.com/Kethan-p/PathAndPetal',
      devpostUrl: 'https://devpost.com/software/petal-path',
      demoUrl: 'https://www.youtube.com/watch?v=demo-path-petal'
    },
    'arcgis-care': {
      title: 'ArcGIS Care',
      date: 'July 2024',
      imgPath: arcGIS,
      description: 'Developed an app to track medical equipment via cameras, presented to 500+ attendees in the hackathon finalist round.',
      challenge: 'Hospitals often struggle with tracking critical medical equipment like gurneys and crash carts, leading to inefficiencies and delayed patient care.',
      solution: 'Created a computer vision system using YOLOv8 model to track gurneys and crash carts in real-time, integrated with geospatial visualization.',
      features: [
        'Real-time tracking of medical equipment via camera feeds',
        'Equipment location visualization on hospital floor plans',
        'Alerts for equipment shortages in critical areas'
      ],
      technologies: [
        'Python',
        'Javascript',
        'YOLOv3 Tiny API',
        'FastAPI websocket',
        'React.js',
        'Vector Tile Feature Service',
        'ArcGIS JS APIs',
        'ArcGIS Maps SDK for Javascript'
      ],
      outcome: 'Achieved 91% accuracy in identifying and tracking medical equipment within a 15-foot range, significantly improving hospital resource management.',
      githubUrl: 'https://github.com/danieljcohen/EsriHackathon',
      devpostUrl: 'https://devpost.com/software/asset-tracker-system',
      demoUrl: 'https://www.youtube.com/watch?v=arcgis-demo'
    },
    'ocr-calculator': {
      title: 'OCR Linear Algebra Calculator',
      date: 'May 2024',
      imgPath: linear,
      description: 'Created a command-line based Python tool to solve matrix problems from images without external math libraries.',
      challenge: 'While taking a linear algebra course, I wanted to practice solving linear alegebra problems, while improving my coding skills.',
      solution: 'I coded all the operations from scratch to reinforce my understanding of the concepts. Manually entering matrices was a pain, so I implemented OCR to convert images to matrices.',
      features: [
        'Image-to-matrix conversion using OCR',
        'Support for addition, subtraction, multiplication, and inversion operations',
        'Determinant and eigenvalue calculations',
      ],
      technologies: [
        'Python',
        'Custom OCR implementation',
        'Linear algebra algorithms',
        'Image processing techniques'
      ],
      outcome: 'Achieved 97% accuracy in character recognition within matrices, while practicing linear algebra.',
      githubUrl: 'https://github.com/danieljcohen/Linear-Coding',
      demoUrl: 'https://www.youtube.com/watch?v=ocr-calculator-demo'
    },
    'logisim-cpu': {
      title: 'Logisim CPU',
      date: 'December 2023',
      imgPath: cpu,
      description: 'Designed and implemented a 16-bit CPU with 9 functional units, including ALU, control unit, and registers.',
      challenge: 'Creating a fully functional CPU architecture that balances complexity and educational value for understanding computer architecture fundamentals.',
      solution: 'Designed a custom instruction set architecture and implemented it in Logisim with a complete datapath and control logic.',
      features: [
        '16-bit architecture with 9 functional units',
        'Custom instruction set with 16 operations',
        'Register file with general-purpose registers',
        'Support for arithmetic, logical, and control flow operations'
      ],
      technologies: [
        'Logisim',
        'Digital logic design',
        'Computer architecture principles',
        'Instruction set architecture design'
      ],
      outcome: 'Successfully integrated a set of 16 instructions into the CPU, enabling complex arithmetic and logical operations with efficient execution.',
    },
    'huffman-compression': {
      title: 'Huffman Process Compression Program',
      date: 'March 2023',
      imgPath: huffman,
      description: 'Implemented Huffman Compression in Java, achieving data compression for files ranging up to 12 GB in size.',
      challenge: 'Efficient compression of large files without significant loss of data integrity or excessive processing time.',
      solution: 'Developed a Huffman coding implementation with optimized binary tree traversal for encoding and decoding.',
      features: [
        'Variable-length prefix coding for efficient compression',
        'Support for files up to 12 GB in size',
        'Lossless compression and decompression',
        'Detailed compression statistics reporting'
      ],
      technologies: [
        'Java',
        'Binary trees',
        'Huffman coding algorithm',
        'File I/O operations',
        'Data structure optimization'
      ],
      outcome: 'Achieved 43% faster compression and decompression compared to traditional methods, with optimal space efficiency.',
      githubUrl: 'https://gitfront.io/r/user-4257705/ntyjaLzjW2Ff/huffman-compression/',
      devpostUrl: 'https://devpost.com/software/huffman-compression',
      websiteUrl: 'https://huffman-compression.example.com'
    }
  };

  const project = projectName ? projectDetails[projectName] : null;

  if (!project) {
    return (
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Project not found: {projectName}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-purple-500 px-4 py-2 rounded-md text-sm hover:bg-purple-600"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen py-16 px-5">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm mb-8 flex items-center gap-2 transition-colors"
        >
          ← Back to Projects
        </button>
        
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl">
          {/* Hero image */}
          <div className="h-64 w-full overflow-hidden relative">
            <img
              src={project.imgPath}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-end">
              <div className="p-8 w-full">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-purple-300 mb-2">{project.date}</div>
                  <div className="flex items-center gap-2">
                    {project.websiteUrl && (
                      <a 
                        href={project.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white bg-black/40 hover:bg-green-600 p-2 rounded-full transition-colors"
                        title="Visit Website"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
                        </svg>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white bg-black/40 hover:bg-red-600 p-2 rounded-full transition-colors"
                        title="Watch Demo"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                      </a>
                    )}
                    {project.devpostUrl && (
                      <a 
                        href={project.devpostUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white bg-black/40 hover:bg-blue-600 p-2 rounded-full transition-colors"
                        title="View on Devpost"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 16.836h-1.58L3.826 12.004l2.189-6.442h1.58l-2.412 7.345 2.412 5.539zm5.252-16.84h2.31l6.829 20.418h-2.31l-6.829-20.418zm-2.246 20.418H8.292l6.829-20.418h2.309l-6.829 20.418z"/>
                        </svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white bg-black/40 hover:bg-purple-500 p-2 rounded-full transition-colors"
                        title="View on GitHub"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white">{project.title}</h1>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-purple-400 mb-3">Overview</h2>
              <p className="text-gray-300">{project.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-purple-400 mb-3">The Challenge</h2>
                <p className="text-gray-300">{project.challenge}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-purple-400 mb-3">The Solution</h2>
                <p className="text-gray-300">{project.solution}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-purple-400 mb-3">Key Features</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-purple-400 mb-3">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-8">
              <h2 className="text-xl font-semibold text-purple-400 mb-3">Outcome</h2>
              <p className="text-gray-300">{project.outcome}</p>
              
              <div className="mt-6 flex flex-col gap-2">
                {project.websiteUrl && (
                  <p className="text-gray-300">
                    <span className="text-purple-400 font-medium">Website:</span>{" "}
                    <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Visit Website
                    </a>
                  </p>
                )}
                {project.demoUrl && (
                  <p className="text-gray-300">
                    <span className="text-purple-400 font-medium">Demo:</span>{" "}
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Watch Demo
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
