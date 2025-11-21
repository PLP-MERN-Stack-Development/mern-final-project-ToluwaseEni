export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Center the content with max width */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
