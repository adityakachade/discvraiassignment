// lib/api.ts
// Typed API client — all backend calls go through here

import { AskResponse, ProductsResponse } from "../types/product";

const BASE = "https://discvraiassignment.onrender.com/api";

export async function fetchProducts(params?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<ProductsResponse> {
  const url = new URL(`${BASE}/products`, window.location.origin);
  if (params?.category) url.searchParams.set("category", params.category);
  if (params?.minPrice !== undefined)
    url.searchParams.set("minPrice", String(params.minPrice));
  if (params?.maxPrice !== undefined)
    url.searchParams.set("maxPrice", String(params.maxPrice));

  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Failed to fetch products (${res.status})`);
  }
  return res.json();
}

export async function askAI(query: string): Promise<AskResponse> {
  const res = await fetch(`${BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }

  return res.json();
}
