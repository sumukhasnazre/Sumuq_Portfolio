/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SplashScreen } from './components/SplashScreen';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Trophy, Code, Award, GraduationCap, Github, Linkedin, Mail, Smartphone } from 'lucide-react';
import resumeData from './data/resume.json';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30 selection:text-white text-slate-200">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <AnimatedBackground />

      {!showSplash && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Nav */}
          <nav className="fixed top-0 w-full z-50 px-6 py-6 border-b border-transparent">
            <div className="container mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
              <span className="text-xl font-bold tracking-tighter text-white">SN.</span>
              <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
                <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
                <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
              </div>
              <div className="flex gap-4">
                <a href={resumeData.basics.links.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href={resumeData.basics.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </nav>

          <Hero />

          {/* Top 3 Impact Strip */}
          <section className="py-12 border-y border-white/5 bg-white/[0.01]">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {resumeData.top_achievements.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white font-bold">{item.title}</div>
                      <div className="text-blue-400 text-xs font-mono mb-1">{item.metric}</div>
                      <div className="text-slate-400 text-sm leading-relaxed">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Experience />

          {/* Projects */}
          <section id="projects" className="py-24 bg-white/[0.01]">
            <div className="container mx-auto px-6">
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-white tracking-tight mb-4 text-center">Tech Forge</h2>
                <div className="h-1 w-12 bg-blue-500 mx-auto rounded-full" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumeData.projects.map((project, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400">
                        <Code className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono text-blue-400/80 bg-blue-500/10 px-2 py-1 rounded">
                        {project.stack}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{project.title}</h3>
                    <ul className="space-y-3">
                      {project.bullets.map((b, k) => (
                        <li key={k} className="text-sm text-slate-400 leading-relaxed">
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
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Award className="text-blue-400" /> Certifications
                </h2>
                <div className="grid gap-4">
                  {resumeData.certifications.map((cert, i) => (
                    <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-4">
                      <div className="h-8 w-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="text-slate-300 font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <GraduationCap className="text-blue-400" /> Education
                </h2>
                {resumeData.education.map((edu, i) => (
                  <div key={i} className="p-8 rounded-xl border border-blue-500/20 bg-blue-500/5">
                    <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-blue-400 font-medium">{edu.institution}</p>
                    <p className="text-slate-500 text-sm mt-3">{edu.dates}</p>
                  </div>
                ))}
                
                <h2 className="text-2xl font-bold text-white mb-8 mt-16 flex items-center gap-3">
                   Technical Proficiencies
                </h2>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(resumeData.skills).flatMap(([_, skills]) => skills).map((skill, i) => (
                    <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm hover:border-blue-500/30 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Footer - Contact */}
          <footer className="py-24 border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's build the future of data.</h2>
              <div className="flex flex-wrap justify-center gap-8 mb-16">
                <a href={`mailto:${resumeData.basics.email}`} className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-all font-medium">
                  <Mail className="w-5 h-5" /> {resumeData.basics.email}
                </a>
                <a href={`tel:${resumeData.basics.phone}`} className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-all font-medium">
                  <Smartphone className="w-5 h-5" /> {resumeData.basics.phone}
                </a>
              </div>
              
              <div className="flex justify-center gap-4">
                <a href={resumeData.basics.links.github} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-white border border-white/10">
                  <Github className="w-6 h-6" />
                </a>
                <a href={resumeData.basics.links.linkedin} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-white border border-white/10">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
              
              <p className="mt-16 text-slate-600 text-sm font-mono">
                &copy; {new Date().getFullYear()} {resumeData.basics.name}. All documentation preserved.
              </p>
            </div>
          </footer>
        </motion.main>
      )}
    </div>
  );
}

