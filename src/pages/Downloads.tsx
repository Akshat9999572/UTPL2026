import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, FileText, Music, Smartphone } from 'lucide-react';
import { Link } from 'wouter';
import SEO from '@/components/SEO';

const downloads = [
  {
    title: 'DOWNLOAD THE APP',
    href: 'https://drive.google.com/file/d/15vd6bFofw3wG3ReDXKpD___3iNSwfwIE/view?usp=drive_link',
    icon: Smartphone,
    external: true,
  },
  {
    title: 'URTC RULE BOOK 2026',
    href: `${import.meta.env.BASE_URL}downloads/urtc-rule-book-2026.pdf`,
    icon: FileText,
    external: false,
  },
  {
    title: 'URTC ANTHEM SONG',
    href: `${import.meta.env.BASE_URL}downloads/urtc-anthem.mp3`,
    icon: Music,
    external: false,
  },
];

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
          className="mt-12 grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-3"
        >
          {downloads.map((item, idx) => (
            <motion.a
              key={item.title}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              download={item.external ? undefined : true}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.55 + idx * 0.1 }}
              className="group relative flex min-h-44 flex-col items-center justify-center gap-4 border border-primary/30 bg-primary text-secondary px-6 py-8 font-display text-2xl tracking-widest transition-all duration-300 hover:bg-white"
            >
              <item.icon className="h-10 w-10" />
              <span className="leading-tight">{item.title}</span>
              <Download className="h-5 w-5 opacity-70 transition-transform duration-300 group-hover:translate-y-1" />
              <div className="absolute -inset-1 -z-10 border border-primary/30 transition-all group-hover:inset-0"></div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
