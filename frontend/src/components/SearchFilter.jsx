// src/components/SearchFilter.jsx
import React, { useState } from "react";

export default function SearchFilter({ onSearch, categories = [], onCategoryChange }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
      <form onSubmit={submit} className="flex w-full sm:w-auto gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="px-3 py-2 border rounded w-full"
          placeholder="Search products..."
        />
        <button type="submit" className="bg-yellow-400 text-black px-4 rounded font-semibold">Search</button>
      </form>

      <select onChange={(e)=> onCategoryChange(e.target.value)} className="px-3 py-2 border rounded">
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
