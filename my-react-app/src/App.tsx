import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import About from './pages/About';
import WorkExperience from './pages/WorkExperience';
import Projects from './pages/Projects';
import Resume from './pages/Resume';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex justify-around shadow-md">
          <div className = "w-1/2 flex">
            <NavLink to="/" className="px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">About</NavLink>
          </div>
          <NavLink to="/work" className="px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">Work Experience</NavLink>
          <NavLink to="/projects" className="px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">Projects</NavLink>
          <NavLink to="/resume" className="px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">Resume</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/work" element={<WorkExperience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
