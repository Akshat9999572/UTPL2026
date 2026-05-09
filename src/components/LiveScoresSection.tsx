import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy, CalendarDays, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tournamentUrl = 'https://cricheroes.in/tournament/lOnAYW/Rotary-Club-of-Unnao-Royal-Teachers-Championship';

const liveMatch = {
  team1: 'Madhyamik Lions',
  team2: 'SK Warriors',
  score: '128/4',
  overs: '14.2 Overs',
  status: 'LIVE',
};

const fixtures = [
  {
    match: 'Wisdom Warriors vs Rising Star',
    time: '7:00 PM',
  },
  {
    match: 'Unnao Super Kings vs Madhyamik Lions',
    time: '9:00 PM',
  },
];

const results = [
  {
    match: 'SK Warriors beat Rising Star by 18 Runs',
  },
  {
    match: 'Wisdom Warriors beat USK by 5 Wickets',
  },
];

const points = [
  ['SK Warriors', 6],
  ['Wisdom Warriors', 4],
  ['Madhyamik Lions', 4],
  ['Rising Star', 2],
  ['Unnao Super Kings', 0],
];

export default function LiveScoresSection() {
  const [iframeLoaded, setIframeLoaded] = useState(true);

  return (
    <section id="live-scores" className="py-24 bg-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <p className="uppercase tracking-[0.3em] text-primary text-sm font-bold mb-2">Live Tournament Center</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white">LIVE SCORES</h2>
          </div>
          <a
            href={tournamentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-secondary px-6 py-3 md:py-4 font-bold flex items-center gap-2 hover:scale-105 transition-all duration-300 text-sm md:text-base uppercase tracking-wider"
          >
            Open in CricHeroes <ExternalLink size={18} />
          </a>
        </div>

        {/* CricHeroes Iframe Integration */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl relative"
        >
          <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
              <span className="font-semibold text-white/90">Official Tournament Feed</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white" onClick={() => {
              const iframe = document.getElementById('ch-iframe') as HTMLIFrameElement;
              if (iframe) iframe.src = iframe.src;
            }}>
              <RefreshCw size={16} className="mr-2" /> Refresh
            </Button>
          </div>
          
          <div className="relative w-full" style={{ height: '600px' }}>
            <iframe 
              id="ch-iframe"
              src="https://cricheroes.in/tournament/lOnAYW/Rotary-Club-of-Unnao-Royal-Teachers-Championship"
              className="w-full h-full border-none bg-white"
              title="CricHeroes Live Feed"
              sandbox="allow-scripts allow-same-origin allow-popups"
              onError={() => setIframeLoaded(false)}
              onLoad={() => setIframeLoaded(true)}
            />
            {!iframeLoaded && (
              <div className="absolute inset-0 bg-secondary/95 flex flex-col items-center justify-center p-6 text-center">
                <AlertCircle size={48} className="text-primary mb-4" />
                <h3 className="text-2xl font-display mb-2">Live Feed Unavailable</h3>
                <p className="text-white/70 mb-6 max-w-md">
                  The CricHeroes widget could not be loaded directly on this page. You can still view all live scores, fixtures, and results on their official platform.
                </p>
                <a
                  href={tournamentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-secondary px-8 py-4 font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  View Full Dashboard on CricHeroes <ExternalLink size={20} />
                </a>
              </div>
            )}
          </div>
        </motion.div>

        {/* Local Dashboard Fallback / Overview */}
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-gradient-to-br from-white/10 to-transparent border border-primary/20 p-6 md:p-8 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <span className="bg-red-500 text-white px-4 py-1 text-sm font-bold animate-pulse rounded-full">
                {liveMatch.status}
              </span>
              <span className="text-primary font-semibold text-sm md:text-base">Rotary Club of Unnao Royal Teachers Championship</span>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">{liveMatch.team1}</h3>
                <div className="md:text-right">
                  <div className="text-5xl md:text-6xl font-display text-primary drop-shadow-[0_0_15px_rgba(245,166,35,0.3)]">{liveMatch.score}</div>
                  <div className="text-white/70 font-semibold tracking-wider uppercase mt-1">{liveMatch.overs}</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-2xl md:text-3xl font-bold text-white/50">{liveMatch.team2}</h3>
                <div className="text-primary/80 font-semibold uppercase tracking-widest text-sm">Batting Second</div>
              </div>
            </div>

            <a
              href={tournamentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-10 text-primary font-bold items-center gap-2 hover:text-white transition-colors border-b-2 border-primary pb-1"
            >
              View Full Match Details <ExternalLink size={18} />
            </a>
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <CalendarDays className="text-primary" size={24} />
                <h3 className="text-2xl font-display text-white">UPCOMING</h3>
              </div>
              <div className="space-y-4">
                {fixtures.map((fixture) => (
                  <div key={fixture.match} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <p className="font-semibold text-white/90">{fixture.match}</p>
                    <p className="text-primary text-sm font-bold mt-1 tracking-wider">{fixture.time}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="text-primary" size={24} />
                <h3 className="text-2xl font-display text-white">RECENT</h3>
              </div>
              <div className="space-y-4">
                {results.map((result) => (
                  <div key={result.match} className="border-b border-white/5 pb-4 last:border-0 last:pb-0 text-white/80 font-medium">
                    {result.match}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl overflow-x-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-primary"></div>
            <h3 className="text-3xl font-display text-white">POINTS TABLE</h3>
          </div>
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-white/10 text-primary uppercase text-sm tracking-wider">
                <th className="py-4 px-4 font-bold">Rank & Team</th>
                <th className="py-4 px-4 font-bold text-center">Points</th>
                <th className="py-4 px-4 font-bold text-center">Form</th>
              </tr>
            </thead>
            <tbody>
              {points.map((team, idx) => (
                <tr key={team[0]} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-5 px-4 font-semibold text-white/90 flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-primary text-secondary' : 'bg-white/10 text-white'}`}>
                      {idx + 1}
                    </span>
                    {team[0]}
                  </td>
                  <td className="py-5 px-4 text-center text-xl font-display text-white">{team[1]}</td>
                  <td className="py-5 px-4 text-center">
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3].map((i) => (
                        <span key={i} className={`w-2 h-2 rounded-full ${Math.random() > 0.5 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
