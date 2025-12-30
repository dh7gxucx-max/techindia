import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type Product } from "@shared/routes";

// GET /api/products
export function useProducts(filters?: {
  category?: string;
  brand?: string;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}) {
  return useQuery({
    queryKey: [api.products.list.path, filters],
    queryFn: async () => {
      const url = buildUrl(api.products.list.path);
      const searchParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) searchParams.append(key, value);
        });
      }
      
      const res = await fetch(`${url}?${searchParams.toString()}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/products/:id
export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      return api.products.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// POST /api/products/seed (Dev utility)
export function useSeedProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.products.seed.path, {
        method: api.products.seed.method,
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to seed products");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.products.list.path] });
    }
  });
}
