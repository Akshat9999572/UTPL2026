import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy, Activity, ArrowRight } from 'lucide-react';

const tournamentUrl = 'https://cricheroes.in/tournament/lOnAYW/Rotary-Club-of-Unnao-Royal-Teachers-Championship';

export default function LiveScoresSection() {
  return (
    <section id="live-scores" className="py-24 bg-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <p className="uppercase tracking-[0.3em] text-primary text-sm font-bold mb-2">Live Tournament Center</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white">TOURNAMENT FEED</h2>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-2xl p-8 md:p-16 text-center"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex justify-center mb-8 relative z-10">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Activity className="text-primary w-12 h-12" />
            </div>
          </div>
          
          <h3 className="text-3xl md:text-5xl font-display mb-6 relative z-10">Live Action & Real-Time Stats</h3>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 relative z-10 leading-relaxed">
            Follow every ball, track team standings, and view upcoming fixtures directly on our official CricHeroes tournament dashboard.
          </p>
          
          <a
            href={tournamentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-secondary px-8 py-5 md:py-6 rounded-none font-display text-lg md:text-2xl tracking-wider hover:bg-white hover:text-secondary transition-all duration-300 relative z-10 group"
          >
            VIEW LIVE DASHBOARD 
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </a>

          <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12 opacity-50 relative z-10">
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
              <Trophy className="w-5 h-5 text-primary" /> Live Scores
            </div>
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
              <Trophy className="w-5 h-5 text-primary" /> Points Table
            </div>
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
              <Trophy className="w-5 h-5 text-primary" /> Player Stats
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
