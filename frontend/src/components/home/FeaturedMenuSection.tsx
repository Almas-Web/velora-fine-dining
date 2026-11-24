"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MENU_ITEMS } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";

export default function FeaturedMenuSection() {
  const featured = MENU_ITEMS.slice(0, 6);

  return (
    <section className="bg-[#111111] text-[#F4EFE5] py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-10 border-t border-[#39332D]/60">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.24em] sm:tracking-[0.32em] text-[#C6A66B]">
            Featured Menu
          </p>
          <h2 className="mt-2 sm:mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#F4EFE5]">
            Evening Selections
          </h2>
          <div className="gold-divider mx-auto mt-5 sm:mt-6 h-[1px] w-36 sm:w-48" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 sm:gap-y-8">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group flex items-start gap-4 sm:gap-5 border-b border-[#39332D]/70 pb-6 sm:pb-7"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-sm object-cover border border-[#39332D] group-hover:border-[#C6A66B]/70 transition-colors"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2.5 sm:gap-3">
                  <h3 className="font-serif text-base sm:text-xl text-[#F4EFE5] group-hover:text-[#C6A66B] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <span className="font-serif text-base sm:text-lg text-[#C6A66B] shrink-0">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-[#F4EFE5]/65 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href="/menu"
            className="min-h-[46px] inline-flex items-center justify-center w-full sm:w-auto border border-[#C6A66B] px-7 sm:px-8 py-3.5 text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#C6A66B] transition-all duration-300 hover:bg-[#C6A66B] hover:text-[#111111]"
          >
            View Full Tasting & À La Carte Menu
          </Link>
        </div>
      </div>
    </section>
  );
}