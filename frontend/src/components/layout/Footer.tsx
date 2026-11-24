"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Camera, Globe, Mail, ArrowRight, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(String(new Date().getFullYear()));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#0C0C0C] border-t border-[#39332D]/80 text-[#F4EFE5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-semibold tracking-[0.22em] text-[#F4EFE5]">
                VELORA
              </span>
            </Link>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C6A66B]">
              An Extraordinary Dining Experience
            </p>
            <p className="text-sm leading-relaxed text-[#F4EFE5]/70 max-w-sm">
              Where seasonal ingredients, quiet architectural luxury, and refined
              culinary craftsmanship come together in every course.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border border-[#39332D] text-[#F4EFE5]/80 transition-colors hover:border-[#C6A66B] hover:text-[#C6A66B]"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="https://veloradining.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Social"
                className="flex h-9 w-9 items-center justify-center border border-[#39332D] text-[#F4EFE5]/80 transition-colors hover:border-[#C6A66B] hover:text-[#C6A66B]"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="mailto:reservations@veloradining.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center border border-[#39332D] text-[#F4EFE5]/80 transition-colors hover:border-[#C6A66B] hover:text-[#C6A66B]"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-base tracking-wider text-[#C6A66B]">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F4EFE5]/75">
              <li>
                <Link href="/" className="hover:text-[#C6A66B] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#C6A66B] transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C6A66B] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#C6A66B] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-[#C6A66B] transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C6A66B] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-base tracking-wider text-[#C6A66B]">
              Hours & Location
            </h3>
            <div className="space-y-3 text-sm text-[#F4EFE5]/75">
              <div>
                <p className="text-[#F4EFE5] font-medium">Dinner Service</p>
                <p>Tue – Sun: 6:00 PM – 11:30 PM</p>
                <p className="text-xs text-[#F4EFE5]/50">Monday: Closed</p>
              </div>
              <div>
                <p className="text-[#F4EFE5] font-medium">Address</p>
                <p>42 Aurelia Avenue, Culinary District</p>
                <p className="text-xs text-[#C6A66B]">+1 (555) 234-8910</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-base tracking-wider text-[#C6A66B]">
              Private Invitations
            </h3>
            <p className="text-sm text-[#F4EFE5]/70 leading-relaxed">
              Receive seasonal tasting menu releases and private dining notes.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 border border-[#C6A66B]/50 bg-[#C6A66B]/10 px-4 py-3 text-xs text-[#C6A66B]">
                <Check className="h-4 w-4 shrink-0" />
                <span>You are on VELORA’s private list.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex items-center border-b border-[#39332D] focus-within:border-[#C6A66B] transition-colors"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent py-2.5 text-sm text-[#F4EFE5] placeholder:text-[#F4EFE5]/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="p-2 text-[#C6A66B] hover:text-[#F4EFE5] transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#39332D]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F4EFE5]/50">
          <p>© {currentYear} VELORA. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase text-[10px] text-[#C6A66B]/80">
            Crafted with Precision
          </p>
        </div>
      </div>
    </footer>
  );
}