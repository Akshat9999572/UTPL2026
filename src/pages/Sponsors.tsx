import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const baseUrl = import.meta.env.BASE_URL;
const sponsorLogo = `${baseUrl}images/sponsor-rotary-logo.jpg`;
const sponsors = [
  {
    name: "Rotarian Ashish Shukla",
    role: "President",
    image: `${baseUrl}images/sponsor-ashish-shukla.jpg`,
  },
  {
    name: "Rotarian DD Shukla",
    role: "Secretary",
    image: `${baseUrl}images/sponsor-dd-shukla.jpg`,
  },
  {
    name: "Rotarian Ambarish Tripathi",
    role: "Treasurer",
    image: `${baseUrl}images/sponsor-ambarish-tripathi.jpg`,
  },
  {
    name: "Rotarian Dhirendra Pratap Singh",
    role: "Convener",
    image: `${baseUrl}images/sponsor-dhirendra-pratap-singh.jpg`,
  },
];

const coSponsors = [
  {
    name: "Patriot School",
    type: "Official Co-Sponsor",
    image: `${baseUrl}images/cosponsor-patriot-school.jpg`,
    description: "A premier educational institution dedicated to nurturing knowledge, values, and leadership since 1996.",
  },
  {
    name: "National Family Mart and Book Depot",
    type: "Official Co-Sponsor",
    image: `${baseUrl}images/cosponsor-national-family-mart.jpg`,
    description: "Your trusted retail and educational destination for quality books, learning resources, and family essentials.",
  },
  {
    name: "Bamshanker Lal & Sons",
    type: "Official Co-Sponsor",
    image: `${baseUrl}images/cosponsor-bamshanker-lal-and-sons.jpg`,
    description: "A highly trusted name in traditional wellness, offering authentic Ayurvedic medicine and wellness consultations.",
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
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden border border-primary/40 bg-white text-secondary shadow-2xl"
          >
            <div className="absolute inset-x-0 top-0 h-2 bg-primary"></div>
            <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[260px_1fr] lg:p-8">
              <div className="flex flex-col justify-between gap-6 border-b border-secondary/10 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary">Presented By</p>
                  <h2 className="mt-3 text-4xl font-display leading-none md:text-5xl">
                    Rotary Club Of Unnao Royal
                  </h2>
                </div>
                <div className="w-full max-w-[180px] bg-white">
                  <img
                    src={sponsorLogo}
                    alt="Rotary Club of Unnao Royal logo"
                    className="w-full object-contain"
                  />
                </div>
              </div>

              <div>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.24em] text-secondary/50">Championship Sponsors</p>
                    <h3 className="mt-1 text-3xl font-display text-secondary md:text-4xl">Our Supporters</h3>
                  </div>
                  <div className="h-1 w-24 bg-primary"></div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {sponsors.map((member, idx) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.07 }}
                      className="overflow-hidden border border-secondary/10 bg-secondary/[0.03]"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-secondary/10">
                        <img
                          src={member.image}
                          alt={`${member.name}, ${member.role}`}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div className="border-t border-secondary/10 px-4 py-4">
                        <h4 className="text-2xl font-display leading-tight tracking-wide text-secondary">{member.name}</h4>
                        <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary/55">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="py-20 border-t border-white/10 bg-white/[0.01]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Championship Co-Sponsors</p>
              <h2 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
                Our Supporting Partners
              </h2>
              <p className="mt-4 text-white/70 text-lg">
                We are immensely grateful to our distinguished co-sponsors whose generosity and support make this tournament possible.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coSponsors.map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-primary/50 hover:bg-white/10"
              >
                <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-white p-6 shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
                  <img
                    src={partner.image}
                    alt={`${partner.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="mt-6 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {partner.type}
                    </span>
                    <h3 className="mt-2 text-2xl font-display text-white transition-colors duration-300 group-hover:text-primary min-h-[3rem] flex items-center">
                      {partner.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
