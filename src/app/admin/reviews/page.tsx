"use client";

import { useState } from "react";

export default function AdminReviewsPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<null | string>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    const payload = { title, author, rating, body };

    try {
      const res = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus(`Error: ${data?.error ?? res.statusText}`);
        return;
      }

      setStatus("Saved — review added.");
      setTitle("");
      setAuthor("");
      setRating(5);
      setBody("");
    } catch (err) {
      setStatus("Network error");
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold">Add Review</h1>
      <p className="mt-2 text-sm text-gray-600">Create a markdown review that appears on the PCS page.</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Author</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Rating (1-5)</label>
          <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} className="mt-1 w-24 rounded border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Review</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6} className="mt-1 w-full rounded border px-3 py-2" required />
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded bg-[var(--sandstone-navy)] px-4 py-2 text-white">Save review</button>
          {status ? <p className="text-sm text-gray-700">{status}</p> : null}
        </div>
      </form>
    </div>
  );
}
