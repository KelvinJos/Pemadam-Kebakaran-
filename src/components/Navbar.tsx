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

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#111111]/95 border-b border-white/5 shadow-lg shadow-black/40 backdrop-blur-md"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? "py-3.5" : "py-5"}`}>
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="flex items-center space-x-3 group cursor-pointer"
            id="brand-logo"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <img 
                  src="https://i.ibb.co.com/WvmTmp9b/image.webp" 
                      alt="Logo NFD" 
                          className="w-full h-full object-contain" 
                            />
                            </div>
            <div>
              <span className="font-display font-black text-base tracking-tight uppercase text-white block">
                NUSANTARA <span className="text-[#dc2626]">NFD</span>
              </span>
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 font-bold uppercase block -mt-1">
                Fire Departement
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" id="desktop-nav">
            {NAVIGATION_ITEMS.map((item) => {
              const itemSec = item.href.replace("#", "");
              const isActive = activeSection === itemSec;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? "text-[#dc2626]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
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
              className="bg-[#dc2626] text-white px-5 py-2.5 rounded shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all duration-200 text-xs font-bold uppercase tracking-widest inline-flex items-center space-x-1.5"
              id="cta-join-discord-nav"
            >
              <span>Gabung Discord</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-[#111111] text-zinc-400 hover:text-white p-2 rounded focus:outline-none border border-white/5"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              id="mobile-menu-toggle"
            >
              <span className="sr-only">Buka menu utama</span>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[#111111] border-b border-t border-white/5"
            id="mobile-menu"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {NAVIGATION_ITEMS.map((item) => {
                const itemSec = item.href.replace("#", "");
                const isActive = activeSection === itemSec;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`block px-4 py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors ${
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
                  className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded transition-colors duration-200 shadow-md"
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
