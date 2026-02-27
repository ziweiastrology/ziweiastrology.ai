"use client";

import { useQuery } from "@tanstack/react-query";

interface ResourceItem {
  id: string;
  title: string;
  slug: string;
  type: "PDF" | "ARTICLE" | "DATASET" | "CASE_STUDY";
  category: string;
  excerpt: string | null;
  fileUrl: string | null;
  createdAt: string;
}

interface ResourcesResponse {
  resources: ResourceItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface UseResourcesParams {
  type?: string;
  category?: string;
  page?: number;
  search?: string;
}

export function useResources({
  type = "",
  category = "",
  page = 1,
  search = "",
}: UseResourcesParams = {}) {
  return useQuery<ResourcesResponse>({
    queryKey: ["resources", { type, category, page, search }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (type) params.set("type", type);
      if (category) params.set("category", category);
      if (search) params.set("search", search);
      params.set("page", String(page));

      const res = await fetch(`/api/resources?${params}`);
      if (!res.ok) throw new Error("Failed to fetch resources");
      return res.json();
    },
  });
}

export function useResource(slug: string) {
  return useQuery({
    queryKey: ["resource", slug],
    queryFn: async () => {
      const res = await fetch(`/api/resources/${slug}`);
      if (!res.ok) throw new Error("Resource not found");
      return res.json();
    },
    enabled: !!slug,
  });
}
