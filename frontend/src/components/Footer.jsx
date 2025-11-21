import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">NovaAfriq</h2>
          <p className="mt-3 text-gray-200">
            Fashion that celebrates African excellence and modern elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/about" className="hover:text-green-500">About</a></li>
            <li><a href="/contact" className="hover:text-green-500">Contact</a></li>
            <li><a href="/designer/dashboard" className="hover:text-white">Designer Dashboard</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-yellow-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-300"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-300"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-green-700 py-4 text-center text-sm text-gray-200">
        © NovaAfriq 2025 — All Rights Reserved
      </div>
    </footer>
  );
}
