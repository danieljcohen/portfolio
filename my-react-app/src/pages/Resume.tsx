import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { AiOutlineDownload } from "react-icons/ai";
import pdf from "../assets/resume.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ResumeNew: React.FC = () => {
  const [width, setWidth] = useState<number>(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  
  return (
    <div className="resume-section w-full">
      <div className="flex justify-center relative my-4">
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white px-4 py-2 rounded flex items-center max-w-xs"
        >
          <AiOutlineDownload className="mr-2" />
          Download CV
        </a>
      </div>

      <div className="resume flex justify-center my-4">
        <Document
          file={pdf}
          onLoadError={(error) => console.error('Error while loading PDF:', error)}
          className="flex justify-center"
        >
          <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
        </Document>
      </div>

      <div className="flex justify-center relative my-4">
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white px-4 py-2 rounded flex items-center max-w-xs"
        >
          <AiOutlineDownload className="mr-2" />
          Download CV
        </a>
      </div>
    </div>
  );
};

export default ResumeNew;
