import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";
import { ArrowRightIcon, CheckIcon, UsersIcon, BoltIcon } from "./icons";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black flex items-center pt-14 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-sm px-3 py-1 text-xs text-white/50 uppercase tracking-widest mb-8">
            Now with TOTP 2FA
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-6">
            Auth,<br />solved.
          </h1>
          <p className="text-base text-white/50 leading-relaxed mb-10 max-w-md">
            A self-hosted, multi-tenant authentication platform. OAuth-style login flows, JWT tokens, and a full admin dashboard — without handing your users&apos; data to anyone else.
          </p>
          <div className="flex flex-wrap gap-3 mb-16">
            <Link href="/admin/register" className="inline-flex items-center gap-2 bg-white text-black font-bold text-sm px-6 py-3 rounded-sm hover:bg-white/90 transition-colors">
              Start for free <ArrowRightIcon />
            </Link>
            <a href="#how-it-works" className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-sm hover:border-white/50 transition-colors">
              See how it works
            </a>
          </div>
          <div className="flex gap-10 border-t border-white/10 pt-8">
            {[["99.9%", "Uptime SLA"], ["< 50ms", "Token exchange"], ["SOC 2", "Ready design"]].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl font-black text-white">{v}</div>
                <div className="text-xs text-white/40 mt-0.5 uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Login card mockup */}
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="absolute -left-8 top-8 bg-white border border-black/10 rounded-sm px-4 py-3 shadow-lg flex items-center gap-3 z-10">
            <div className="w-7 h-7 bg-black rounded-sm flex items-center justify-center">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs text-black/40">Token issued</div>
              <div className="text-sm font-semibold text-black font-mono">eyJhbGciOi...</div>
            </div>
          </div>
          <div className="absolute -right-6 bottom-20 bg-white border border-black/10 rounded-sm px-4 py-3 shadow-lg flex items-center gap-3 z-10">
            <div className="w-7 h-7 bg-black rounded-sm flex items-center justify-center">
              <UsersIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs text-black/40">Multi-tenant</div>
              <div className="text-sm font-semibold text-black">3 customers active</div>
            </div>
          </div>
          <div className="absolute left-4 -bottom-4 bg-white border border-black/10 rounded-sm px-4 py-3 shadow-lg flex items-center gap-3 z-10">
            <div className="w-7 h-7 bg-black rounded-sm flex items-center justify-center">
              <BoltIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs text-black/40">Redis session</div>
              <div className="text-sm font-semibold text-black">Expires in 5m</div>
            </div>
          </div>

          <div className="w-[360px] bg-white rounded-sm shadow-2xl overflow-hidden border border-black/10">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f0f0f0] border-b border-black/10">
              <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
              <div className="flex-1 mx-4 bg-white border border-black/10 rounded-sm px-3 py-0.5 text-xs text-black/40">
                auth.yourapp.com/login
              </div>
            </div>
            <div className="p-7">
              <div className="flex items-center gap-2 mb-5">
                <LogoMark size={22} />
                <span className="font-bold text-black text-sm">AuthPlug</span>
              </div>
              <h2 className="text-xl font-black text-black mb-1 tracking-tight">Welcome back</h2>
              <p className="text-sm text-black/40 mb-6">Sign in to continue to Acme Corp</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-black/50 block mb-1 font-medium uppercase tracking-wider">Email</label>
                  <div className="border border-black/15 rounded-sm px-3 py-2.5 text-sm text-black/70">sarah@acmecorp.com</div>
                </div>
                <div>
                  <label className="text-xs text-black/50 block mb-1 font-medium uppercase tracking-wider">Password</label>
                  <div className="border border-black/15 rounded-sm px-3 py-2.5 text-sm text-black/30">••••••••••••</div>
                </div>
                <div className="bg-black rounded-sm py-2.5 text-center text-sm font-bold text-white">Continue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
