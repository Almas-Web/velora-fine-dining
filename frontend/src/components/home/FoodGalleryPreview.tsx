"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GALLERY_PHOTOS } from "@/lib/mockData";

export default function FoodGalleryPreview() {
  const previewPhotos = GALLERY_PHOTOS.slice(0, 6);

  return (
    <section className="bg-[#F4EFE5] text-[#111111] py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[#8E6F3E]">
              Visual Journal
            </p>
            <h2 className="mt-2 sm:mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#111111]">
              Atmosphere & Plating
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex min-h-[40px] items-center gap-2 border-b border-[#111111] pb-1 text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#111111] hover:text-[#7A5C2E] hover:border-[#7A5C2E] transition-colors"
          >
            <span>Open Full Gallery</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {previewPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: idx * 0.08 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-[#111111]"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/15 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                <span className="text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C6A66B]">
                  {photo.category}
                </span>
                <p className="mt-1 font-serif text-base sm:text-lg text-[#F4EFE5]">
                  {photo.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}