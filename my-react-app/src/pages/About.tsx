import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { TypeAnimation } from 'react-type-animation';
import { FaCode, FaDatabase, FaServer, FaBrain, FaGithub, FaLinkedin, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import psychaide from '../assets/psychaide.png';

// Computer component with improved visuals
const Computer: React.FC = () => {
  const computerRef = useRef<THREE.Group>(null);
  
  // Gentle bobbing motion and slight rotation
  useFrame((state) => {
    if (computerRef.current) {
      // Reduced bobbing motion
      computerRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.03;
      // Slight rotation animation
      computerRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
    }
  });

  // Create code texture only once
  const codeTexture = useMemo(() => createCodeTexture(), []);

  return (
    <group ref={computerRef}>
      {/* Monitor */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1.3, 0.1]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        
        {/* Screen */}
        <mesh position={[0, 0, 0.06]} castShadow>
          <boxGeometry args={[1.8, 1.1, 0.01]} />
          <meshStandardMaterial color="#0a233f" emissive="#0a233f" emissiveIntensity={0.4} />
          
          {/* Code on screen */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[1.75, 1.05]} />
            <meshBasicMaterial>
              <canvasTexture
                attach="map"
                image={codeTexture}
                needsUpdate
              />
            </meshBasicMaterial>
          </mesh>
        </mesh>
      </mesh>
      
      {/* Monitor stand */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.4, 0.1]} />
        <meshStandardMaterial color="#111" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.1, 0.4]} />
        <meshStandardMaterial color="#111" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Keyboard */}
      <mesh position={[0, -0.6, 0.6]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.05, 0.6]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
        
        {/* Keyboard keys suggestion */}
        <group position={[0, 0.03, 0]}>
          {Array.from({ length: 6 }).map((_, row) => 
            Array.from({ length: 15 }).map((_, col) => (
              <mesh 
                key={`${row}-${col}`} 
                position={[(col - 7) * 0.1, 0, (row - 2.5) * 0.09]}
                scale={[0.08, 0.01, 0.07]}
              >
                <boxGeometry />
                <meshStandardMaterial color="#222" />
              </mesh>
            ))
          )}
        </group>
      </mesh>
      
      {/* Mouse */}
      <mesh position={[1.2, -0.6, 0.6]} castShadow receiveShadow rotation={[0, 0, 0]}>
        <capsuleGeometry args={[0.08, 0.2, 4, 8]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
};

// Function to create code-like texture with improved syntax highlighting
const createCodeTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  // Dark blue background
  ctx.fillStyle = '#0a233f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const lines = [
    'import React, { useState, useEffect } from "react";',
    'import { motion } from "framer-motion";',
    '',
    'const Portfolio = () => {',
    '  const [projects, setProjects] = useState([]);',
    '  const [isLoading, setIsLoading] = useState(true);',
    '',
    '  useEffect(() => {',
    '    fetchProjects().then(data => {',
    '      setProjects(data);',
    '      setIsLoading(false);',
    '    });',
    '  }, []);',
    '',
    '  return (',
    '    <motion.div',
    '      initial={{ opacity: 0 }}',
    '      animate={{ opacity: 1 }}',
    '      className="portfolio-container"',
    '    >',
    '      <h1>My Projects</h1>',
    '      {isLoading ? <Loader /> : <ProjectGrid projects={projects} />}',
    '    </motion.div>',
    '  );',
    '};',
    '',
    'export default Portfolio;'
  ];
  
  ctx.font = '14px monospace';
  
  // Enhanced syntax highlighting colors
  const colors = {
    keywords: '#ff79c6', // pink
    functions: '#50fa7b', // green
    strings: '#f1fa8c',  // yellow
    constants: '#bd93f9', // purple
    brackets: '#f8f8f2',  // white
    default: '#8be9fd',   // cyan
    jsx: '#ff5555',       // red
    comments: '#6272a4'   // blue-gray
  };
  
  lines.forEach((line, index) => {
    const y = 20 + (index * 20);
    let x = 20;
    
    // More comprehensive syntax highlighting
    const parts = line.split(/(import|from|const|let|function|return|useEffect|useState|=>|{|}|\(|\)|<|>|\/\/.*$|".*?"|'.*?'|=|,|;|\.|className)/g);
    
    parts.forEach(part => {
      if (!part) return;
      
      // Determine color based on text content
      if (/import|from|const|let|function|return|useEffect|useState|=>/.test(part)) {
        ctx.fillStyle = colors.keywords;
      } else if (/".*?"|'.*?'/.test(part)) {
        ctx.fillStyle = colors.strings;
      } else if (/\{|\}|\(|\)|<|>|=|,|;|\./.test(part)) {
        ctx.fillStyle = colors.brackets;
      } else if (/[A-Z][a-zA-Z]+/.test(part)) {
        ctx.fillStyle = colors.constants;
      } else if (/className/.test(part)) {
        ctx.fillStyle = colors.jsx;
      } else if (/\/\/.*$/.test(part)) {
        ctx.fillStyle = colors.comments;
      } else if (/\w+\(/.test(part)) {
        ctx.fillStyle = colors.functions;
      } else {
        ctx.fillStyle = colors.default;
      }
      
      ctx.fillText(part, x, y);
      x += ctx.measureText(part).width;
    });
  });
  
  return canvas;
};

// Skill category interface
interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
}


const About: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: "Backend",
      icon: <FaServer className="text-purple-500 text-2xl" />,
      skills: ["Python", "Java", "C", "C++", "Node.js", "FastAPI", "WebSockets", "WebRTC"]
    },
    {
      name: "Frontend",
      icon: <FaCode className="text-purple-500 text-2xl" />,
      skills: ["React", "Javascript", "TypeScript", "Next.js", "TailwindCSS", "D3.js"]
    },
    {
      name: "Database",
      icon: <FaDatabase className="text-purple-500 text-2xl" />,
      skills: ["MongoDB", "PostgreSQL", "Firebase"]
    },
    {
      name: "AI/ML",
      icon: <FaBrain className="text-purple-500 text-2xl" />,
      skills: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"]
    },
    {
      name: "DevOps & Tools",
      icon: <FaTools className="text-purple-500 text-2xl" />,
      skills: ["Docker", "AWS CDK", "Playwright", "Git", "Fly.io"]
    }
  ];

  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
      {/* Hero Section with enhanced animations */}
      <section className="relative w-full py-16 px-8 flex flex-col items-center justify-center overflow-hidden">
        {/* Animated background with particles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,81,192,0.2),transparent)] animate-pulse"></div>
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-purple-500/10"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`
              }}
            ></div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-semibold mb-6">
            I'm <span className="text-purple-400">Daniel Cohen</span>
          </h1>
          <div className="h-16">
            <TypeAnimation
              sequence={[
                'a Software Engineer',
                3000,
                'a Duke Student',
                3000,
                'passionate about AI/ML',
                3000,
                'a Full-Stack Developer',
                3000,
              ]}
              wrapper="h3"
              speed={50}
              className="text-3xl text-gray-300"
              repeat={Infinity}
            />
          </div>
          
          {/* Social links */}
          <div className="flex justify-center gap-4 mt-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition-colors">
              <FaGithub size={28} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition-colors">
              <FaLinkedin size={28} />
            </a>
          </div>
        </motion.div>
      </section>
      
      {/* About Me Section with improved layout */}
      <section className="py-12 px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-8 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                About Me
              </span>
              <span className="block h-1 w-20 bg-purple-500 mt-2"></span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              I'm a software engineer who is currently a rising senior studying Computer Science and Statistics at Duke University. 
            </p>
            
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              I have previously interned for AWS in NYC, a biomedical engineering lab at Duke, Esri in California, and a startup.
            </p>

            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              I love working on projects with friends in my free time, so feel free to reach out if you have an exciting idea!
            </p>
            
            <div className="mt-10 flex gap-4">
              <motion.a 
                onClick={() => navigate('/resume')} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                View Resume
              </motion.a>
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 bg-gray-800 border border-purple-500/30 rounded-full text-white font-medium hover:bg-gray-700 transition-all duration-300"
              >
                Contact Me
              </motion.a>
            </div>
          </div>
          
          {/* 3D Computer Animation with improved rendering */}
          <div className="w-full md:w-1/2 order-1 md:order-2 h-[450px] bg-gray-800/50 rounded-xl overflow-hidden shadow-xl border border-gray-700">
            <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
              <color attach="background" args={['#0f172a']} />
              <fog attach="fog" args={['#0f172a', 3, 10]} />
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <spotLight position={[5, 5, 5]} intensity={0.6} castShadow penumbra={1} />
                <directionalLight position={[-5, 5, -5]} intensity={0.4} castShadow />
                <Computer />
                <Environment preset="city" />
                <OrbitControls enableZoom={false} autoRotate={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
              </Suspense>
            </Canvas>
          </div>
        </motion.div>
      </section>
      
      {/* Skills Section with animated cards */}
      <section className="py-12 px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center relative"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              My Skills
            </span>
            <span className="block h-1 w-20 bg-purple-500 mt-2 mx-auto"></span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.2)' }}
                className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <motion.span 
                      key={idx}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(124, 58, 237, 0.3)' }}
                      className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full transition-colors duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center relative"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Featured Project
            </span>
            <span className="block h-1 w-20 bg-purple-500 mt-2 mx-auto"></span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-gray-800/70 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/30 transition-all duration-300 shadow-lg group max-w-4xl mx-auto"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 bg-gray-700 relative overflow-hidden">
                  <img 
                    src={psychaide}
                    alt="PsychAIde" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10"></div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">Jan-May 2025</span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:w-1/2">
                <h3 className="text-xl font-bold text-white mb-3">PsychAIde</h3>
                <p className="text-gray-300 mb-4">A HIPAA-compliant web application for forensic psychologists to manage court-ordered evaluations, streamlining invoicing time tracking, and case management workflows, with 30+ active users.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Next.js", "React", "TypeScript", "PostgreSQL"].map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-700 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link 
                  to="/projects/psychaide"
                  className="inline-block text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  View Project →
                </Link>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action with improved design */}
      <section id="contact" className="py-12 px-8 text-center bg-gradient-to-b from-gray-800/50 to-gray-900">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Let's Work Together
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's create something amazing together!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a 
              href="mailto:danieljcohen0@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gray-700 rounded-full text-white font-medium hover:bg-gray-600 transition-all duration-300 border border-gray-600 hover:border-purple-500/30"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;