import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion } from 'framer-motion';
import { HiOutlineDownload } from 'react-icons/hi';
import { FaExternalLinkAlt } from 'react-icons/fa';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import MagneticButton from '../components/MagneticButton';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const Resume: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth - 32);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pdf = 'resume.pdf';

  function onDocumentLoadSuccess() {
    setLoading(false);
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth - 32);
    }
  }

  return (
    <div className="relative">
      <section className="mx-auto max-w-5xl px-6 pt-8 text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
          Resume
        </h1>

        {/* Action bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton>
            <a
              href={pdf}
              download="DanielCohen_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              <HiOutlineDownload className="text-base" />
              Download
            </a>
          </MagneticButton>
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:border-white/30 hover:bg-white/5"
          >
            Open in new tab <FaExternalLinkAlt size={11} />
          </a>
        </motion.div>
      </section>

      {/* Document frame */}
      <section className="mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-4"
        >
          {/* Browser-style chrome */}
          <div className="mb-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
              DanielCohen_Resume.pdf
            </div>
            <div className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-white/30 sm:block">
              1 / 1
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative flex max-h-[80vh] justify-center overflow-y-auto rounded-xl bg-white/95 p-4 sm:max-h-none sm:overflow-visible"
          >
            {loading && (
              <div className="flex h-96 items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-9 w-9 animate-spin rounded-full border-2 border-ink-700/30 border-t-ink-700" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-700">
                    Loading résumé…
                  </span>
                </div>
              </div>
            )}
            <Document
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) => console.error('Error loading PDF:', error)}
              className="flex justify-center"
            >
              <Page
                pageNumber={1}
                className="resume-page"
                width={containerWidth > 0 ? containerWidth : undefined}
                onRenderError={(error) => console.error('Render error:', error)}
              />
            </Document>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Resume;
