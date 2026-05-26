import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Trophy, Users, Target, Phone, Mail, MapPin, MessageSquare, ChevronRight, ChevronDown, Download, PlayCircle, ZoomIn, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LiveScoresSection from '@/components/LiveScoresSection';
import LatestNewsSection from '@/components/LatestNewsSection';

// Images (Relative to BASE_URL)
const baseUrl = import.meta.env.BASE_URL;
const logoSrc = `${baseUrl}utpl-logo.png`;
const stadiumSrc = `${baseUrl}images/stadium.png`;
const openingCeremonyVideo = `${baseUrl}videos/urtc-opening-ceremony.mp4`;
const openingCeremonyPoster = `${baseUrl}videos/urtc-opening-ceremony-poster.jpg`;
const teamLogos = [
  `${baseUrl}images/franchise-madhyamik-lions.jpg`,
  `${baseUrl}images/franchise-sk-warriors.jpg`,
  `${baseUrl}images/franchise-rising-star.jpg`,
  `${baseUrl}images/franchise-wisdom-warriors.jpg`,
  `${baseUrl}images/franchise-unnao-super-kings.jpg`,
];
const galleryImages = [
  `${baseUrl}images/gallery-event-11.jpg`,
  `${baseUrl}images/gallery-event-12.jpg`,
  `${baseUrl}images/gallery-20260524-01.jpg`,
  `${baseUrl}images/gallery-20260524-02.jpg`,
  `${baseUrl}images/gallery-20260524-03.jpg`,
  `${baseUrl}images/gallery-20260524-04.jpg`,
  `${baseUrl}images/gallery-20260524-05.jpg`,
  `${baseUrl}images/gallery-20260524-06.jpg`,
  `${baseUrl}images/gallery-20260524-07.jpg`,
  `${baseUrl}images/gallery-20260524-08.jpg`,
  `${baseUrl}images/gallery-20260524-09.jpg`,
  `${baseUrl}images/gallery-20260524-10.jpg`,
  `${baseUrl}images/gallery-20260524-11.jpg`,
  `${baseUrl}images/gallery-20260524-12.jpg`,
  `${baseUrl}images/gallery-20260524-13.jpg`,
  `${baseUrl}images/gallery-20260524-14.jpg`,
  `${baseUrl}images/gallery-20260524-15.jpg`,
  `${baseUrl}images/gallery-20260524-16.jpg`,
  `${baseUrl}images/gallery-20260524-17.jpg`,
  `${baseUrl}images/gallery-20260524-18.jpg`,
  `${baseUrl}images/gallery-20260524-19.jpg`,
  `${baseUrl}images/gallery-20260524-20.jpg`,
  `${baseUrl}images/gallery-20260524-21.jpg`,
];
const championshipPosters = [
  `${baseUrl}images/championship-poster-night-cricket.png`,
  `${baseUrl}images/championship-poster-night-lights.png`,
  `${baseUrl}images/championship-banner-men-behind-scene.jpg`,
  `${baseUrl}images/championship-banner-district-level.jpg`,
  `${baseUrl}images/championship-banner-grandeur.jpg`,
  `${baseUrl}images/championship-banner-welcome.jpg`,
];
const championshipFeaturePoster = `${baseUrl}images/championship-poster-main-event.png`;
const committeeMembers = [
  {
    name: 'Maneendra Kumar (BEO)',
    role: 'Patron',
    image: `${baseUrl}images/maneendra-kumar-beo.jpg`,
  },
  {
    name: 'Alok Awasthi',
    role: 'Organizer',
    image: `${baseUrl}images/alok-awasthi.jpg`,
  },
];
const franchiseOwners = [
  {
    name: 'Sudhanshu Singh',
    team: 'ML',
    image: `${baseUrl}images/owner-sudhanshu-singh.jpg`,
  },
  {
    name: 'Santosh Kumar',
    team: 'SKW',
    image: `${baseUrl}images/owner-santosh-kumar.jpg`,
  },
  {
    name: 'Maneendra Kumar',
    team: 'WW',
    image: `${baseUrl}images/owner-maneendra-kumar.jpg`,
  },
  {
    name: 'Birendra Kumar',
    team: 'USK',
    image: `${baseUrl}images/owner-birendra-kumar.jpg`,
  },
  {
    name: 'Amit Verma',
    team: 'TRS',
    image: `${baseUrl}images/owner-amit-verma.jpg`,
  },
  {
    name: 'Bittu Mishra',
    team: 'TRS',
    image: `${baseUrl}images/owner-bittu-mishra.jpg`,
  },
];

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'LIVE SCORES', href: 'https://cricheroes.com/tournament/2012283/urtc-(-unnao-royal-teachers-championship)-2026-season-1st/matches/live-matches', absoluteExternal: true },
  { name: 'NEWS', href: '/news', externalPage: true },
  { 
    name: 'DOWNLOADS', 
    href: '/downloads', 
    externalPage: true,
    hasDropdown: true,
    subLinks: [
      { name: 'DOWNLOAD THE APP', href: 'https://drive.google.com/file/d/15vd6bFofw3wG3ReDXKpD___3iNSwfwIE/view?usp=drive_link', absoluteExternal: true },
      { name: 'DOCUMENTS', href: '/downloads', externalPage: true }
    ]
  },
  { name: 'PRIVACY POLICY', href: '/privacy-policy', externalPage: true },
  { name: 'ABOUT', href: '#about' },
  { name: 'CHAMPIONSHIP SPONSORS', href: '/sponsors', externalPage: true },
  { name: 'CONTACT', href: '/contact', externalPage: true },
];

import SEO from '@/components/SEO';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [ceremonyVideoStarted, setCeremonyVideoStarted] = useState(false);
  const ceremonyVideoRef = React.useRef<HTMLVideoElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || activeGalleryIndex !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, activeGalleryIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeGalleryIndex === null) {
        return;
      }

      if (event.key === 'Escape') {
        setActiveGalleryIndex(null);
      }
      if (event.key === 'ArrowLeft') {
        setActiveGalleryIndex((current) => current === null ? current : (current - 1 + galleryImages.length) % galleryImages.length);
      }
      if (event.key === 'ArrowRight') {
        setActiveGalleryIndex((current) => current === null ? current : (current + 1) % galleryImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGalleryIndex]);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string, externalPage?: boolean, absoluteExternal?: boolean) => {
    if (absoluteExternal) {
      setMobileMenuOpen(false);
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (externalPage) {
      setMobileMenuOpen(false);
      setLocation(href);
      return;
    }
    scrollTo(href);
  };

  const playCeremonyVideo = () => {
    setCeremonyVideoStarted(true);
    requestAnimationFrame(() => ceremonyVideoRef.current?.play());
  };

  const showPreviousGalleryImage = () => {
    setActiveGalleryIndex((current) => current === null ? current : (current - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNextGalleryImage = () => {
    setActiveGalleryIndex((current) => current === null ? current : (current + 1) % galleryImages.length);
  };

  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO 
        title="URTC 2026"
        description="Official website of the Rotary Club of Unnao Royal Teachers' Championship. Celebrating cricket and uniting educators in Unnao."
        url="/"
      />
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary/95 backdrop-blur-md shadow-lg py-2' : 'bg-secondary py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-3 cursor-pointer" onClick={() => scrollTo('#home')}>
            <img src={logoSrc} alt="Rotary Club of Unnao Royal Teachers' Championship logo" className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 object-contain rounded-full" />
            <span className="font-display text-sm sm:text-base lg:text-lg text-white tracking-wide leading-tight max-w-[14rem] sm:max-w-sm lg:max-w-xl">
              <span className="block">Unnao Teachers' Cricket Club presents</span>
              <span className="block text-primary">Rotary Club of Unnao Royal Teachers' Championship</span>
            </span>
          </div>
          
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              (link as any).hasDropdown ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger className="text-sm font-semibold text-white/80 hover:text-primary transition-colors tracking-wider flex items-center gap-1 focus:outline-none">
                    {link.name} <ChevronDown size={14} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-secondary border-white/10 text-white min-w-[200px]">
                    {(link as any).subLinks.map((sub: any) => (
                      <DropdownMenuItem 
                        key={sub.name}
                        onClick={() => handleNavClick(sub.href, sub.externalPage, sub.absoluteExternal)}
                        className="hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary cursor-pointer font-semibold tracking-wide py-3"
                      >
                        {sub.name === 'DOWNLOAD THE APP' && <Download size={14} className="mr-2" />}
                        {sub.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button 
                  key={link.name}
                  onClick={() => handleNavClick(link.href, link.externalPage, (link as any).absoluteExternal)}
                  className={link.name === 'LIVE SCORES'
                    ? "relative overflow-hidden rounded-full border border-primary/70 bg-primary px-4 py-2 text-sm font-bold tracking-wider text-secondary shadow-[0_0_22px_rgba(245,166,35,0.45)] transition-transform hover:scale-105"
                    : "text-sm font-semibold text-white/80 hover:text-primary transition-colors tracking-wider"}
                >
                  {link.name === 'LIVE SCORES' && (
                    <>
                      <span className="absolute inset-y-0 -left-8 w-6 skew-x-[-20deg] bg-white/60 animate-[live-shine_2.2s_linear_infinite]"></span>
                      <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                      <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-red-600"></span>
                    </>
                  )}
                  <span className={link.name === 'LIVE SCORES' ? "relative z-10 inline-flex animate-[live-bounce_1.4s_ease-in-out_infinite] items-center gap-2" : ""}>
                    {link.name}
                  </span>
                </button>
              )
            ))}
          </div>

          <button 
            className="xl:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 max-h-[100dvh] overflow-y-auto overscroll-contain bg-secondary px-5 pb-10 pt-24 xl:hidden"
          >
            <div className="flex min-h-full flex-col gap-4">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col gap-1">
                <button 
                  onClick={() => {
                    if (!(link as any).hasDropdown) {
                      handleNavClick(link.href, link.externalPage, (link as any).absoluteExternal);
                    }
                  }}
                  className={link.name === 'LIVE SCORES'
                    ? "relative flex min-h-12 items-center justify-between overflow-hidden rounded-xl border border-primary/60 bg-primary px-4 py-3 text-left font-display text-xl tracking-wider text-secondary shadow-[0_0_24px_rgba(245,166,35,0.35)] sm:text-2xl"
                    : "flex min-h-12 items-center justify-between border-b border-white/10 pb-3 text-left font-display text-xl tracking-wider text-white transition-colors hover:text-primary sm:text-2xl"}
                >
                  {link.name === 'LIVE SCORES' && (
                    <>
                      <span className="absolute inset-y-0 -left-8 w-6 skew-x-[-20deg] bg-white/60 animate-[live-shine_2.2s_linear_infinite]"></span>
                      <span className="absolute right-4 top-3 h-2.5 w-2.5 rounded-full bg-red-600 animate-ping"></span>
                      <span className="absolute right-4 top-3 h-2.5 w-2.5 rounded-full bg-red-600"></span>
                    </>
                  )}
                  <span className={link.name === 'LIVE SCORES' ? "relative z-10 animate-[live-bounce_1.4s_ease-in-out_infinite]" : ""}>
                    {link.name}
                  </span>
                  {(link as any).hasDropdown && <ChevronDown size={20} className="text-primary" />}
                </button>
                {(link as any).hasDropdown && (
                  <div className="mb-3 mt-2 flex flex-col gap-3 pl-4">
                    {(link as any).subLinks.map((sub: any) => (
                      <button
                        key={sub.name}
                        onClick={() => handleNavClick(sub.href, sub.externalPage, sub.absoluteExternal)}
                        className="flex min-h-10 items-center gap-2 text-left font-display text-lg tracking-wider text-white/70 transition-colors hover:text-primary sm:text-xl"
                      >
                        {sub.name === 'DOWNLOAD THE APP' && <Download size={18} className="text-primary" />}
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none transform -skew-x-12 translate-x-20"></div>
        
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center gap-10 relative z-10 py-14 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex max-w-6xl flex-col items-center gap-6"
          >
            <motion.div variants={fadeUp} className="inline-block border-x-4 border-primary px-4">
              <p className="text-primary font-bold tracking-widest uppercase text-sm md:text-base">Uniting Educators. Celebrating Cricket.</p>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white leading-[0.85]">
              <span className="block text-primary">ROTARY CLUB</span>
              <span className="block text-white">OF UNNAO</span>
              <span className="block text-cyan-300">ROYAL TEACHERS'</span>
              <span className="block text-rose-400">CHAMPIONSHIP</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-lg md:text-xl max-w-2xl">
              Rotary Club of Unnao Royal Teachers' Championship brings together the educators of Unnao for a spectacular celebration of sportsmanship and community.
            </motion.p>
            <motion.div variants={fadeUp} className="pt-4 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary text-secondary hover:bg-primary/90 font-display text-2xl tracking-wider px-8 py-6 rounded-none" onClick={() => scrollTo('#about')}>
                EXPLORE LEAGUE <ChevronRight className="ml-2 w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="relative flex justify-center items-center"
          >
            <div className="absolute w-[120%] h-[120%] rounded-full border-2 border-primary/20 pointer-events-none border-dashed" style={{ animation: 'spin 30s linear infinite' }}></div>
            <div className="absolute w-[100%] h-[100%] rounded-full border-4 border-primary/10 pointer-events-none"></div>
            <img
              src={logoSrc}
              alt="Rotary Club of Unnao Royal Teachers' Championship logo"
              className="relative z-10 w-[320px] h-[320px] lg:w-[440px] lg:h-[440px] object-contain drop-shadow-[0_0_60px_rgba(245,166,35,0.4)]"
            />
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-primary py-8 relative z-20 -mt-8 border-y-8 border-white dark:border-secondary shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-secondary/20">
            <div className="flex flex-col items-center justify-center p-4">
              <Trophy className="w-12 h-12 text-secondary mb-2" />
              <div className="text-4xl font-display text-secondary">5 TEAMS</div>
              <div className="text-secondary/80 font-bold tracking-wider">COMPETING FOR GLORY</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <Users className="w-12 h-12 text-secondary mb-2" />
              <div className="text-4xl font-display text-secondary">65 PLAYERS</div>
              <div className="text-secondary/80 font-bold tracking-wider">TEACHERS FROM UNNAO</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <Target className="w-12 h-12 text-secondary mb-2" />
              <div className="text-4xl font-display text-secondary">1 GOAL</div>
              <div className="text-secondary/80 font-bold tracking-wider">ONE CHAMPION</div>
            </div>
          </div>
        </div>
      </section>

      {/* OPENING CEREMONY VIDEO */}
      <section className="relative overflow-hidden bg-secondary py-20 text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '34px 34px' }}></div>
        <div className="absolute inset-x-0 top-0 h-1 bg-primary"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="mx-auto max-w-6xl"
          >
            <motion.div variants={fadeUp} className="mb-10 text-center">
              <p className="text-primary font-bold tracking-[0.32em] uppercase text-sm">A Grand Beginning</p>
              <h2 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-display leading-none">
                URTC 2026 Opening Ceremony
              </h2>
              <div className="mx-auto mt-6 h-1 w-28 bg-primary"></div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="relative rounded-[2rem] border border-primary/40 bg-white/5 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            >
              <div className="absolute -inset-1 rounded-[2.25rem] border border-white/10 pointer-events-none"></div>
              <div className="relative overflow-hidden rounded-[1.5rem] bg-black">
                <video
                  ref={ceremonyVideoRef}
                  className="aspect-video w-full object-cover"
                  poster={openingCeremonyPoster}
                  preload="metadata"
                  controls={ceremonyVideoStarted}
                  playsInline
                >
                  <source src={openingCeremonyVideo} type="video/mp4" />
                </video>

                {!ceremonyVideoStarted && (
                  <button
                    type="button"
                    onClick={playCeremonyVideo}
                    className="absolute inset-0 flex items-center justify-center bg-secondary/25 transition-colors duration-300 hover:bg-secondary/10"
                    aria-label="Play URTC 2026 opening ceremony video"
                  >
                    <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary bg-primary text-secondary shadow-[0_0_45px_rgba(245,166,35,0.5)] transition-transform duration-300 hover:scale-105">
                      <PlayCircle className="h-12 w-12" />
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CHAMPIONSHIP POSTERS */}
      <section className="w-full bg-secondary">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {championshipPosters.map((poster, idx) => (
            <img
              key={poster}
              src={poster}
              alt={`Rotary Club of Unnao Royal Teachers' Championship poster ${idx + 1}`}
              className="w-full object-cover"
            />
          ))}
          <img
            src={championshipFeaturePoster}
            alt="Rotary Club of Unnao Royal Teachers' Championship feature poster"
            className="w-full object-cover lg:col-span-2"
          />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-background relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              <motion.img 
                variants={fadeUp}
                src={stadiumSrc} 
                alt="Cricket Stadium" 
                className="w-full aspect-[4/3] object-cover rounded-tr-[100px] rounded-bl-[100px] shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-primary rounded-tr-[100px] rounded-bl-[100px] -z-10"></div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <span className="h-1 w-12 bg-primary"></span>
                <span className="text-primary font-bold tracking-widest uppercase">About Championship</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl font-display leading-[0.9]">
                UNITED BY TEACHING,<br/>
                <span className="text-muted-foreground">BOUND BY CRICKET.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                Rotary Club of Unnao Royal Teachers' Championship is more than a tournament — it is a celebration of teamwork, dedication, and the enduring spirit of sportsmanship. Bringing together teachers from across Unnao, the championship creates a unique platform where a passion for cricket meets the noble purpose of education.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                This prestigious tournament is being organised under the patronage of <span className="font-semibold text-foreground">Mr. Maneendra Kumar (BEO, Miyaganj)</span> and is organized by <span className="font-semibold text-foreground">Alok Awasthi</span> along with his dedicated core committee team, who have previously orchestrated the grand and successful tournament TPL.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                UTPL is envisioned as a <span className="font-semibold text-foreground">Night T20 tournament</span>, set to be played under dazzling floodlights at the iconic <span className="font-semibold text-foreground">Nikhat Stadium, Unnao</span>, promising an electrifying sporting experience that blends competition with camaraderie.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LIVE SCORES */}
      <LiveScoresSection />

      {/* LATEST NEWS */}
      <LatestNewsSection />

      {/* COMMITTEE */}
      <section id="committee" className="py-24 bg-secondary text-white relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase mb-2">Leadership</span>
            <h2 className="text-5xl md:text-6xl font-display">CORE COMMITTEE</h2>
            <div className="w-24 h-1 bg-primary mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {committeeMembers.map((member, idx) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
              >
                <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-secondary/50 overflow-hidden border-b border-white/10">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold font-display tracking-wide group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-primary/80 uppercase text-sm font-semibold tracking-wider mt-1">{member.role}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OWNERS */}
      <section id="owners" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-muted transform skew-x-12 translate-x-20 -z-10"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase mb-2">The Backers</span>
            <h2 className="text-5xl md:text-6xl font-display text-secondary">FRANCHISE OWNERS</h2>
            <div className="w-24 h-1 bg-primary mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {franchiseOwners.map((owner, idx) => (
              <motion.div 
                key={owner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 hover:border-primary transition-colors cursor-pointer group bg-card">
                  <CardContent className="p-0">
                    <div className="bg-muted aspect-[4/5] flex items-center justify-center relative overflow-hidden">
                      <img
                        src={owner.image}
                        alt={`${owner.name}, ${owner.team} franchise owner`}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-secondary/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center">
                        <span className="text-white font-display text-xl tracking-wider opacity-0 group-hover:opacity-100 transition-opacity delay-100">{owner.team}</span>
                      </div>
                    </div>
                    <div className="p-4 text-center border-t">
                      <h3 className="font-bold text-lg">{owner.name}</h3>
                      <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider mt-1">{owner.team}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAMS */}
      <section id="teams" className="py-24 bg-muted border-y border-border relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase mb-2 block">The Contenders</span>
              <h2 className="text-5xl md:text-6xl font-display text-secondary">FRANCHISES</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
            {[
              { name: 'Madhyamik Lions' },
              { name: 'SK Warriors' },
              { name: 'The Rising Star' },
              { name: 'Wisdom Warriors' },
              { name: 'Unnao Super Kings' },
            ].map((team, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-transparent group-hover:border-primary group-hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 cursor-pointer transform group-hover:-translate-y-2">
                  <div className="w-full aspect-square rounded-xl bg-muted flex items-center justify-center overflow-hidden">
                    <img src={teamLogos[idx]} alt={`${team.name} logo`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-secondary text-center tracking-wide group-hover:text-primary transition-colors">{team.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative overflow-hidden bg-background py-24">
        <div className="absolute inset-x-0 top-0 h-2 bg-primary"></div>
        <div className="absolute left-0 top-24 hidden h-40 w-24 rounded-r-full border-y-8 border-r-8 border-primary/20 md:block"></div>
        <div className="absolute bottom-20 right-0 hidden h-40 w-24 rounded-l-full border-y-8 border-l-8 border-primary/20 md:block"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase mb-2">Unforgettable Moments</span>
            <h2 className="text-5xl md:text-6xl font-display text-secondary">MATCH GALLERY</h2>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-1 w-16 bg-secondary/20"></span>
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg">
                <span className="h-7 w-7 rounded-full border-2 border-secondary/70"></span>
                <span className="absolute h-8 w-0.5 rotate-12 bg-secondary/60"></span>
                <span className="absolute h-8 w-0.5 -rotate-12 bg-secondary/60"></span>
              </span>
              <span className="h-1 w-16 bg-secondary/20"></span>
            </div>
          </div>
          
          <div className="relative rounded-[2rem] bg-secondary p-3 shadow-[0_28px_90px_rgba(10,15,44,0.28)] md:p-5">
            <div className="absolute inset-0 rounded-[2rem] border-4 border-primary"></div>
            <div className="absolute inset-3 rounded-[1.5rem] border border-white/15 md:inset-5"></div>
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/15 md:block"></div>
            <div className="absolute left-1/2 top-1/2 hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 md:block"></div>
            <div className="absolute -left-3 top-1/2 hidden h-24 w-8 -translate-y-1/2 rounded-r-full border-y-2 border-r-2 border-primary/80 md:block"></div>
            <div className="absolute -right-3 top-1/2 hidden h-24 w-8 -translate-y-1/2 rounded-l-full border-y-2 border-l-2 border-primary/80 md:block"></div>

            <div className="relative rounded-[1.4rem] bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.11)_1px,transparent_0)] p-3 [background-size:28px_28px] md:p-4">
              <div className="mb-4 grid grid-cols-3 items-center gap-3 text-primary">
                <div className="h-1 rounded-full bg-primary"></div>
                <div className="flex justify-center gap-2">
                  <span className="h-9 w-2 rounded-full bg-primary"></span>
                  <span className="h-9 w-2 rounded-full bg-primary"></span>
                  <span className="h-9 w-2 rounded-full bg-primary"></span>
                </div>
                <div className="h-1 rounded-full bg-primary"></div>
              </div>

              <div className="grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[250px] md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                {galleryImages.map((image, idx) => {
                  const featuredClass = idx === 0
                    ? 'md:col-span-2 md:row-span-2'
                    : idx === 1 || idx === 4 || idx === 9
                      ? 'lg:col-span-2'
                      : '';

                  return (
                    <motion.button
                      type="button"
                      key={image}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`${featuredClass} relative group overflow-hidden rounded-xl border-2 border-white/10 bg-muted text-left shadow-lg outline-none ring-primary transition-all duration-300 hover:-translate-y-1 hover:border-primary focus-visible:ring-4`}
                      aria-label={`Open gallery image ${idx + 1}`}
                    >
                      <img src={image} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-secondary/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"></div>
                      <div className="absolute left-0 top-0 border-l-[42px] border-t-[42px] border-l-primary border-t-primary/70"></div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary">Open Full Image</span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-secondary shadow-lg">
                          <ZoomIn size={18} />
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <AnimatePresence>
        {activeGalleryIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-secondary/95 p-3 backdrop-blur-md sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-secondary shadow-lg transition-transform hover:scale-105"
              onClick={() => setActiveGalleryIndex(null)}
              aria-label="Close gallery image"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-secondary shadow-lg transition-transform hover:scale-105 sm:left-6"
              onClick={showPreviousGalleryImage}
              aria-label="Previous gallery image"
            >
              <ChevronLeft size={24} />
            </button>

            <motion.div
              key={galleryImages[activeGalleryIndex]}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative flex h-full max-h-[86dvh] w-full max-w-6xl items-center justify-center rounded-2xl border border-white/10 bg-black/60 p-2 shadow-2xl sm:p-4"
            >
              <img
                src={galleryImages[activeGalleryIndex]}
                alt={`Gallery ${activeGalleryIndex + 1}`}
                className="max-h-full max-w-full rounded-xl object-contain"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-secondary shadow-lg">
                {activeGalleryIndex + 1} / {galleryImages.length}
              </div>
            </motion.div>

            <button
              type="button"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-secondary shadow-lg transition-transform hover:scale-105 sm:right-6"
              onClick={showNextGalleryImage}
              aria-label="Next gallery image"
            >
              <ChevronRightIcon size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0a0f2c 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-display text-secondary">WE'D LOVE TO HEAR FROM YOU!</h2>
            <p className="text-secondary/80 font-bold tracking-wider mt-4">GET IN TOUCH WITH THE ORGANIZING COMMITTEE</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Phone, title: 'PHONE', desc: '8543052329' },
              { icon: Mail, title: 'EMAIL', desc: 'akshatshuklawrites@gmail.com' },
              { icon: MapPin, title: 'LOCATION', desc: 'Unnao, Uttar Pradesh' },
              { icon: MessageSquare, title: 'MESSAGE US', desc: 'akshatshuklawrites@gmail.com' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-none rounded-none text-center h-full hover:-translate-y-2 transition-transform duration-300">
                  <CardContent className="p-8 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center mb-2">
                      <item.icon size={28} />
                    </div>
                    <h3 className="font-display text-2xl text-secondary tracking-widest">{item.title}</h3>
                    <p className="font-semibold text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary text-white py-12 border-t-8 border-primary">
        <div className="container mx-auto px-4 text-center">
          <img src={logoSrc} alt="Rotary Club of Unnao Royal Teachers' Championship logo" className="h-24 w-24 object-contain mx-auto mb-6 opacity-70 hover:opacity-100 transition-opacity duration-500" />
          <div className="flex flex-wrap justify-center gap-6 mb-8 font-display tracking-widest text-lg text-white/50">
            {[
              { name: 'HOME', href: '#home' },
              { name: 'LIVE SCORES', href: 'https://cricheroes.com/tournament/2012283/urtc-(-unnao-royal-teachers-championship)-2026-season-1st/matches/live-matches', absoluteExternal: true },
              { name: 'NEWS', href: '/news', externalPage: true },
              { name: 'DOWNLOAD THE APP', href: 'https://drive.google.com/file/d/15vd6bFofw3wG3ReDXKpD___3iNSwfwIE/view?usp=drive_link', absoluteExternal: true },
              { name: 'DOWNLOADS', href: '/downloads', externalPage: true },
              { name: 'PRIVACY POLICY', href: '/privacy-policy', externalPage: true },
              { name: 'ABOUT', href: '#about' },
              { name: 'CONTACT', href: '/contact', externalPage: true },
            ].map((link) => (
              <button key={link.name} onClick={() => handleNavClick(link.href, link.externalPage, (link as any).absoluteExternal)} className="hover:text-primary transition-colors">
                {link.name}
              </button>
            ))}
          </div>
          <p className="text-white/40 text-sm font-semibold tracking-widest uppercase">
            © 2026 Rotary Club of Unnao Royal Teachers' Championship. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
