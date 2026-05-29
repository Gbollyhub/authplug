import Image from "next/image";
import { CodeBracketIcon, KeyIcon, ShieldCheckIcon, UsersIcon } from "./icons";

const devFeatures = [
  { icon: CodeBracketIcon, title: "REST API", desc: "Standard HTTP — works with any language" },
  { icon: KeyIcon, title: "JWT tokens", desc: "Inspect and verify with any library" },
  { icon: ShieldCheckIcon, title: "Self-hosted", desc: "Your infra, your data, your rules" },
  { icon: UsersIcon, title: "Admin UI", desc: "Manage users, tenants, and tokens" },
];

export default function DeveloperSection() {
  return (
    <section className="bg-[#f5f5f5] py-24 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs text-black/40 uppercase tracking-[0.2em] mb-4">Developer experience</p>
          <h2 className="text-5xl font-black text-black tracking-tight leading-none mb-6">
            Built for developers<br />who own their stack.
          </h2>
          <p className="text-base text-black/50 mb-10 leading-relaxed">
            AuthPlug is a Next.js application you host. The API is REST, the tokens are standard JWTs, and the admin UI is included. No black boxes, no proprietary SDKs, no vendor lock-in.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {devFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-black/10 rounded-sm p-4">
                <div className="mb-2"><Icon className="w-4 h-4 text-black/60" /></div>
                <div className="text-sm font-bold text-black mb-0.5">{title}</div>
                <div className="text-xs text-black/40">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-sm">
          <Image
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
            alt="Developer working with code"
            width={800} height={560}
            className="w-full h-[460px] object-cover grayscale"
          />
        </div>
      </div>
    </section>
  );
}
