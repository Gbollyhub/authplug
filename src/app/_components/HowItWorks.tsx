import { steps } from "./data";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 max-w-xl">
          <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-4">The flow</p>
          <h2 className="text-5xl font-black text-white tracking-tight leading-none">
            How AuthPlug<br />works
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-px bg-white/10 mb-16">
          {steps.map((s, i) => (
            <div key={s.n} className="bg-black p-8">
              <div className={`text-4xl font-black mb-6 ${i % 2 === 0 ? "text-white" : "text-white/20"}`}>{s.n}</div>
              <h3 className="text-base font-bold text-white mb-3">{s.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#111] border border-white/10 rounded-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="text-white/30 text-xs ml-2 font-mono">auth-flow.js</span>
          </div>
          <pre className="p-6 text-sm font-mono text-white/60 leading-relaxed overflow-x-auto">
{`// 1. Redirect user to AuthPlug
window.location.href = \`https://auth.yourapp.com/login?
  customer_id=\${CUSTOMER_ID}&
  redirect_uri=\${encodeURIComponent(CALLBACK_URL)}\`;

// 2. Exchange auth_id for tokens on callback
const { auth_id } = new URLSearchParams(window.location.search);

const { access_token } = await fetch('/oauth/token', {
  method: 'POST',
  body: JSON.stringify({ auth_id }),
  credentials: 'include',
}).then(r => r.json());

// 3. Call your API with the signed JWT
const user = await fetch('/api/me', {
  headers: { Authorization: \`Bearer \${access_token}\` }
}).then(r => r.json());`}
          </pre>
        </div>
      </div>
    </section>
  );
}
