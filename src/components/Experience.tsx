import { motion } from 'motion/react';
import { Briefcase, Building2, MapPin, Calendar, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import resumeData from '@/src/data/resume.json';

export const Experience: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-16">
          <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${theme === 'dark' ? 'to-white/10' : 'to-black/10'}`} />
          <h2 className={`text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Professional Journey</h2>
          <div className={`h-px w-24 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
        </div>

        <div className="grid gap-6">
          {resumeData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                expandedIndex === idx 
                ? theme === 'dark' ? 'border-blue-500/30 bg-white/5' : 'border-blue-200 bg-white shadow-md'
                : theme === 'dark' ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]' : 'border-black/5 bg-white hover:bg-slate-50'
              }`}
            >
              <div 
                className="p-6 md:p-8 cursor-pointer"
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${
                      theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-blue-50 border border-blue-100 text-blue-600'
                    }`}>
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h3>
                      <div className={`flex flex-wrap items-center gap-y-1 gap-x-4 mt-1 text-sm transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        <span className="flex items-center gap-1.5 font-medium text-blue-500/80">
                          <Building2 className="w-4 h-4" /> {exp.company}
                        </span>
                        <span className="flex items-center gap-1.5 opacity-60">
                          <MapPin className="w-4 h-4" /> {exp.location}
                        </span>
                        <span className="flex items-center gap-1.5 opacity-60">
                          <Calendar className="w-4 h-4" /> {exp.dates}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex gap-2">
                      {exp.impact_highlights.map((tag, i) => (
                        <span key={i} className={`px-3 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wider transition-all ${
                          theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.div
                      animate={{ rotate: expandedIndex === idx ? 90 : 0 }}
                    >
                      <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: expandedIndex === idx ? 'auto' : 0, opacity: expandedIndex === idx ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className={`pt-8 border-t mt-6 transition-colors ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                    {exp.client && (
                      <div className="mb-4 inline-block px-3 py-1 rounded bg-blue-500/10 text-blue-500 text-xs font-bold">
                        Client: {exp.client}
                      </div>
                    )}
                    <ul className="grid gap-3">
                      {exp.bullets.map((bullet, k) => (
                        <li key={k} className={`flex gap-3 leading-relaxed transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
