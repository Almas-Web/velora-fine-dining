"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-[#0C0C0C]/94 backdrop-blur-md border-b border-[#39332D]/90 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
          : "bg-gradient-to-b from-[#0C0C0C]/90 via-[#0C0C0C]/50 to-transparent py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.24em] text-[#F4EFE5] transition-colors duration-300 group-hover:text-[#C6A66B]">
            VELORA
          </span>
          <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.36em] text-[#C6A66B]/90">
            Fine Dining
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative py-1 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300",
                  isActive
                    ? "text-[#C6A66B]"
                    : "text-[#F4EFE5]/80 hover:text-[#C6A66B]"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1px] bg-[#C6A66B] transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/reservation"
            className="border border-[#C6A66B]/80 bg-[#C6A66B]/10 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#F4EFE5] transition-all duration-300 hover:border-[#C6A66B] hover:bg-[#C6A66B] hover:text-[#0C0C0C]"
          >
            Reserve a Table
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          className="md:hidden border border-[#39332D]/80 p-2 text-[#F4EFE5] transition-colors hover:border-[#C6A66B] hover:text-[#C6A66B]"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#0C0C0C]/98 backdrop-blur-lg border-b border-[#39332D]"
          >
            <div className="flex flex-col space-y-4 px-6 py-8">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "text-xs uppercase tracking-[0.24em] py-2 border-b border-[#39332D]/60 transition-colors",
                      isActive
                        ? "text-[#C6A66B]"
                        : "text-[#F4EFE5]/85 hover:text-[#C6A66B]"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/reservation"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex justify-center border border-[#C6A66B] bg-[#C6A66B] px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0C0C0C] transition-colors hover:bg-[#d6b87c]"
              >
                Reserve a Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}