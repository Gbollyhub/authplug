import Link from "next/link";
import { pricingTiers } from "./data";
import { CheckIcon } from "./icons";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#f5f5f5] py-24 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 max-w-xl">
          <p className="text-xs text-black/40 uppercase tracking-[0.2em] mb-4">Pricing</p>
          <h2 className="text-5xl font-black text-black tracking-tight leading-none">
            Simple,<br />honest pricing
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className={`rounded-sm p-8 flex flex-col relative ${tier.dark ? "bg-black text-white" : "bg-white border border-black/10"}`}>
              {tier.dark && (
                <div className="absolute top-0 left-8 -translate-y-1/2 bg-white text-black text-xs font-black uppercase tracking-widest px-3 py-1 rounded-sm">
                  Popular
                </div>
              )}
              <div className={`text-xs font-bold uppercase tracking-[0.2em] mb-3 ${tier.dark ? "text-white/40" : "text-black/40"}`}>{tier.name}</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-5xl font-black ${tier.dark ? "text-white" : "text-black"}`}>{tier.price}</span>
                {tier.period && <span className={`text-sm ${tier.dark ? "text-white/40" : "text-black/40"}`}>{tier.period}</span>}
              </div>
              <p className={`text-sm mb-8 ${tier.dark ? "text-white/40" : "text-black/40"}`}>{tier.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-4 h-4 rounded-sm flex items-center justify-center mt-0.5 ${tier.dark ? "bg-white" : "bg-black"}`}>
                      <CheckIcon className={`w-2.5 h-2.5 ${tier.dark ? "text-black" : "text-white"}`} />
                    </span>
                    <span className={`text-sm ${tier.dark ? "text-white/60" : "text-black/60"}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={tier.href} className={`text-center py-2.5 rounded-sm font-bold text-sm transition-colors ${tier.dark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/80"}`}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
