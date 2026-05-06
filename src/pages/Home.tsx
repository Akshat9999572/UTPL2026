import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Trophy, Users, Target, Phone, Mail, MapPin, MessageSquare, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Images (Relative to BASE_URL)
const baseUrl = import.meta.env.BASE_URL;
const logoSrc = `${baseUrl}utpl-logo.png`;
const stadiumSrc = `${baseUrl}images/stadium.png`;
const teamLogos = [
  `${baseUrl}images/franchise-madhyamik-lions.jpg`,
  `${baseUrl}images/franchise-sk-warriors.jpg`,
  `${baseUrl}images/franchise-rising-star.jpg`,
  `${baseUrl}images/franchise-wisdom-warriors.jpg`,
  `${baseUrl}images/franchise-unnao-super-kings.jpg`,
];
const galleryImages = [
  `${baseUrl}images/gallery-event-1.jpg`,
  `${baseUrl}images/gallery-event-2.jpg`,
  `${baseUrl}images/gallery-event-3.jpg`,
  `${baseUrl}images/gallery-event-4.jpg`,
  `${baseUrl}images/gallery-event-5.jpg`,
  `${baseUrl}images/gallery-event-6.jpg`,
  `${baseUrl}images/gallery-event-7.jpg`,
  `${baseUrl}images/gallery-event-8.jpg`,
  `${baseUrl}images/gallery-event-9.jpg`,
  `${baseUrl}images/gallery-event-10.jpg`,
];
const championshipPosters = [
  `${baseUrl}images/championship-poster-night-cricket.png`,
  `${baseUrl}images/championship-poster-night-lights.png`,
];
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
];

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'COMMITTEE', href: '#committee' },
  { name: 'OWNERS', href: '#owners' },
  { name: 'TEAMS', href: '#teams' },
  { name: 'GALLERY', href: '#gallery' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary/95 backdrop-blur-md shadow-lg py-2' : 'bg-secondary py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-3 cursor-pointer" onClick={() => scrollTo('#home')}>
            <img src={logoSrc} alt="Rotary Club of Unnao Royal Teachers' Championship logo" className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 object-contain rounded-full" />
            <span className="font-display text-sm sm:text-base lg:text-lg text-white tracking-wide leading-tight max-w-[14rem] sm:max-w-sm lg:max-w-xl">
              Unnao Teachers' Cricket Club presents <span className="text-primary">Rotary Club of Unnao Royal Teachers' Championship</span>
            </span>
          </div>
          
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-semibold text-white/80 hover:text-primary transition-colors tracking-wider"
              >
                {link.name}
              </button>
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
            className="fixed inset-0 z-40 bg-secondary pt-24 px-6 flex flex-col gap-6 xl:hidden"
          >
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-display text-left text-white hover:text-primary transition-colors tracking-wider border-b border-white/10 pb-4"
              >
                {link.name}
              </button>
            ))}
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
      <section id="gallery" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase mb-2">Unforgettable Moments</span>
            <h2 className="text-5xl md:text-6xl font-display text-secondary">MATCH GALLERY</h2>
            <div className="w-24 h-1 bg-primary mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
            {galleryImages.map((image, idx) => {
              const featuredClass = idx === 0
                ? 'md:col-span-2 md:row-span-2'
                : idx === 1 || idx === 4 || idx === 9
                  ? 'lg:col-span-2'
                  : '';

              return (
                <motion.div
                  key={image}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                  className={`${featuredClass} relative group overflow-hidden bg-muted`}
                >
                  <img src={image} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-display text-2xl tracking-widest border-2 border-white px-6 py-2">VIEW IMAGE</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
        </div>
      </section>

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
          <div className="flex justify-center gap-6 mb-8 font-display tracking-widest text-lg text-white/50">
            {['HOME', 'ABOUT', 'TEAMS', 'CONTACT'].map(link => (
              <button key={link} onClick={() => scrollTo(`#${link.toLowerCase()}`)} className="hover:text-primary transition-colors">
                {link}
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
