import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Calendar, 
  Clock, 
  MapPin, 
  Newspaper, 
  ArrowRight, 
  Sparkles 
} from "lucide-react";
import { motion } from "motion/react";
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";
import { db } from "../lib/firebase";

interface NewsItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  createdAt: string;
}

interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  createdAt: string;
}

// Beautiful Default Content in Indonesian (always populates the UI nicely)
const DEFAULT_NEWS: NewsItem[] = [];

const DEFAULT_SCHEDULES: ScheduleItem[] = [];

export default function NewsSection() {
  const [dbNews, setDbNews] = useState<NewsItem[]>([]);
  const [dbSchedules, setDbSchedules] = useState<ScheduleItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    // Real-time listener for News
    const qNews = query(collection(db, "news"), orderBy("createdAt", "desc"));
    const unsubscribeNews = onSnapshot(qNews, (snapshot) => {
      const items: NewsItem[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as NewsItem);
      });
      setDbNews(items);
    }, (error) => {
      console.error("Error loading news in news section:", error);
    });

    // Real-time listener for Schedules
    const qScheds = query(collection(db, "schedules"), orderBy("createdAt", "desc"));
    const unsubscribeScheds = onSnapshot(qScheds, (snapshot) => {
      const items: ScheduleItem[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ScheduleItem);
      });
      setDbSchedules(items);
    }, (error) => {
      console.error("Error loading schedules in news section:", error);
    });

    return () => {
      unsubscribeNews();
      unsubscribeScheds();
    };
  }, []);

  // Database items or defaults if not explicitly cleared
  const isNewsCleared = localStorage.getItem("nfd_cleared_news") === "true";
  const isSchedulesCleared = localStorage.getItem("nfd_cleared_schedules") === "true";

  const allNews = dbNews.length > 0 ? dbNews : (isNewsCleared ? [] : DEFAULT_NEWS);
  const allSchedules = dbSchedules.length > 0 ? dbSchedules : (isSchedulesCleared ? [] : DEFAULT_SCHEDULES);

  return (
    <section id="news-section" className="py-24 bg-[#050507] border-t border-white/5 relative overflow-hidden">
      {/* Dynamic glow decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-950/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-950/20 border border-red-500/20 px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-red-400 uppercase">
              INFORMASI & OPERASIONAL
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
            KABAR UTAMA & <span className="text-[#dc2626]">JADWAL PELATIHAN</span>
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Ikuti kabar berita terbaru dari departemen kami dan pantau jadwal akademi pelatihan taktis selanjutnya di stasiun utama.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: NEWS (KABAR UTAMA) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-white/5">
              <Newspaper className="w-5 h-5 text-[#dc2626]" />
              <h3 className="font-display font-black text-sm uppercase tracking-widest text-white">
                Berita Terbaru
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {allNews.map((news, idx) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  onClick={() => setSelectedNews(news)}
                  className="bg-[#0c0c0f]/60 border border-white/5 hover:border-[#dc2626]/20 hover:bg-[#0c0c0f] rounded-2xl p-4 cursor-pointer group flex flex-col justify-between transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 relative">
                      <img 
                        src={news.imageUrl} 
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                        {new Date(news.createdAt).toLocaleDateString("id-ID", { dateStyle: "medium" })}
                      </span>
                      <h4 className="font-display font-bold text-xs text-white line-clamp-2 mt-1 group-hover:text-red-400 transition-colors">
                        {news.title}
                      </h4>
                      <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-3 mt-1.5">
                        {news.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-[9px] font-mono text-[#dc2626]">
                    <span>BACA SELENGKAPNYA</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: TRAINING SCHEDULE (JADWAL PELATIHAN SEBELUMNYA/SELANJUTNYA) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-white/5">
              <Calendar className="w-5 h-5 text-[#dc2626]" />
              <h3 className="font-display font-black text-sm uppercase tracking-widest text-white">
                Jadwal Pelatihan Selanjutnya
              </h3>
            </div>

            <div className="space-y-4">
              {allSchedules.map((sched, idx) => (
                <motion.div
                  key={sched.id}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-[#0c0c0f]/80 border border-white/5 hover:border-white/10 rounded-2xl p-5 relative overflow-hidden transition-all group"
                >
                  {/* Calendar day decorative icon card */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-xs text-white group-hover:text-red-400 transition-colors">
                        {sched.title}
                      </h4>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-[10px] text-zinc-400 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                          <span>{sched.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-[10px] text-zinc-400 font-mono">
                          <Clock className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                          <span>{sched.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-[10px] text-zinc-400 font-mono">
                          <MapPin className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                          <span className="line-clamp-1">{sched.location}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-zinc-500 leading-relaxed pt-1.5">
                        {sched.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: READ NEWS FULL DETAIL */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0c0c0f] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden max-h-[85vh] flex flex-col"
          >
            <div className="aspect-video w-full overflow-hidden bg-black shrink-0 relative">
              <img 
                src={selectedNews.imageUrl} 
                alt={selectedNews.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 bg-black/80 hover:bg-[#dc2626] border border-white/10 text-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer select-none transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>NUSANTARA FIRE DEPARTMENT NEWS</span>
                <span>{new Date(selectedNews.createdAt).toLocaleDateString("id-ID", { dateStyle: "long" })}</span>
              </div>
              <h3 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight">
                {selectedNews.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">
                {selectedNews.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
