import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedWork from "@/components/FeaturedWork";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DewbitChat from "@/components/DewbitChat";

export default function Home() {
  return (
    <main style={{ background: "var(--bg, #080012)" }}>
      <Navbar />
      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <FeaturedWork />
      <div className="divider" />
      <Contact />
      <Footer />
      <DewbitChat />
    </main>
  );
}
