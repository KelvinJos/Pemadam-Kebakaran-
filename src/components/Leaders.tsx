import { Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { LEADERS_DATA } from "../data";

export default function Leaders() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="leaders" className="py-24 bg-[#0d0d0d] border-t border-white/5 relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#dc2626] uppercase mb-2">
            STRUKTUR KOMANDO UTAMA
          </h2>
          <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tighter uppercase text-white mb-4">
            Pimpinan Tertinggi Departemen
          </h3>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Mengenal barisan pimpinan tertinggi yang bertanggung jawab atas arah kebijakan administratif, taktis, dan operasional Damkar Roleplay Department.
          </p>
        </div>

        {/* Leaders Grid - NO Boxy Borders! Elegant floating design with circle avatars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          id="leaders-list-grid"
        >
          {LEADERS_DATA.map((leader, idx) => (
            <motion.div
              key={leader.name}
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#111111]/30 hover:bg-[#111111]/60 transition-all duration-300"
            >
              {/* Sleek circular avatar with soft glowing ring */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#dc2626]/20 rounded-full blur-sm scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={leader.avatarUrl}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full object-cover object-center grayscale hover:grayscale-0 border border-white/10 transition-all duration-500 shadow-xl"
                  referrerPolicy="no-referrer"
                />
                {/* Small overlay badge for callsign */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#dc2626] border border-red-950 rounded-full text-[8px] font-mono font-bold tracking-widest text-white shadow-md">
                  {leader.callsign}
                </div>
              </div>

              {/* Title & Badge */}
              <div className="space-y-1 mb-4">
                <h4 className="font-display font-black text-base tracking-wide text-white uppercase">
                  {leader.name}
                </h4>
                <span className="font-mono text-[9px] font-bold text-[#dc2626] bg-red-950/20 px-2.5 py-0.5 rounded border border-red-900/10 uppercase tracking-widest block mx-auto w-fit">
                  {leader.role}
                </span>
              </div>

              {/* Bios */}
              <p className="text-[11px] text-zinc-500 leading-relaxed font-normal max-w-xs">
                {leader.description}
              </p>

              {/* Interactive subtle stamp */}
              <div className="mt-5 flex items-center space-x-1.5 text-zinc-700">
                <Shield className="w-3.5 h-3.5" />
                <span className="font-mono text-[8px] font-bold tracking-wider uppercase">verified chief staff</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Inner Banner - Clean banner card */}
        <div className="mt-16 max-w-4xl mx-auto p-6 bg-[#111111]/40 border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2 bg-red-950/20 rounded-lg text-[#dc2626]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-display font-bold text-xs uppercase text-white tracking-wide">
                Ingin Menjadi Bagian Dari Tim Pimpinan?
              </h5>
              <p className="text-[10px] text-zinc-500 mt-0.5">
                Kenaikan jabatan dilakukan secara berjenjang melalui evaluasi operasional bulanan dan ujian keperwiraan akademi.
              </p>
            </div>
          </div>
          <a
            href="#join"
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-[9px] uppercase tracking-widest rounded border border-white/5 transition-colors shrink-0"
          >
            Pelajari Onboarding
          </a>
        </div>

      </div>
    </section>
  );
}
