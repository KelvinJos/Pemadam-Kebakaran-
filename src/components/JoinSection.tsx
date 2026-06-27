import { useState } from "react";
import { ShieldCheck, ArrowRight, ClipboardCheck, Info, Sparkles, HelpCircle, AlertCircle, CheckCircle, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface JoinSectionProps {
  discordUrl?: string;
}

interface Question {
  id: number;
  text: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

const RECRUIT_QUIZ: Question[] = [
  {
    id: 1,
    text: "Saat sedang bertugas mengemudi, Anda menerima laporan tentang kebakaran struktur aktif. Anda melihat mobil pemadam kebakaran besar meluncur di belakang Anda dengan sirene berbunyi keras. Apa tindakan taktis yang tepat?",
    options: [
      { key: "A", text: "Mempercepat laju kendaraan dan balapan dengan mobil pemadam tersebut untuk mengamankan hidran air terlebih dahulu." },
      { key: "B", text: "Segera menepi ke bahu jalan sebelah kanan secara aman dan memberikan prioritas jalan sepenuhnya." },
      { key: "C", text: "Berhenti mendadak di tengah lajur jalan dan menunggu armada pemadam bermanuver melewati Anda." }
    ],
    correctKey: "B",
    explanation: "Sesuai prosedur tanggap darurat, seluruh unit wajib menepi secara aman demi memberikan prioritas jalan kepada armada utama pemadam kebakaran. Membalap armada darurat melanggar standar roleplay realistis."
  },
  {
    id: 2,
    text: "Manakah tindakan di bawah ini yang dikategorikan sebagai tindakan 'Metagaming' dalam skenario roleplay pemadam kebakaran?",
    options: [
      { key: "A", text: "Mengabaikan asap fisik dan api di dalam gedung karena mengira skrip server sedang mengalami gangguan (lag)." },
      { key: "B", text: "Mengemudikan truk pemadam kebakaran dengan kecepatan tidak aman melewati jalan perumahan yang sempit." },
      { key: "C", text: "Membaca status siaran langsung (live stream) Discord pemain lain untuk mengetahui lokasi kebakaran, lalu mendatangi lokasi tersebut secara in-character." }
    ],
    correctKey: "C",
    explanation: "Metagaming adalah tindakan menggunakan informasi luar game (seperti stream, chat Discord, atau log eksternal) yang tidak diketahui secara realistis oleh karakter pemadam kebakaran Anda di dalam game."
  },
  {
    id: 3,
    text: "Seorang Kapten Pemadam memerintahkan Anda untuk menyambungkan selang pasokan air ke hidran. Namun, Anda memutuskan untuk masuk ke dalam gedung terbakar sendirian untuk menyelamatkan warga sipil tanpa izin. Mengapa tindakan ini mendapat sanksi?",
    options: [
      { key: "A", text: "Tindakan tersebut melanggar Rantai Komando (Chain of Command) dan termasuk 'Fail RP' karena mengabaikan keselamatan kru utama." },
      { key: "B", text: "Aturan roleplay melarang pemadam kebakaran untuk menyelamatkan nyawa warga sipil." },
      { key: "C", text: "Penyambungan hidran air hanya boleh dilakukan oleh jajaran Pimpinan Tinggi." }
    ],
    correctKey: "A",
    explanation: "Mengabaikan perintah langsung dari atasan untuk melakukan aksi penyelamatan solo tanpa koordinasi membahayakan keselamatan seluruh tim pemadam, serta merusak alur Rantai Komando taktis."
  }
];

export default function JoinSection({ discordUrl = "https://discord.gg" }: JoinSectionProps) {
  // Quiz states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Requirement items translated to Indonesian
  const requirements = [
    "Catatan bersih tanpa riwayat ban aktif di server komunitas.",
    "Memiliki headset dan mikrofon berkualitas baik untuk koordinasi radio.",
    "Memahami dasar-dasar kode radio komunikasi darurat (seperti kode-10).",
    "Sedia mengikuti arahan kepangkatan dan Rantai Komando taktis lapangan.",
    "Berusia minimal 15 tahun ke atas untuk pendaftaran reguler.",
  ];

  // Pipeline steps translated to Indonesian
  const pipelines = [
    {
      step: "01",
      title: "Bergabung Discord",
      desc: "Masuk ke hub utama Discord komunitas kami dan baca saluran peraturan #rules-registry."
    },
    {
      step: "02",
      title: "Isi Whitelist",
      desc: "Kirimkan formulir pendaftaran singkat yang merinci riwayat dan motivasi roleplay Anda."
    },
    {
      step: "03",
      title: "Orientasi Akademi",
      desc: "Ikuti pelatihan kilat taruna baru untuk mempelajari rute kendaraan, prosedur radio, dan CAD."
    }
  ];

  const handleOptionClick = (key: string) => {
    if (isAnswered) return;
    setSelectedOption(key);
  };

  const handleVerifyAnswer = () => {
    if (!selectedOption || isAnswered) return;
    
    const isCorrect = selectedOption === RECRUIT_QUIZ[currentQuestionIdx].correctKey;
    if (isCorrect) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    
    if (currentQuestionIdx < RECRUIT_QUIZ.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="join" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* About Sub-section (To establish context) with unboxified, rounded-2xl features */}
        <div id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-5 relative group">
            {/* Elegant glowing frame */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#dc2626] rounded-tl-xl pointer-events-none transition-all duration-300 group-hover:-top-2 group-hover:-left-2" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#dc2626] rounded-br-xl pointer-events-none transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2" />
            
            <img
              src="https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=800&q=80"
              alt="Mengenal Dinas Damkar"
              className="w-full h-[400px] object-cover rounded-2xl shadow-2xl filter grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#dc2626] uppercase">
              TENTANG DEPARTEMEN
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tighter text-white mt-2 mb-6">
              Siapa Kami & Apa Tugas Kami
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
              Nusantara Fire Departement adalah fraksi tanggap darurat premium berpendaftaran khusus (whitelisted). 
              Kami mensimulasikan tugas pemadaman kebakaran dunia nyata, penanganan material berbahaya (Hazmat), dan tindakan medis penyelamatan secara mendalam dan imersif di dalam server roleplay.
            </p>
            <p className="text-zinc-500 text-[11px] leading-relaxed mb-6">
              Komunitas kami mengedepankan simulasi taktis presisi tinggi, etika komunikasi radio yang teratur, dan koordinasi struktural yang rapi. 
              Mulai dari memadamkan kobaran api struktural, menggunakan alat pemotong hidrolik saat kecelakaan lalu lintas, hingga mengoordinasikan rute armada melalui panel CAD khusus, selalu ada jenjang karir yang menantang untuk Anda.
            </p>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start space-x-2.5">
                  <ClipboardCheck className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-400 font-normal leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Hub Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#dc2626] uppercase mb-2">
            PENDAFTARAN AKTIF
          </h2>
          <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tighter uppercase text-white mb-4">
            Cara Bergabung Menjadi Taruna
          </h3>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Pendaftaran saat ini sedang dibuka! Pelajari jalur onboarding kami di bawah ini atau uji kesiapan taktis Anda langsung menggunakan simulator kadet interaktif.
          </p>
        </div>

        {/* Modular Grid: Left Application Pipeline, Right Interactive Quiz Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Onboarding steps - 5 cols - Unboxified with soft list layouts */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="font-display font-bold text-xs uppercase tracking-wide text-white flex items-center space-x-2">
              <span className="p-1.5 bg-red-950/20 border border-red-500/10 text-[#dc2626] rounded-lg">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span>Alur Proses Penerimaan</span>
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Kami memandu setiap calon taruna melalui proses penerimaan yang terstruktur guna menjamin standar kualitas simulasi roleplay yang tinggi dan tertib. Berikut adalah tahapan utamanya:
            </p>

            <div className="space-y-4 pt-2">
              {pipelines.map((pipe) => (
                <div
                  key={pipe.step}
                  className="flex items-start space-x-4 p-5 bg-[#111111]/30 hover:bg-[#111111]/60 border border-white/5 rounded-2xl transition-all duration-300"
                >
                  <span className="font-mono text-xs font-bold text-[#dc2626] bg-red-950/30 px-2.5 py-1 rounded-full border border-red-900/10 shrink-0">
                    {pipe.step}
                  </span>
                  <div>
                    <h5 className="font-display font-bold text-xs uppercase tracking-wide text-white mb-1">
                      {pipe.title}
                    </h5>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      {pipe.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Note with fully rounded outline */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-start space-x-3">
              <Info className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Formulir aplikasi whitelist dievaluasi oleh jajaran Wakil Kepala Dinas dalam waktu maksimal 24 jam. Harap aktifkan fitur Direct Message di Discord Anda!
              </p>
            </div>
          </div>

          {/* Interactive Quiz Box - 7 cols - Beautifully rounded-2xl with glow */}
          <div className="lg:col-span-7 bg-[#111111]/40 border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl relative backdrop-blur-sm">
            
            {/* Decorative background visual */}
            <div className="absolute top-4 right-4 flex items-center space-x-1.5 px-3 py-1 bg-red-950/20 border border-red-900/10 rounded-full">
              <Sparkles className="w-3 h-3 text-red-400" />
              <span className="font-mono text-[8px] font-bold text-red-400 uppercase tracking-widest">
                Simulator Taruna
              </span>
            </div>

            <h4 className="font-display font-bold text-xs uppercase tracking-wide text-white mb-2 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-[#dc2626]" />
              <span>Tes Kesiapan Protokol Roleplay</span>
            </h4>
            <p className="text-xs text-zinc-500 mb-6">
              Uji pemahaman Anda mengenai protokol tanggap darurat dan aturan roleplay dasar. Selesaikan simulasi singkat ini!
            </p>

            <AnimatePresence mode="wait">
              {!quizFinished ? (
                <motion.div
                  key={currentQuestionIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Progress Line */}
                  <div className="w-full bg-[#0d0d0d] rounded-full h-1 overflow-hidden">
                    <div
                      className="bg-[#dc2626] h-1 transition-all duration-300"
                      style={{ width: `${((currentQuestionIdx + 1) / RECRUIT_QUIZ.length) * 100}%` }}
                    />
                  </div>

                  {/* Question Title */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[8px] text-[#dc2626] font-bold uppercase tracking-wider bg-red-950/30 px-2 py-0.5 rounded">
                      Skenario {currentQuestionIdx + 1} dari {RECRUIT_QUIZ.length}
                    </span>
                    <h5 className="font-display font-bold text-xs uppercase tracking-wide text-zinc-200 leading-relaxed pt-1">
                      {RECRUIT_QUIZ[currentQuestionIdx].text}
                    </h5>
                  </div>

                  {/* Options with sleek, highly refined rounded-xl elements instead of blocks */}
                  <div className="space-y-2.5">
                    {RECRUIT_QUIZ[currentQuestionIdx].options.map((opt) => {
                      const isSelected = selectedOption === opt.key;
                      let optionStyle = "border-white/5 bg-[#0d0d0d]/40 text-zinc-400 hover:border-zinc-800 hover:bg-[#0d0d0d]";
                      
                      if (isAnswered) {
                        const isCorrectAnswer = opt.key === RECRUIT_QUIZ[currentQuestionIdx].correctKey;
                        if (isCorrectAnswer) {
                          optionStyle = "border-emerald-600/30 bg-emerald-950/10 text-emerald-300";
                        } else if (isSelected) {
                          optionStyle = "border-rose-600/30 bg-rose-950/10 text-rose-300";
                        } else {
                          optionStyle = "border-white/5 bg-[#0d0d0d]/10 text-zinc-600 opacity-60";
                        }
                      } else if (isSelected) {
                        optionStyle = "border-[#dc2626] bg-red-950/10 text-red-200";
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleOptionClick(opt.key)}
                          className={`w-full text-left p-3.5 rounded-xl border text-[11px] leading-relaxed transition-all flex items-start space-x-3 ${optionStyle} ${!isAnswered ? "cursor-pointer" : "cursor-default"}`}
                          disabled={isAnswered}
                        >
                          <span className={`font-mono font-bold px-1.5 py-0.5 rounded-full text-[9px] ${isSelected ? "bg-red-900/30 text-red-400" : "bg-white/5 text-zinc-500"}`}>
                            {opt.key}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Block */}
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-[#0d0d0d] border border-white/5 rounded-xl"
                    >
                      <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-bold text-zinc-300 mb-1">
                        {selectedOption === RECRUIT_QUIZ[currentQuestionIdx].correctKey ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                        )}
                        <span>
                          {selectedOption === RECRUIT_QUIZ[currentQuestionIdx].correctKey ? "Penilaian Benar" : "Pelanggaran Protokol"}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        {RECRUIT_QUIZ[currentQuestionIdx].explanation}
                      </p>
                    </motion.div>
                  )}

                  {/* Actions (Verify / Next) */}
                  <div className="flex justify-end pt-2">
                    {!isAnswered ? (
                      <button
                        onClick={handleVerifyAnswer}
                        disabled={!selectedOption}
                        className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center space-x-1.5 transition-colors border ${
                          selectedOption
                            ? "bg-[#dc2626] hover:bg-red-700 text-white border-none cursor-pointer"
                            : "bg-white/5 text-zinc-600 border-white/5 cursor-not-allowed"
                        }`}
                      >
                        <span>Verifikasi Jawaban</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-[10px] uppercase tracking-widest rounded-full flex items-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <span>
                          {currentQuestionIdx === RECRUIT_QUIZ.length - 1 ? "Selesaikan Evaluasi" : "Skenario Berikutnya"}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-6"
                >
                  {/* Results Trophy */}
                  <div className="inline-flex p-4 bg-red-950/20 border border-red-500/20 rounded-full">
                    <ShieldCheck className="w-10 h-10 text-red-500 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-display font-black text-xl uppercase tracking-wide text-white">
                      Evaluasi Selesai
                    </h5>
                    <p className="font-mono text-xs text-[#dc2626] font-bold uppercase tracking-[0.2em]">
                      Skor Anda: {score} / {RECRUIT_QUIZ.length} Skenario Berhasil Dilewati
                    </p>
                  </div>

                  <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                    {score === RECRUIT_QUIZ.length
                      ? "Skor sempurna! Anda sangat memahami asas kepatuhan taktis pemadam kebakaran. Silakan bergabung ke saluran Discord kami untuk mengisi aplikasi whitelist pendaftaran resmi."
                      : "Harap pelajari kembali protokol darurat penegakan disiplin roleplay di jalan raya. Anda dapat mencoba kembali kuis ini atau langsung menuju saluran Discord kami."}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <a
                      href={discordUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-[#dc2626] hover:bg-red-700 text-white font-bold text-[10px] uppercase tracking-widest rounded-full flex items-center justify-center space-x-2 transition-all"
                    >
                      <span>Gabung Discord Untuk Mendaftar</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={handleRestartQuiz}
                      className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-zinc-400 font-bold text-[10px] uppercase tracking-widest rounded-full border border-white/5 transition-all cursor-pointer"
                    >
                      Ulangi Kuis
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
