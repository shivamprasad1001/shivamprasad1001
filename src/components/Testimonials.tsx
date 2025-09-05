import React from 'react';
import type { Testimonial } from '../../types';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div>
    <p className="font-serif text-4xl font-bold text-gray-800 dark:text-white">{value}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg shadow-sm">
        <h4 className="font-serif text-xl font-bold text-gray-800 dark:text-white mb-2">{testimonial.role}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{testimonial.quote}</p>
        <div className="flex items-center">
            <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-10 h-10 rounded-full object-cover mr-3" />
            <div>
                <p className="font-bold text-sm text-gray-800 dark:text-white">{testimonial.author}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Client</p>
            </div>
        </div>
    </div>
);


const testimonials: Testimonial[] = [
    {
        quote: "Shivam built a fast, responsive, and visually stunning website for our startup. His attention to detail and commitment to quality is truly remarkable.",
        author: 'Chris White',
        role: 'Amazing Web App!',
        avatarUrl: 'https://picsum.photos/seed/chris/100/100'
    },
    {
        quote: "I had the pleasure of collaborating with Shivam on a complex project. His technical skills and problem-solving abilities were instrumental to our success.",
        author: 'Alina Quaal',
        role: 'Excellent Collaboration',
        avatarUrl: 'https://picsum.photos/seed/alina/100/100'
    }
]

const clientLogos = [
    "Capture",
    "A.M.S",
    "Innovech",
    "Make Events",
    "A Horizon"
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-[#F0F4F4] dark:bg-gray-800/50 py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center text-gray-800 dark:text-white mb-16">My Clients' Words</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left side: Stats */}
            <div className="flex flex-col space-y-10">
                <StatItem value="2+" label="Years of experience in the industry."/>
                <StatItem value="15+" label="Projects completed successfully."/>
                <StatItem value="98%" label="Satisfaction rate of most of my clients."/>
            </div>

            {/* Right side: Testimonials */}
            <div className="space-y-8">
                {testimonials.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
            </div>
        </div>

        {/* Client Logos */}
        <div className="mt-20">
            <div className="flex items-center justify-between">
                <button className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">
                    <ChevronLeftIcon className="w-6 h-6"/>
                </button>
                <div className="flex-grow overflow-hidden">
                    <div className="flex items-center justify-around space-x-4">
                        {clientLogos.map((logo) => (
                            <div key={logo} className="flex-shrink-0 text-center">
                                <span className="font-serif text-xl font-medium text-gray-400 dark:text-gray-500 tracking-widest">{logo}</span>
                            </div>
                        ))}
                    </div>
                </div>
                 <button className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">
                    <ChevronRightIcon className="w-6 h-6"/>
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;