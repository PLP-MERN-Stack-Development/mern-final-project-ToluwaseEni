export default function About() {
  return (
    <div className="py-14 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-green-900 mb-6">
        About <span className="text-yellow-500">NovaAfriq</span>
      </h1>

      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        NovaAfriq is a premium African fashion brand dedicated to celebrating
        culture, creativity, and modern elegance. Our designs are inspired by
        rich African heritage and crafted with a contemporary twist, blending
        traditional patterns with modern styles for the global stage.
      </p>

      <div className="bg-green-900 text-white p-6 rounded-xl shadow-md border-l-8 border-yellow-500">
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="leading-relaxed">
          To elevate African fashion to the world by empowering designers,
          inspiring confidence, and delivering timeless pieces that showcase the
          beauty and power of the African spirit.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-green-900 mb-3">
          What We Stand For
        </h2>
        <ul className="space-y-3 text-gray-700 text-lg">
          <li>✨ Authentic African craftsmanship</li>
          <li>✨ Modern, elegant, and wearable designs</li>
          <li>✨ Empowering local designers and artisans</li>
          <li>✨ Quality, durability, and sustainability</li>
        </ul>
      </div>
    </div>
  );
}
