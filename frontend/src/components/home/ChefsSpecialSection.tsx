"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CHEF_SPECIAL_IMAGE } from "@/lib/mockData";

export default function ChefsSpecialSection() {
  return (
    <section className="bg-[#181614] text-[#F4EFE5] py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-10 border-t border-[#39332D]/70">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6"
        >
          <div className="relative aspect-[4/4] sm:aspect-[4/5] overflow-hidden rounded-sm border border-[#C6A66B]/25 bg-[#111111]">
            <img
              src={CHEF_SPECIAL_IMAGE}
              alt="Chef's Seasonal Tasting Creation"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 inline-flex items-center gap-2 bg-[#111111]/85 backdrop-blur-sm border border-[#C6A66B]/40 px-3 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#C6A66B]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Chef’s Special</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-6 space-y-5 sm:space-y-6"
        >
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.32em] text-[#C6A66B]">
            Limited Nightly Allocation
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F4EFE5] leading-[1.15]">
            Ember-Roasted Duck Breast & Fig Gastrique
          </h2>
          <p className="text-sm sm:text-base text-[#F4EFE5]/75 leading-relaxed">
            Dry-aged for fourteen days in-house, rested over aromatic fruitwood
            embers, and finished with black mission fig reduction, toasted
            spiced walnut, and celadon herb oil. Available in strictly limited
            portions each evening.
          </p>

          <div className="border-t border-b border-[#39332D] py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#F4EFE5]/50">
                Pairing Suggestion
              </p>
              <p className="mt-1 font-serif text-base text-[#F4EFE5]">
                Aged Pinot Noir Reserve
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#F4EFE5]/50">
                Course Price
              </p>
              <p className="mt-1 font-serif text-2xl text-[#C6A66B]">$74</p>
            </div>
          </div>

          <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row flex-wrap gap-3.5 sm:gap-4">
            <Link
              href="/reservation"
              className="min-h-[46px] inline-flex items-center justify-center w-full sm:w-auto border border-[#C6A66B] bg-[#C6A66B] px-7 py-3 text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#111111] font-medium hover:bg-[#DFC48C] transition-colors"
            >
              Reserve With Special
            </Link>
            <Link
              href="/menu"
              className="min-h-[46px] inline-flex items-center justify-center w-full sm:w-auto border border-[#39332D] px-7 py-3 text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#F4EFE5]/85 hover:border-[#C6A66B] hover:text-[#C6A66B] transition-colors"
            >
              Explore Menu
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}