import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tournamentUrl = 'https://cricheroes.in/tournament/lOnAYW/Rotary-Club-of-Unnao-Royal-Teachers-Championship';

export default function LiveScoresSection() {
  const [iframeLoaded, setIframeLoaded] = useState(true);

  return (
    <section id="live-scores" className="py-24 bg-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <p className="uppercase tracking-[0.3em] text-primary text-sm font-bold mb-2">Live Tournament Center</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white">TOURNAMENT FEED</h2>
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
          className="rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl relative"
        >
          <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
              <span className="font-semibold text-white/90">Official Tournament Feed</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white" onClick={() => {
              const iframe = document.getElementById('ch-iframe') as HTMLIFrameElement;
              if (iframe) iframe.src = iframe.src;
            }}>
              <RefreshCw size={16} className="mr-2" /> Refresh
            </Button>
          </div>
          
          <div className="relative w-full" style={{ height: '800px' }}>
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
      </div>
    </section>
  );
}
