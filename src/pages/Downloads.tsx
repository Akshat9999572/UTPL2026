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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <a 
            href="https://drive.google.com/file/d/15vd6bFofw3wG3ReDXKpD___3iNSwfwIE/view?usp=drive_link" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-primary text-secondary px-8 py-4 font-display text-2xl tracking-widest hover:bg-white transition-all duration-300"
          >
            <Download className="w-6 h-6 group-hover:bounce" />
            DOWNLOAD THE APP
            <div className="absolute -inset-1 border border-primary/30 -z-10 group-hover:inset-0 transition-all"></div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
