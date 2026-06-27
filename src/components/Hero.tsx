import { ShieldCheck, ArrowDown, Users, FlameKindling, Activity } from "lucide-react";
import { motion } from "motion/react";
import { QUICK_STATS } from "../data";

interface HeroProps {
  discordUrl?: string;
}

export default function Hero({ discordUrl = "https://discord.gg" }: HeroProps) {
  const scrollToStructure = () => {
    const el = document.getElementById("structure");
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Maps statistical indexes to corresponding Lucide icons for added visual richness
  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FlameKindling className="w-5 h-5 text-red-500" />;
      case 1:
        return <Users className="w-5 h-5 text-red-500" />;
      case 2:
        return <ShieldCheck className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#0d0d0d]"
    >
      {/* Background Image with Clean Flat Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1617470703128-26a0fc9af10f?auto=format&fit=crop&w=1920&q=80"
          alt="Fire Truck Siren"
          className="w-full h-full object-cover object-center opacity-25 select-none grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-[#0d0d0d]/90" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto"
        >
          {/* Minimalist Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2.5 px-3 py-1 bg-white/5 border border-white/10 rounded mb-8"
            id="status-badge"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#dc2626]"></span>
            </span>
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#dc2626] uppercase">
              Operasional & Dispatch Aktif
            </span>
          </motion.div>

          {/* Clean Minimalism Design Title */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tighter uppercase text-white mb-6"
            id="hero-title"
          >
            Nusantara <br />Fire <br />
            <span className="text-white/25">Departement</span>
          </motion.h1>

          {/* Professional Underline Accent & Mission */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[1px] w-8 bg-[#dc2626]"></div>
            <p className="font-mono text-[10px] text-[#dc2626] uppercase tracking-[0.3em] font-bold">
              instansi penanggulangan kebakaran dan penyelamatan
            </p>
            <div className="h-[1px] w-8 bg-[#dc2626]"></div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed mb-10 max-w-xl mx-auto"
            id="hero-tagline"
          >
            Nusantara Fire Departement adalah sebuah departemen yang ada di kota Nusantara yang bertugas untuk melaksanakan tugas-tugas penyelamatan dan pemadam kebakaran. Serta melaksanakan bantuan-bantuan yang diperlukan oleh warga.
          </motion.p>

          {/* Call to Actions - Ultra clean buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            id="hero-actions"
          >
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded shadow-lg shadow-red-950/30 transition-all duration-200 text-center"
            >
              Gabung Discord Kami
            </a>
            <button
              onClick={scrollToStructure}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-white/5 text-zinc-300 font-bold text-xs uppercase tracking-widest rounded border border-white/10 transition-all duration-200 text-center cursor-pointer"
            >
              Jelajahi Divisi
            </button>
          </motion.div>
        </motion.div>

        {/* Minimal Bento Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
          id="hero-stats"
        >
          {QUICK_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="p-5 rounded bg-[#111111]/80 border border-white/5 transition-all duration-300 hover:border-zinc-800"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-tight">
                  {stat.value}
                </span>
                <div className="p-1.5 bg-white/5 rounded border border-white/5 text-[#dc2626]">
                  {getStatIcon(i)}
                </div>
              </div>
              <h3 className="font-display font-bold text-xs text-zinc-300 uppercase tracking-wider mb-1">
                {stat.label}
              </h3>
              <p className="text-[11px] text-zinc-500 font-normal leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll Down */}
        <div className="flex justify-center mt-12 animate-bounce">
          <button
            onClick={scrollToStructure}
            className="text-zinc-600 hover:text-white transition-colors duration-200 p-2 cursor-pointer"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
