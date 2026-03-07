export default function DashboardLoading() {
  return (
    <section className="celestial-bg min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <div className="h-8 w-64 animate-pulse rounded bg-celestial-700/50" />
          <div className="mt-2 h-4 w-40 animate-pulse rounded bg-celestial-700/30" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl border border-gold-700/20 bg-celestial-800/30"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
