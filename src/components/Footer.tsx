import React from 'react';
import { ArrowRightIcon, GitHubIcon, TwitterIcon, LinkedInIcon } from './Icons';

const FooterLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">{children}</a>
);

const Footer: React.FC = () => {
    return (
        <footer id="contact" className="bg-[#FDFDFD] dark:bg-gray-900">
            <div className="bg-[#FEF7F7] dark:bg-slate-800/50 py-16">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 mb-2"><b>Ready to Elevate Your Brand with AI-Powered Innovation?</b></p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                If you're looking for intelligent, scalable, and future-ready AI solutions that transform your ideas into reality, you’re in the right place!
                                As an <b>AI/ML developer</b>, I specialize in building everything from <b>custom AI assistants and deep learning models to smart automation tools and data-driven applications</b> — designed to help your brand stay ahead in the AI-first era.
                            </p>
                        </div>
                        <div className="flex items-center justify-end space-x-6">
                            <p className="font-serif text-xl font-medium text-gray-800 dark:text-white text-right max-w-xs">
                                Let's turn your creative ideas into stunning AI applications!
                            </p>
                            <a href="https://www.linkedin.com/messaging/compose/?recipient=shivamprasad1001" target="_blank">
                               <button className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-300 group">
                                <ArrowRightIcon className="w-8 h-8 transform group-hover:rotate-45 transition-transform" />
                            </button>
                            </a>

                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-16 sm:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Column 1: Hire Me & Socials */}
                        <div className="md:col-span-2 lg:col-span-2">
                            <h3 className="font-serif text-3xl font-bold text-gray-800 dark:text-white">Hire Me for Your Next Big Project!</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">Contact me in any convenient way to discuss your idea.</p>
                            <div className="flex flex-wrap gap-4 mt-6">
                                <a href="https://github.com/shivamprasad1001/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-wider text-gray-800 dark:text-white underline underline-offset-4 decoration-2 decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-800 dark:hover:decoration-white transition">GITHUB</a>
                                <a href="https://www.linkedin.com/in/shivamprasad1001/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-wider text-gray-800 dark:text-white underline underline-offset-4 decoration-2 decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-800 dark:hover:decoration-white transition">LINKEDIN</a>
                                <a href="https://x.com/Shivampr101" target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-wider text-gray-800 dark:text-white underline underline-offset-4 decoration-2 decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-800 dark:hover:decoration-white transition">TWITTER</a>
                            </div>
                        </div>
                        {/* Column 2: Navigation */}
                        <div>
                            <h4 className="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 mb-4">NAVIGATION</h4>
                            <div className="flex flex-col space-y-3">
                                <FooterLink href="#about">About Me</FooterLink>
                                <FooterLink href="#toolkit">My Toolkit</FooterLink>
                                <FooterLink href="#portfolio">Portfolio</FooterLink>
                                <FooterLink href="#experience">Experience</FooterLink>
                                <FooterLink href="#contact">Contacts</FooterLink>
                            </div>
                        </div>
                        {/* Column 3: Information */}
                        <div>
                            <h4 className="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 mb-4">INFORMATION</h4>
                            <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
                                <p>Name: Shivam Prasad</p>
                                <p>Email: shivamprasad1001@gmail.com</p>
                                <p>City: New Delhi, India</p>
                            </div>
                            <a href="./shivam's-resume.pdf" download="shivam's-resume.pdf"
                            className="inline-block mt-4 text-xs font-bold tracking-widest text-gray-800 dark:text-white underline underline-offset-4 decoration-2 decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-800 dark:hover:decoration-white transition">
                                DOWNLOAD CV
                            </a>
                        </div>
                    </div>
                    <div className="mt-16 sm:mt-20 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <p>CREATED BY SHIVAM PRASAD</p>
                        <p>ALL RIGHTS RESERVED</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;