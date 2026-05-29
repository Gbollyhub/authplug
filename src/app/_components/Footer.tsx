import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const footerLinks = [
  { title: "Product", links: ["Features", "Security", "Pricing", "Changelog"] },
  { title: "Developers", links: ["Documentation", "API Reference", "SDKs", "Examples"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4"><Logo size={24} inverted /></Link>
            <p className="text-sm text-white/30 leading-relaxed max-w-xs">
              A self-hosted, multi-tenant authentication platform for SaaS and third-party applications.
            </p>
          </div>
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs text-white/30 uppercase tracking-[0.2em] mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">© 2026 AuthPlug. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <a key={l} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
