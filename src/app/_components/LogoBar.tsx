import { companies } from "./data";

export default function LogoBar() {
  return (
    <section className="bg-[#f5f5f5] border-y border-black/10 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-xs text-black/30 mb-7 uppercase tracking-[0.2em]">
          Trusted by engineering teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-5">
          {companies.map((c) => (
            <span key={c} className="text-black/25 font-bold text-base uppercase tracking-wider select-none hover:text-black/50 transition-colors">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
