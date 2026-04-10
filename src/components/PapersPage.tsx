import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ExternalLink, Expand, FileText, FolderOpen, Users, X } from 'lucide-react';
import type { ResearchPaper } from '../../types';
import papersData from '../data/papersData.json';

const papers = papersData as ResearchPaper[];

const PapersPage: React.FC = () => {
  const [selectedPaper, setSelectedPaper] = React.useState<ResearchPaper | null>(
    papers.find((paper) => paper.pdfPath) ?? null
  );
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  return (
    <main className="min-h-screen py-24 sm:py-28">
      <div className="section-shell">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </a>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="quiet-panel rounded-[2rem] p-8 sm:p-10"
        >
          <p className="section-kicker">Read papers</p>
          <h1 className="section-title mt-4">A growing library of my research work, drafts, and paper uploads.</h1>
          <p className="section-copy mt-4">
            A focused space for the ideas, experiments, and papers that are shaping my journey toward AI/ML research.
          </p>
        </motion.section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
          <div className="space-y-6">
            {papers.map((paper, index) => (
              <motion.article
                key={`${paper.title}-${paper.year}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="glass-panel rounded-[2rem] p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">{paper.venue}</p>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-slate-900 sm:text-3xl">{paper.title}</h2>
                  </div>
                  <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm text-cyan-700">
                    {paper.status}
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-600">{paper.summary}</p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                    <BookOpen className="h-4 w-4 text-cyan-500" />
                    {paper.year}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                    <Users className="h-4 w-4 text-violet-400" />
                    {paper.collaborators.length} collaborators
                  </div>
                </div>

                <div className="mt-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">Authors</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {paper.collaborators.map((name) => (
                      <span key={name} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  {paper.pdfPath ? (
                    <button
                      type="button"
                      onClick={() => setSelectedPaper(paper)}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white"
                    >
                      <FileText className="h-4 w-4" />
                      Read inside website
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-5 py-3 text-sm text-slate-500">
                      <FolderOpen className="h-4 w-4" />
                      Add PDF later in public/papers/
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="glass-panel h-fit rounded-[2rem] p-6 sm:p-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">research_quote</p>
              <blockquote className="mt-4">
                <p className="font-display text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
                  “Great research begins with curiosity and grows through consistency.”
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Each paper I write is part of a bigger goal: to learn deeply, build carefully, and contribute something meaningful to AI/ML.
                </p>
              </blockquote>
            </motion.aside>
          </div>

          <div className="xl:sticky xl:top-28">
            {selectedPaper?.pdfPath ? (
              <motion.section
                key={selectedPaper.pdfPath}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
                className="glass-panel rounded-[2rem] p-4 sm:p-6"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">embedded_reader</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
                      {selectedPaper.title}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFullscreen(true)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      Full screen read
                      <Expand className="h-4 w-4" />
                    </button>

                    <a
                      href={selectedPaper.pdfPath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      Open raw PDF
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                  <iframe
                    title={selectedPaper.title}
                    src={`${selectedPaper.pdfPath}#toolbar=1&navpanes=0&view=FitH`}
                    className="h-[78vh] min-h-[42rem] w-full"
                  />
                </div>
              </motion.section>
            ) : (
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
                className="glass-panel rounded-[2rem] p-6 sm:p-8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">embedded_reader</p>
                <h2 className="mt-4 font-display text-2xl font-semibold text-slate-900">Select a paper to preview it here.</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  When a visitor clicks <span className="font-medium text-slate-900">Read inside website</span>, the paper will open in this right-side embedded reader.
                </p>
              </motion.section>
            )}
          </div>
        </section>

        <AnimatePresence>
          {isFullscreen && selectedPaper?.pdfPath && (
            <>
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFullscreen(false)}
                className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm"
                aria-label="Close fullscreen paper reader"
              />

              <motion.section
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 12 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-4 z-[130] flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.35)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">fullscreen_reader</p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-slate-900 sm:text-2xl">
                      {selectedPaper.title}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={selectedPaper.pdfPath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      Open raw PDF
                      <ExternalLink className="h-4 w-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsFullscreen(false)}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-medium text-white"
                    >
                      Close
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <iframe
                  title={`${selectedPaper.title} fullscreen`}
                  src={`${selectedPaper.pdfPath}#toolbar=1&navpanes=0&view=FitH`}
                  className="h-full w-full flex-1 bg-white"
                />
              </motion.section>
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default PapersPage;
