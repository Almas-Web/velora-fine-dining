"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLoader from "@/components/common/PageLoader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import IntroStorySection from "@/components/home/IntroStorySection";
import SignatureDishes from "@/components/home/SignatureDishes";
import FeaturedMenuSection from "@/components/home/FeaturedMenuSection";
import ChefsSpecialSection from "@/components/home/ChefsSpecialSection";
import FoodGalleryPreview from "@/components/home/FoodGalleryPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ReservationCtaSection from "@/components/home/ReservationCtaSection";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".gsap-reveal");
      sections.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.92, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#0C0C0C] text-[#F4EFE5] selection:bg-[#C6A66B] selection:text-[#0C0C0C]"
    >
      <PageLoader />
      <Navbar />

      <main className="relative overflow-x-clip">
        <HeroSection />
        <div className="gsap-reveal border-t border-[#39332D]/50">
          <IntroStorySection />
        </div>
        <div className="gsap-reveal border-t border-[#39332D]/50">
          <SignatureDishes />
        </div>
        <div className="gsap-reveal border-t border-[#39332D]/50">
          <FeaturedMenuSection />
        </div>
        <div className="gsap-reveal border-t border-[#39332D]/50">
          <ChefsSpecialSection />
        </div>
        <div className="gsap-reveal border-t border-[#39332D]/50">
          <FoodGalleryPreview />
        </div>
        <div className="gsap-reveal border-t border-[#39332D]/50">
          <TestimonialsSection />
        </div>
        <div className="gsap-reveal border-t border-[#39332D]/50">
          <ReservationCtaSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}