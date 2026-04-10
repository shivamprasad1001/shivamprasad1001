import React from 'react';
import { motion } from 'framer-motion';
import type { BlogPost } from '../../types';
import { ArrowRight } from 'lucide-react';

const blogPosts: BlogPost[] = [
  {
    date: 'May 23, 2025',
    title: 'Digit Detector: Building Your First AI Model to Recognize Handwritten Digits',
    excerpt:
      'A beginner-friendly walkthrough for building, understanding, and deploying a handwritten digit recognizer with practical steps and deployment context.',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Qye9Jlw40I6S4UxCn8QXmA.jpeg',
    link: 'https://medium.com/@shivamprasad1001/digit-detector-building-your-first-ai-model-to-recognize-handwritten-digits-f51b30185f29',
  },
  {
    date: 'May 22, 2025',
    title: 'How to Write Your First Neural Network: A Complete Beginner’s Guide',
    excerpt:
      'A hands-on introduction to neural networks that stays accessible while still giving enough depth to build real intuition.',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*2Hcx99WCCqnb0Cpwmrs7Lg.jpeg',
    link: 'https://medium.com/@shivamprasad1001/how-to-write-your-first-neural-network-a-complete-beginners-guide-3ec3f0599315',
  },
];

const Blog: React.FC = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Writing</p>
            <h2 className="section-title mt-4">Technical notes, explainers, and beginner-friendly AI walkthroughs.</h2>
          </div>
          <a
            href="https://medium.com/@shivamprasad1001"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-slate-700"
          >
            See all articles on Medium
            <span className="relative">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </a>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.title}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              className="group glass-panel overflow-hidden rounded-[2rem]"
            >
              <div className="grid h-full gap-0 md:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[16rem] overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/70 via-transparent to-violet-500/10" />
                  <div className="absolute left-4 top-4 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs text-slate-900">
                    7-8 min read
                  </div>
                </div>
                <div className="flex flex-col justify-between p-6">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">{post.date}</p>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-slate-900">{post.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{post.excerpt}</p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-700">
                    <span className="translate-x-[-8px] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <ArrowRight className="h-4 w-4 text-cyan-300" />
                    </span>
                    Read more
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
