// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  // Your Render backend domain
  const BASE_URL = "https://mern-final-project-toluwaseeni-1.onrender.com";

  // Normalize and fix image path
  let imgSrc = "";

  if (product.image) {
    let img = product.image.replace(/\\/g, "/").replace(/^\//, "");

    if (img.startsWith("http")) {
      imgSrc = img;
    } else {
      imgSrc = `${BASE_URL}/${img}`;
    }
  }

  return (
    <article className="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition h-full">
      
      <Link to={`/product/${product._id}`} className="flex-1 flex flex-col">
        
        {/* Image Wrapper - fixed aspect ratio */}
        <div className="w-full aspect-[4/5] bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-center text-sm">No Image</div>
          )}
        </div>

        <h3 className="text-lg font-semibold mt-3 text-brandBlack">
          {product.name}
        </h3>

        <p className="text-yellow-600 font-bold mt-1">
          ₦{product.price}
        </p>
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
