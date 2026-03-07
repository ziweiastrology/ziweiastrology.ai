import { useQuery } from "@tanstack/react-query";

export function useMyMatches(limit = 3) {
  return useQuery({
    queryKey: ["my-matches", limit],
    queryFn: () => fetch(`/api/matches?limit=${limit}`).then((r) => r.json()),
    staleTime: 300_000,
  });
}
