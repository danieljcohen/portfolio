import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Side: Designed and Developed */}
        <div className="text-sm md:text-base">
          Designed and Developed by <span className="text-purple-400 font-semibold">Daniel Cohen</span>
        </div>

        {/* Right Side: Social Links */}
        <div className="flex space-x-6">
          {/* GitHub */}
          <a
            href="https://github.com/danieljcohen"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transform hover:-translate-y-1 transition duration-300"
            aria-label="GitHub Profile"
          >
            <FaGithub size={24} />
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/daniel-cohen-0854b21ab/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transform hover:-translate-y-1 transition duration-300"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin size={24} />
          </a>
          {/* Email */}
          <a
            href="danieljcohen0@gmail.com"
            className="hover:text-purple-400 transform hover:-translate-y-1 transition duration-300"
            aria-label="Email Contact"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
