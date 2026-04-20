import React from 'react';
import { ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="pb-10 pt-6">
      <div className="section-shell">
        <div className="glass-panel overflow-hidden rounded-[2rem]">
          <div className="relative border-b border-[#E0D9CF] px-6 py-10 sm:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(193,125,74,0.12),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(139,94,70,0.12),transparent_24%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="section-kicker">Next move</p>
                <h2 className="mt-4 font-display text-3xl font-bold text-[#2C2825] sm:text-4xl">
                  Let&apos;s build something sharp, useful, and a little ambitious.
                </h2>
              </div>
              <a
                href="https://www.linkedin.com/messaging/compose/?recipient=shivamprasad1001"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#C17D4A] px-5 py-3 text-sm font-medium text-white shadow-[0_16px_45px_rgba(193,125,74,0.15)] transition hover:bg-[#8B5E3C]"
              >
                Start the conversation
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#2C2825]">Shivam Prasad</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#7A6E65]">
                AI/ML developer focused on thoughtful product experiences, practical intelligence, and shipping systems that are useful in the real world.
              </p>
              <div className="mt-6 flex gap-3">
                {[
                  ['https://github.com/shivamprasad1001/', Github, 'hover:text-[#2C2825] hover:border-[#C17D4A]/50'],
                  ['https://www.linkedin.com/in/shivamprasad1001/', Linkedin, 'hover:text-[#C17D4A] hover:border-[#C17D4A]/50'],
                  ['https://x.com/Shivampr101', Twitter, 'hover:text-[#8B5E3C] hover:border-[#8B5E3C]/50'],
                ].map(([href, Icon, hoverClass]) => {
                  const ResolvedIcon = Icon as typeof Github;

                  return (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#E0D9CF] bg-white text-[#7A6E65] transition ${hoverClass}`}
                    >
                      <ResolvedIcon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#A89E94]">Navigation</p>
                <div className="mt-4 space-y-3 text-sm text-[#7A6E65]">
                  {[
                    ['#about', 'About'],
                    ['#toolkit', 'Toolkit'],
                    ['#portfolio', 'Projects'],
                    ['#experience', 'Experience'],
                    ['#contact', 'Contact'],
                  ].map(([href, label]) => (
                    <a key={href} href={href} className="block transition hover:text-[#C17D4A]">
                      {label}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#A89E94]">Info</p>
                <div className="mt-4 space-y-3 text-sm text-[#7A6E65]">
                  <p>shivamprasad1001@gmail.com</p>
                  <p>New Delhi, India</p>
                  <a href="./resume.pdf" download="shivam-resume.pdf" className="inline-block text-[#C17D4A] underline decoration-[#C17D4A]/30 transition hover:text-[#8B5E3C]">
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E0D9CF] px-6 py-4 text-xs text-[#A89E94] sm:px-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="inline-flex items-center gap-2">
                <span>Created by Shivam Prasad</span>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C17D4A]" />
                <span>All rights reserved</span>
              </p>
              <p>Built with React, TypeScript, and a brushed organic aesthetic.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
