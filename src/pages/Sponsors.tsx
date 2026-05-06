import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const baseUrl = import.meta.env.BASE_URL;
const sponsorLogo = `${baseUrl}images/sponsor-rotary-logo.jpg`;
const sponsors = [
  {
    name: "Ashish Shukla",
    role: "President",
    image: `${baseUrl}images/sponsor-ashish-shukla.jpg`,
  },
  {
    name: "Ambarish Tripathi",
    role: "Treasurer",
    image: `${baseUrl}images/sponsor-ambarish-tripathi.jpg`,
  },
  {
    name: "Dhirendra Pratap Singh",
    role: "Convener",
    image: `${baseUrl}images/sponsor-dhirendra-pratap-singh.jpg`,
  },
  {
    name: "DD Shukla",
    role: "Secretary",
    image: `${baseUrl}images/sponsor-dd-shukla.jpg`,
  },
];

export default function Sponsors() {
  return (
    <main className="min-h-screen bg-secondary text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-10 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors font-semibold tracking-wide">
            <ArrowLeft className="h-4 w-4" />
            Back To Home
          </Link>
          <div className="mt-10 grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Championship Sponsors</p>
              <h1 className="mt-4 text-5xl md:text-7xl font-display leading-[0.92]">
                Rotary Club Of Unnao Royal
              </h1>
              <p className="mt-5 max-w-2xl text-white/75 text-lg leading-relaxed">
                Meet the Rotary Club of Unnao Royal members supporting the championship and helping shape the spirit behind the tournament.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="rounded-[2rem] bg-white px-6 py-6 shadow-2xl">
                <img
                  src={sponsorLogo}
                  alt="Rotary Club of Unnao Royal logo"
                  className="w-52 max-w-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {sponsors.map((member, idx) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="aspect-[4/5] overflow-hidden bg-white/10">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="border-t border-white/10 px-5 py-5">
                  <h2 className="text-2xl font-display tracking-wide text-primary">{member.name}</h2>
                  <p className="mt-2 text-white/75 uppercase tracking-[0.22em] text-sm font-semibold">{member.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
