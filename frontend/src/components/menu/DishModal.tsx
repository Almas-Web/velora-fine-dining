"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Award } from "lucide-react";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";

interface DishModalProps {
  dish: MenuItem | null;
  onClose: () => void;
}

export default function DishModal({ dish, onClose }: DishModalProps) {
  return (
    <AnimatePresence>
      {dish && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/85 backdrop-blur-md p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden border border-[#C6A66B]/35 bg-[#161412] text-[#F4EFE5] shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center border border-[#39332D] bg-[#111111]/85 text-[#F4EFE5] hover:border-[#C6A66B] hover:text-[#C6A66B]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto bg-[#111111]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="md:col-span-7 p-7 sm:p-9 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A66B]">
                      {dish.category_name}
                    </span>
                    {dish.is_featured && (
                      <span className="inline-flex items-center gap-1 border border-[#C6A66B]/40 bg-[#C6A66B]/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[#C6A66B]">
                        <Sparkles className="h-3 w-3" />
                        Chef’s Special
                      </span>
                    )}
                    {dish.is_popular && (
                      <span className="inline-flex items-center gap-1 border border-[#F4EFE5]/20 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[#F4EFE5]/80">
                        <Award className="h-3 w-3 text-[#C6A66B]" />
                        Popular
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EFE5] leading-snug">
                    {dish.name}
                  </h3>

                  <p className="mt-2 font-serif text-2xl text-[#C6A66B]">
                    {formatPrice(dish.price)}
                  </p>

                  <div className="gold-divider my-5 h-[1px] w-full" />

                  <p className="text-sm text-[#F4EFE5]/75 leading-relaxed">
                    {dish.description}
                  </p>

                  <p className="mt-4 text-xs text-[#F4EFE5]/50">
                    Prepared fresh to order. Allergen & dietary accommodations
                    available upon request with our sommelier and kitchen team.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/reservation"
                    className="flex-1 text-center border border-[#C6A66B] bg-[#C6A66B] px-6 py-3 text-xs uppercase tracking-[0.22em] text-[#111111] font-medium hover:bg-[#DFC48C]"
                  >
                    Reserve Table for This Course
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}