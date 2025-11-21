// src/components/Pagination.jsx
import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  const prev = () => setPage(Math.max(1, page - 1));
  const next = () => setPage(Math.min(totalPages, page + 1));

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button onClick={prev} className="px-3 py-1 bg-white border rounded">Prev</button>
      <div className="px-3 py-1 bg-gray-100 rounded">Page {page} / {totalPages}</div>
      <button onClick={next} className="px-3 py-1 bg-white border rounded">Next</button>
    </div>
  );
}
