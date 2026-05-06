import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const techBadges = [
  { name: 'Python', color: '#3776AB' },
  { name: 'MySQL', color: '#4479A1' },
  { name: 'React', color: '#61DAFB' },
  { name: 'GitHub', color: '#181717' },
  { name: 'Pandas', color: '#150458' },
  { name: 'JavaScript', color: '#F7DF1E' },
];

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 overflow-hidden relative">
      {/* Soft Animated Gradient Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-accent-secondary/10 rounded-full blur-[150px] -z-10" 
      />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-accent text-sm font-bold uppercase tracking-[0.4em] block mb-4"
          >
            HELLO, I'M
          </motion.span>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.9]">
            <span className="accent-gradient-text">Vijay</span> <br />
            Barhate
          </h1>

          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-xl md:text-2xl font-medium text-text">
              B.E. Computer Engineering Student
            </h2>
            <p className="text-accent font-medium tracking-wide">
              Python Developer • SQL Enthusiast • Data Analysis Learner
            </p>
          </div>

          <p className="text-text-muted text-lg max-w-lg mb-10 leading-relaxed">
            I build practical applications using Python, SQL, and modern web technologies 
            while continuously improving my problem-solving skills through real-world projects.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button 
              size="lg" 
              className="gap-2 cursor-pointer group/btn" 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
              <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </Button>
            <a 
              href="/resume/Resume.pdf" 
              download="Vijay_Barhate_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="cursor-pointer hover:bg-white/5 transition-colors">
                Download Resume
              </Button>
            </a>
          </div>

          <div className="flex items-center gap-6 text-text-muted">
            <motion.a whileHover={{ y: -3, color: "var(--color-accent)" }} href="https://github.com/vijaybarhate" target="_blank" className="transition-colors"><Github size={24} /></motion.a>
            <motion.a whileHover={{ y: -3, color: "var(--color-accent)" }} href="https://linkedin.com/in/vijay-barhate" target="_blank" className="transition-colors"><Linkedin size={24} /></motion.a>
            <motion.a whileHover={{ y: -3, color: "var(--color-accent)" }} href="mailto:barhatevinay7777@gmail.com" className="transition-colors"><Mail size={24} /></motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Floating Profile Card */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-md aspect-square rounded-[40px] glass glow-cyan flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-accent-secondary/5" />
            
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="relative z-10 text-center p-8">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="w-32 h-32 rounded-3xl bg-surface border border-border flex items-center justify-center mb-6 mx-auto shadow-2xl cursor-default"
                >
                    <span className="text-5xl font-bold accent-gradient-text italic">VB</span>
                </motion.div>
                <h3 className="text-2xl font-bold mb-1">Vijay Barhate</h3>
                <p className="text-sm text-text-muted uppercase tracking-widest mb-6">Navi Mumbai, India</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    OPEN TO INTERNSHIPS
                </div>
            </div>

            {/* Floating Tech Badges with Hover Movement */}
            {techBadges.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  y: [0, -10, 0],
                  x: [0, i % 2 === 0 ? 5 : -5, 0]
                }}
                whileHover={{ scale: 1.1, y: -5, borderColor: "rgba(56, 189, 248, 0.5)" }}
                transition={{ 
                  delay: 0.5 + i * 0.1,
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute px-3 py-1.5 rounded-xl glass border border-white/5 shadow-xl text-[10px] font-bold tracking-wider uppercase cursor-default transition-colors"
                style={{
                  top: `${20 + (i * 12)}%`,
                  [i % 2 === 0 ? 'left' : 'right']: `${-5 + (i * 2)}%`
                }}
              >
                {tech.name}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Quick Stats Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-surface/50 border-y border-border backdrop-blur-sm py-8 hidden md:block">
        <div className="container mx-auto px-6 grid grid-cols-4 gap-8">
          {[
            { label: '4+ Projects', sub: 'Practical Systems' },
            { label: 'Python & SQL', sub: 'Core Technical Focus' },
            { label: 'Data Analytics', sub: 'Learning & Applying' },
            { label: 'Open to Internships', sub: 'Seeking Entry Roles' }
          ].map((stat, i) => (
            <div key={i} className="text-center group cursor-default">
              <h4 className="text-xl font-bold text-accent group-hover:scale-110 transition-transform duration-300">{stat.label}</h4>
              <p className="text-xs text-text-muted uppercase tracking-wider">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
