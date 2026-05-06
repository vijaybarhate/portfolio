import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { Mail, Linkedin, Send, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <Section id="contact" title="Let's Connect" subtitle="Contact & Collaboration">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <p className="text-text-muted text-lg mb-10 leading-relaxed">
            I’m currently open to <span className="text-accent font-medium">internships, collaborations</span>, 
            and opportunities related to software development, Python development, and data analysis.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all duration-300">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:barhatevinay7777@gmail.com" className="text-lg font-bold hover:text-accent transition-colors">
                  barhatevinay7777@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all duration-300">
                <Linkedin size={20} />
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-widest mb-1">LinkedIn</p>
                <a href="https://linkedin.com/in/vijay-barhate" target="_blank" className="text-lg font-bold hover:text-accent transition-colors">
                  linkedin.com/in/vijay-barhate
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all duration-300">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Location</p>
                <p className="text-lg font-bold">Kharghar, Navi Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-10 rounded-[40px] space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text/80 ml-2">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-surface border border-border rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors text-text placeholder:text-text-muted/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text/80 ml-2">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-surface border border-border rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors text-text placeholder:text-text-muted/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-text/80 ml-2">Message</label>
            <textarea
              placeholder="How can I help you?"
              rows={5}
              className="w-full bg-surface border border-border rounded-3xl px-6 py-4 outline-none focus:border-accent transition-colors text-text placeholder:text-text-muted/50 resize-none"
            />
          </div>
          <Button type="submit" className="w-full gap-2 py-5 text-base">
            <Send size={20} />
            Send Message
          </Button>
        </motion.form>
      </div>

      <footer className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} <span className="text-text font-bold">Vijay Barhate</span>. All rights reserved.
        </p>
        <p className="text-text-muted text-sm flex items-center gap-2">
          Built with <span className="text-accent font-bold">React</span> + <span className="text-accent-secondary font-bold">Tailwind</span>
        </p>
      </footer>
    </Section>
  );
};
