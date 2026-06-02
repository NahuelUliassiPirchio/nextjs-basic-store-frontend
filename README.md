# Basic Store — Frontend

> E-commerce web app with product browsing, cart management, and a live bidding system.

## 📖 About

Basic Store is the frontend of my first public web application — a fullstack e-commerce platform built to apply and consolidate knowledge in modern web development. Users can browse products by category or brand, filter by price range, manage a shopping cart, place orders, and participate in real-time product auctions. The frontend is built with Next.js and connects to a RESTful NestJS API deployed on Azure.

## ✨ Features

- Browse and search products with price-range and category filters
- Product detail page with image zoom and related products
- Bid on products with a live countdown timer
- Shopping cart with quantity selection, powered by Zustand
- User authentication — login, sign-up, and profile management
- Order history per user
- Brand-specific product pages

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 / React 18 |
| Language | JavaScript |
| Styling | CSS Modules |
| State | Zustand |
| UI Components | Radix UI Slider |
| Date Handling | Day.js |
| Auth | Cookie-based JWT (js-cookie) |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 24 or higher

### Installation

```bash
git clone https://github.com/NahuelUliassiPirchio/nextjs-basic-store-frontend.git
cd nextjs-basic-store-frontend
npm install
```

Copy the example environment file and fill in your values:

```bash
cp example.env .env.local
```

---

## ⚙️ Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STORE_API_URL` | Base URL of the Basic Store REST API | ✅ |
| `ABOUT_URL` | URL to the project's about/portfolio page | No |

---

## 📁 Project Structure

```
├── pages/                # Next.js Pages Router
│   ├── index.js          # Home — product listing
│   ├── products/[id].js  # Product detail
│   ├── bids/             # Bids listing and detail
│   ├── brands/[id].js    # Brand-specific products
│   ├── orders.js         # User orders
│   ├── profile.js        # User profile
│   ├── login.js
│   └── signup.js
├── components/           # Reusable UI components
├── store/                # Zustand stores
├── hooks/                # Custom React hooks
├── utils/                # Helper functions
├── common/               # Shared constants and config
└── styles/               # Global styles
```

---

## 🖥 Usage

**Development**
```bash
npm run dev
```

**Production build**
```bash
npm run build
npm run start
```

**Lint**
```bash
npm run lint
```

---

## 🌐 Live Demo

- **Frontend:** [nextjs-basic-store-frontend.vercel.app](https://nextjs-basic-store-frontend.vercel.app)
- **API Docs:** [Basic Store Swagger](https://bsc-store-f4gyb8eqh4cvc9fb.brazilsouth-01.azurewebsites.net/basic-store/docs)

---

## 👤 Author

**Nahuel Uliassi Pirchio**

- 🌐 [uliassipirchio.com](https://uliassipirchio.com)
- 💼 [LinkedIn](https://linkedin.com/in/uliassipirchio)
- 🐙 [GitHub](https://github.com/NahuelUliassiPirchio)
