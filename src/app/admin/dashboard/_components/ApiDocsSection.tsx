"use client";

import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative group rounded-xl overflow-hidden border border-neutral-200 bg-neutral-900">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-800 border-b border-neutral-700">
        <span className="text-xs text-neutral-400 font-mono">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          {copied ? <CheckIcon className="w-3.5 h-3.5 text-success-400" /> : <ClipboardDocumentIcon className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-sm text-neutral-100 font-mono overflow-x-auto whitespace-pre">{code}</pre>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-neutral-700">{title}</h3>
      {children}
    </div>
  );
}

export default function ApiDocsSection({ customerId }: { customerId: string }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-neutral-800">API Documentation</h2>
        <p className="text-sm text-neutral-400 mt-1">
          Everything you need to integrate AuthPlug into your application.
        </p>
      </div>

      <Section title="1. Add your redirect URL">
        <p className="text-sm text-neutral-500">
          Before going live, add your app&apos;s callback URL in the <strong>Redirect URLs</strong> section.
          Only registered origins are permitted.
        </p>
      </Section>

      <Section title="2. Redirect users to AuthPlug">
        <p className="text-sm text-neutral-500">
          Link or redirect your users to AuthPlug&apos;s login or register page with your Company ID and
          the URL they should be sent back to after authentication.
        </p>
        <CodeBlock
          language="url"
          code={`# Register a new user
https://authplug.com/register?customerId=${customerId}&redirectUrl=https://yourapp.com/callback

# Log in an existing user
https://authplug.com/login?customerId=${customerId}&redirectUrl=https://yourapp.com/callback`}
        />
      </Section>

      <Section title="3. Handle the callback">
        <p className="text-sm text-neutral-500">
          After authentication, the user is redirected to your URL with an <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-mono">authId</code> query
          parameter. Extract it and exchange it for a JWT on your backend.
        </p>
        <CodeBlock
          language="javascript"
          code={`// In your callback handler (e.g. /callback)
const authId = new URL(window.location.href).searchParams.get("authId");

// Send authId to your backend for the token exchange`}
        />
      </Section>

      <Section title="4. Exchange authId for a JWT (backend)">
        <p className="text-sm text-neutral-500">
          Make a server-side POST request to exchange the <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-mono">authId</code> for a signed JWT.
          The <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-mono">authId</code> is single-use and expires after 5 minutes.
        </p>
        <CodeBlock
          language="typescript"
          code={`const response = await fetch("https://authplug.com/api/auth/token", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    customerId: "${customerId}",
    authId: authId, // from step 3
  }),
});

const { token, user } = await response.json();
// token — signed JWT (15 min expiry)
// user  — { id, email, customerId, role }`}
        />
      </Section>

      <Section title="5. Authenticate requests with the JWT">
        <p className="text-sm text-neutral-500">
          Include the JWT as a Bearer token in the <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-mono">Authorization</code> header
          for all authenticated API requests.
        </p>
        <CodeBlock
          language="http"
          code={`GET /api/your-protected-endpoint HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
        />
      </Section>

      <Section title="6. Refresh the JWT">
        <p className="text-sm text-neutral-500">
          JWTs expire after 15 minutes. Use the refresh token (stored as an httpOnly cookie by AuthPlug)
          to get a new JWT without re-authenticating the user.
        </p>
        <CodeBlock
          language="typescript"
          code={`const response = await fetch("https://authplug.com/api/auth/refresh-token", {
  method: "POST",
  credentials: "include", // sends the refreshToken cookie automatically
});

const { token, user } = await response.json();
// use the new token going forward`}
        />
      </Section>

      <Section title="7. Log out">
        <p className="text-sm text-neutral-500">
          Call the logout endpoint to revoke the refresh token and clear the cookie.
        </p>
        <CodeBlock
          language="typescript"
          code={`await fetch("https://authplug.com/api/auth/logout", {
  method: "POST",
  credentials: "include",
});`}
        />
      </Section>

      <div className="p-4 bg-brand-50 border border-brand-100 rounded-xl text-sm text-brand-700">
        <strong>Your Company ID:</strong>{" "}
        <code className="font-mono text-brand-800">{customerId}</code>
      </div>
    </div>
  );
}
