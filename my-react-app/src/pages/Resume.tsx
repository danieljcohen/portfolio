import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const Resume: React.FC = () => {
  const [width, setWidth] = useState<number>(1200);
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (containerRef.current) {
        // Set the container width to be used for PDF scaling
        setContainerWidth(containerRef.current.clientWidth - 32); // Account for padding
      }
    };
    
    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate appropriate scale based on screen width
  const getScale = () => {
    // Return a fixed small value to let the width prop handle the sizing
    return width > 768 ? 1 : 1;
  };

  const pdf = "resume.pdf"; // Path to file in the public folder

  function onDocumentLoadSuccess() {
    setLoading(false);
    
    // Update container width again after document loads
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth - 32);
    }
  }

  return (
    <div className="resume-container flex flex-col items-center bg-gray-900 min-h-screen py-10 px-2">
      <div className="header-section mb-4">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          My <span className="text-purple-400">Resume</span>
        </h1>
      </div>
      <div 
        ref={containerRef}
        className="pdf-viewer w-full max-w-4xl bg-white rounded shadow-md flex justify-center items-start overflow-y-auto md:overflow-visible md:max-h-none max-h-[70vh] py-4"
      >
        {loading && (
          <div className="loading-spinner flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-purple-500 border-solid"></div>
          </div>
        )}
        <Document
          file={pdf}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("Error loading PDF:", error)}
          className="flex justify-center"
        >
          <Page
            pageNumber={1}
            scale={getScale()}
            className="resume-page"
            width={containerWidth > 0 ? containerWidth : undefined}
            onRenderError={(error) => console.error("Render error:", error)}
          />
        </Document>
      </div>
      <div className="download-btn mt-8">
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-500 text-white px-6 py-3 rounded shadow hover:bg-purple-400"
          download="DaniyChen_Resume.pdf"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default Resume;
