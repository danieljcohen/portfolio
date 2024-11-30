import React from 'react';

const WorkExperience: React.FC = () => {
  const experiences = [
    {
      title: 'Software Engineer Intern at Capital One',
      date: 'June 2024 - August 2024',
      description: 'Worked on improving the payment processing system.',
      bulletPoints: [
        'Developed a Python-based solution to locate detected text in indoor buildings using OCR, trigonometric calculations, projection across coordinate systems, saving an average of 5 hours of manual data entry per customer.',
        'Collaborated with cross-functional teams to design scalable solutions.',
        'Implemented automated testing pipelines using Jenkins.',
      ],
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Capital_One_logo.png', // Replace with actual logo URL
    },
    {
      title: 'Software Engineer Intern at Esri',
      date: 'June 2023 - August 2023',
      description: 'Focused on machine learning enhancements for GIS software.',
      bulletPoints: [
        'Developed a feature extraction pipeline for satellite imagery.',
        'Reduced processing time by 30% through code optimization.',
        'Presented findings to senior leadership, leading to adoption of proposed changes.',
      ],
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Esri_logo.png', // Replace with actual logo URL
    },
  ];

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen py-12">
      <div className="relative w-full max-w-4xl">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-blue-500"></div>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`} //alternating every other row
          >
            {/* Logo on Timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-white border shadow-sm-2 border-gray-200 rounded-full shadow-lg flex items-center justify-center">
              <img src={exp.logo} alt={`${exp.title} logo`} className="w-20 h-20 object-contain" />
            </div>

            {/* Content */}
            <div
              className={`w-5/12 px-6 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
            >
              <h2 className="text-xl font-semibold">{exp.title}</h2>
              <p className="text-gray-700 text-sm">{exp.date}</p>
              <p className="text-gray-800 mt-2">{exp.description}</p>
              <ul className="list-disc mt-2 space-y-1">
                {exp.bulletPoints.map((point, i) => (
                  <li key={i} className="text-gray-700">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
