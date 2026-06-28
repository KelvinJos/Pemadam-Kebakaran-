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
const TACTICAL_ARMORY: Record<string, { name: string; type: string; level: string; description: string }[]> = {
  "fire-suppression": [
    { name: "Sistem Regulator SCBA", type: "Pernapasan", level: "100% O2", description: "Perlindungan atmosfer toksik penuh dengan HUD tekanan sisa terintegrasi." },
    { name: "Alloy Forged Halligan Tool", type: "Breaching", level: "Heavy-Duty", description: "Alat dobrak taktis baja tuang untuk penetrasi pintu baja tercepat." },
    { name: "Kamera Termal Bullard XT", type: "Deteksi", level: "Infrared", description: "Pemetaan suhu partisi dinding untuk evakuasi korban tertutup asap pekat." }
  ],
  "rescue-tactical": [
    { name: "Hydraulic Spreader 15-Ton", type: "Extrication", level: "820 Bar", description: "Penyelamat kecelakaan jalan raya untuk membuka pilar kendaraan ringsek." },
    { name: "Geiger Counter Monitor", type: "Deteksi Hazmat", level: "R/h Safe", description: "Sensor partikel radiasi alfa, beta, dan gama di area tercemar zat kimia." },
    { name: "Gas Analyzer Multi-Rae", type: "Keamanan Gas", level: "PPM Grade", description: "Detektor portabel nirkabel untuk mengidentifikasi kebocoran CO dan LEL." }
  ],
  "medical-ems": [
    { name: "Lifepak 15 Defibrillator", type: "Kardiak", level: "Armed 200J", description: "Monitor EKG canggih dengan defibrilasi bifasik otomatis." },
    { name: "Trauma Resuscitation Kit", type: "Pendarahan", level: "Steril Class-A", description: "Paket klem hemostatis tumpukan beku dan pembalut darurat." },
    { name: "Intubation Airway Set", type: "Pernapasan Darurat", level: "Laryngoscope", description: "Pipa napas mekanik darurat guna mengamankan jalur trakea pasien kritis." }
  ]
};

export default function Structure() {
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>(DIVISIONS_DATA[0].id);
  const [activeVehicleIndex, setActiveVehicleIndex] = useState<number>(0);
  const [equippedGear, setEquippedGear] = useState<Record<string, boolean>>({});
  const [selectedRankIndex, setSelectedRankIndex] = useState<number>(0);

  const selectedDivision = DIVISIONS_DATA.find((div) => div.id === selectedDivisionId) || DIVISIONS_DATA[0];

  // Auto reset vehicle and rank detail index when division swaps
  useEffect(() => {
    setActiveVehicleIndex(0);
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

  const currentGear = TACTICAL_ARMORY[selectedDivision.id] || TACTICAL_ARMORY["fire-suppression"];

  const toggleGear = (gearName: string) => {
    setEquippedGear(prev => ({
      ...prev,
      [gearName]: !prev[gearName]
    }));
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

        {/* Division Selection Switcher - Sleek pill style */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-[#0d0d11]/90 rounded-full border border-white/10 max-w-3xl mx-auto mb-12 shadow-2xl backdrop-blur-md" id="division-selector-pills">
          {DIVISIONS_DATA.map((division) => {
            const isSelected = selectedDivisionId === division.id;
            return (
              <button
                key={division.id}
                onClick={() => setSelectedDivisionId(division.id)}
                className={`relative px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 outline-none cursor-pointer flex items-center space-x-2.5 ${
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
                    className="absolute inset-0 bg-[#dc2626] rounded-full -z-10 shadow-lg shadow-red-950/40 border border-red-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span>{getIconComponent(division.iconName, `w-3.5 h-3.5 ${isSelected ? "text-white" : "text-[#dc2626]"}`)}</span>
                <span>{division.name}</span>
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
            {/* COLUMN 1: Division Showcase & Slogan (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              
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

              {/* Card 2: Tactical Armory Equipment Checklist (IMMERSIVE INTERACTIVE GADGETS) */}
              <BentoCard id="bento-tactical-gear" className="p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                  <div className="flex items-center space-x-2">
                    <Wrench className="w-4 h-4 text-red-500" />
                    <h4 className="font-display font-black text-[10px] uppercase tracking-widest text-white">
                      ALUTSISTA & TACTICAL GEAR
                    </h4>
                  </div>
                  <span className="text-[8px] font-mono text-zinc-500">READY</span>
                </div>
                <div className="space-y-3">
                  {currentGear.map((gear) => {
                    const isEquipped = !!equippedGear[gear.name];
                    return (
                      <div 
                        key={gear.name}
                        onClick={() => toggleGear(gear.name)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all duration-300 ${
                          isEquipped 
                            ? "bg-red-950/20 border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.05)]" 
                            : "bg-[#0c0c0f]/60 border-white/5 hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[11px] font-bold transition-colors duration-200 ${isEquipped ? "text-white" : "text-zinc-300"}`}>
                            {gear.name}
                          </span>
                          <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full border ${
                            isEquipped 
                              ? "bg-red-500/20 text-red-400 border-red-500/30" 
                              : "bg-white/5 text-zinc-500 border-white/5"
                          }`}>
                            {gear.type}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-normal">
                          {gear.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </BentoCard>

              {/* Card 5: Operational Assessment Metric Slider */}
              <BentoCard id="bento-risk-indicator" className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="w-4 h-4 text-red-500" />
                  <h4 className="font-display font-black text-[10px] uppercase tracking-widest text-white">
                    INDEKS DINAS OPERASIONAL
                  </h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-zinc-400">TINGKAT BAHAYA</span>
                      <span className="text-red-500 font-bold">94% MAXIMUM</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "94%" }} 
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-red-600 shadow-[0_0_8px_#dc2626]" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-zinc-400">RESPONS VELOSITAS</span>
                      <span className="text-zinc-200 font-bold">SUB-3 MENIT</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "85%" }} 
                        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                        className="h-full bg-zinc-300" 
                      />
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                    <span className="text-zinc-500 font-mono">STATUS:</span>
                    <span className="flex items-center space-x-1 font-bold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>STANDBY SIAGA I</span>
                    </span>
                  </div>
                </div>
              </BentoCard>

            </div>

            {/* COLUMN 2: Large Bento Rank Timeline Tree (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Card 3: Ranks and Talent Tree Selector */}
              <BentoCard id="bento-ranks-tree" className="p-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-[#dc2626]" />
                    <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">
                      Struktur Kepangkatan & Hierarki
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
                    Interaktif Komando
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left Column: Interactive Rank Selector Nodes (Talent Tree style) */}
                  <div className="md:col-span-5 space-y-2">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3">PILIH JABATAN JALUR KOMANDO</p>
                    <div className="space-y-1.5">
                      {selectedDivision.ranks.map((rank, idx) => {
                        const isChosen = selectedRankIndex === idx;
                        return (
                          <div
                            key={rank.title}
                            onClick={() => setSelectedRankIndex(idx)}
                            className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer border transition-all duration-300 ${
                              isChosen
                                ? "bg-red-950/20 border-red-500/30 text-white"
                                : "bg-white/5 border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-xl font-mono text-[9px] font-bold flex items-center justify-center transition-all ${
                                isChosen ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-white/5 text-zinc-500"
                              }`}>
                                {rank.abbreviation}
                              </div>
                              <span className="text-[11px] font-extrabold uppercase tracking-wide leading-none">{rank.title}</span>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isChosen ? "text-red-500 translate-x-1" : "text-zinc-600"}`} />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Display of Duties & Information for selected Rank */}
                  <div className="md:col-span-7 bg-[#0c0c0f]/60 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/5 rounded-full blur-3xl pointer-events-none" />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedRankIndex}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[9px] font-bold text-red-400 bg-red-950/25 px-2.5 py-0.5 rounded-lg border border-red-900/20">
                            {selectedDivision.ranks[selectedRankIndex].abbreviation}
                          </span>
                          {selectedDivision.ranks[selectedRankIndex].payGrade && (
                            <span className="font-mono text-[10px] font-semibold text-zinc-500">
                              Golongan: {selectedDivision.ranks[selectedRankIndex].payGrade}
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-display font-black text-lg uppercase tracking-wide text-white">
                            {selectedDivision.ranks[selectedRankIndex].title}
                          </h4>
                          <span className="font-mono text-[8px] font-black text-red-500/80 tracking-widest uppercase block mt-1">
                            KOMANDO TINGKAT {selectedRankIndex + 1}
                          </span>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                          <h5 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center">
                            <Radio className="w-3.5 h-3.5 mr-1.5 text-red-500 animate-pulse" />
                            Tugas Pokok & Tanggung Jawab
                          </h5>
                          <ul className="space-y-2.5">
                            {selectedDivision.ranks[selectedRankIndex].responsibilities.map((resp, rIdx) => (
                              <li key={rIdx} className="flex items-start text-xs text-zinc-400 leading-relaxed font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mr-2.5 mt-1.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </BentoCard>

              {/* Card 4: Armada & Vehicle Code Telemetry (BENTO BOX GRID STYLE) */}
              <BentoCard id="bento-fleet-telemetry" className="p-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-red-500" />
                    <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">
                      Inspeksi Armada & Telemetri Unit
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                    Live Dispatch Status
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left Column: Vehicle Selection Tabs */}
                  <div className="md:col-span-5 space-y-1.5">
                    {selectedDivision.vehicles.map((v, idx) => {
                      const isActive = activeVehicleIndex === idx;
                      return (
                        <div
                          key={v.code}
                          onClick={() => setActiveVehicleIndex(idx)}
                          className={`p-3.5 rounded-2xl cursor-pointer flex items-center justify-between border transition-all duration-300 ${
                            isActive
                              ? "bg-[#16161b] border-red-500/20 shadow-md"
                              : "bg-white/5 border-transparent text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold block text-zinc-200">{v.name}</span>
                            <span className="font-mono text-[8px] text-zinc-500 tracking-wider block mt-0.5">{v.code}</span>
                          </div>
                          <CheckCircle2 className={`w-4 h-4 transition-opacity duration-300 ${isActive ? "text-[#dc2626] opacity-100" : "opacity-0"}`} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Live Vehicle Telemetry Screen */}
                  <div className="md:col-span-7 bg-[#0c0c0f]/60 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeVehicleIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[8px] font-black bg-red-950/20 text-red-400 px-2 py-0.5 rounded border border-red-900/10">
                            TELEMETRI UNIT
                          </span>
                          <span className="flex items-center space-x-1 font-mono text-[9px] text-emerald-400">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                            <span>CONNECTED</span>
                          </span>
                        </div>
                        
                        <div>
                          <h4 className="font-display font-black text-base uppercase text-white leading-tight">
                            {selectedDivision.vehicles[activeVehicleIndex].name}
                          </h4>
                          <span className="font-mono text-[9px] text-zinc-500 tracking-wider">
                            UNIT CODE: {selectedDivision.vehicles[activeVehicleIndex].code}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {selectedDivision.vehicles[activeVehicleIndex].description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                          <div className="p-3 bg-white/5 rounded-xl text-center">
                            <span className="font-mono text-[9px] text-zinc-500 block uppercase">BAHAN BAKAR</span>
                            <span className="font-mono text-xs font-black text-white">92% FUEL CAP</span>
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl text-center">
                            <span className="font-mono text-[9px] text-zinc-500 block uppercase">STATUS RATING</span>
                            <span className="font-mono text-xs font-black text-[#dc2626] uppercase">OPTIMAL</span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </BentoCard>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
