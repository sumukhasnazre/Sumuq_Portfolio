import { motion, useScroll, useTransform } from 'motion/react';
import { Download, ArrowRight } from 'lucide-react';
import React from 'react';
import resumeData from '@/src/data/resume.json';
import { TechParticles } from './TechParticles';

export const Hero: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  const { scrollY } = useScroll();
  
  // Fade out image and text on scroll
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const y = useTransform(scrollY, [0, 400], [0, -50]);

  // Foreground image starts fully visible and fades out
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  // Background decorative image starts faint and fades out
  const bgImageOpacity = useTransform(scrollY, [0, 300], [0.4, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image Effect - Large and Faded */}
      <motion.div 
        style={{ opacity: bgImageOpacity }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <img 
          src="/profile.png" 
          alt="Background Profile" 
          className={`absolute right-[-10%] top-1/2 -translate-y-1/2 h-full w-auto object-contain blur-[1px] lg:blur-none transition-all duration-700 ${theme === 'dark' ? 'grayscale brightness-[0.6] sepia-[0.3] opacity-40' : 'grayscale-0 brightness-110 opacity-30'}`}
          referrerPolicy="no-referrer"
        />
        <div className={`absolute inset-0 bg-gradient-to-r transition-colors duration-500 ${
          theme === 'dark' 
          ? 'from-slate-950 via-slate-950/80 to-transparent' 
          : 'from-slate-50 via-slate-50/60 to-transparent'
        }`} />
      </motion.div>

      {/* Snowflake & Databricks Effects */}
      <TechParticles theme={theme} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          style={{ opacity, scale, y }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-6 transition-all ${
              theme === 'dark' 
              ? 'border-blue-500/20 bg-blue-500/10 text-blue-400' 
              : 'border-blue-200 bg-blue-50 text-blue-600'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
            </span>
            {resumeData.basics.title}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`text-6xl md:text-8xl font-bold tracking-tight mb-6 transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            {resumeData.basics.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-lg md:text-xl leading-relaxed max-w-2xl mb-10 transition-colors ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
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
              className={`group relative px-8 py-4 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                theme === 'dark' 
                ? 'bg-white text-slate-950 hover:bg-blue-50' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
              }`}
            >
              View Experience
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => window.print()}
              className={`px-8 py-4 font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 ${
                theme === 'dark'
                ? 'bg-slate-900 text-white border-white/10 hover:border-white/20'
                : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Headshot (Visible on desktop) - Placed to the right as requested */}
      <motion.div
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ opacity: imageOpacity }}
        className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-[450px] h-[650px] z-20 pointer-events-none"
      >
        <img 
          src="/profile.png" 
          alt="Sumukha Headshot"
          className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </section>
  );
};
