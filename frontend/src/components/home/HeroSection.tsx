"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { HERO_IMAGE } from "@/lib/mockData";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#111111]">
      <motion.div
        initial={{ scale: 1.08, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-[#111111]/55 to-[#111111]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/80 via-transparent to-[#111111]/50" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 text-center pt-20 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="text-[11px] sm:text-sm uppercase tracking-[0.22em] sm:tracking-[0.35em] text-[#C6A66B]"
        >
          An Extraordinary Dining Experience
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4 }}
          className="mt-4 sm:mt-5 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F4EFE5] leading-[1.12]"
        >
          Taste the Art of{" "}
          <span className="italic text-[#C6A66B]">Fine Dining.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-5 sm:mt-6 max-w-xl text-sm sm:text-base text-[#F4EFE5]/80 font-light leading-relaxed px-1"
        >
          Discover a world where culinary artistry meets timeless elegance—crafted
          with rare seasonal ingredients in an intimate architectural setting.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 max-w-sm sm:max-w-none mx-auto"
        >
          <Link
            href="/menu"
            className="min-h-[46px] inline-flex items-center justify-center w-full sm:w-auto border border-[#C6A66B] bg-[#C6A66B] px-7 sm:px-8 py-3.5 text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#111111] font-medium transition-all duration-300 hover:bg-[#DFC48C] hover:border-[#DFC48C]"
          >
            Explore Our Menu
          </Link>
          <Link
            href="/reservation"
            className="min-h-[46px] inline-flex items-center justify-center w-full sm:w-auto border border-[#F4EFE5]/40 bg-[#111111]/65 backdrop-blur-sm px-7 sm:px-8 py-3.5 text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#F4EFE5] transition-all duration-300 hover:border-[#C6A66B] hover:text-[#C6A66B]"
          >
            Reserve a Table
          </Link>
        </motion.div>
      </div>

      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        aria-label="Scroll to story"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#C6A66B]/80 hover:text-[#C6A66B] transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em]">
          Scroll
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}