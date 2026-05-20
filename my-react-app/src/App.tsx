import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import About from './pages/About';
import WorkExperience from './pages/WorkExperience';
import Projects from './pages/Projects/Projects';
import Resume from './pages/Resume';
import ProjectDetail from './pages/Projects/ProjectDetail';
import Footer from './Footer';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import AmbientBackground from './components/AmbientBackground';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<About />} />
          <Route path="/work" element={<WorkExperience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectName" element={<ProjectDetail />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="grain relative flex min-h-screen flex-col bg-ink-950 text-white">
        <AmbientBackground />
        <ScrollProgress />
        <Navigation />

        <main className="relative z-10 flex-grow pt-24">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
