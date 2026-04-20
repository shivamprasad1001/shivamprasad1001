import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { ArrowRight, Clock3, Mail, MapPin, Sparkles } from 'lucide-react';

const perks = [
  'AI/ML + product engineering',
  'Production-ready implementation',
  'Clear async collaboration',
  'Fast iteration cycles',
];

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const sendEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    if (!serviceId || !templateId || !publicKey || !form.current) {
      setIsSubmitting(false);
      setSubmitStatus({ type: 'error', message: 'Email configuration is missing. Please try again later.' });
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
      setSubmitStatus({ type: 'success', message: 'Message sent successfully. I’ll get back to you soon.' });
      form.current.reset();
      setMessageLength(0);
    } catch {
      setSubmitStatus({ type: 'error', message: 'Message failed to send. Please try again in a bit.' });
    } finally {
      setIsSubmitting(false);
      setButtonOffset({ x: 0, y: 0 });
    }
  };

  const handleButtonMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    setButtonOffset({ x: x * 0.12, y: y * 0.18 });
  };

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="mb-12">
          <p className="section-kicker">Contact</p>
          <h2 className="section-title mt-4">If there’s a product idea worth building, let’s talk.</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C17D4A]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#8B5E3C]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E0D9CF]" />
                <span className="ml-3 font-mono text-xs uppercase tracking-[0.28em] text-[#A89E94]">terminal.outreach</span>
              </div>
              <div className="space-y-4 text-sm text-[#7A6E65]">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#C17D4A]" />
                  shivamprasad1001@gmail.com
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#8B5E3C]" />
                  New Delhi, India
                </div>
                <div className="flex items-center gap-3">
                  <Clock3 className="h-4 w-4 text-[#C17D4A]" />
                  Usually replies within 24 hours
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#A89E94]">why_work_with_me</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {perks.map((perk, index) => (
                  <div key={perk} className="inline-flex items-center gap-2 rounded-full border border-[#E0D9CF] bg-white px-4 py-2 text-sm text-[#7A6E65]">
                    <span className={`h-2 w-2 rounded-full ${index % 2 === 0 ? 'bg-[#C17D4A]' : 'bg-[#8B5E3C]'}`} />
                    {perk}
                  </div>
                ))}
              </div>
            </div>

            {submitStatus.message && (
              <div
                className={`mt-6 rounded-[1.4rem] border px-4 py-4 text-sm ${
                  submitStatus.type === 'success'
                    ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200'
                    : 'border-rose-400/25 bg-rose-400/10 text-rose-200'
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </div>

          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <div className="mb-8 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-[#C17D4A]" />
              <div>
                <h3 className="font-display text-2xl font-bold text-[#2C2825]">Send a project note</h3>
                <p className="mt-1 text-sm text-[#7A6E65]">Tell me what you&apos;re building, what stage you&apos;re in, and where AI or product engineering can help.</p>
              </div>
            </div>

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-3 block text-sm text-slate-600">Name</span>
                  <input
                    type="text"
                    name="user_name"
                    required
                    className="w-full border-0 border-b border-[#E0D9CF] bg-transparent px-0 py-3 text-[#2C2825] outline-none transition focus:border-[#C17D4A]"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-3 block text-sm text-slate-600">Email</span>
                  <input
                    type="email"
                    name="user_email"
                    required
                    className="w-full border-0 border-b border-[#E0D9CF] bg-transparent px-0 py-3 text-[#2C2825] outline-none transition focus:border-[#C17D4A]"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-3 block text-sm text-slate-600">Subject</span>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full border-0 border-b border-[#E0D9CF] bg-transparent px-0 py-3 text-[#2C2825] outline-none transition focus:border-[#C17D4A]"
                  placeholder="What are we building?"
                />
              </label>

              <label className="block">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-600">Message</span>
                  <span className="text-xs text-slate-500">{messageLength}/500</span>
                </div>
                <textarea
                  name="message"
                  rows={6}
                  maxLength={500}
                  required
                  onChange={(event) => setMessageLength(event.target.value.length)}
                  className="w-full resize-none border-0 border-b border-[#E0D9CF] bg-transparent px-0 py-3 text-[#2C2825] outline-none transition focus:border-[#C17D4A]"
                  placeholder="Project context, timeline, goals, and any constraints..."
                />
              </label>

              <motion.button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                onMouseMove={handleButtonMove}
                onMouseLeave={() => setButtonOffset({ x: 0, y: 0 })}
                animate={{ x: buttonOffset.x, y: buttonOffset.y }}
                transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                className={`inline-flex w-full items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-medium ${
                  isSubmitting
                    ? 'bg-[#E0D9CF] text-[#A89E94]'
                    : 'bg-[#C17D4A] text-white shadow-[0_16px_45px_rgba(193,125,74,0.22)] transition hover:bg-[#8B5E3C]'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
