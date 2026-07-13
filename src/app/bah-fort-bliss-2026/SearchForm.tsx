"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/listings?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/listings`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mt-12 flex w-full max-w-lg items-center bg-white/10 backdrop-blur-md p-1 border border-white/20">
      <input 
        type="text" 
        placeholder="Enter ZIP code or neighborhood..." 
        className="flex-1 bg-transparent px-6 py-4 text-white placeholder-white/50 outline-none font-light" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button 
        type="submit"
        className="bg-[#c6a46a] px-8 py-4 text-sm font-light uppercase tracking-widest text-white transition hover:bg-[#b89458]"
      >
        Search
      </button>
    </form>
  );
}
