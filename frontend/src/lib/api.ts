const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

const TOKEN_KEY = "velora_admin_token";

export function setAdminToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getAdminToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function clearAdminToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  requiresAuth = false
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (requiresAuth) {
    const token = getAdminToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.detail || `Request failed (${res.status})`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export const veloraApi = {
  // Auth
  login: async (username: string, password: string) => {
    const data = await apiRequest<{
      access_token: string;
      token_type: string;
      username: string;
      role: string;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setAdminToken(data.access_token);
    return data;
  },

  // Categories
  getCategories: () => apiRequest<any[]>("/categories/"),
  createCategory: (payload: any) =>
    apiRequest<any>("/categories/", { method: "POST", body: JSON.stringify(payload) }, true),
  deleteCategory: (id: number) =>
    apiRequest<void>(`/categories/${id}`, { method: "DELETE" }, true),

  // Menu
  getMenuItems: (params?: { category_id?: number; featured_only?: boolean; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.category_id) query.set("category_id", String(params.category_id));
    if (params?.featured_only) query.set("featured_only", "true");
    if (params?.search) query.set("search", params.search);
    const qs = query.toString() ? `?${query.toString()}` : "";
    return apiRequest<any[]>(`/menu/${qs}`);
  },
  createMenuItem: (payload: any) =>
    apiRequest<any>("/menu/", { method: "POST", body: JSON.stringify(payload) }, true),
  updateMenuItem: (id: number, payload: any) =>
    apiRequest<any>(`/menu/${id}`, { method: "PUT", body: JSON.stringify(payload) }, true),
  deleteMenuItem: (id: number) =>
    apiRequest<void>(`/menu/${id}`, { method: "DELETE" }, true),

  // Reservations
  createReservation: (payload: any) =>
    apiRequest<any>("/reservations/", { method: "POST", body: JSON.stringify(payload) }),
  getReservations: () => apiRequest<any[]>("/reservations/", {}, true),
  updateReservationStatus: (id: number, status: "Pending" | "Confirmed" | "Rejected") =>
    apiRequest<any>(
      `/reservations/${id}/status`,
      { method: "PATCH", body: JSON.stringify({ status }) },
      true
    ),

  // Contact
  sendContactMessage: (payload: any) =>
    apiRequest<any>("/contact/", { method: "POST", body: JSON.stringify(payload) }),
  getContactMessages: () => apiRequest<any[]>("/contact/", {}, true),

  // Settings
  getSettings: () => apiRequest<any>("/settings/"),
  updateSettings: (payload: any) =>
    apiRequest<any>("/settings/", { method: "PUT", body: JSON.stringify(payload) }, true),
};