import React from 'react';
import type { BlogPost } from '../../types';
import { ArrowRightIcon, HelpfulTipsIcon } from './Icons';

const blogPosts: BlogPost[] = [
  {
    date: 'May 23,2025 · 7 min read ',
    title: 'Digit_detector: Building Your First AI Model to Recognize Handwritten Digits',
    excerpt: 'Have you ever wondered how computers can recognize handwritten digits? In this comprehensive tutorial, we’ll build an AI model from scratch that can identify and classify handwritten digits (0–9) with impressive accuracy. By the end of this post, you’ll not only have a working digit detector but also know how to deploy it on Hugging Face for the world to use!',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Qye9Jlw40I6S4UxCn8QXmA.jpeg',
    link: 'https://medium.com/@shivamprasad1001/digit-detector-building-your-first-ai-model-to-recognize-handwritten-digits-f51b30185f29'

  },
  {
    date: 'May 22,2025 · 8 min read',
    title: 'How to Write Your First Neural Network: A Complete Beginner’s Guide',
    excerpt: 'Discover how to leverage the power of Next.js for server-side rendering and Tailwind CSS for rapid UI development to build a stunning portfolio...',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*2Hcx99WCCqnb0Cpwmrs7Lg.jpeg',
    link: 'https://medium.com/@shivamprasad1001/how-to-write-your-first-neural-network-a-complete-beginners-guide-3ec3f0599315'
  }
];

const PostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <div className="flex flex-col sm:flex-row items-center gap-6">
    <div className="w-full sm:w-2/5 flex-shrink-0">
      <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
    </div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{post.date}</p>
      <h3 className="font-serif text-xl font-bold text-gray-800 dark:text-white mb-2">{post.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{post.excerpt}</p>
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-2 text-xs font-semibold text-white bg-gray-800 dark:bg-gray-700 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 shadow-md"
      >
        READ MORE
      </a>

    </div>
  </div>
);

const SideArticle: React.FC<{ number: string; title: string; link}> = ({ number, title,link }) => (
  <div>
    <p className="text-sm font-bold text-gray-800 dark:text-white">{number}</p>
    <h4 className="font-medium text-gray-700 dark:text-gray-300 mt-1 hover:text-black dark:hover:text-white transition-colors"><a href={link} target="_blank">{title}</a></h4>
  </div>
);


const Blog: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FDFDFD] dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-64 h-64 bg-pink-50 dark:bg-pink-500/10 rounded-full opacity-50 filter blur-3xl -translate-x-1/2"></div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-64 h-64 bg-teal-50 dark:bg-teal-500/10 rounded-full opacity-50 filter blur-3xl translate-x-1/2"></div>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center text-gray-800 dark:text-white mb-16">My Blog</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-10">
            <div className="flex items-center space-x-3">
              <HelpfulTipsIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <p className="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400">HELPFUL TIPS</p>
            </div>
            <div className="space-y-6">
              <SideArticle number="01." title="How to Choose the Right Model Management Strategy for Your AI Project" link="https://medium.com/@shivamprasad1001/digit-detector-building-your-first-ai-model-to-recognize-handwritten-digits-f51b30185f29" />
              <SideArticle number="02." title="Performance Optimization Tips for Deploying Deep Learning Models" link = "https://medium.com/@shivamprasad1001/how-to-write-your-first-neural-network-a-complete-beginners-guide-3ec3f0599315" />
            </div>
            <div className="pt-4">
              <a href="https://medium.com/@shivamprasad1001" target="_blank"
                rel="noopener noreferrer" className="inline-block text-sm font-bold tracking-wider text-gray-800 dark:text-white underline underline-offset-4 decoration-2 decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-800 dark:hover:decoration-white transition">
                  <button className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-300 group">
              <ArrowRightIcon className="w-6 h-6 transform group-hover:rotate-45 transition-transform" />
            </button>
                </a>
            </div>
            
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-12">
            {blogPosts.map((post, i) => <PostCard key={i} post={post} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;