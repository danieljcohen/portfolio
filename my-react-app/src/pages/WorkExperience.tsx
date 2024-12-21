import React from 'react';
import esriLogo from '../assets/esri.png';
import c1Logo from '../assets/c1.png';
import dukeLogo from '../assets/duke.png';
import goliathLogo from '../assets/goliath.jpg';

const WorkExperience: React.FC = () => {
  const experiences = [
    {
      title: 'Incoming Software Engineer Intern',
      date: 'May 2024 – Aug 2024',
      company: 'Capital One',
      location: 'McLean, VA',
      bulletPoints: [], // No specific bullets provided yet
      logo: c1Logo,
    },
    {
      title: 'Software Engineer Intern',
      date: 'May 2024 – Aug 2024',
      company: 'Esri',
      location: 'Redlands, CA',
      bulletPoints: [
        'Developed a Python-based solution to locate detected text in indoor buildings using OCR, trigonometric calculations, and projection across coordinate systems, saving an average of 5 hours of manual data entry per customer.',
        'Utilized an ensemble method combining Keras, Tesseract, and MMOCR with an algorithm to unwarp text in 360-degree photos, achieving a 38% increase in text extraction accuracy and a 27% increase in positioning accuracy.',
        'Trained a model using PointCNN to detect desks in LiDAR data, achieving 82% accuracy on validation datasets.',
      ],
      logo: esriLogo,
    },
    {
      title: 'Software Engineer',
      date: 'May 2024 – Present',
      company: 'Duke University – Biomedical Engineering Research',
      location: 'Remote',
      bulletPoints: [
        'Implemented and optimized a suite of Python-based analysis tools on the Duke Compute Cluster, integrating methods for cell segmentation, data normalization, and cellular neighborhood analysis.',
        'Analyzed data from 1,000+ stained lung cancer samples treated with immunotherapy alongside Dr. John Hickey.',
        'Conducted multiplexed tissue imaging with CODEX, mapping cellular interactions using 54 unique protein markers.',
      ],
      logo: dukeLogo, // Replace with actual logo
    },
    {
      title: 'Software Engineer Intern',
      date: 'March 2024',
      company: 'Goliath Data AI',
      location: 'Remote',
      bulletPoints: [
        'Created a web-based tool for real estate rehab analysis, offering interactive calculations and CSV export functionality.',
        'Developed client-side functionality using TypeScript and React.js, enabling dynamic updates and reducing server load.',
        'Adopted Tailwind CSS for UI, reducing page load times by 7% and CSS codebase size by 44% for better performance.',
      ],
      logo: goliathLogo, // Replace with actual logo
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <h1 className="text-4xl font-bold text-white text-center mb-12">
        My <span className="text-purple-400">Work Experience</span>
      </h1>
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-white"></div>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`flex items-center mb-20 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
          >
            {/* Logo on Timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-gray-900 border border-white rounded-full shadow-lg flex items-center justify-center w-24 h-24">
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Content */}
            <div
              className={`w-5/12 px-8 ${index % 2 === 0 ? 'text-right' : 'text-left'} text-white`}
            >
              <h2 className="text-3xl font-semibold text-purple-400">{exp.company}</h2>
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <p className="text-gray-400 text-sm mb-1">
                {exp.date} – {exp.location}
              </p>
              {exp.bulletPoints.length > 0 && (
                <ul className="list-disc mt-4 space-y-2">
                  {exp.bulletPoints.map((point, i) => (
                    <li key={i} className="text-gray-300">
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
