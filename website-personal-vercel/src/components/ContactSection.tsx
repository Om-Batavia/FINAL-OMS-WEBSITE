import React, { useState } from 'react';
import { Button } from './Button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export function ContactSection() {
  const refHeader = useInViewAnimation<HTMLHeadingElement>(0.1);
  const refForm = useInViewAnimation<HTMLFormElement>(0.2);

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Founder portfolio inquiry from ${name}`);
    const body = encodeURIComponent([
      `Hi Om,`,
      ``,
      message,
      ``,
      `A few details that may help:`,
      `- Project or idea:`,
      `- Timeline:`,
      `- Best way to reply:`,
      ``,
      `From: ${name}`
    ].join('\n'));
    window.location.href = `mailto:ombatavia23@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="w-full py-24 px-6 bg-gray-50 dark:bg-[#051A24] border-t border-gray-100 dark:border-white/10 transition-colors">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <h2 ref={refHeader} className="font-['PP_Mondwest'] text-[40px] md:text-[56px] text-[#0D212C] dark:text-white mb-6">
          Let's build together
        </h2>
        <p className="text-[#051A24]/70 dark:text-[#E0EBF0]/70 mb-12 max-w-lg">
          Whether you need a custom AI system, a monthly partnership, or just want to chat about technology, I'm always open to new opportunities.
        </p>

        <form ref={refForm} onSubmit={handleSubmit} className="w-full flex flex-col gap-6 text-left">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-[#051A24] dark:text-white">Your Name</label>
              <input 
                id="name"
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white dark:bg-[#0D212C] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[#051A24] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#051A24] dark:focus:ring-white/50 transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-[#051A24] dark:text-white">Message</label>
            <textarea 
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white dark:bg-[#0D212C] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[#051A24] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#051A24] dark:focus:ring-white/50 transition-all resize-none"
              placeholder="Tell me about your project or idea..."
            />
          </div>

          <div className="mt-4 flex justify-center md:justify-start">
            <Button variant="primary" type="submit" className="w-full md:w-auto">
              Draft Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
