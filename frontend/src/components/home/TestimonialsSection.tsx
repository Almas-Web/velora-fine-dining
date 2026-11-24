"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mockData";

export default function TestimonialsSection() {
  return (
    <section className="bg-[#111111] text-[#F4EFE5] py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-10 border-t border-[#39332D]/60">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.24em] sm:tracking-[0.32em] text-[#C6A66B]">
            Guest Reflections
          </p>
          <h2 className="mt-2 sm:mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#F4EFE5]">
            Words From Our Table
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: idx * 0.1 }}
              className="flex flex-col justify-between border border-[#39332D] bg-[#161412] p-6 sm:p-8 rounded-sm hover:border-[#C6A66B]/45 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1 text-[#C6A66B] mb-4 sm:mb-5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#C6A66B]" />
                  ))}
                </div>
                <p className="font-serif italic text-base sm:text-lg text-[#F4EFE5]/90 leading-relaxed">
                  “{item.quote}”
                </p>
              </div>

              <footer className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[#39332D]/70">
                <p className="text-sm font-medium text-[#F4EFE5]">
                  {item.guest_name}
                </p>
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#C6A66B]/80 mt-0.5">
                  {item.role}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}