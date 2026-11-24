"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111111] px-6"
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.45em" }}
            animate={{ opacity: 1, letterSpacing: "0.28em" }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="text-center"
          >
            <span className="font-serif text-3xl sm:text-5xl font-semibold text-[#F4EFE5] tracking-[0.28em]">
              VELORA
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-3 h-[1px] w-36 origin-center bg-[#C6A66B]"
            />
            <p className="mt-3 text-[11px] uppercase tracking-[0.35em] text-[#C6A66B]">
              An Extraordinary Dining Experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}