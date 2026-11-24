"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Compass, HeartHandshake, Sparkles, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  HERO_IMAGE,
  CHEF_SPECIAL_IMAGE,
  RESERVATION_BANNER_IMAGE,
  GALLERY_PHOTOS,
} from "@/lib/mockData";

const VALUES = [
  {
    icon: Flame,
    title: "Fire & Restraint",
    description:
      "We treat open embers and precision heat control as instruments of subtlety rather than excess, letting natural character lead.",
  },
  {
    icon: Compass,
    title: "Seasonal Provenance",
    description:
      "Every menu chapter follows the quiet rhythm of harvest and tide, honoring small growers and coastal purveyors.",
  },
  {
    icon: HeartHandshake,
    title: "Unhurried Hospitality",
    description:
      "Attentive, intuitive service paced around conversation and comfort—never rushed, never theatrical for its own sake.",
  },
  {
    icon: Sparkles,
    title: "Architectural Calm",
    description:
      "Warm candlelight, dark stone, and acoustic stillness designed so every guest feels cocooned from the outside world.",
  },
];

export default function AboutPage() {
  const interiors = GALLERY_PHOTOS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#111111] text-[#F4EFE5]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 px-6 lg:px-10 overflow-hidden border-b border-[#39332D]/60">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${RESERVATION_BANNER_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/85 via-[#111111]/75 to-[#111111]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="text-xs uppercase tracking-[0.35em] text-[#C6A66B]"
          >
            Our Story & Philosophy
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-[#F4EFE5] leading-[1.12]"
          >
            Crafted for Evenings That{" "}
            <span className="italic text-[#C6A66B]">Linger.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-[#F4EFE5]/75 leading-relaxed"
          >
            VELORA was conceived as a sanctuary for modern fine dining—where
            measured technique, deep stocks, and warm shadow create a sense of
            timeless occasion.
          </motion.p>
        </div>
      </section>

      {/* Brand Philosophy & Culinary Experience (Ivory Section) */}
      <section className="bg-[#F4EFE5] text-[#111111] py-24 lg:py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#8E6F3E]">
              Brand Philosophy
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111111] leading-[1.15]">
              Precision Without Pretension.
            </h2>
            <p className="text-sm sm:text-base text-[#39332D] leading-relaxed">
              Our culinary experience begins hours before the doors open. Stocks
              simmer slowly, aged cuts rest in controlled chambers, and each
              sauce is balanced for depth rather than spectacle.
            </p>
            <p className="text-sm sm:text-base text-[#39332D]/90 leading-relaxed">
              Whether guests join us for a quiet two-person tasting or a
              milestone celebration, every plate reflects clarity of flavor,
              texture, and temperature.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#111111]">
              <img
                src={HERO_IMAGE}
                alt="VELORA culinary plating and presentation"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Head Chef Introduction */}
      <section className="bg-[#111111] text-[#F4EFE5] py-24 lg:py-32 px-6 lg:px-10 border-t border-[#39332D]/60">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[#C6A66B]/25 bg-[#161412]">
              <img
                src={CHEF_SPECIAL_IMAGE}
                alt="Executive Chef Henrik Lindholm"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.32em] text-[#C6A66B]">
              Meet The Kitchen Leadership
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F4EFE5]">
              Chef Henrik Lindholm
            </h2>
            <p className="text-xs uppercase tracking-[0.25em] text-[#F4EFE5]/55">
              Executive Chef & Culinary Director
            </p>
            <p className="text-sm sm:text-base text-[#F4EFE5]/75 leading-relaxed">
              Trained across European dining rooms and coastal kitchens, Chef
              Henrik founded VELORA around a simple conviction: great cuisine
              should feel alive, grounded, and emotionally resonant. His menus
              pair classical French discipline with subtle smoke, acid, and
              botanical aromatics.
            </p>
            <blockquote className="border-l-2 border-[#C6A66B] pl-5 py-1 font-serif italic text-lg sm:text-xl text-[#F4EFE5]/90">
              “Luxury in dining is never loud—it lives in the warmth of the
              room and the honesty of the final bite.”
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#161412] text-[#F4EFE5] py-24 lg:py-28 px-6 lg:px-10 border-t border-b border-[#39332D]/70">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.32em] text-[#C6A66B]">
              Our Values
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#F4EFE5]">
              What Guides Every Service
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="border border-[#39332D] bg-[#111111] p-7 rounded-sm hover:border-[#C6A66B]/50 transition-colors"
                >
                  <Icon className="h-5 w-5 text-[#C6A66B] mb-5" />
                  <h3 className="font-serif text-xl text-[#F4EFE5]">
                    {val.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#F4EFE5]/70 leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Restaurant Interior & Dining Experience */}
      <section className="bg-[#F4EFE5] text-[#111111] py-24 lg:py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8E6F3E]">
                The Dining Room & Experience
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#111111]">
                Intimate Spaces, Golden Light
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 border-b border-[#111111] pb-1 text-xs uppercase tracking-[0.22em] text-[#111111] hover:text-[#7A5C2E] hover:border-[#7A5C2E] transition-colors"
            >
              <span>Explore Full Gallery</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {interiors.map((space) => (
              <div
                key={space.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-[#111111]"
              >
                <img
                  src={space.src}
                  alt={space.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent flex items-end p-5">
                  <p className="font-serif text-lg text-[#F4EFE5]">
                    {space.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/reservation"
              className="inline-block border border-[#111111] bg-[#111111] px-9 py-4 text-xs uppercase tracking-[0.24em] text-[#F4EFE5] hover:bg-[#C6A66B] hover:text-[#111111] hover:border-[#C6A66B]"
            >
              Experience VELORA Tonight
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}