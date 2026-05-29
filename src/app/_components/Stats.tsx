const stats = [
  ["10M+", "Authentications per month"],
  ["99.9%", "Uptime across all regions"],
  ["< 50ms", "Average token exchange"],
  ["0", "Data breaches, ever"],
] as const;

export default function Stats() {
  return (
    <section className="bg-black border-y border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {stats.map(([v, l]) => (
            <div key={l} className="text-center px-8 py-4">
              <div className="text-4xl sm:text-5xl font-black text-white mb-2">{v}</div>
              <div className="text-xs text-white/30 uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
