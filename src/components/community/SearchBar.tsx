"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => onSearch(value), 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-600" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search posts..."
        className="w-full rounded-md border border-gold-700/20 bg-celestial-900/40 py-2 pl-9 pr-4 text-sm text-parchment-200 placeholder:text-parchment-700 focus:border-gold-500/50 focus:outline-none"
      />
    </div>
  );
}
