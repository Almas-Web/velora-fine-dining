"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SIGNATURE_DISHES } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";

export default function SignatureDishes() {
  return (
    <section className="bg-[#F4EFE5] text-[#111111] pb-16 sm:pb-24 lg:pb-32 px-5 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-12">
          <div>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[#8E6F3E]">
              Our Signature Collection
            </p>
            <h2 className="mt-2 sm:mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#111111]">
              Crafted to Perfection.
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex min-h-[40px] items-center gap-2 text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#111111] hover:text-[#7A5C2E] transition-colors"
          >
            <span>Explore Signature Dishes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-8">
          {SIGNATURE_DISHES.map((dish, idx) => (
            <motion.article
              key={dish.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] sm:aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#111111]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <span className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#F4EFE5]">
                  0{idx + 1} / {dish.category_name}
                </span>
              </div>

              <div className="mt-4 sm:mt-5 flex items-baseline justify-between gap-3 sm:gap-4">
                <h3 className="font-serif text-lg sm:text-xl text-[#111111] group-hover:text-[#7A5C2E] transition-colors">
                  {dish.name}
                </h3>
                <span className="font-serif text-base sm:text-lg text-[#7A5C2E] shrink-0">
                  {formatPrice(dish.price)}
                </span>
              </div>

              <p className="mt-1.5 sm:mt-2 text-sm text-[#39332D]/85 leading-relaxed line-clamp-2">
                {dish.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}