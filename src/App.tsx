import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Structure from "./components/Structure";
import Leaders from "./components/Leaders";
import Gallery from "./components/Gallery";
import JoinSection from "./components/JoinSection";
import Footer from "./components/Footer";

export default function App() {
  // Shared Discord Invite URL for the roleplay community
  const DISCORD_URL = "https://discord.gg/MerRC8CKUE";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col font-sans selection:bg-[#dc2626] selection:text-white" id="landing-page-root">
      {/* Sticky Translucent Header */}
      <Navbar discordUrl={DISCORD_URL} />

      {/* Main Page Layout Wrapper */}
      <main className="flex-grow">
        {/* Fullscreen Hero Section */}
        <Hero discordUrl={DISCORD_URL} />

        {/* Division & Rank Matrix Section */}
        <Structure />

        {/* 3 Highest Leaders Section */}
        <Leaders />

        {/* Media & Vehicles Gallery Section */}
        <Gallery />

        {/* Recruitment & Interactive Cadet Quiz Section */}
        <JoinSection discordUrl={DISCORD_URL} />
      </main>


      {/* Corporate Disclaimer & Community Footer */}
      <Footer discordUrl={DISCORD_URL} />
    </div>
  );
}
