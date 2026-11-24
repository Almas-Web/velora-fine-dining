"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Camera,
  Globe,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HERO_IMAGE } from "@/lib/mockData";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F4EFE5]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 px-6 lg:px-10 overflow-hidden border-b border-[#39332D]/60">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
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
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-[#F4EFE5]"
          >
            Visit <span className="italic text-[#C6A66B]">VELORA.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-sm sm:text-base text-[#F4EFE5]/70 leading-relaxed"
          >
            For private events, press inquiries, cellar questions, or
            personalized seating arrangements, our team is ready to assist.
          </motion.p>
        </div>
      </section>

      {/* Contact Details + Message Form */}
      <main className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Cards & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-[#39332D] bg-[#161412] p-7 space-y-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[#C6A66B]">
                Location & Hours
              </p>

              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-[#C6A66B] shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-serif text-lg text-[#F4EFE5]">
                    Restaurant Address
                  </h2>
                  <p className="mt-1 text-sm text-[#F4EFE5]/70">
                    42 Aurelia Avenue, Culinary District, NY 10013
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-[#C6A66B] shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-serif text-lg text-[#F4EFE5]">
                    Phone Line
                  </h2>
                  <p className="mt-1 text-sm text-[#F4EFE5]/70">
                    +1 (555) 234-8910
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-[#C6A66B] shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-serif text-lg text-[#F4EFE5]">Email</h2>
                  <p className="mt-1 text-sm text-[#F4EFE5]/70">
                    concierge@veloradining.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-[#C6A66B] shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-serif text-lg text-[#F4EFE5]">
                    Opening Hours
                  </h2>
                  <p className="mt-1 text-sm text-[#F4EFE5]/70">
                    Tue – Sun: 6:00 PM – 11:30 PM
                  </p>
                  <p className="text-xs text-[#F4EFE5]/50 mt-0.5">
                    Monday: Closed
                  </p>
                </div>
              </div>

              <div className="gold-divider h-[1px] w-full" />

              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.22em] text-[#F4EFE5]/60">
                  Follow VELORA
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center border border-[#39332D] text-[#F4EFE5]/80 hover:border-[#C6A66B] hover:text-[#C6A66B] transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </a>
                  <a
                    href="https://veloradining.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Website"
                    className="flex h-9 w-9 items-center justify-center border border-[#39332D] text-[#F4EFE5]/80 hover:border-[#C6A66B] hover:text-[#C6A66B] transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="border border-[#39332D] bg-[#161412] p-7 sm:p-10 space-y-6"
            >
              <div className="border-b border-[#39332D] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[#C6A66B]">
                  Send a Note
                </p>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-[#F4EFE5]">
                  Direct Message
                </h2>
              </div>

              {sent && (
                <div className="flex items-center gap-3 border border-[#C6A66B]/50 bg-[#C6A66B]/10 p-4 text-sm text-[#C6A66B]">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span>
                    Thank you. Your message has been received by our hospitality
                    team.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/75 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Marcus Sterling"
                    className="w-full border border-[#39332D] bg-[#111111] px-4 py-3 text-sm text-[#F4EFE5] placeholder:text-[#F4EFE5]/35 focus:border-[#C6A66B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/75 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="marcus@example.com"
                    className="w-full border border-[#39332D] bg-[#111111] px-4 py-3 text-sm text-[#F4EFE5] placeholder:text-[#F4EFE5]/35 focus:border-[#C6A66B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/75 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  placeholder="Private Dining / Wine Pairing / General Inquiry"
                  className="w-full border border-[#39332D] bg-[#111111] px-4 py-3 text-sm text-[#F4EFE5] placeholder:text-[#F4EFE5]/35 focus:border-[#C6A66B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/75 mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Share how we may assist you..."
                  className="w-full border border-[#39332D] bg-[#111111] px-4 py-3 text-sm text-[#F4EFE5] placeholder:text-[#F4EFE5]/35 focus:border-[#C6A66B] focus:outline-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center justify-center gap-2.5 border border-[#C6A66B] bg-[#C6A66B] px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-[#111111] font-semibold hover:bg-[#DFC48C]"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </motion.button>
            </motion.form>
          </div>
        </div>

        {/* Google Maps Embed */}
        <section className="border border-[#39332D] bg-[#161412] overflow-hidden">
          <div className="p-6 border-b border-[#39332D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#C6A66B]">
                Interactive Map
              </p>
              <h2 className="font-serif text-2xl text-[#F4EFE5]">
                Find Us in the Culinary District
              </h2>
            </div>
            <span className="text-xs text-[#F4EFE5]/60">
              42 Aurelia Avenue
            </span>
          </div>
          <div className="relative h-[380px] w-full bg-[#111111]">
            <iframe
              title="VELORA Restaurant Location Map"
              src="https://www.google.com/maps?q=40.7209,-74.0007&hl=en&z=15&output=embed"
              className="h-full w-full border-0 grayscale contrast-125 opacity-90"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}