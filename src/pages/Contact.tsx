import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Link } from "wouter";

const baseUrl = import.meta.env.BASE_URL;
const adminPhoto = `${baseUrl}images/admin-dr-akshat-shukla.png`;

export default function Contact() {
  return (
    <main className="min-h-screen bg-secondary text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-10 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors font-semibold tracking-wide">
            <ArrowLeft className="h-4 w-4" />
            Back To Home
          </Link>

          <div className="mt-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto w-full max-w-md"
            >
              <div className="overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                <div className="aspect-[4/5] overflow-hidden bg-white/10">
                  <img
                    src={adminPhoto}
                    alt="Dr. Akshat Shukla"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-primary font-bold tracking-[0.3em] uppercase text-sm">About Admin</p>
              <h1 className="mt-4 text-5xl md:text-7xl font-display leading-[0.92]">
                Dr. Akshat Shukla
              </h1>
              <p className="mt-5 max-w-2xl text-white/75 text-lg leading-relaxed">
                For championship administration and coordination, you can reach out directly to the admin using the contact details below.
              </p>

              <div className="mt-8 grid gap-4 max-w-xl">
                <div className="flex items-center gap-4 border border-white/10 bg-white/5 px-5 py-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-secondary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/60 font-semibold">Contact No</p>
                    <p className="mt-1 text-xl font-semibold text-white">8543052329</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 border border-white/10 bg-white/5 px-5 py-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-secondary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/60 font-semibold">Email</p>
                    <p className="mt-1 text-xl font-semibold text-white break-all">akshatshuklawrites@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
