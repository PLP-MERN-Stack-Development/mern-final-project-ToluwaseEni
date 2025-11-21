export default function Contact() {
  return (
    <div className="py-14 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-green-900 mb-6">
        Contact <span className="text-yellow-500">NovaAfriq</span>
      </h1>

      <p className="text-gray-700 text-lg mb-8 leading-relaxed">
        We'd love to hear from you. Whether you’re a customer, designer, or
        partner, our team is here to support you.
      </p>

      <div className="bg-white p-8 rounded-xl shadow-md border border-green-200">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">
          Get In Touch
        </h2>

        <ul className="space-y-4 text-gray-800 text-lg">
          <li>
            📧 <strong>Email:</strong>{" "}
            <a href="mailto:support@novaafriq.com" className="text-yellow-600 hover:underline">
              support@novaafriq.com
            </a>
          </li>

          <li>
            📞 <strong>Phone:</strong>{" "}
            <span className="text-green-900">+123 456 7890</span>
          </li>

          <li>
            📍 <strong>Address:</strong> Lagos, Nigeria (HQ)
          </li>
        </ul>
      </div>

      <div className="mt-10 flex gap-6">
        <a
          href="#"
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
        >
          WhatsApp Us
        </a>
        <a
          href="#"
          className="bg-green-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Send Message
        </a>
      </div>
    </div>
  );
}
