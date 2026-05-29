import { features } from "./data";
import { featureIcons } from "./icons";

export default function Features() {
  return (
    <section id="features" className="bg-white py-24 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 max-w-xl">
          <p className="text-xs text-black/40 uppercase tracking-[0.2em] mb-4">Features</p>
          <h2 className="text-5xl font-black text-black tracking-tight leading-none">
            Everything auth.<br />Nothing extra.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
          {features.map((f) => {
            const Icon = featureIcons[f.title];
            return (
              <div key={f.title} className="bg-white p-8 hover:bg-[#fafafa] transition-colors">
                <div className="w-10 h-10 bg-black rounded-sm flex items-center justify-center mb-5">
                  {Icon && <Icon className="w-5 h-5 text-white" />}
                </div>
                <h3 className="text-base font-bold text-black mb-2">{f.title}</h3>
                <p className="text-sm text-black/50 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
