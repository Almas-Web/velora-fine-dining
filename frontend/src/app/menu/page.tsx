"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Award, Eye } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DishModal from "@/components/menu/DishModal";
import { CATEGORIES, MENU_ITEMS, HERO_IMAGE } from "@/lib/mockData";
import { MenuItem } from "@/types";
import { cn, formatPrice } from "@/lib/utils";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const categoryTabs = ["All", ...CATEGORIES.map((c) => c.name)];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category_name === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#111111] text-[#F4EFE5]">
      <Navbar />

      {/* Menu Hero Section */}
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
            Seasonal Gastronomy
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-[#F4EFE5]"
          >
            Curated Culinary <span className="italic text-[#C6A66B]">Menu</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-sm sm:text-base text-[#F4EFE5]/70 leading-relaxed"
          >
            Each dish is composed around peak-season produce, coastal catches,
            and prime dry-aged cuts.
          </motion.p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-[68px] z-30 bg-[#111111]/95 backdrop-blur-md border-b border-[#39332D]/70 py-5 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
          {/* Category Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
            {categoryTabs.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <motion.button
                  key={cat}
                  type="button"
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "shrink-0 px-5 py-2 text-xs uppercase tracking-[0.2em] border",
                    active
                      ? "border-[#C6A66B] bg-[#C6A66B] text-[#111111] font-medium"
                      : "border-[#39332D] bg-[#161412] text-[#F4EFE5]/80 hover:border-[#C6A66B] hover:text-[#C6A66B]"
                  )}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C6A66B]/80" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients..."
              className="w-full border border-[#39332D] bg-[#161412] pl-10 pr-4 py-2.5 text-sm text-[#F4EFE5] placeholder:text-[#F4EFE5]/40 focus:border-[#C6A66B] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <main className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 border border-[#39332D]/60 bg-[#161412]/50">
            <p className="font-serif text-2xl text-[#F4EFE5]">
              No matching dishes found.
            </p>
            <p className="mt-2 text-sm text-[#F4EFE5]/60">
              Try clearing your search or selecting another culinary category.
            </p>
            <motion.button
              type="button"
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 border border-[#C6A66B] px-6 py-2.5 text-xs uppercase tracking-[0.22em] text-[#C6A66B] hover:bg-[#C6A66B] hover:text-[#111111]"
            >
              Reset Filters
            </motion.button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45 }}
                  className="group flex flex-col justify-between border border-[#39332D] bg-[#161412] overflow-hidden hover:border-[#C6A66B]/55 transition-colors"
                >
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/75 via-transparent to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {item.is_featured && (
                          <span className="inline-flex items-center gap-1 bg-[#111111]/90 border border-[#C6A66B]/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[#C6A66B]">
                            <Sparkles className="h-3 w-3" />
                            Chef’s Special
                          </span>
                        )}
                        {item.is_popular && (
                          <span className="inline-flex items-center gap-1 bg-[#C6A66B] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[#111111] font-medium">
                            <Award className="h-3 w-3" />
                            Popular
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="text-[10px] uppercase tracking-[0.26em] text-[#C6A66B]/85">
                        {item.category_name}
                      </span>
                      <div className="mt-1.5 flex items-baseline justify-between gap-4">
                        <h2 className="font-serif text-xl text-[#F4EFE5] group-hover:text-[#C6A66B] transition-colors">
                          {item.name}
                        </h2>
                        <span className="font-serif text-lg text-[#C6A66B] shrink-0">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm text-[#F4EFE5]/70 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <motion.button
                      type="button"
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 420, damping: 18 }}
                      onClick={() => setSelectedDish(item)}
                      className="w-full flex items-center justify-center gap-2 border border-[#39332D] bg-[#111111] py-2.5 text-xs uppercase tracking-[0.22em] text-[#F4EFE5]/85 hover:border-[#C6A66B] hover:text-[#C6A66B]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View Dish Details</span>
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      <Footer />
    </div>
  );
}