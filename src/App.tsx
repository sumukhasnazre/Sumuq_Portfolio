/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SplashScreen } from './components/SplashScreen';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Trophy, Code, Award, GraduationCap, Github, Linkedin, Mail, Smartphone, Sun, Moon } from 'lucide-react';
import resumeData from './data/resume.json';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-500 ${
      theme === 'dark' 
      ? 'bg-slate-950 text-slate-200 selection:text-white' 
      : 'bg-slate-50 text-slate-800 selection:text-blue-900'
    }`}>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <AnimatedBackground theme={theme} />

      {!showSplash && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Nav */}
          <nav className="fixed top-0 w-full z-50 px-6 py-6 border-b border-transparent">
            <div className={`container mx-auto flex justify-between items-center backdrop-blur-xl border rounded-2xl px-6 py-3 transition-all ${
              theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-black/5 border-black/10'
            }`}>
              <span className={`text-xl font-bold tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>SN.</span>
              <div className={`hidden md:flex gap-8 text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                <a href="#experience" className="hover:text-blue-500 transition-colors">Experience</a>
                <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
                <a href="#skills" className="hover:text-blue-500 transition-colors">Skills</a>
              </div>
              <div className="flex gap-4 items-center">
                <button 
                  onClick={toggleTheme}
                  className={`p-2 rounded-xl transition-all ${
                    theme === 'dark' ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-black/5 text-slate-500'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <div className="w-px h-6 bg-slate-800/20" />
                <a href={resumeData.basics.links.github} target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-black'} transition-colors`}>
                  <Github className="w-5 h-5" />
                </a>
                <a href={resumeData.basics.links.linkedin} target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-black'} transition-colors`}>
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </nav>

          <Hero theme={theme} />

          {/* Top 3 Impact Strip */}
          <section className={`py-12 border-y transition-colors ${
            theme === 'dark' ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'
          }`}>
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {resumeData.top_achievements.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</div>
                      <div className="text-blue-500 text-xs font-mono mb-1">{item.metric}</div>
                      <div className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} text-sm leading-relaxed`}>{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Experience theme={theme} />

          {/* Projects */}
          <section id="projects" className={`py-24 transition-colors ${
            theme === 'dark' ? 'bg-white/[0.01]' : 'bg-black/[0.01]'
          }`}>
            <div className="container mx-auto px-6">
              <div className="mb-16">
                <h2 className={`text-3xl font-bold tracking-tight mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Tech Forge</h2>
                <div className="h-1 w-12 bg-blue-500 mx-auto rounded-full" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumeData.projects.map((project, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className={`p-8 rounded-2xl border transition-all ${
                      theme === 'dark' 
                      ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]' 
                      : 'border-black/5 bg-white hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-blue-500 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <Code className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono text-blue-500 bg-blue-500/10 px-2 py-1 rounded">
                        {project.stack}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                    <ul className="space-y-3">
                      {project.bullets.map((b, k) => (
                        <li key={k} className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills & Certs */}
          <section id="skills" className="py-24">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <Award className="text-blue-500" /> Certifications
                </h2>
                <div className="grid gap-4">
                  {resumeData.certifications.map((cert, i) => (
                    <div key={i} className={`p-5 rounded-xl border flex items-center gap-4 ${
                      theme === 'dark' ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-white shadow-sm'
                    }`}>
                      <div className="h-8 w-8 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className={`font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <GraduationCap className="text-blue-500" /> Education
                </h2>
                {resumeData.education.map((edu, i) => (
                  <div key={i} className={`p-8 rounded-xl border ${
                    theme === 'dark' ? 'border-blue-500/20 bg-blue-500/5' : 'border-blue-200 bg-blue-50'
                  }`}>
                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{edu.degree}</h3>
                    <p className="text-blue-500 font-medium">{edu.institution}</p>
                    <p className={`text-sm mt-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{edu.dates}</p>
                  </div>
                ))}
                
                <h2 className={`text-2xl font-bold mb-8 mt-16 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                   Technical Proficiencies
                </h2>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(resumeData.skills).flatMap(([_, skills]) => skills).map((skill, i) => (
                    <span key={i} className={`px-4 py-2 rounded-lg border text-sm transition-all cursor-default ${
                      theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-slate-300 hover:border-blue-500/30' 
                      : 'bg-white border-black/10 text-slate-600 hover:border-blue-300 shadow-sm'
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Footer - Contact */}
          <footer className={`py-24 border-t transition-colors ${
            theme === 'dark' ? 'border-white/5' : 'border-black/5 bg-slate-100'
          }`}>
            <div className="container mx-auto px-6 text-center">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Let's build the future of data.</h2>
              <div className="flex flex-wrap justify-center gap-8 mb-16">
                <a href={`mailto:${resumeData.basics.email}`} className={`flex items-center gap-2 transition-all font-medium ${
                  theme === 'dark' ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'
                }`}>
                  <Mail className="w-5 h-5" /> {resumeData.basics.email}
                </a>
                <a href={`tel:${resumeData.basics.phone}`} className={`flex items-center gap-2 transition-all font-medium ${
                  theme === 'dark' ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'
                }`}>
                  <Smartphone className="w-5 h-5" /> {resumeData.basics.phone}
                </a>
              </div>
              
              <div className="flex justify-center gap-4">
                <a href={resumeData.basics.links.github} className={`p-4 rounded-2xl border transition-all ${
                  theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white border-white/10' : 'bg-white hover:bg-slate-50 text-slate-900 border-black/10 shadow-sm'
                }`}>
                  <Github className="w-6 h-6" />
                </a>
                <a href={resumeData.basics.links.linkedin} className={`p-4 rounded-2xl border transition-all ${
                  theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white border-white/10' : 'bg-white hover:bg-slate-50 text-slate-900 border-black/10 shadow-sm'
                }`}>
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
              
              <p className="mt-16 text-slate-500 text-sm font-mono">
                &copy; {new Date().getFullYear()} {resumeData.basics.name}. All documentation preserved.
              </p>
            </div>
          </footer>
        </motion.main>
      )}
    </div>
  );
}

