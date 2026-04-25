import { motion, useScroll, useTransform } from 'motion/react';
import { Download, ArrowRight } from 'lucide-react';
import React from 'react';
import resumeData from '@/src/data/resume.json';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Fade out image and text on scroll
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const y = useTransform(scrollY, [0, 400], [0, -50]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image Effect */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <img 
          src="/input_file_0.png" 
          alt="Background" 
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[90%] w-auto object-contain opacity-30 grayscale blur-[2px] blur-sm lg:blur-none lg:opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          style={{ opacity, scale, y }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-mono mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {resumeData.basics.title}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6"
          >
            {resumeData.basics.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mb-10"
          >
            {resumeData.basics.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => scrollToSection('experience')}
              className="group relative px-8 py-4 bg-white text-slate-950 font-semibold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              View Experience
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => window.print()}
              className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Headshot (Visible on desktop) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ opacity }}
        className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-[400px] h-[600px] z-20 pointer-events-none"
      >
        <img 
          src="/input_file_0.png" 
          alt="Sumukha Headshot"
          className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </section>
  );
};
