import { useState, useEffect } from "react";
import { Maximize2, X, Eye, Image as ImageIcon, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GALLERY_ITEMS } from "../data";
import { GalleryItem } from "../types";

export default function Gallery() {
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

  // Display exactly 4 items
  const displayedItems = GALLERY_ITEMS.slice(0, 4);

  return (
    <section id="gallery" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#dc2626] uppercase mb-2">
            SKENARIO & MEDIA
          </h2>
          <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tighter uppercase text-white">
            Galeri Foto Operasional
          </h3>
          <p className="text-zinc-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Dokumentasi resolusi tinggi dari sesi roleplay komunitas.
          </p>
        </div>

        {/* Responsive Grid Layout - 2x2 Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
          id="gallery-grid-wrapper"
        >
            {displayedItems.map((item) => (
              <div
                key={item.id}
                className="group relative h-80 rounded-2xl overflow-hidden bg-[#111111] border border-white/5 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
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
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h4 className="font-display font-bold text-sm uppercase tracking-wide text-white leading-tight group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h4>
                </div>

                {/* Corner Zoom Icon */}
                <div className="absolute top-4 right-4 p-2 bg-black/80 border border-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  <Maximize2 className="w-3.5 h-3.5 text-red-500" />
                </div>
              </div>
            ))}
        </div>

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
                </div>

                {/* Modal Info Area */}
                <div className="p-6 sm:p-8">
                  <h3 className="font-display font-extrabold text-xl uppercase tracking-wide text-white leading-tight">
                    {selectedItem.title}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
