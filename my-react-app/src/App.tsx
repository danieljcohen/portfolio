import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import About from './pages/About';
import WorkExperience from './pages/WorkExperience';
import Projects from './pages/Projects/Projects';
import Resume from './pages/Resume';
import ProjectDetail from './pages/Projects/ProjectDetail';
import Footer from './Footer'; // Import the Footer component

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation Bar - Updated for better mobile centering */}
        <nav className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-nowrap justify-center overflow-x-auto shadow-md">
          <NavLink to="/" className="whitespace-nowrap px-3 sm:px-4 py-2 mx-1 text-center rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">
            About
          </NavLink>
          <NavLink to="/work" className="whitespace-nowrap px-3 sm:px-4 py-2 mx-1 text-center rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">
            Work Experience
          </NavLink>
          <NavLink to="/projects" className="whitespace-nowrap px-3 sm:px-4 py-2 mx-1 text-center rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">
            Projects
          </NavLink>
          <NavLink to="/resume" className="whitespace-nowrap px-3 sm:px-4 py-2 mx-1 text-center rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">
            Resume
          </NavLink>
        </nav>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/work" element={<WorkExperience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectName" element={<ProjectDetail />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
