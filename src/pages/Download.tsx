import { motion } from "framer-motion";
import { ArrowLeft, Download, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Download() {
  return (
    <main className="min-h-screen bg-secondary text-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '50px 50px' }}></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <Link href="/" className="absolute top-8 left-8 inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors font-semibold tracking-wide">
          <ArrowLeft className="h-5 w-5" />
          BACK TO HOME
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="absolute -inset-8 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary/50 bg-secondary">
                <Download className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>

          <h1 className="font-display text-[120px] md:text-[140px] leading-none font-bold tracking-[-6px] text-white mb-4">
            COMING<br />SOON
          </h1>

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-primary"></div>
            <p className="uppercase tracking-[4px] text-sm font-bold text-primary">OFFICIAL DOWNLOADS</p>
            <div className="h-px w-12 bg-primary"></div>
          </div>

          <p className="max-w-xl mx-auto text-2xl text-white/70 leading-tight mb-16">
            The official mobile app, rulebook, and championship materials are currently in development.<br />We'll notify everyone when ready.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.985 }}
          >
            <Link 
              href="/" 
              className="group inline-flex items-center justify-center gap-4 bg-white text-secondary font-display text-xl tracking-[1px] px-16 py-5 rounded-none border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300"
            >
              RETURN TO THE CHAMPIONSHIP
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-12 text-white/40 text-sm tracking-widest flex items-center gap-2">
          <Clock className="h-4 w-4" /> UPDATES COMING 2026
        </div>
      </div>
    </main>
  );
}
