import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Structure from "./Structure";
import Leaders from "./components/Leaders";
import Gallery from "./components/Gallery";
import NewsSection from "./components/NewsSection";
import JoinSection from "./components/JoinSection";
import Footer from "./components/Footer";
import AdminPortal from "./components/AdminPortal";

export default function App() {
  // Shared Discord Invite URL for the roleplay community
  const DISCORD_URL = "https://discord.gg/MerRC8CKUE";

  // Navigation View State: "home" or "admin"
  const [currentView, setCurrentView] = useState<"home" | "admin">("home");

  const handleNavigateToAdmin = () => {
    setCurrentView("admin");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col font-sans selection:bg-[#dc2626] selection:text-white" id="landing-page-root">
      {/* Sticky Translucent Header */}
      <Navbar 
        discordUrl={DISCORD_URL} 
        onNavigateToAdmin={handleNavigateToAdmin} 
      />

      {/* Main Content Areas based on selected view */}
      {currentView === "admin" ? (
        <AdminPortal onBackToHome={handleBackToHome} />
      ) : (
        <main className="flex-grow">
          {/* Fullscreen Hero Section */}
          <Hero discordUrl={DISCORD_URL} />

          {/* Division & Rank Matrix Section */}
          <Structure />

          {/* 3 Highest Leaders Section */}
          <Leaders />

          {/* Media & Vehicles Gallery Section */}
          <Gallery />

          {/* News and Training Schedule Section */}
          <NewsSection />

          {/* Recruitment & Interactive Cadet Quiz Section */}
          <JoinSection discordUrl={DISCORD_URL} />
        </main>
      )}

      {/* Corporate Disclaimer & Community Footer */}
      <Footer 
        discordUrl={DISCORD_URL} 
        onNavigateToAdmin={handleNavigateToAdmin}
      />
    </div>
  );
}
