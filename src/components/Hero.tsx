import React, { useRef, useState, useEffect } from "react";
import { ShieldCheck, ArrowDown, Users, FlameKindling, Activity } from "lucide-react";
import { motion, useInView } from "motion/react";
import { QUICK_STATS } from "../data";

interface CounterProps {
  value: string;
}

function AnimatedCounter({ value }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const numericPart = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericPart;
      if (start === end) return;

      const duration = 1500; // 1.5 seconds
      const incrementTime = Math.max(Math.floor(duration / end), 15);
      
      const timer = setInterval(() => {
        start += Math.ceil((end - start) / 10);
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, numericPart]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

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
          src="https://i.ibb.co.com/vvRdh40X/1780511633247.webp"
          alt="Fire Truck Siren"
          className="w-full h-full object-cover object-center opacity-25 select-none"
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
              Website NFD
            </span>
          </motion.div>

          {/* Clean Minimalism Design Title */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tighter uppercase text-white mb-6"
            id="hero-title"
          >
            <span className="text-white">Nusantara</span> <br />
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(220,38,38,0.2)]">Fire Departement</span>
          </motion.h1>

          {/* Professional Underline Accent & Mission */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-red-600/50 shadow-[0_0_8px_#dc2626]"></div>
            <p className="font-mono text-[9px] text-red-500 uppercase tracking-[0.35em] font-extrabold">
              instansi penanggulangan kebakaran dan penyelamatan
            </p>
            <div className="h-[1px] w-12 bg-red-600/50 shadow-[0_0_8px_#dc2626]"></div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed mb-10 max-w-2xl mx-auto"
            id="hero-tagline"
          >
            Nusantara Fire Departement adalah sebuah departemen yang ada di kota Nusantara yang bertugas untuk melaksanakan tugas-tugas penyelamatan dan pemadam kebakaran. Serta melaksanakan bantuan-bantuan yang diperlukan oleh warga.
          </motion.p>

          {/* Call to Actions - Ultra clean buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            id="hero-actions"
          >
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group w-full sm:w-auto px-8 py-4 bg-[#dc2626] hover:bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-xl shadow-2xl shadow-red-950/50 border border-red-500/25 transition-all duration-300 text-center"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="flex items-center justify-center space-x-2">
                <span>Gabung Discord Kami</span>
              </span>
            </a>
            <button
              onClick={scrollToStructure}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-zinc-200 font-extrabold text-[10px] uppercase tracking-widest rounded-xl border border-white/10 transition-all duration-300 text-center cursor-pointer shadow-lg hover:border-red-500/30"
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
              className="p-6 rounded-2xl bg-[#09090b]/60 border border-white/5 transition-all duration-300 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-950/10 hover:-translate-y-1 group relative overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-900/5 rounded-full blur-2xl group-hover:bg-red-800/10 transition-all duration-500" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl sm:text-3xl font-black text-white tracking-tight">
                  <AnimatedCounter value={stat.value} />
                </span>
                <div className="p-2 bg-red-950/20 rounded-xl border border-red-900/10 text-[#dc2626] group-hover:scale-110 transition-transform">
                  {getStatIcon(i)}
                </div>
              </div>
              <h3 className="font-display font-extrabold text-[10px] text-zinc-300 uppercase tracking-widest mb-1">
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
