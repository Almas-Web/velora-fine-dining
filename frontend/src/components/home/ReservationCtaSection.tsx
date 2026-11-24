"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RESERVATION_BANNER_IMAGE } from "@/lib/mockData";

export default function ReservationCtaSection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-36 px-5 sm:px-6 lg:px-10 overflow-hidden bg-[#111111]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url(${RESERVATION_BANNER_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/75 to-[#111111]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-3xl text-center border border-[#C6A66B]/30 bg-[#111111]/85 backdrop-blur-md px-5 py-10 sm:px-14 sm:py-14"
      >
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.35em] text-[#C6A66B]">
          Private & Evening Seating
        </p>
        <h2 className="mt-3 sm:mt-4 font-serif text-3xl sm:text-5xl font-normal text-[#F4EFE5]">
          Reserve Your Experience
        </h2>
        <p className="mx-auto mt-3 sm:mt-4 max-w-lg text-sm sm:text-base text-[#F4EFE5]/75 leading-relaxed">
          An unforgettable evening awaits you. Request a table for intimate
          dinners, celebrations, or curated tasting nights.
        </p>
        <div className="mt-7 sm:mt-9">
          <Link
            href="/reservation"
            className="min-h-[46px] inline-flex items-center justify-center w-full sm:w-auto border border-[#C6A66B] bg-[#C6A66B] px-8 sm:px-9 py-3.5 sm:py-4 text-xs uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#111111] font-medium transition-all duration-300 hover:bg-[#DFC48C] hover:border-[#DFC48C]"
          >
            Book a Table
          </Link>
        </div>
      </motion.div>
    </section>
  );
}