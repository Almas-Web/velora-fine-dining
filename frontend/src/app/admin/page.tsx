"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Lock,
  LogOut,
  UtensilsCrossed,
  FolderKanban,
  CalendarCheck,
  MessageSquare,
  Clock,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  ArrowUpRight,
} from "lucide-react";
import { CATEGORIES, MENU_ITEMS } from "@/lib/mockData";
import { Category, MenuItem } from "@/types";
import { cn, formatPrice } from "@/lib/utils";

type AdminTab =
  | "overview"
  | "menu"
  | "categories"
  | "reservations"
  | "messages"
  | "settings";

interface AdminReservation {
  id: number;
  customer_name: string;
  email: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  guests: number;
  special_requests: string;
  status: "Pending" | "Confirmed" | "Rejected";
}

interface AdminMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const INITIAL_RESERVATIONS: AdminReservation[] = [
  {
    id: 1,
    customer_name: "Sophia Laurent",
    email: "sophia@example.com",
    phone: "+1 (555) 019-2834",
    booking_date: "2026-11-26",
    booking_time: "7:30 PM",
    guests: 2,
    special_requests: "Window table & anniversary dessert note.",
    status: "Pending",
  },
  {
    id: 2,
    customer_name: "Marcus Sterling",
    email: "marcus@example.com",
    phone: "+1 (555) 482-9102",
    booking_date: "2026-11-27",
    booking_time: "8:00 PM",
    guests: 4,
    special_requests: "Wine pairing interest.",
    status: "Confirmed",
  },
  {
    id: 3,
    customer_name: "Elena Rostova",
    email: "elena@example.com",
    phone: "+1 (555) 774-1209",
    booking_date: "2026-11-28",
    booking_time: "6:30 PM",
    guests: 2,
    special_requests: "No shellfish.",
    status: "Pending",
  },
];

const INITIAL_MESSAGES: AdminMessage[] = [
  {
    id: 1,
    name: "Aria Montgomery",
    email: "aria@example.com",
    subject: "Private Dining Inquiry",
    message:
      "Hello VELORA team, do you host an 8-guest private tasting evening next month?",
    created_at: "2 hours ago",
  },
  {
    id: 2,
    name: "Daniel Cho",
    email: "daniel@example.com",
    subject: "Dietary Accommodation",
    message:
      "Checking if vegetarian tasting adjustments can be arranged 48 hours ahead.",
    created_at: "Yesterday",
  },
];

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "admin",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  // Menu state
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [dishForm, setDishForm] = useState({
    name: "",
    category_id: CATEGORIES[0]?.id ?? 1,
    price: "",
    description: "",
    image: "/images/wagyu-steak.jpg",
    is_featured: false,
    is_popular: false,
    is_available: true,
  });

  // Categories state
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "/images/starters.jpg",
  });

  // Reservations & Messages state
  const [reservations, setReservations] =
    useState<AdminReservation[]>(INITIAL_RESERVATIONS);
  const [messages] = useState<AdminMessage[]>(INITIAL_MESSAGES);

  // Settings state
  const [settings, setSettings] = useState({
    restaurant_name: "VELORA",
    phone: "+1 (555) 234-8910",
    email: "concierge@veloradining.com",
    address: "42 Aurelia Avenue, Culinary District, NY 10013",
    opening_hours: "Tue – Sun: 6:00 PM – 11:30 PM (Closed Mondays)",
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const stats = useMemo(() => {
    const totalRes = reservations.length;
    const pendingRes = reservations.filter((r) => r.status === "Pending").length;
    const confirmedRes = reservations.filter(
      (r) => r.status === "Confirmed"
    ).length;
    const totalMenu = menuItems.length;
    return { totalRes, pendingRes, confirmedRes, totalMenu };
  }, [reservations, menuItems]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.username.trim() || !loginForm.password.trim()) {
      setLoginError("Please enter both admin username and password.");
      return;
    }
    setLoginError("");
    setIsAuthenticated(true);
  };

  const resetDishForm = () => {
    setEditingItem(null);
    setDishForm({
      name: "",
      category_id: categories[0]?.id ?? 1,
      price: "",
      description: "",
      image: "/images/wagyu-steak.jpg",
      is_featured: false,
      is_popular: false,
      is_available: true,
    });
  };

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = Number(dishForm.price);
    if (!dishForm.name.trim() || Number.isNaN(numericPrice) || numericPrice <= 0)
      return;

    const catObj = categories.find((c) => c.id === Number(dishForm.category_id));

    if (editingItem) {
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: dishForm.name.trim(),
                category_id: Number(dishForm.category_id),
                category_name: catObj?.name ?? "Menu",
                price: numericPrice,
                description: dishForm.description.trim(),
                image: dishForm.image.trim() || item.image,
                is_featured: dishForm.is_featured,
                is_popular: dishForm.is_popular,
                is_available: dishForm.is_available,
              }
            : item
        )
      );
      resetDishForm();
      return;
    }

    const newItem: MenuItem = {
      id: Date.now(),
      category_id: Number(dishForm.category_id),
      category_name: catObj?.name ?? "Menu",
      name: dishForm.name.trim(),
      description: dishForm.description.trim(),
      price: numericPrice,
      image: dishForm.image.trim() || "/images/wagyu-steak.jpg",
      is_featured: dishForm.is_featured,
      is_popular: dishForm.is_popular,
      is_available: dishForm.is_available,
    };

    setMenuItems((prev) => [newItem, ...prev]);
    resetDishForm();
  };

  const startEditDish = (item: MenuItem) => {
    setEditingItem(item);
    setDishForm({
      name: item.name,
      category_id: item.category_id,
      price: String(item.price),
      description: item.description,
      image: item.image,
      is_featured: item.is_featured,
      is_popular: Boolean(item.is_popular),
      is_available: item.is_available,
    });
  };

  const deleteDish = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    if (editingItem?.id === id) resetDishForm();
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;
    const created: Category = {
      id: Date.now(),
      name: newCategory.name.trim(),
      description:
        newCategory.description.trim() || "Curated seasonal course selection.",
      image: newCategory.image.trim() || "/images/starters.jpg",
      is_active: true,
    };
    setCategories((prev) => [...prev, created]);
    setNewCategory({ name: "", description: "", image: "/images/starters.jpg" });
  };

  const toggleCategoryActive = (id: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, is_active: !cat.is_active } : cat
      )
    );
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const updateReservationStatus = (
    id: number,
    status: AdminReservation["status"]
  ) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status } : res))
    );
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // Admin Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] text-[#F4EFE5] flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md border border-[#C6A66B]/35 bg-[#161412] p-8 sm:p-10 space-y-6 shadow-2xl"
        >
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#C6A66B]/40 bg-[#111111] text-[#C6A66B]">
              <Lock className="h-5 w-5" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#C6A66B] pt-2">
              VELORA Management
            </p>
            <h1 className="font-serif text-3xl text-[#F4EFE5]">Admin Sign In</h1>
            <p className="text-xs text-[#F4EFE5]/60">
              Manage menus, categories, table bookings, messages, and hours.
            </p>
          </div>

          {loginError && (
            <div className="border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/75 mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                className="w-full border border-[#39332D] bg-[#111111] px-4 py-3 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/75 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                placeholder="Enter any password for preview"
                className="w-full border border-[#39332D] bg-[#111111] px-4 py-3 text-sm text-[#F4EFE5] placeholder:text-[#F4EFE5]/35 focus:border-[#C6A66B] focus:outline-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
              className="w-full border border-[#C6A66B] bg-[#C6A66B] py-3.5 text-xs uppercase tracking-[0.22em] text-[#111111] font-semibold hover:bg-[#DFC48C]"
            >
              Enter Dashboard
            </motion.button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#F4EFE5]/60 hover:text-[#C6A66B]"
            >
              <span>Return to Website</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const navItems: Array<{
    key: AdminTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }> = [
    { key: "overview", label: "Overview", icon: FolderKanban },
    { key: "menu", label: "Menu Items", icon: UtensilsCrossed, badge: menuItems.length },
    { key: "categories", label: "Categories", icon: FolderKanban, badge: categories.length },
    { key: "reservations", label: "Reservations", icon: CalendarCheck, badge: stats.pendingRes },
    { key: "messages", label: "Messages", icon: MessageSquare, badge: messages.length },
    { key: "settings", label: "Opening Hours", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-[#F4EFE5]">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-[#39332D] bg-[#141210]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-serif text-2xl tracking-[0.22em] text-[#F4EFE5] hover:text-[#C6A66B]"
            >
              VELORA
            </Link>
            <span className="hidden sm:inline-block border border-[#C6A66B]/40 bg-[#C6A66B]/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#C6A66B]">
              Admin Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 border border-[#39332D] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/80 hover:border-[#C6A66B] hover:text-[#C6A66B]"
            >
              <span>Live Site</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex items-center gap-2 border border-[#39332D] bg-[#111111] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/80 hover:border-[#C6A66B] hover:text-[#C6A66B]"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center gap-2 overflow-x-auto pb-3 pt-1">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <motion.button
                key={tab.key}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "shrink-0 inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.18em] border",
                  active
                    ? "border-[#C6A66B] bg-[#C6A66B] text-[#111111] font-medium"
                    : "border-[#39332D] bg-[#161412] text-[#F4EFE5]/75 hover:border-[#C6A66B] hover:text-[#C6A66B]"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
                {typeof tab.badge === "number" && (
                  <span
                    className={cn(
                      "px-1.5 py-0.5 text-[10px]",
                      active
                        ? "bg-[#111111] text-[#C6A66B]"
                        : "bg-[#111111] text-[#C6A66B]"
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 lg:px-10 py-12 space-y-10">
        {/* Overview Cards (Shown on Overview & Top Summary) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="border border-[#39332D] bg-[#161412] p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#F4EFE5]/55">
              Total Reservations
            </p>
            <p className="mt-2 font-serif text-3xl text-[#F4EFE5]">
              {stats.totalRes}
            </p>
          </div>
          <div className="border border-[#39332D] bg-[#161412] p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#C6A66B]">
              Pending Reservations
            </p>
            <p className="mt-2 font-serif text-3xl text-[#C6A66B]">
              {stats.pendingRes}
            </p>
          </div>
          <div className="border border-[#39332D] bg-[#161412] p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#F4EFE5]/55">
              Confirmed Reservations
            </p>
            <p className="mt-2 font-serif text-3xl text-emerald-400">
              {stats.confirmedRes}
            </p>
          </div>
          <div className="border border-[#39332D] bg-[#161412] p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#F4EFE5]/55">
              Total Menu Items
            </p>
            <p className="mt-2 font-serif text-3xl text-[#F4EFE5]">
              {stats.totalMenu}
            </p>
          </div>
        </section>

        {/* OVERVIEW QUICK VIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border border-[#39332D] bg-[#161412] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-[#F4EFE5]">
                  Recent Reservations
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab("reservations")}
                  className="text-xs uppercase tracking-[0.2em] text-[#C6A66B] hover:underline"
                >
                  Manage All
                </button>
              </div>
              <div className="divide-y divide-[#39332D]/70">
                {reservations.map((r) => (
                  <div
                    key={r.id}
                    className="py-3.5 flex items-center justify-between gap-4 text-sm"
                  >
                    <div>
                      <p className="font-medium text-[#F4EFE5]">
                        {r.customer_name}
                      </p>
                      <p className="text-xs text-[#F4EFE5]/55">
                        {r.booking_date} · {r.booking_time} · {r.guests} Guests
                      </p>
                    </div>
                    <span
                      className={cn(
                        "px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] border",
                        r.status === "Confirmed"
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                          : r.status === "Rejected"
                          ? "border-red-500/40 bg-red-500/10 text-red-300"
                          : "border-[#C6A66B]/40 bg-[#C6A66B]/10 text-[#C6A66B]"
                      )}
                    >
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#39332D] bg-[#161412] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-[#F4EFE5]">
                  Latest Guest Messages
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab("messages")}
                  className="text-xs uppercase tracking-[0.2em] text-[#C6A66B] hover:underline"
                >
                  View Inbox
                </button>
              </div>
              <div className="divide-y divide-[#39332D]/70">
                {messages.map((m) => (
                  <div key={m.id} className="py-3.5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-[#C6A66B]">
                      <span>{m.name}</span>
                      <span className="text-[#F4EFE5]/45">{m.created_at}</span>
                    </div>
                    <p className="text-sm font-medium text-[#F4EFE5]">
                      {m.subject || "General Inquiry"}
                    </p>
                    <p className="text-xs text-[#F4EFE5]/65 line-clamp-2">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MENU CRUD */}
        {activeTab === "menu" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleSaveDish}
              className="lg:col-span-5 border border-[#39332D] bg-[#161412] p-6 sm:p-7 space-y-4"
            >
              <div className="border-b border-[#39332D] pb-3 flex items-center justify-between">
                <h2 className="font-serif text-2xl text-[#F4EFE5]">
                  {editingItem ? "Edit Menu Item" : "Add Menu Item"}
                </h2>
                {editingItem && (
                  <button
                    type="button"
                    onClick={resetDishForm}
                    className="text-xs text-[#F4EFE5]/60 hover:text-[#C6A66B]"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/70 mb-1.5">
                  Dish Name *
                </label>
                <input
                  type="text"
                  required
                  value={dishForm.name}
                  onChange={(e) =>
                    setDishForm({ ...dishForm, name: e.target.value })
                  }
                  placeholder="e.g., Truffle Risotto"
                  className="w-full border border-[#39332D] bg-[#111111] px-3.5 py-2.5 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/70 mb-1.5">
                    Category
                  </label>
                  <select
                    value={dishForm.category_id}
                    onChange={(e) =>
                      setDishForm({
                        ...dishForm,
                        category_id: Number(e.target.value),
                      })
                    }
                    className="w-full border border-[#39332D] bg-[#111111] px-3.5 py-2.5 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/70 mb-1.5">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={dishForm.price}
                    onChange={(e) =>
                      setDishForm({ ...dishForm, price: e.target.value })
                    }
                    placeholder="48"
                    className="w-full border border-[#39332D] bg-[#111111] px-3.5 py-2.5 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/70 mb-1.5">
                  Image Path (/images/... or URL)
                </label>
                <input
                  type="text"
                  value={dishForm.image}
                  onChange={(e) =>
                    setDishForm({ ...dishForm, image: e.target.value })
                  }
                  placeholder="/images/wagyu-steak.jpg"
                  className="w-full border border-[#39332D] bg-[#111111] px-3.5 py-2.5 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/70 mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={dishForm.description}
                  onChange={(e) =>
                    setDishForm({ ...dishForm, description: e.target.value })
                  }
                  placeholder="Describe ingredients, cooking style, and plating..."
                  className="w-full border border-[#39332D] bg-[#111111] px-3.5 py-2.5 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-5 text-xs text-[#F4EFE5]/80 pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dishForm.is_featured}
                    onChange={(e) =>
                      setDishForm({
                        ...dishForm,
                        is_featured: e.target.checked,
                      })
                    }
                    className="accent-[#C6A66B]"
                  />
                  <span>Chef’s Special</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dishForm.is_popular}
                    onChange={(e) =>
                      setDishForm({ ...dishForm, is_popular: e.target.checked })
                    }
                    className="accent-[#C6A66B]"
                  />
                  <span>Popular</span>
                </label>
              </div>

              <motion.button
                type="submit"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full inline-flex items-center justify-center gap-2 border border-[#C6A66B] bg-[#C6A66B] py-3 text-xs uppercase tracking-[0.22em] text-[#111111] font-semibold hover:bg-[#DFC48C]"
              >
                <Plus className="h-4 w-4" />
                <span>{editingItem ? "Update Dish" : "Add Menu Item"}</span>
              </motion.button>
            </form>

            <div className="lg:col-span-7 border border-[#39332D] bg-[#161412] divide-y divide-[#39332D]/70">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 shrink-0 rounded-sm object-cover border border-[#39332D]"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[#C6A66B]">
                        {item.category_name}
                      </p>
                      <h3 className="font-serif text-lg text-[#F4EFE5] truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#F4EFE5]/60 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <span className="font-serif text-lg text-[#C6A66B]">
                      {formatPrice(item.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEditDish(item)}
                        aria-label="Edit item"
                        className="p-2 border border-[#39332D] text-[#F4EFE5]/80 hover:border-[#C6A66B] hover:text-[#C6A66B]"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteDish(item.id)}
                        aria-label="Delete item"
                        className="p-2 border border-[#39332D] text-[#F4EFE5]/80 hover:border-red-400 hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CATEGORIES CRUD */}
        {activeTab === "categories" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleAddCategory}
              className="lg:col-span-5 border border-[#39332D] bg-[#161412] p-6 space-y-4"
            >
              <h2 className="font-serif text-2xl text-[#F4EFE5] border-b border-[#39332D] pb-3">
                Add Category
              </h2>
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/70 mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="e.g., Tasting Menu"
                  className="w-full border border-[#39332D] bg-[#111111] px-3.5 py-2.5 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/70 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                  placeholder="Short description..."
                  className="w-full border border-[#39332D] bg-[#111111] px-3.5 py-2.5 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full border border-[#C6A66B] bg-[#C6A66B] py-3 text-xs uppercase tracking-[0.22em] text-[#111111] font-semibold hover:bg-[#DFC48C]"
              >
                Create Category
              </motion.button>
            </form>

            <div className="lg:col-span-7 border border-[#39332D] bg-[#161412] divide-y divide-[#39332D]/70">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-5 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-serif text-lg text-[#F4EFE5]">
                        {cat.name}
                      </h3>
                      <span
                        className={cn(
                          "px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] border",
                          cat.is_active
                            ? "border-emerald-500/40 text-emerald-300"
                            : "border-[#39332D] text-[#F4EFE5]/45"
                        )}
                      >
                        {cat.is_active ? "Active" : "Hidden"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#F4EFE5]/65">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleCategoryActive(cat.id)}
                      className="border border-[#39332D] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[#F4EFE5]/80 hover:border-[#C6A66B] hover:text-[#C6A66B]"
                    >
                      Toggle
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCategory(cat.id)}
                      aria-label="Delete category"
                      className="p-2 border border-[#39332D] text-[#F4EFE5]/80 hover:border-red-400 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESERVATIONS MANAGEMENT */}
        {activeTab === "reservations" && (
          <div className="border border-[#39332D] bg-[#161412] divide-y divide-[#39332D]/70">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-serif text-xl text-[#F4EFE5]">
                      {res.customer_name}
                    </h3>
                    <span
                      className={cn(
                        "px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] border",
                        res.status === "Confirmed"
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                          : res.status === "Rejected"
                          ? "border-red-500/40 bg-red-500/10 text-red-300"
                          : "border-[#C6A66B]/40 bg-[#C6A66B]/10 text-[#C6A66B]"
                      )}
                    >
                      {res.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#C6A66B]">
                    {res.booking_date} · {res.booking_time} · {res.guests}{" "}
                    Guests
                  </p>
                  <p className="text-xs text-[#F4EFE5]/65">
                    {res.email} · {res.phone}
                  </p>
                  {res.special_requests && (
                    <p className="text-xs text-[#F4EFE5]/75 pt-1">
                      Note: {res.special_requests}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <motion.button
                    type="button"
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => updateReservationStatus(res.id, "Confirmed")}
                    className="inline-flex items-center gap-1.5 border border-emerald-500/50 bg-emerald-500/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-emerald-300 hover:bg-emerald-500/25"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Confirm</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => updateReservationStatus(res.id, "Rejected")}
                    className="inline-flex items-center gap-1.5 border border-red-500/50 bg-red-500/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-red-300 hover:bg-red-500/25"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Reject</span>
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CUSTOMER MESSAGES */}
        {activeTab === "messages" && (
          <div className="border border-[#39332D] bg-[#161412] divide-y divide-[#39332D]/70">
            {messages.map((msg) => (
              <div key={msg.id} className="p-6 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg text-[#F4EFE5]">
                      {msg.subject || "Guest Inquiry"}
                    </h3>
                    <p className="text-xs text-[#C6A66B]">
                      From: {msg.name} ({msg.email})
                    </p>
                  </div>
                  <span className="text-xs text-[#F4EFE5]/50">
                    {msg.created_at}
                  </span>
                </div>
                <p className="text-sm text-[#F4EFE5]/75 leading-relaxed pt-1">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* OPENING HOURS & RESTAURANT SETTINGS */}
        {activeTab === "settings" && (
          <form
            onSubmit={handleSaveSettings}
            className="max-w-2xl border border-[#39332D] bg-[#161412] p-7 space-y-5"
          >
            <div className="border-b border-[#39332D] pb-3">
              <h2 className="font-serif text-2xl text-[#F4EFE5]">
                Restaurant Information & Opening Hours
              </h2>
            </div>

            {settingsSaved && (
              <div className="border border-[#C6A66B]/50 bg-[#C6A66B]/10 px-4 py-2.5 text-xs text-[#C6A66B]">
                Restaurant settings updated successfully.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/70 mb-1.5">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  value={settings.restaurant_name}
                  onChange={(e) =>
                    setSettings({ ...settings, restaurant_name: e.target.value })
                  }
                  className="w-full border border-[#39332D] bg-[#111111] px-3.5 py-2.5 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/70 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) =>
                    setSettings({ ...settings, phone: e.target.value })
                  }
                  className="w-full border border-[#39332D] bg-[#111111] px-3.5 py-2.5 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/70 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
                className="w-full border border-[#39332D] bg-[#111111] px-3.5 py-2.5 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/70 mb-1.5">
                Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
                className="w-full border border-[#39332D] bg-[#111111] px-3.5 py-2.5 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#F4EFE5]/70 mb-1.5">
                Opening Hours
              </label>
              <input
                type="text"
                value={settings.opening_hours}
                onChange={(e) =>
                  setSettings({ ...settings, opening_hours: e.target.value })
                }
                className="w-full border border-[#39332D] bg-[#111111] px-3.5 py-2.5 text-sm text-[#F4EFE5] focus:border-[#C6A66B] focus:outline-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="border border-[#C6A66B] bg-[#C6A66B] px-7 py-3 text-xs uppercase tracking-[0.22em] text-[#111111] font-semibold hover:bg-[#DFC48C]"
            >
              Save Settings
            </motion.button>
          </form>
        )}
      </main>
    </div>
  );
}