# Exclusive E-Commerce V2 🛍️

> A fully refactored, production-grade e-commerce web application built with Next.js, TypeScript, and a feature-sliced architecture.

Exclusive V2 is a complete rewrite of an earlier React + Vite e-commerce project, rebuilt from scratch with modern best practices: TypeScript throughout, Next.js App Router, Redux Toolkit for global state, and a scalable feature-sliced folder structure.

---

## ✨ Features

- **Product Browsing** — Flash sales, best sellers, new arrivals, and category filtering
- **Category Navigation** — Dynamic category listing and filtering
- **Product Search** — Searchable product catalog via custom `SearchBar` component
- **Shopping Cart** — Add, remove, and update cart items with persistent global state (Redux)
- **Checkout Flow** — Full checkout experience with credit card UI (`react-credit-cards-2`)
- **Authentication** — User login/signup with protected routes and session handling
- **Skeleton Loading** — Smooth loading states across all product listings
- **Responsive Design** — Mobile-first layout with hamburger menu and adaptive navigation
- **Toast Notifications** — User feedback via react-hot-toast and Sonner

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State Management | Redux Toolkit + React Redux |
| Data Fetching | TanStack React Query (v5) |
| Forms | React Hook Form |
| UI Components | Lucide React, react-credit-cards-2 |
| Loading States | react-loading-skeleton |
| Notifications | react-hot-toast, Sonner |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
git clone https://github.com/ZIADMOHAMED-A8/Exclusive-E-commerce-V2.git
cd Exclusive-E-commerce-V2
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
app/
├── _components/
│   ├── topBar.tsx          # Responsive navigation with auth & cart
│   ├── searchBar/          # Product search component
│   └── layoutWrapper.tsx   # Global layout wrapper
├── providers.tsx           # Redux + React Query providers
└── page.tsx                # Home page (flash sales, categories, new arrivals)

features/
├── auth/                   # Login, signup, session management
├── cart/                   # Cart state, actions, and UI
├── Products/               # Product listing and display
├── Categories/             # Category fetching and display
├── heroSection/            # Landing hero banner
└── utils/                  # Shared utilities (auth helpers, etc.)
```

---

## 🔄 V1 → V2 Migration Highlights

This project is a complete rewrite of [Exclusive V1](https://github.com/ZIADMOHAMED-A8/Exclusive-Ecommerce-website). Key improvements include:

| | V1 | V2 |
|---|---|---|
| Framework | React + Vite | Next.js (App Router) |
| Language | JavaScript | TypeScript |
| Architecture | Flat component structure | Feature-sliced design |
| State Management | Redux (basic) | Redux Toolkit |
| Data Fetching | Direct dispatches | TanStack React Query |
| Styling | Tailwind CSS v3 + heavy CSS | Tailwind CSS v4 (utility-first) |
| Routing | React Router DOM | Next.js file-based routing |

---

## 📄 License

This project is for educational purposes.
