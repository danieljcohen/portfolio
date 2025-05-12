import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const Resume: React.FC = () => {
  const [width, setWidth] = useState<number>(1200);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pdf = "resume.pdf"; // Path to file in the public folder

  return (
    <div className="resume-container flex flex-col items-center bg-gray-900 min-h-screen py-10">
      <div className="header-section mb-4">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          My <span className="text-purple-400">Resume</span>
        </h1>
      </div>
      <div className="pdf-viewer w-full max-w-4xl bg-white rounded shadow-md flex justify-center items-start">
        {loading && (
          <div className="loading-spinner flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-purple-500 border-solid"></div>
          </div>
        )}
        <Document
          file={pdf}
          onLoadSuccess={() => setLoading(false)}
          onLoadError={(error) => console.error("Error loading PDF:", error)}
        >
          <Page
            pageNumber={1}
            scale={width > 786 ? 1.5 : 0.9} // Adjusted scale to maintain good size
            className="resume-page"
            onRenderError={(error) => console.error("Render error:", error)}
          />
        </Document>
      </div>
      <div className="download-btn mt-8">
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-500 text-white px-6 py-3 rounded shadow mt-20 hover:bg-purple-400"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default Resume;
