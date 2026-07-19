import React, { useState, useRef, useEffect } from "react";
import { 
  Flame, 
  ShieldAlert, 
  HeartPulse, 
  Shield, 
  Award, 
  Truck, 
  ChevronRight, 
  Zap, 
  Activity, 
  Compass, 
  Crosshair, 
  CheckCircle2, 
  Wrench,
  Radio
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DIVISIONS_DATA } from "./data";

// Premium 3D Perspective Tilt Card with Mouse Radial Glow Tracker
function BentoCard({ 
  children, 
  className = "", 
  id = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
  id?: string; 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Normalize coordinates between -1 and 1
    setCoords({ x: x / (rect.width / 2), y: y / (rect.height / 2) });
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
      className={`relative overflow-hidden rounded-3xl bg-[#09090b]/80 border border-white/5 transition-all duration-500 backdrop-blur-xl ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${coords.x * 4}deg) rotateX(${-coords.y * 4}deg) translateY(-2px)`
          : "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0deg)",
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px -5px rgba(239, 68, 68, 0.1)"
          : "0 10px 30px -15px rgba(0,0,0,0.5)",
        borderColor: isHovered ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Laser radial glare following cursor */}
      <div
        className="absolute pointer-events-none inset-0 opacity-0 transition-opacity duration-500 ease-out z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x * 120 + 150}px ${coords.y * 120 + 150}px, rgba(239, 68, 68, 0.08), transparent 80%)`,
        }}
      />
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
}

// Interactive Armory Gear checklist mock database
// (REMOVED)

export default function Structure() {
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>(DIVISIONS_DATA[0].id);
  const [selectedRankIndex, setSelectedRankIndex] = useState<number>(0);

  const selectedDivision = DIVISIONS_DATA.find((div) => div.id === selectedDivisionId) || DIVISIONS_DATA[0];

  // Auto reset rank detail index when division swaps
  useEffect(() => {
    setSelectedRankIndex(0);
  }, [selectedDivisionId]);

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
    <section id="structure" className="py-28 bg-[#040406] border-t border-white/5 relative overflow-hidden">
      {/* Background cyber ambient grid lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-zinc-950 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-mono text-[9px] font-bold tracking-[0.4em] text-red-500 uppercase mb-2">
              ORGANISASI & STRUKTUR
            </h2>
            <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tighter uppercase text-white mb-4">
              Pusat Komando Divisi & Pangkat
            </h3>
            <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Jelajahi sayap operasional Nusantara Fire Departement yang berspesialisasi tinggi melalui pusat kontrol interaktif di bawah ini.
            </p>
          </motion.div>
        </div>

        {/* Division Selection Switcher - Sleek pill style that adapts cleanly to mobile */}
        <div className="flex flex-wrap justify-center items-center gap-2 p-2 bg-[#0d0d11]/90 rounded-[2rem] md:rounded-full border border-white/10 max-w-3xl mx-auto mb-12 shadow-2xl backdrop-blur-md" id="division-selector-pills">
          {DIVISIONS_DATA.map((division) => {
            const isSelected = selectedDivisionId === division.id;
            return (
              <button
                key={division.id}
                onClick={() => setSelectedDivisionId(division.id)}
                className={`relative px-5 py-3 rounded-2xl md:rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 outline-none cursor-pointer flex items-center justify-center space-x-2.5 flex-1 sm:flex-initial min-w-[140px] sm:min-w-0 ${
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
                    className="absolute inset-0 bg-[#dc2626] rounded-2xl md:rounded-full -z-10 shadow-lg shadow-red-950/40 border border-red-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span>{getIconComponent(division.iconName, `w-3.5 h-3.5 ${isSelected ? "text-white" : "text-[#dc2626]"}`)}</span>
                <span className="text-center whitespace-nowrap">{division.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Division Detailed Information Display in Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDivisionId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            id="division-details-panel"
          >
            {/* COLUMN 1: Division Showcase & Slogan (lg:col-span-12) */}
            <div className="lg:col-span-12 space-y-6">
              
              {/* Card 1: Main Info */}
              <BentoCard id="bento-main-info" className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="p-2.5 bg-red-950/30 border border-red-500/20 text-[#dc2626] rounded-2xl shadow-inner animate-pulse">
                    {getIconComponent(selectedDivision.iconName, "w-5 h-5")}
                  </span>
                  <span className="font-mono text-[8px] font-black tracking-[0.2em] text-[#dc2626] uppercase">
                    UNIT OPERASIONAL
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl text-white mb-2 uppercase tracking-wide leading-none">
                  {selectedDivision.name}
                </h3>
                <p className="text-xs font-bold text-red-400 mb-6 italic leading-relaxed">
                  "{selectedDivision.tagline}"
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                  {selectedDivision.description}
                </p>
              </BentoCard>

              {/* Card 2: Division Image Display */}
              <BentoCard id="bento-division-image" className="p-0 overflow-hidden h-64">
                <img 
                  src={selectedDivision.imageUrl} 
                  alt={selectedDivision.name} 
                  className="w-full h-full object-cover" 
                />
              </BentoCard>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
