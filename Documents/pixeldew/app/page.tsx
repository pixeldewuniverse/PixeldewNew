"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedWork from "@/components/FeaturedWork";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DewbitChat from "@/components/DewbitChat";
import Loader from "@/components/Loader";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ background: "var(--bg, #080012)" }}>
      <Loader />
      <Navbar />
      <Hero />
      <div className="divider" />
      <div className="section-reveal s1"><About /></div>
      <div className="divider" />
      <div className="section-reveal s2"><Skills /></div>
      <div className="divider" />
      <div className="section-reveal s3"><FeaturedWork /></div>
      <div className="divider" />
      <div className="section-reveal s4"><Contact /></div>
      <Footer />
      <DewbitChat />
      <BackgroundMusic />
    </main>
  );
}
