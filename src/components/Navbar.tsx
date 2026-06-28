import React, { useState, useEffect } from "react";
import { Menu, X, Shield, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NAVIGATION_ITEMS } from "../data";

interface NavbarProps {
  discordUrl?: string;
}

export default function Navbar({ discordUrl = "https://discord.gg" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll to update active nav highlight and add background shadows
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 100;
      const sections = NAVIGATION_ITEMS.map((item) => item.href.replace("#", ""));

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <header
      id="navbar-header"
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "top-3 mx-auto w-[92%] max-w-6xl rounded-2xl bg-[#09090b]/80 border border-white/10 shadow-2xl shadow-black/80 backdrop-blur-xl"
          : "top-0 w-full bg-transparent border-b border-transparent"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-500 ${isScrolled ? "py-2.5" : "py-5"}`}>
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="flex items-center space-x-3 group cursor-pointer"
            id="brand-logo"
          >
            <div className="w-9 h-9 flex items-center justify-center p-1 bg-white/5 border border-white/10 rounded-xl group-hover:border-red-500/50 transition-all duration-300">
              <img 
                src="https://i.ibb.co.com/WvmTmp9b/image.webp" 
                alt="Logo NFD" 
                className="w-full h-full object-contain group-hover:scale-110 transition-all duration-300" 
              />
            </div>
            <div>
              <span className="font-display font-black text-sm sm:text-base tracking-tight uppercase text-white block">
                NUSANTARA <span className="text-[#dc2626] group-hover:text-red-500 transition-colors">NFD</span>
              </span>
              <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-400 font-bold uppercase block -mt-1">
                Fire Departement
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
            {NAVIGATION_ITEMS.map((item) => {
              const itemSec = item.href.replace("#", "");
              const isActive = activeSection === itemSec;
              const isHovered = hoveredSection === itemSec;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  onMouseEnter={() => setHoveredSection(itemSec)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 rounded-lg ${
                    isActive
                      ? "text-red-500"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {/* Sliding Hover background pill */}
                  {isHovered && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  {/* Sliding Active Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-line"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-red-600 shadow-[0_0_8px_#dc2626]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Discord CTA Button (Desktop) */}
          <div className="hidden md:block">
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group bg-[#dc2626] hover:bg-red-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-red-950/40 transition-all duration-300 text-[10px] font-bold uppercase tracking-widest inline-flex items-center space-x-1.5 border border-red-500/20"
              id="cta-join-discord-nav"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span>Gabung Discord</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-[#111111]/90 text-zinc-400 hover:text-white p-3 rounded-xl focus:outline-none border border-white/10 cursor-pointer select-none active:scale-95 transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              id="mobile-menu-toggle"
            >
              <span className="sr-only">Buka menu utama</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#09090b]/95 border-b border-t border-white/5 rounded-b-2xl overflow-hidden backdrop-blur-xl"
            id="mobile-menu"
          >
            <div className="px-6 pt-4 pb-6 space-y-2">
              {NAVIGATION_ITEMS.map((item) => {
                const itemSec = item.href.replace("#", "");
                const isActive = activeSection === itemSec;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`block px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      isActive
                        ? "text-white bg-red-950/20 border-l-4 border-[#dc2626]"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="pt-4 px-4 border-t border-white/5">
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 bg-[#dc2626] hover:bg-red-700 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-colors duration-200 shadow-md"
                  id="mobile-cta-discord"
                >
                  <span>Gabung Discord Kami</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

  );
}
