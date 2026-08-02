import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Unlock, 
  Trash2, 
  Plus, 
  Calendar, 
  FileText, 
  Image as ImageIcon, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  LogOut, 
  CheckCircle, 
  AlertTriangle 
} from "lucide-react";
import { motion } from "motion/react";
import { 
  collection, 
  doc, 
  addDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  writeBatch,
  getDocs
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";

interface AdminPortalProps {
  onBackToHome: () => void;
}

interface NewsItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  createdAt: any;
}

interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  createdAt: any;
}

export default function AdminPortal({ onBackToHome }: AdminPortalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  // CAPTCHA State
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState("");

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
    setCaptchaInput("");
  };

  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<"news" | "schedule">("news");

  // Form State - News
  const [newsTitle, setNewsTitle] = useState("");
  const [newsImageUrl, setNewsImageUrl] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsStatus, setNewsStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State - Schedule
  const [schedTitle, setSchedTitle] = useState("");
  const [schedDate, setSchedDate] = useState("");
  const [schedTime, setSchedTime] = useState("");
  const [schedLocation, setSchedLocation] = useState("");
  const [schedDescription, setSchedDescription] = useState("");
  const [schedStatus, setSchedStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Firestore Lists
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [schedulesList, setSchedulesList] = useState<ScheduleItem[]>([]);

  // Check login state on mount
  useEffect(() => {
    generateCaptcha();
    const adminSession = localStorage.getItem("nfd_admin_logged_in");
    if (adminSession === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch Firestore Data when logged in
  useEffect(() => {
    if (!isLoggedIn) return;

    // Real-time listener for News
    const qNews = query(collection(db, "news"), orderBy("createdAt", "desc"));
    const unsubscribeNews = onSnapshot(qNews, (snapshot) => {
      const items: NewsItem[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as NewsItem);
      });
      setNewsList(items);
    }, (error) => {
      console.error("Error fetching news:", error);
    });

    // Real-time listener for Schedules
    const qScheds = query(collection(db, "schedules"), orderBy("createdAt", "desc"));
    const unsubscribeScheds = onSnapshot(qScheds, (snapshot) => {
      const items: ScheduleItem[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ScheduleItem);
      });
      setSchedulesList(items);
    }, (error) => {
      console.error("Error fetching schedules:", error);
    });

    return () => {
      unsubscribeNews();
      unsubscribeScheds();
    };
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verify CAPTCHA
    const expectedAnswer = captchaNum1 + captchaNum2;
    if (parseInt(captchaInput) !== expectedAnswer) {
      setLoginError("Validasi CAPTCHA gagal! Silakan coba lagi.");
      generateCaptcha();
      return;
    }

    // Default professional credentials
    if (username === "nsfd_jaya" && password === "108025572819278adminNfdAdmin2026108025572819278") {
      localStorage.setItem("nfd_admin_logged_in", "true");
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Kombinasi Username dan Kata Sandi tidak valid!");
      generateCaptcha();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("nfd_admin_logged_in");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  // Handle local image file upload from gallery / file manager
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      setNewsStatus({ type: "error", message: "Ukuran file terlalu besar! Maksimal 2MB." });
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setNewsImageUrl(result);
        setNewsStatus({ type: "success", message: "Foto berhasil dimuat dari perangkat!" });
        setTimeout(() => setNewsStatus(null), 3000);
      }
    };
    reader.onerror = () => {
      setNewsStatus({ type: "error", message: "Gagal membaca file gambar." });
    };
    reader.readAsDataURL(file);
  };

  // Submit News to Firestore
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsImageUrl.trim() || !newsDescription.trim()) {
      setNewsStatus({ type: "error", message: "Mohon lengkapi semua field berita!" });
      return;
    }

    try {
      const payload = {
        title: newsTitle.trim(),
        imageUrl: newsImageUrl.trim(),
        description: newsDescription.trim(),
        createdAt: new Date().toISOString(),
        adminKey: "NfdAdminSecret2026" // Validated by Firestore security rules
      };

      await addDoc(collection(db, "news"), payload);
      localStorage.removeItem("nfd_cleared_news");
      
      setNewsTitle("");
      setNewsImageUrl("");
      setNewsDescription("");
      setNewsStatus({ type: "success", message: "Berita berhasil dipublikasikan!" });
      setTimeout(() => setNewsStatus(null), 4000);
    } catch (error) {
      setNewsStatus({ type: "error", message: "Gagal memublikasikan berita. Coba lagi." });
      handleFirestoreError(error, OperationType.CREATE, "news");
    }
  };

  // Submit Schedule to Firestore
  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !schedTitle.trim() || 
      !schedDate.trim() || 
      !schedTime.trim() || 
      !schedLocation.trim() || 
      !schedDescription.trim()
    ) {
      setSchedStatus({ type: "error", message: "Mohon lengkapi semua field jadwal!" });
      return;
    }

    try {
      const payload = {
        title: schedTitle.trim(),
        date: schedDate.trim(),
        time: schedTime.trim(),
        location: schedLocation.trim(),
        description: schedDescription.trim(),
        createdAt: new Date().toISOString(),
        adminKey: "NfdAdminSecret2026" // Validated by Firestore security rules
      };

      await addDoc(collection(db, "schedules"), payload);
      localStorage.removeItem("nfd_cleared_schedules");

      setSchedTitle("");
      setSchedDate("");
      setSchedTime("");
      setSchedLocation("");
      setSchedDescription("");
      setSchedStatus({ type: "success", message: "Jadwal pelatihan berhasil ditambahkan!" });
      setTimeout(() => setSchedStatus(null), 4000);
    } catch (error) {
      setSchedStatus({ type: "error", message: "Gagal menambahkan jadwal. Coba lagi." });
      handleFirestoreError(error, OperationType.CREATE, "schedules");
    }
  };

  // Delete News from Firestore
  const handleDeleteNews = async (id: string) => {
    try {
      await deleteDoc(doc(db, "news", id));
      if (newsList.length <= 1) {
        localStorage.setItem("nfd_cleared_news", "true");
      }
    } catch (error) {
      console.error("Gagal menghapus berita:", error);
      handleFirestoreError(error, OperationType.DELETE, `news/${id}`);
    }
  };

  // Delete Schedule from Firestore
  const handleDeleteSchedule = async (id: string) => {
    try {
      await deleteDoc(doc(db, "schedules", id));
      if (schedulesList.length <= 1) {
        localStorage.setItem("nfd_cleared_schedules", "true");
      }
    } catch (error) {
      console.error("Gagal menghapus jadwal:", error);
      handleFirestoreError(error, OperationType.DELETE, `schedules/${id}`);
    }
  };

  // Delete All News
  const handleDeleteAllNews = async () => {
    try {
      const snapshot = await getDocs(collection(db, "news"));
      const batch = writeBatch(db);
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      localStorage.setItem("nfd_cleared_news", "true");
    } catch (error) {
      console.error("Gagal menghapus semua berita:", error);
      handleFirestoreError(error, OperationType.DELETE, "news");
    }
  };

  // Delete All Schedules
  const handleDeleteAllSchedules = async () => {
    try {
      const snapshot = await getDocs(collection(db, "schedules"));
      const batch = writeBatch(db);
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      localStorage.setItem("nfd_cleared_schedules", "true");
    } catch (error) {
      console.error("Gagal menghapus semua jadwal:", error);
      handleFirestoreError(error, OperationType.DELETE, "schedules");
    }
  };

  return (
    <div className="min-h-screen bg-[#040406] text-zinc-100 flex flex-col relative overflow-hidden pt-24 pb-12">
      {/* Visual cyber mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c1c24_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 z-10 flex-grow flex flex-col">
        {/* Top bar navigation */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer bg-white/5 px-4 py-2 rounded-xl border border-white/5"
          >
            <ArrowLeft className="w-4 h-4 text-[#dc2626]" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center space-x-3">
            <span className="font-mono text-[9px] tracking-widest px-3 py-1 bg-red-950/20 text-red-400 border border-red-500/20 rounded-full font-bold uppercase">
              PORTAL ADMINISTRATOR
            </span>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors cursor-pointer bg-red-950/10 hover:bg-red-950/20 px-3.5 py-2 rounded-xl border border-red-500/10"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            )}
          </div>
        </div>

        {!isLoggedIn ? (
          // LOGIN SCREEN
          <div className="flex-grow flex items-center justify-center py-12">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md bg-[#0c0c0f] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#dc2626] rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-950/50">
                <Lock className="w-5 h-5" />
              </div>

              <div className="text-center mt-6 mb-8">
                <h2 className="font-display font-black text-xl tracking-tight text-white uppercase">
                  Otentikasi Staf
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Masukkan kredensial otorisasi operasional NFD
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-950/30 border border-red-500/20 rounded-xl text-red-400 text-xs mb-6 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                    Nama Pengguna (Username)
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username..."
                    className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                    Kata Sandi (Password)
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password..."
                    className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
                  />
                </div>

                {/* CAPTCHA Validation */}
                <div className="pt-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                    Verifikasi Keamanan
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#1a1a1f] border border-white/10 rounded-xl px-4 py-3 font-mono font-bold text-lg text-white select-none whitespace-nowrap">
                      {captchaNum1} + {captchaNum2} =
                    </div>
                    <input
                      type="number"
                      required
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="?"
                      className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none text-center font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#dc2626] hover:bg-red-700 text-white font-bold uppercase tracking-widest text-[10px] py-3.5 rounded-xl transition-all shadow-lg shadow-red-950/40 border border-red-500/20 flex items-center justify-center space-x-2 cursor-pointer mt-6 select-none"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Konfirmasi Masuk</span>
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          // LOGGED IN DASHBOARD
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-4">
            {/* Sidebar Navigation Panel */}
            <div className="lg:col-span-3 space-y-3">
              <div className="bg-[#0c0c0f] border border-white/5 rounded-2xl p-4">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-3">
                  PILIH MODUL KELOLA
                </p>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setActiveTab("news")}
                    className={`w-full flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === "news"
                        ? "bg-[#dc2626] text-white shadow-lg shadow-red-900/30"
                        : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>Kelola Berita</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("schedule")}
                    className={`w-full flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === "schedule"
                        ? "bg-[#dc2626] text-white shadow-lg shadow-red-900/30"
                        : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Kelola Jadwal</span>
                  </button>
                </div>
              </div>

              {/* Status card info */}
              <div className="bg-[#0c0c0f] border border-white/5 rounded-2xl p-4 text-center sm:text-left">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block mr-2 animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  KONEKSI FIRESTORE AKTIF
                </span>
                <p className="text-[10px] text-zinc-600 mt-1.5 leading-normal">
                  Sistem langsung disinkronkan secara real-time ke database cloud utama.
                </p>
              </div>
            </div>

            {/* Main Action Workspace Container */}
            <div className="lg:col-span-9 space-y-8">
              {activeTab === "news" ? (
                // TAB: MANAGE NEWS (KELOLA BERITA)
                <motion.div
                  key="tab-news"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* News form card */}
                  <div className="bg-[#0c0c0f] border border-white/5 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center space-x-2 mb-6">
                      <Plus className="w-5 h-5 text-[#dc2626]" />
                      <h3 className="font-display font-black text-sm uppercase tracking-widest text-white">
                        Publikasikan Berita Baru
                      </h3>
                    </div>

                    {newsStatus && (
                      <div className={`p-4 rounded-xl text-xs mb-6 flex items-start space-x-2.5 border ${
                        newsStatus.type === "success" 
                          ? "bg-emerald-950/30 border-emerald-500/20 text-emerald-400" 
                          : "bg-red-950/30 border-red-500/20 text-red-400"
                      }`}>
                        {newsStatus.type === "success" ? (
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        )}
                        <span>{newsStatus.message}</span>
                      </div>
                    )}

                    <form onSubmit={handleAddNews} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                            Judul Berita (Max 100 Karakter)
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={100}
                            value={newsTitle}
                            onChange={(e) => setNewsTitle(e.target.value)}
                            placeholder="Contoh: Pembelian Unit Armada Rescue Tangga Baru..."
                            className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 text-white placeholder-zinc-600 rounded-xl px-4 py-2.5 text-xs transition-all focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                            Gambar / Foto Berita (URL atau Upload Galeri)
                          </label>
                          <div className="space-y-2">
                            <div className="relative">
                              <input
                                type="text"
                                required
                                value={newsImageUrl}
                                onChange={(e) => setNewsImageUrl(e.target.value)}
                                placeholder="Paste URL https://... atau pilih dari galeri di bawah"
                                className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 text-white placeholder-zinc-600 rounded-xl pl-10 pr-4 py-2.5 text-xs transition-all focus:outline-none truncate"
                              />
                              <ImageIcon className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <label className="flex-1 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 rounded-xl px-4 py-2 text-xs font-medium cursor-pointer transition-all flex items-center justify-center space-x-2">
                                <ImageIcon className="w-3.5 h-3.5 text-red-500 shrink-0" />
                                <span className="truncate">Ambil dari Galeri / File Manager</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileUpload}
                                  className="hidden"
                                />
                              </label>
                              {newsImageUrl && (
                                <button
                                  type="button"
                                  onClick={() => setNewsImageUrl("")}
                                  className="bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/20 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer shrink-0 font-medium"
                                >
                                  Reset
                                </button>
                              )}
                            </div>
                            {newsImageUrl && (
                              <div className="mt-2 relative w-full h-24 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                                <img
                                  src={newsImageUrl}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    // Fallback or ignore
                                  }}
                                />
                                <div className="absolute bottom-1 right-1 bg-black/70 text-[9px] font-mono px-2 py-0.5 rounded text-zinc-300">
                                  Preview Gambar
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                          Konten / Deskripsi Berita (Max 2000 Karakter)
                        </label>
                        <textarea
                          required
                          maxLength={2000}
                          value={newsDescription}
                          onChange={(e) => setNewsDescription(e.target.value)}
                          rows={4}
                          placeholder="Tuliskan berita lengkap di sini..."
                          className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 text-white placeholder-zinc-600 rounded-xl px-4 py-2.5 text-xs transition-all focus:outline-none resize-none"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="bg-[#dc2626] hover:bg-red-700 text-white font-bold uppercase tracking-widest text-[9px] px-6 py-3 rounded-xl transition-colors shadow-lg shadow-red-950/20 border border-red-500/20 flex items-center space-x-1.5 cursor-pointer select-none"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Publikasikan Berita</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* News list tables */}
                  <div className="bg-[#0c0c0f] border border-white/5 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                        DAFTAR BERITA AKTIF ({newsList.length})
                      </p>
                      {newsList.length > 0 && (
                        <button
                          onClick={handleDeleteAllNews}
                          className="text-[9px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors cursor-pointer bg-red-950/20 px-3 py-1.5 rounded-lg border border-red-500/20"
                        >
                          Hapus Semua
                        </button>
                      )}
                    </div>

                    {newsList.length === 0 ? (
                      <div className="py-12 text-center border border-dashed border-white/5 rounded-xl">
                        <FileText className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                        <p className="text-xs text-zinc-500">Belum ada berita yang dipublikasikan.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {newsList.map((news) => (
                          <div 
                            key={news.id} 
                            className="bg-[#111115] border border-white/5 hover:border-white/10 rounded-xl p-4 flex flex-col justify-between group relative overflow-hidden transition-all"
                          >
                            <div>
                              <div className="aspect-video w-full rounded-lg overflow-hidden bg-zinc-950 mb-3 relative">
                                <img 
                                  src={news.imageUrl} 
                                  alt={news.title}
                                  className="w-full h-full object-cover" 
                                  onError={(e) => {
                                    // Fallback if image fails to load
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=800&q=80";
                                  }}
                                />
                                <button
                                  onClick={() => handleDeleteNews(news.id)}
                                  className="absolute top-2.5 right-2.5 w-8 h-8 bg-red-950/80 hover:bg-red-600 border border-red-500/30 text-red-300 hover:text-white rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-lg"
                                  title="Hapus Berita"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <h4 className="font-display font-bold text-xs text-white line-clamp-1 group-hover:text-red-400 transition-colors">
                                {news.title}
                              </h4>
                              <p className="text-[10px] text-zinc-500 line-clamp-2 mt-1.5 leading-relaxed">
                                {news.description}
                              </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-zinc-600">
                              <span>ID: {news.id}</span>
                              <span>{new Date(news.createdAt).toLocaleDateString("id-ID", { dateStyle: "medium" })}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                // TAB: MANAGE SCHEDULES (KELOLA JADWAL)
                <motion.div
                  key="tab-schedule"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Schedule form card */}
                  <div className="bg-[#0c0c0f] border border-white/5 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center space-x-2 mb-6">
                      <Plus className="w-5 h-5 text-[#dc2626]" />
                      <h3 className="font-display font-black text-sm uppercase tracking-widest text-white">
                        Tambah Jadwal Pelatihan Selanjutnya
                      </h3>
                    </div>

                    {schedStatus && (
                      <div className={`p-4 rounded-xl text-xs mb-6 flex items-start space-x-2.5 border ${
                        schedStatus.type === "success" 
                          ? "bg-emerald-950/30 border-emerald-500/20 text-emerald-400" 
                          : "bg-red-950/30 border-red-500/20 text-red-400"
                      }`}>
                        {schedStatus.type === "success" ? (
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        )}
                        <span>{schedStatus.message}</span>
                      </div>
                    )}

                    <form onSubmit={handleAddSchedule} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                            Nama Pelatihan / Agenda (Max 100 Karakter)
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={100}
                            value={schedTitle}
                            onChange={(e) => setSchedTitle(e.target.value)}
                            placeholder="Contoh: Latihan Dasar Karuna Angkatan V..."
                            className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 text-white placeholder-zinc-600 rounded-xl px-4 py-2.5 text-xs transition-all focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                            Lokasi Pelatihan (Max 100 Karakter)
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              maxLength={100}
                              value={schedLocation}
                              onChange={(e) => setSchedLocation(e.target.value)}
                              placeholder="Contoh: Stasiun Utama Sektor A / Akademi NFD"
                              className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 text-white placeholder-zinc-600 rounded-xl pl-10 pr-4 py-2.5 text-xs transition-all focus:outline-none"
                            />
                            <MapPin className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                            Hari / Tanggal Pelatihan
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              maxLength={50}
                              value={schedDate}
                              onChange={(e) => setSchedDate(e.target.value)}
                              placeholder="Contoh: Sabtu, 15 Agustus 2026"
                              className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 text-white placeholder-zinc-600 rounded-xl pl-10 pr-4 py-2.5 text-xs transition-all focus:outline-none"
                            />
                            <Calendar className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                            Waktu / Jam Pelatihan
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              maxLength={50}
                              value={schedTime}
                              onChange={(e) => setSchedTime(e.target.value)}
                              placeholder="Contoh: 19:30 WIB - Selesai"
                              className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 text-white placeholder-zinc-600 rounded-xl pl-10 pr-4 py-2.5 text-xs transition-all focus:outline-none"
                            />
                            <Clock className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                          Deskripsi Singkat Acara (Max 500 Karakter)
                        </label>
                        <textarea
                          required
                          maxLength={500}
                          value={schedDescription}
                          onChange={(e) => setSchedDescription(e.target.value)}
                          rows={3}
                          placeholder="Berikan deskripsi singkat materi pelatihan..."
                          className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 text-white placeholder-zinc-600 rounded-xl px-4 py-2.5 text-xs transition-all focus:outline-none resize-none"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="bg-[#dc2626] hover:bg-red-700 text-white font-bold uppercase tracking-widest text-[9px] px-6 py-3 rounded-xl transition-colors shadow-lg shadow-red-950/20 border border-red-500/20 flex items-center space-x-1.5 cursor-pointer select-none"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tambahkan Jadwal</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Schedule list table */}
                  <div className="bg-[#0c0c0f] border border-white/5 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                        DAFTAR JADWAL AKTIF ({schedulesList.length})
                      </p>
                      {schedulesList.length > 0 && (
                        <button
                          onClick={handleDeleteAllSchedules}
                          className="text-[9px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors cursor-pointer bg-red-950/20 px-3 py-1.5 rounded-lg border border-red-500/20"
                        >
                          Hapus Semua
                        </button>
                      )}
                    </div>

                    {schedulesList.length === 0 ? (
                      <div className="py-12 text-center border border-dashed border-white/5 rounded-xl">
                        <Calendar className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                        <p className="text-xs text-zinc-500">Belum ada jadwal pelatihan yang diunggah.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {schedulesList.map((sched) => (
                          <div 
                            key={sched.id} 
                            className="bg-[#111115] border border-white/5 hover:border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all"
                          >
                            <div className="space-y-1">
                              <h4 className="font-display font-bold text-xs text-white">
                                {sched.title}
                              </h4>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-400">
                                <span className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3 text-[#dc2626]" />
                                  <span>{sched.date}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3 text-[#dc2626]" />
                                  <span>{sched.time}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3 text-[#dc2626]" />
                                  <span>{sched.location}</span>
                                </span>
                              </div>
                              <p className="text-[10px] text-zinc-500 mt-1 leading-normal max-w-xl">
                                {sched.description}
                              </p>
                            </div>
                            <div className="flex sm:flex-col items-end justify-between shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSchedule(sched.id);
                                }}
                                className="w-8 h-8 bg-red-950/80 hover:bg-red-600 border border-red-500/30 text-red-300 hover:text-white rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-md z-20"
                                title="Hapus Jadwal"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <span className="text-[8px] font-mono text-zinc-600 mt-2">ID: {sched.id}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
