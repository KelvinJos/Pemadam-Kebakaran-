import { Shield, ArrowUp, HelpCircle, Heart } from "lucide-react";

interface FooterProps {
  discordUrl?: string;
}

export default function Footer({ discordUrl = "https://discord.gg" }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 text-zinc-500 text-xs relative overflow-hidden" id="footer-section">
      {/* Visual Accent Red Bar */}
      <div className="h-[2px] bg-[#dc2626]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Faction Brand & Disclaimer */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#dc2626] rounded flex items-center justify-center text-white">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-black text-base text-white tracking-tight uppercase block">
                  NUSANTARA <span className="text-[#dc2626]">NFD</span>
                </span>
                <span className="text-[9px] font-mono font-semibold tracking-widest text-zinc-500 uppercase block -mt-1">
                  Divisi Simulasi
                </span>
              </div>
            </div>

            <p className="text-zinc-500 leading-relaxed text-xs max-w-sm">
              Kami mensimulasikan pemadaman kebakaran struktural, aksi penyelamatan teknis, dan tindakan medis darurat dengan roleplay presisi tinggi. Bergabunglah dengan komunitas penggiat penanganan darurat yang solid.
            </p>

            {/* Faction Disclaimer */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-start space-x-2.5 max-w-sm">
              <HelpCircle className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
              <p className="text-[10px] text-zinc-500 leading-normal">
                <strong className="text-zinc-400">Sanggahan:</strong> Situs ini merupakan media komunitas simulasi roleplay fiktif. Kami sama sekali TIDAK terafiliasi dengan lembaga kedinasan pemadam kebakaran dunia nyata, instansi kepolisian, maupun organisasi pemerintah mana pun.
              </p>
            </div>
          </div>

          {/* Quick links directory - 3 cols */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
              Menu Navigasi
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href="#home"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  Beranda Hub Operasional
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  Tentang Departemen
                </a>
              </li>
              <li>
                <a
                  href="#structure"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  Struktur & Kepangkatan
                </a>
              </li>
              <li>
                <a
                  href="#leaders"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  Pimpinan Komando
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  Galeri Log Operasional
                </a>
              </li>
            </ul>
          </div>

          {/* Support / Discord - 4 cols */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
              Tautan Komunitas
            </h4>
            <p className="text-zinc-500 leading-relaxed text-xs">
              Roster aktif petugas, registrasi whitelist, pengumuman akademi, dan laporan koordinasi taktis dikelola secara penuh pada server Discord kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-4 py-2 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 font-bold rounded-full text-zinc-300 text-[10px] uppercase tracking-widest transition-colors text-center"
              >
                Discord Komunitas
              </a>
              <a
                href="#join"
                className="inline-flex justify-center items-center px-4 py-2 bg-[#dc2626] hover:bg-red-700 text-white rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors text-center"
              >
                Daftar Taruna
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-zinc-600 font-mono text-center sm:text-left leading-relaxed uppercase tracking-wider">
            &copy; {currentYear} Nusantara Fire Departement. Hak Cipta Dilindungi Undang-Undang. <br />
            Menyajikan simulasi penuh integritas, loyalitas, dan dedikasi sejak 2026.
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[10px] text-zinc-600 flex items-center font-mono uppercase tracking-wider">
              Dibuat dengan <Heart className="w-3 h-3 text-[#dc2626] mx-1 animate-pulse" /> untuk Pecinta Roleplay
            </span>
            <button
              onClick={handleScrollToTop}
              className="p-2 bg-white/5 hover:bg-white/10 hover:text-white rounded-full border border-white/5 cursor-pointer transition-colors"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
