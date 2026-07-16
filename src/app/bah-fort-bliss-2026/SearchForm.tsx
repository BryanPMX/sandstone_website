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
      router.push("/listings");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto flex w-full max-w-3xl items-center border border-white/20 bg-white/10 p-1 backdrop-blur-md"
    >
      <input
        type="text"
        placeholder="Enter ZIP code or neighborhood..."
        className="min-w-0 flex-1 bg-transparent px-6 py-4 font-light text-white placeholder-white/50 outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        type="submit"
        className="shrink-0 bg-[#c6a46a] px-10 py-4 text-sm font-light uppercase tracking-widest text-white transition hover:bg-[#b89458]"
      >
        Search
      </button>
    </form>
  );
}