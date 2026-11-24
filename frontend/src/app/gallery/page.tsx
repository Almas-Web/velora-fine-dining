"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GALLERY_PHOTOS, HERO_IMAGE } from "@/lib/mockData";
import { GalleryPhoto } from "@/types";
import { cn } from "@/lib/utils";

const GALLERY_CATEGORIES: Array<"All" | GalleryPhoto["category"]> = [
  "All",
  "Interior",
  "Cuisine",
  "Chef & Kitchen",
  "Experience",
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<
    "All" | GalleryPhoto["category"]
  >("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const activePhoto =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] ?? null : null;

  const handlePrev = () => {
    if (lightboxIndex === null || filteredPhotos.length === 0) return;
    setLightboxIndex(
      (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  };

  const handleNext = () => {
    if (lightboxIndex === null || filteredPhotos.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F4EFE5]">
      <Navbar />

      {/* Gallery Hero */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 px-6 lg:px-10 overflow-hidden border-b border-[#39332D]/60">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/85 via-[#111111]/80 to-[#111111]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.35em] text-[#C6A66B]"
          >
            Visual Archive
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-[#F4EFE5]"
          >
            The <span className="italic text-[#C6A66B]">VELORA</span> Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-sm sm:text-base text-[#F4EFE5]/70 leading-relaxed"
          >
            Glimpses of our candlelit dining room, nightly plating craft,
            kitchen discipline, and evening hospitality.
          </motion.p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="py-8 px-6 lg:px-10 border-b border-[#39332D]/60 bg-[#141210]">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-3">
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                type="button"
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={cn(
                  "px-5 py-2 text-xs uppercase tracking-[0.2em] border",
                  isActive
                    ? "border-[#C6A66B] bg-[#C6A66B] text-[#111111] font-medium"
                    : "border-[#39332D] bg-[#111111] text-[#F4EFE5]/80 hover:border-[#C6A66B] hover:text-[#C6A66B]"
                )}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Responsive Image Grid */}
      <main className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45 }}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-sm border border-[#39332D] bg-[#161412]"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-5">
                  <div className="flex justify-end">
                    <span className="flex h-9 w-9 items-center justify-center border border-[#F4EFE5]/30 bg-[#111111]/70 text-[#F4EFE5] group-hover:border-[#C6A66B] group-hover:text-[#C6A66B] transition-colors">
                      <Expand className="h-4 w-4" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.26em] text-[#C6A66B]">
                      {photo.category}
                    </span>
                    <h2 className="mt-1 font-serif text-xl text-[#F4EFE5]">
                      {photo.title}
                    </h2>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/92 backdrop-blur-md p-4 sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl border border-[#C6A66B]/35 bg-[#141210] p-4 sm:p-6 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center border border-[#39332D] bg-[#111111]/90 text-[#F4EFE5] hover:border-[#C6A66B] hover:text-[#C6A66B]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="h-full w-full object-cover"
                />

                {filteredPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-[#39332D] bg-[#111111]/85 text-[#F4EFE5] hover:border-[#C6A66B] hover:text-[#C6A66B]"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-[#39332D] bg-[#111111]/85 text-[#F4EFE5] hover:border-[#C6A66B] hover:text-[#C6A66B]"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.26em] text-[#C6A66B]">
                    {activePhoto.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F4EFE5]">
                    {activePhoto.title}
                  </h3>
                </div>
                <p className="text-xs text-[#F4EFE5]/50">
                  {lightboxIndex !== null ? lightboxIndex + 1 : 1} /{" "}
                  {filteredPhotos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}