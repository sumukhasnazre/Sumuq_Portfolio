import { motion } from "motion/react";
import {
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react";
import React, { useState } from "react";
import resumeData from "@/src/data/resume.json";

export const Experience: React.FC = () => {
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
                ? 'border-blue-500/30 bg-white/5' 
                : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
              }`}
            >
              <div
                className="p-6 md:p-8 cursor-pointer"
                onClick={() =>
                  setExpandedIndex(expandedIndex === idx ? null : idx)
                }
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1 text-slate-400 text-sm">
                        <span className="flex items-center gap-1.5 font-medium text-blue-400/80">
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
                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-mono uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.div
                      animate={{ rotate: expandedIndex === idx ? 90 : 0 }}
                    >
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedIndex === idx ? "auto" : 0,
                    opacity: expandedIndex === idx ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-8 border-t border-white/5 mt-6">
                    {exp.client && (
                      <div className="mb-4 inline-block px-3 py-1 rounded bg-blue-500/10 text-blue-500 text-xs font-bold">
                        Client: {exp.client}
                      </div>
                    )}
                    <ul className="grid gap-3">
                      {exp.bullets.map((bullet, k) => (
                        <li key={k} className="flex gap-3 text-slate-400 leading-relaxed">
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
