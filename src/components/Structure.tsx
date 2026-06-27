import { useState } from "react";
import { Flame, ShieldAlert, HeartPulse, Shield, Award, Truck, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DIVISIONS_DATA } from "../data";

export default function Structure() {
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>(DIVISIONS_DATA[0].id);

  const selectedDivision = DIVISIONS_DATA.find((div) => div.id === selectedDivisionId) || DIVISIONS_DATA[0];

  const getIconComponent = (name: string, className = "w-4 h-4") => {
    switch (name) {
      case "Flame":
        return <Flame className={className} />;
      case "ShieldAlert":
        return <ShieldAlert className={className} />;
      case "HeartPulse":
        return <HeartPulse className={className} />;
      default:
        return <Shield className={className} />;
    }
  };

  return (
    <section id="structure" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow to add premium depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#dc2626] uppercase mb-2">
            ORGANISASI & STRUKTUR
          </h2>
          <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tighter uppercase text-white mb-4">
            Divisi & Pangkat Departemen
          </h3>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Dinas Pemadam Kebakaran kami terbagi dalam beberapa sayap operasional yang memiliki spesialisasi tinggi. 
            Pilih divisi di bawah untuk melihat struktur kepangkatan dan armada unit.
          </p>
        </div>

        {/* Division Selection Switcher - SLEEK PILL SHAPED HEADER BAR (No boxy grid) */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-[#111111]/80 rounded-full border border-white/5 max-w-4xl mx-auto mb-16" id="division-selector-pills">
          {DIVISIONS_DATA.map((division) => {
            const isSelected = selectedDivisionId === division.id;
            return (
              <button
                key={division.id}
                onClick={() => setSelectedDivisionId(division.id)}
                className={`relative px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 outline-none cursor-pointer flex items-center space-x-2 ${
                  isSelected
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
                id={`division-tab-${division.id}`}
              >
                {/* Active Sliding Background Pill */}
                {isSelected && (
                  <motion.div
                    layoutId="activeDivisionPill"
                    className="absolute inset-0 bg-[#dc2626] rounded-full -z-10 shadow-lg shadow-red-950/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{getIconComponent(division.iconName, "w-3.5 h-3.5")}</span>
                <span>{division.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Division Detailed Information Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDivisionId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            id="division-details-panel"
          >
            {/* Left Side: Division Summary with soft glassmorphism & rounded edges */}
            <div className="lg:col-span-4 bg-[#111111]/40 border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-5">
                <span className="p-2 bg-red-950/20 border border-red-900/10 text-[#dc2626] rounded-lg">
                  {getIconComponent(selectedDivision.iconName, "w-4 h-4")}
                </span>
                <span className="font-mono text-[9px] font-bold tracking-widest text-[#dc2626] uppercase">
                  UNIT OPERASIONAL
                </span>
              </div>
              <h3 className="font-display font-extrabold text-xl text-white mb-2 uppercase tracking-wide leading-tight">
                {selectedDivision.name}
              </h3>
              <p className="text-xs font-semibold text-zinc-400 mb-5 italic leading-relaxed">
                "{selectedDivision.tagline}"
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed mb-8">
                {selectedDivision.description}
              </p>

              {/* Fleet section with clean lists instead of cards */}
              <div className="border-t border-white/5 pt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Truck className="w-4 h-4 text-[#dc2626]" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                    Armada & Peralatan
                  </h4>
                </div>
                <div className="space-y-4">
                  {selectedDivision.vehicles.map((vehicle) => (
                    <div
                      key={vehicle.code}
                      className="group flex items-start space-x-3 p-1"
                    >
                      {/* Accent tiny dot indicator */}
                      <div className="w-1.5 h-1.5 rounded-full bg-[#dc2626] mt-1.5 shrink-0" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">
                            {vehicle.name}
                          </span>
                          <span className="font-mono text-[8px] font-semibold px-1.5 py-0.5 bg-[#1a1a1a] text-zinc-400 border border-white/5 rounded">
                            {vehicle.code}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 font-normal leading-relaxed mt-1">
                          {vehicle.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Division Ranks and Responsibilities - SLEEK TIMELINE NODE LAYOUT (No harsh nested boxes) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-[#dc2626]" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                    Struktur Kepangkatan & Tugas
                  </h4>
                </div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
                  Tanggung Jawab Berjenjang
                </span>
              </div>

              {/* Premium Vertical Timeline - completely removes boxy blocks */}
              <div className="relative border-l border-white/5 pl-8 ml-3 sm:ml-4 space-y-10">
                {selectedDivision.ranks.map((rank, index) => (
                  <div
                    key={rank.title}
                    className="relative group transition-all duration-300"
                  >
                    {/* Glowing circular timeline node */}
                    <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-[#dc2626] group-hover:bg-[#dc2626] transition-colors duration-300 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      {/* Left Metadata column (Rank badge + title) */}
                      <div className="md:col-span-5">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[8px] font-bold text-red-400 bg-red-950/20 px-2 py-0.5 rounded border border-red-900/10">
                            {rank.abbreviation}
                          </span>
                          {rank.payGrade && (
                            <span className="font-mono text-[9px] font-bold text-zinc-500">
                              Golongan: {rank.payGrade}
                            </span>
                          )}
                        </div>
                        <h4 className="font-display font-bold text-sm uppercase tracking-wide text-white mt-1.5 group-hover:text-[#dc2626] transition-colors">
                          {rank.title}
                        </h4>
                        <span className="font-mono text-[8px] font-bold text-zinc-600 tracking-wider block mt-0.5">
                          TINGKAT {index + 1}
                        </span>
                      </div>

                      {/* Right Responsibilities column */}
                      <div className="md:col-span-7">
                        <h5 className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                          Tugas Pokok & Wewenang
                        </h5>
                        <ul className="space-y-1.5">
                          {rank.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start text-[11px] text-zinc-400 leading-relaxed">
                              <ChevronRight className="w-3.5 h-3.5 text-[#dc2626] shrink-0 mr-1 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
