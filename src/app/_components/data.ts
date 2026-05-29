export const features = [
  { title: "Enterprise-Grade Security", description: "bcrypt hashing, HTTP-only cookies, CSRF-safe refresh flows, and hashed refresh tokens stored in the database.", color: "bg-black" },
  { title: "JWT Token System", description: "Short-lived access tokens with long-lived refresh tokens. Automatic rotation and revocation to prevent replay attacks.", color: "bg-black" },
  { title: "OAuth-Style Flows", description: "Redirect-based login flows just like Auth0 or Okta. Third-party apps redirect users and receive secure tokens back.", color: "bg-black" },
  { title: "Multi-Tenant Architecture", description: "Users can belong to multiple customers with role-based access per tenant. Full isolation enforced at the database level.", color: "bg-black" },
  { title: "Redis Session Store", description: "Temporary auth sessions backed by Redis for lightning-fast token exchange. Sessions expire automatically with zero cleanup.", color: "bg-black" },
  { title: "Developer First", description: "Clean REST API, predictable token exchange flows, and a management dashboard. Integrate in minutes, not days.", color: "bg-black" },
];

export const steps = [
  { n: "01", title: "User is redirected", desc: "Your app redirects the user to AuthPlug's login page with your customer credentials and a return URL." },
  { n: "02", title: "Auth session created", desc: "After login, AuthPlug generates a short-lived auth_id in Redis and redirects the user back with it." },
  { n: "03", title: "Token exchange", desc: "Your backend calls /oauth/token with the auth_id and receives a signed JWT access token in return." },
  { n: "04", title: "Seamless access", desc: "Use the access token for all requests. When it expires, refresh silently via the HTTP-only cookie." },
];

export const testimonials = [
  { name: "Sarah Chen", role: "CTO, NovaPay", avatar: "https://i.pravatar.cc/100?img=47", quote: "AuthPlug cut our auth implementation time from 3 weeks to 2 days. The multi-tenant support is exactly what we needed for our SaaS platform." },
  { name: "Marcus Rivera", role: "Lead Engineer, Stackify", avatar: "https://i.pravatar.cc/100?img=12", quote: "Refresh token rotation and Redis-backed sessions give me confidence that our users' data is always protected. Rock solid." },
  { name: "Priya Nair", role: "Head of Platform, Launchly", avatar: "https://i.pravatar.cc/100?img=32", quote: "We needed OAuth-style SSO across 6 different products. AuthPlug handled it cleanly with one integration. Our team loves the admin dashboard." },
];

export const pricingTiers = [
  {
    name: "Starter", price: "Free", period: "", dark: false,
    description: "Perfect for side projects and early-stage startups.",
    features: ["Up to 1,000 monthly active users", "1 customer tenant", "JWT access & refresh tokens", "Email & password auth", "Community support"],
    cta: "Start for free", href: "/admin/register",
  },
  {
    name: "Pro", price: "$49", period: "/mo", dark: true,
    description: "For growing teams that need multi-tenancy and advanced auth.",
    features: ["Up to 50,000 monthly active users", "Unlimited customer tenants", "TOTP two-factor authentication", "Redis session management", "Role-based access control", "Priority email support"],
    cta: "Get started", href: "/admin/register",
  },
  {
    name: "Enterprise", price: "Custom", period: "", dark: false,
    description: "For large organisations with advanced compliance needs.",
    features: ["Unlimited monthly active users", "SLA-backed uptime guarantee", "Custom SSO integrations", "Audit logs & compliance reports", "Dedicated infrastructure", "24/7 dedicated support"],
    cta: "Talk to sales", href: "/admin/login",
  },
];

export const securityList = [
  "bcrypt password hashing with configurable cost factor",
  "HTTP-only Secure cookies — never exposed to JavaScript",
  "Refresh token rotation on every exchange",
  "Hashed refresh tokens stored in PostgreSQL",
  "Redis sessions with automatic TTL expiration",
  "Customer-level tenant isolation at the database layer",
  "CSRF-safe refresh flow design",
  "Protection against token replay attacks",
];

export const companies = ["Vercel", "Stripe", "Linear", "Notion", "Figma", "Loom", "Supabase", "Railway"];
