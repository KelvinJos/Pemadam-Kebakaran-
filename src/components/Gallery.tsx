import { useState, useEffect } from "react";
import { Maximize2, X, Eye, Image as ImageIcon, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GALLERY_ITEMS } from "../data";
import { GalleryItem } from "../types";

export default function Gallery() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Esc key listener to close Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = ["All", "Operation", "Training", "Vehicles", "Ceremony"];

  const categoryTranslations: Record<string, string> = {
    All: "Semua",
    Operation: "Operasional",
    Training: "Pelatihan",
    Vehicles: "Armada Unit",
    Ceremony: "Apel Kehormatan"
  };

  const filteredItems =
    filter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#dc2626] uppercase mb-2">
              SKENARIO & MEDIA
            </h2>
            <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tighter uppercase text-white">
              Galeri Foto Operasional
            </h3>
            <p className="text-zinc-500 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
              Dokumentasi resolusi tinggi dari sesi roleplay komunitas, pemadaman api simulasi langsung, parade kendaraan, dan latihan operator dispatcher.
            </p>
          </div>

          {/* Filtering Tabs - Sleek pill style to reduce blockiness */}
          <div className="flex flex-wrap gap-2 p-1 bg-[#111115]/90 rounded-full border border-white/5 shadow-2xl backdrop-blur-md" id="gallery-filter-tabs">
            {categories.map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`relative px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-colors outline-none cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  id={`gallery-filter-${cat}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGalleryTabPill"
                      className="absolute inset-0 bg-[#dc2626] rounded-full -z-10 shadow-md shadow-red-950/30 border border-red-500/20"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span>{categoryTranslations[cat] || cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Grid Layout - Sleek rounded cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          id="gallery-grid-wrapper"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group relative h-72 rounded-2xl overflow-hidden bg-[#111111] border border-white/5 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="font-mono text-[8px] font-bold px-2 py-0.5 bg-red-950/80 text-red-400 border border-red-900/40 rounded-full uppercase tracking-wider">
                      {categoryTranslations[item.category] || item.category}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm uppercase tracking-wide text-white leading-tight group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-zinc-400 text-[11px] mt-1.5 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {item.description}
                  </p>
                </div>

                {/* Corner Zoom Icon */}
                <div className="absolute top-4 right-4 p-2 bg-black/80 border border-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  <Maximize2 className="w-3.5 h-3.5 text-red-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal (AnimatePresence) */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md"
              id="gallery-lightbox-modal"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="relative bg-[#111111] border border-white/5 max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-[#161616] hover:bg-[#222222] text-zinc-400 hover:text-white rounded-full border border-white/5 cursor-pointer transition-colors"
                  id="close-lightbox-btn"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Aspect-Ratio Box containing the image */}
                <div className="relative aspect-video bg-[#0d0d0d] w-full overflow-hidden">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                </div>

                {/* Modal Info Area */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-2.5">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-red-950 text-red-400 border border-red-900/50 uppercase tracking-widest font-mono">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      {categoryTranslations[selectedItem.category] || selectedItem.category}
                    </span>
                    <span className="inline-flex items-center text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                      <Calendar className="w-3 h-3 mr-1" />
                      Log Operasional
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl uppercase tracking-wide text-white leading-tight">
                    {selectedItem.title}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
                    {selectedItem.description}
                  </p>
                  
                  {/* Footer Disclaimer */}
                  <div className="mt-6 pt-5 border-t border-white/5 flex justify-between items-center">
                    <span className="font-mono text-[9px] text-zinc-600 tracking-wider">
                      ID: LOG-NFD-{selectedItem.id.toUpperCase()}
                    </span>
                    <span className="font-display font-bold text-[10px] uppercase tracking-wider text-red-500 flex items-center">
                      <Eye className="w-4 h-4 mr-1.5" /> Diverifikasi & Disetujui
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
