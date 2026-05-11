import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Mail, Info, Lock, Eye, Globe, Heart } from 'lucide-react';
import { Link } from 'wouter';
import SEO from '@/components/SEO';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Info,
      title: "Information We Collect",
      content: [
        "Basic device and usage information may be collected automatically through Google Play services or analytics tools.",
        "We do not collect sensitive personal information directly from users."
      ]
    },
    {
      icon: Eye,
      title: "How We Use Information",
      content: [
        "To improve website/app performance",
        "To provide tournament updates and features",
        "To maintain website/app security and stability"
      ]
    },
    {
      icon: Globe,
      title: "Third-Party Services",
      description: "This website/app may use third-party services such as:",
      content: [
        "Google Play Services",
        "Firebase",
        "CricHeroes links or embedded content"
      ],
      footer: "These services may collect limited technical information according to their own privacy policies."
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "We value user privacy and take reasonable measures to protect information."
      ]
    },
    {
      icon: Heart,
      title: "Children’s Privacy",
      content: [
        "This website/app is not intended to collect personal information from children knowingly."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-secondary text-white pb-20 relative overflow-hidden">
      <SEO 
        title="Privacy Policy"
        description="Privacy Policy for URTC 2026 - Rotary Club of Unnao Royal Teachers' Championship."
        url="/privacy-policy"
      />
      
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none transform -skew-x-12 translate-x-20"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="pt-8 md:pt-12 mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors font-semibold tracking-wide mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back To Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 p-4 bg-primary/20 rounded-2xl border border-primary/30">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight uppercase">
              URTC 2026 <span className="text-primary">Privacy Policy</span>
            </h1>
            <p className="text-white/60 font-semibold tracking-[0.2em] uppercase text-sm mb-8">
              Effective Date: May 2026
            </p>
            <div className="max-w-3xl mx-auto p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-lg text-white/80 leading-relaxed">
                URTC 2026 respects your privacy. This website/app is created for providing cricket tournament information, schedules, scores, announcements, and updates.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 bg-secondary rounded-xl border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors shrink-0">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-display font-bold text-white tracking-wide group-hover:text-primary transition-colors">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="text-white/70 italic">{section.description}</p>
                  )}
                  <ul className="space-y-3">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70 text-lg leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {section.footer && (
                    <p className="pt-4 text-white/40 text-sm italic border-t border-white/5">
                      {section.footer}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary text-secondary rounded-3xl p-10 mt-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0a0f2c 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
            <div className="relative z-10 flex flex-col items-center">
              <Mail className="w-12 h-12 mb-4" />
              <h2 className="text-3xl font-display font-bold mb-4 tracking-tight uppercase">Contact Us</h2>
              <p className="text-secondary/80 font-semibold text-lg mb-6 max-w-xl mx-auto">
                If you have questions regarding this Privacy Policy, please contact the URTC 2026 team.
              </p>
              <div className="bg-secondary/10 backdrop-blur-md px-8 py-4 rounded-2xl inline-flex flex-col items-center gap-1 border border-secondary/20">
                <span className="text-secondary font-display text-xl tracking-wider">URTC 2026</span>
                <a href="mailto:akshatshuklawrites@gmail.com" className="text-secondary font-bold text-lg hover:underline transition-all">
                  akshatshuklawrites@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-white/30 text-sm font-semibold tracking-widest uppercase">
          © 2026 Rotary Club of Unnao Royal Teachers' Championship. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
