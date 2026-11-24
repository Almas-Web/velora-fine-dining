"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RESERVATION_BANNER_IMAGE } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface ReservationFormData {
  customer_name: string;
  email: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  guests: number;
  special_requests: string;
}

interface ConfirmedBooking extends ReservationFormData {
  reference_code: string;
  status: "Pending" | "Confirmed";
}

const TIME_SLOTS = [
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
];

const INITIAL_FORM: ReservationFormData = {
  customer_name: "",
  email: "",
  phone: "",
  booking_date: "",
  booking_time: "7:30 PM",
  guests: 2,
  special_requests: "",
};

export default function ReservationPage() {
  const [formData, setFormData] = useState<ReservationFormData>(INITIAL_FORM);
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const code = `VLR-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmed({
        ...formData,
        reference_code: code,
        status: "Pending",
      });
      setSubmitting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F4EFE5]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 px-6 lg:px-10 overflow-hidden border-b border-[#39332D]/60">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${RESERVATION_BANNER_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/85 via-[#111111]/80 to-[#111111]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.35em] text-[#C6A66B]"
          >
            Table Reservations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-[#F4EFE5]"
          >
            Reserve Your <span className="italic text-[#C6A66B]">Evening.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-sm sm:text-base text-[#F4EFE5]/70 leading-relaxed"
          >
            We welcome reservations for dinner service Tuesday through Sunday.
            For parties larger than eight or private dining inquiries, please
            reach out directly to our concierge.
          </motion.p>
        </div>
      </section>

      {/* Main Booking Section */}
      <main className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form or Confirmation */}
          <div className="lg:col-span-7">
            {confirmed ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-[#C6A66B]/45 bg-[#161412] p-8 sm:p-10 space-y-6"
              >
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#39332D] pb-5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-[#C6A66B]" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.26em] text-[#C6A66B]">
                        Reservation Request Logged
                      </p>
                      <h2 className="font-serif text-2xl sm:text-3xl text-[#F4EFE5]">
                        We Look Forward to Hosting You
                      </h2>
                    </div>
                  </div>
                  <span className="border border-[#C6A66B]/50 bg-[#C6A66B]/10 px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#C6A66B]">
                    Status: {confirmed.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="border border-[#39332D]/70 bg-[#111111] p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#F4EFE5]/50">
                      Reference Code
                    </p>
                    <p className="mt-1 font-serif text-lg text-[#C6A66B]">
                      {confirmed.reference_code}
                    </p>
                  </div>
                  <div className="border border-[#39332D]/70 bg-[#111111] p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#F4EFE5]/50">
                      Guest Name
                    </p>
                    <p className="mt-1 text-[#F4EFE5]">
                      {confirmed.customer_name}
                    </p>
                  </div>
                  <div className="border border-[#39332D]/70 bg-[#111111] p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#F4EFE5]/50">
                      Date & Seating
                    </p>
                    <p className="mt-1 text-[#F4EFE5]">
                      {confirmed.booking_date} at {confirmed.booking_time}
                    </p>
                  </div>
                  <div className="border border-[#39332D]/70 bg-[#111111] p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#F4EFE5]/50">
                      Party Size
                    </p>
                    <p className="mt-1 text-[#F4EFE5]">
                      {confirmed.guests}{" "}
                      {confirmed.guests === 1 ? "Guest" : "Guests"}
                    </p>
                  </div>
                </div>

                {confirmed.special_requests && (
                  <div className="border border-[#39332D]/70 bg-[#111111] p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#F4EFE5]/50">
                      Special Requests
                    </p>
                    <p className="mt-1 text-sm text-[#F4EFE5]/80">
                      {confirmed.special_requests}
                    </p>
                  </div>
                )}

                <p className="text-xs text-[#F4EFE5]/60 leading-relaxed">
                  A confirmation summary has been prepared for{" "}
                  <span className="text-[#F4EFE5]">{confirmed.email}</span>.
                  Our dining room team reviews requests promptly and updates
                  status in real time.
                </p>

                <motion.button
                  type="button"
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18 }}
                  onClick={() => {
                    setConfirmed(null);
                    setFormData(INITIAL_FORM);
                  }}
                  className="border border-[#C6A66B] px-7 py-3 text-xs uppercase tracking-[0.22em] text-[#C6A66B] hover:bg-[#C6A66B] hover:text-[#111111]"
                >
                  Make Another Reservation
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="border border-[#39332D] bg-[#161412] p-7 sm:p-10 space-y-6"
              >
                <div className="border-b border-[#39332D] pb-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#C6A66B]">
                    Guest Details
                  </p>
                  <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-[#F4EFE5]">
                    Request a Table
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/75 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customer_name: e.target.value,
                        })
                      }
                      placeholder="e.g., Sophia Laurent"
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
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="sophia@example.com"
                      className="w-full border border-[#39332D] bg-[#111111] px-4 py-3 text-sm text-[#F4EFE5] placeholder:text-[#F4EFE5]/35 focus:border-[#C6A66B] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/75 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+1 (555) 019-2834"
                      className="w-full border border-[#39332D] bg-[#111111] px-4 py-3 text-sm text-[#F4EFE5] placeholder:text-[#F4EFE5]/35 focus:border-[#C6A66B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/75 mb-2">
                      Booking Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.booking_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          booking_date: e.target.value,
                        })
                      }
                      className="w-full border border-[#39332D] bg-[#111111] px-4 py-3 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Guests Selector */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/75 mb-2.5">
                    Number of Guests *
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => {
                      const active = formData.guests === count;
                      return (
                        <motion.button
                          key={count}
                          type="button"
                          whileHover={{ y: -3, scale: 1.05 }}
                          whileTap={{ scale: 0.94 }}
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 18,
                          }}
                          onClick={() =>
                            setFormData({ ...formData, guests: count })
                          }
                          className={cn(
                            "py-2.5 text-xs font-medium border",
                            active
                              ? "border-[#C6A66B] bg-[#C6A66B] text-[#111111]"
                              : "border-[#39332D] bg-[#111111] text-[#F4EFE5]/80 hover:border-[#C6A66B] hover:text-[#C6A66B]"
                          )}
                        >
                          {count}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Booking Time Slots */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/75 mb-2.5">
                    Preferred Seating Time *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {TIME_SLOTS.map((slot) => {
                      const active = formData.booking_time === slot;
                      return (
                        <motion.button
                          key={slot}
                          type="button"
                          whileHover={{ y: -3, scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 18,
                          }}
                          onClick={() =>
                            setFormData({ ...formData, booking_time: slot })
                          }
                          className={cn(
                            "py-2.5 px-3 text-xs tracking-wider border",
                            active
                              ? "border-[#C6A66B] bg-[#C6A66B] text-[#111111] font-medium"
                              : "border-[#39332D] bg-[#111111] text-[#F4EFE5]/80 hover:border-[#C6A66B] hover:text-[#C6A66B]"
                          )}
                        >
                          {slot}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/75 mb-2">
                    Special Requests & Dietary Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.special_requests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        special_requests: e.target.value,
                      })
                    }
                    placeholder="Anniversary seating, shellfish allergy, wine pairing preference..."
                    className="w-full border border-[#39332D] bg-[#111111] px-4 py-3 text-sm text-[#F4EFE5] placeholder:text-[#F4EFE5]/35 focus:border-[#C6A66B] focus:outline-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full border border-[#C6A66B] bg-[#C6A66B] py-4 text-xs uppercase tracking-[0.24em] text-[#111111] font-semibold hover:bg-[#DFC48C] disabled:opacity-60"
                >
                  {submitting
                    ? "Submitting Request..."
                    : "Confirm Table Reservation"}
                </motion.button>
              </motion.form>
            )}
          </div>

          {/* Right Column: Dining Etiquette & Concierge Info */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="border border-[#39332D] bg-[#161412] p-8 space-y-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[#C6A66B]">
                Dining Room Notes
              </p>
              <h3 className="font-serif text-2xl text-[#F4EFE5]">
                Before Your Arrival
              </h3>

              <ul className="space-y-4 text-sm text-[#F4EFE5]/75">
                <li className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-[#C6A66B] shrink-0 mt-1" />
                  <span>
                    <strong className="text-[#F4EFE5]">Hours:</strong> Tuesday
                    through Sunday, 6:00 PM – 11:30 PM. Closed Mondays.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-[#C6A66B] shrink-0 mt-1" />
                  <span>
                    <strong className="text-[#F4EFE5]">Grace Window:</strong>{" "}
                    Tables are held for 15 minutes past reservation time.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-4 w-4 text-[#C6A66B] shrink-0 mt-1" />
                  <span>
                    <strong className="text-[#F4EFE5]">Dress Code:</strong>{" "}
                    Smart evening / cocktail attire is appreciated.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="h-4 w-4 text-[#C6A66B] shrink-0 mt-1" />
                  <span>
                    <strong className="text-[#F4EFE5]">Celebrations:</strong>{" "}
                    Let us know in advance for bespoke dessert inscriptions.
                  </span>
                </li>
              </ul>

              <div className="gold-divider h-[1px] w-full" />

              <div className="space-y-3 text-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-[#C6A66B]">
                  Direct Concierge
                </p>
                <a
                  href="tel:+15552348910"
                  className="flex items-center gap-2.5 text-[#F4EFE5]/80 hover:text-[#C6A66B] transition-colors"
                >
                  <Phone className="h-4 w-4 text-[#C6A66B]" />
                  <span>+1 (555) 234-8910</span>
                </a>
                <a
                  href="mailto:reservations@veloradining.com"
                  className="flex items-center gap-2.5 text-[#F4EFE5]/80 hover:text-[#C6A66B] transition-colors"
                >
                  <Mail className="h-4 w-4 text-[#C6A66B]" />
                  <span>reservations@veloradining.com</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}