# 🔐 AuthPlug

AuthPlug is a modern, secure, **multi-tenant authentication and authorization platform** designed for SaaS and third-party applications. It provides centralized identity management, OAuth-style login flows, customer-based access control, and industry-standard token handling.

AuthPlug enables users to authenticate once and securely access multiple applications while maintaining strict isolation between customers, roles, and sessions.

---

## ✨ Features

### 🔑 Authentication
- Email & password authentication
- Secure password hashing with bcrypt
- Centralized user identity across apps

### 🧩 Multi-Tenant Authorization
- Users can belong to multiple customers
- Role-based access per customer
- Automatic user–customer linking

### 🔁 Token System
- Short-lived **Access Tokens (JWT)**
- Long-lived **Refresh Tokens**
- Refresh token rotation & revocation
- Indexed tokens for fast validation

### 🧠 Session Management
- Redis-backed temporary `auth_id` sessions
- Secure token exchange after redirect
- Stateless access token verification

### 🌐 OAuth-Style Login Flow
- Login via **AuthPlug Client**
- Token exchange via **AuthPlug API**
- Designed for third-party integrations

### 🔒 Security Best Practices
- HTTP-only, Secure cookies
- CSRF-safe refresh flow
- Hashed refresh tokens in database
- Protection against token replay attacks

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **Prisma ORM**
- **PostgreSQL**
- **Redis**
- **JWT**
- **bcrypt**

---

## 🔐 Authentication Flow

### 1️⃣ User Login
User is redirected from a third-party app to AuthPlug login.

### 2️⃣ Auth Session Creation
AuthPlug generates a short-lived `auth_id` stored in Redis.

### 3️⃣ Redirect Back
User is redirected back to the third-party app with the `auth_id`.

### 4️⃣ Token Exchange
The app sends `auth_id` to AuthPlug API.

AuthPlug:
- Issues an **access token**
- Sets a **refresh token** in an HTTP-only cookie

---

## 🔁 Refresh Token Flow

- Access tokens are short-lived
- Refresh tokens are stored securely as cookies
- On expiration:
  - Client calls `/oauth/refresh`
  - Cookie is automatically sent
  - New access token is issued
  - Refresh token may be rotated

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Start dev server
npm run dev
```

---

## 🔒 Security Considerations

- Refresh tokens are **never exposed to JavaScript**
- Tokens are rotated to prevent replay attacks
- Redis auth sessions expire automatically
- Customer isolation enforced at DB level

---


## 🤝 Contributing

Contributions are welcome.  
Please open an issue or submit a pull request.