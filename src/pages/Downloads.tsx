import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import SEO from '@/components/SEO';

export default function Downloads() {
  return (
    <div className="min-h-screen bg-secondary text-white flex flex-col items-center justify-center relative overflow-hidden">
      <SEO 
        title="Downloads"
        description="Download official UTPL documents, schedules, and resources."
        url="/downloads"
      />
      
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none transform -skew-x-12 translate-x-20"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <Link href="/" className="absolute top-8 left-4 md:left-8 inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors font-semibold tracking-wide">
          <ArrowLeft className="h-4 w-4" />
          Back To Home
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 p-6 bg-primary/20 rounded-full border-2 border-primary/30"
        >
          <Download className="w-16 h-16 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight"
        >
          DOWNLOADS
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative"
        >
          <motion.p
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="text-2xl md:text-3xl font-display text-primary tracking-[0.2em] uppercase"
          >
            Coming Soon...
          </motion.p>
          
          {/* Subtle underline animation */}
          <motion.div 
            className="absolute -bottom-2 left-0 h-1 bg-primary/50"
            animate={{ 
              width: ["0%", "100%", "0%"],
              left: ["0%", "0%", "100%"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-white/60 max-w-md text-lg"
        >
          We are preparing official match schedules, rulebooks, and registration forms for you. Stay tuned!
        </motion.p>
      </div>
    </div>
  );
}
