// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  // Normalize image URL
  const imgSrc = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000/${product.image.replace(/\\/g, "/").replace(/^\//, "")}`
    : "";

  return (
    <article className="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition">
      <Link to={`/product/${product._id}`} className="flex-1">
        <div className="w-full h-48 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-center">No Image</div>
          )}
        </div>
        <h3 className="text-lg font-semibold mt-2 text-brandBlack">{product.name}</h3>
        <p className="text-yellow-600 font-bold mt-1">₦{product.price}</p>
      </Link>

      {onAdd && (
        <button
          onClick={() => onAdd(product)}
          className="mt-3 w-full bg-brandGreen text-white py-2 rounded-md hover:bg-green-800 transition"
        >
          Add to Cart
        </button>
      )}
    </article>
  );
}
