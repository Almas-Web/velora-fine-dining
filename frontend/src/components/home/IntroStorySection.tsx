"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function IntroStorySection() {
  return (
    <section
      id="story"
      className="bg-[#F4EFE5] text-[#111111] py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            className="lg:col-span-7"
          >
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[#8E6F3E]">
              Our Philosophy & Story
            </p>
            <h2 className="mt-3 sm:mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#111111] leading-[1.12]">
              Quiet Luxury on Every{" "}
              <span className="italic text-[#7A5C2E]">Porcelain Plate.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="lg:col-span-5 space-y-5"
          >
            <p className="text-sm sm:text-base leading-relaxed text-[#39332D]">
              Founded on restraint, precision, and respect for pure ingredients,
              VELORA transforms evening dining into an unhurried ritual. Every
              reduction, sear, and botanical infusion is prepared from scratch
              for the night’s service.
            </p>
            <Link
              href="/about"
              className="inline-flex min-h-[40px] items-center gap-2 border-b border-[#111111] pb-1 text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#111111] hover:text-[#7A5C2E] hover:border-[#7A5C2E] transition-colors"
            >
              <span>Discover Our Story</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 border-t border-b border-[#111111]/15 divide-y sm:divide-y-0 sm:divide-x divide-[#111111]/15">
          <div className="py-6 sm:py-8 sm:pr-8">
            <p className="font-serif text-3xl sm:text-4xl text-[#111111]">07</p>
            <p className="mt-1 text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#39332D]/80">
              Seasonal Tasting Chapters
            </p>
          </div>
          <div className="py-6 sm:py-8 sm:px-8">
            <p className="font-serif text-3xl sm:text-4xl text-[#111111]">100%</p>
            <p className="mt-1 text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#39332D]/80">
              House-Crafted Stocks & Jus
            </p>
          </div>
          <div className="py-6 sm:py-8 sm:pl-8">
            <p className="font-serif text-3xl sm:text-4xl text-[#111111]">38</p>
            <p className="mt-1 text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#39332D]/80">
              Intimate Seats Per Evening
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}