# 🛍 AI Product Discovery

A full-stack AI-powered product discovery demo built with **React** (frontend) and **Node.js / Express** (backend), integrated with the **Anthropic Claude API** for natural-language product search.

---

## Overview

Users type a plain-language query like *"budget laptop for gaming"* and the backend sends that query — along with a compact product catalog — to Claude. The model returns a structured JSON payload containing the most relevant product IDs and a short summary. The frontend renders the results instantly.

---

## Architecture

```
┌─────────────────────────┐         ┌──────────────────────────────┐
│  React Frontend (3000)  │ ──────► │  Express Backend (3001)       │
│                         │         │                              │
│  AskForm                │  POST   │  /api/ask                    │
│  AISummary              │ /api/ask│    → askAI()                 │
│  ProductList            │         │    → Anthropic API           │
│  ProductCard            │  GET    │    → validate product IDs    │
│                         │ /api/   │    → in-memory cache         │
│                         │products │  /api/products               │
└─────────────────────────┘         └──────────────────────────────┘
```

**Key design decisions:**
- Frontend uses CRA's `proxy` field so API calls go to `/api/...` without CORS complexity in dev
- Product catalog lives in-memory (`backend/src/lib/products.js`) — trivially replaceable with a DB
- A simple `Map`-based LRU cache (max 100 entries) avoids redundant API calls for repeated queries
- All LLM errors are normalised to safe, user-friendly messages — raw Anthropic errors are never surfaced

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, TypeScript, CSS Modules |
| Backend | Node.js, Express 4 |
| AI | Anthropic SDK (`@anthropic-ai/sdk`) |
| Dev tooling | nodemon, concurrently |

---

## Project Structure

```
ai-product-discovery/
├── backend/
│   ├── src/
│   │   ├── index.js              # Express entry point
│   │   ├── lib/
│   │   │   ├── products.js       # In-memory product catalog
│   │   │   └── ai.js             # Anthropic SDK wrapper
│   │   ├── routes/
│   │   │   ├── products.js       # GET /api/products
│   │   │   └── ask.js            # POST /api/ask
│   │   └── middleware/
│   │       └── errorHandler.js   # Global error handler
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/index.html
│   ├── src/
│   │   ├── App.tsx               # Root component
│   │   ├── App.css               # Global styles
│   │   ├── index.tsx             # React entry point
│   │   ├── components/
│   │   │   ├── AskForm.tsx       # Query input + example chips
│   │   │   ├── AISummary.tsx     # AI recommendation banner
│   │   │   ├── ProductList.tsx   # Grid container
│   │   │   └── ProductCard.tsx   # Individual product card
│   │   ├── lib/
│   │   │   └── api.ts            # Typed API client
│   │   └── types/
│   │       └── product.ts        # Shared TypeScript interfaces
│   └── package.json
│
├── package.json                  # Root — runs both with concurrently
└── README.md
```

---

## Setup

### 1. Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com)

### 2. Install dependencies

```bash
# From root
npm run install:all
```

Or manually:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure environment

```bash
cd backend
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

```env
ANTHROPIC_API_KEY=sk-ant-...
PORT=3001
```

### 4. Run

```bash
# From root — starts both servers concurrently
npm run dev
```

Or separately:
```bash
npm run dev:backend   # http://localhost:3001
npm run dev:frontend  # http://localhost:3000
```

---

## API Reference

### `GET /api/products`

Returns the product catalog with optional filtering.

| Query param | Type | Description |
|-------------|------|-------------|
| `category` | string | Filter by category (e.g. `Laptops`) |
| `minPrice` | number | Minimum price |
| `maxPrice` | number | Maximum price |

**Response:**
```json
{ "products": [...], "total": 8 }
```

---

### `POST /api/ask`

Performs AI-powered natural-language product search.

**Request body:**
```json
{ "query": "budget laptop for students" }
```

**Response:**
```json
{
  "productIds": ["p2"],
  "summary": "The SwiftBook Air is ideal for students on a budget...",
  "products": [...],
  "cached": false
}
```

**Error responses:**

| Status | Cause |
|--------|-------|
| 400 | Missing or empty `query` |
| 502 | AI returned unparseable JSON |
| 503 | Anthropic API unavailable |
| 500 | Unexpected server error |

---

## Prompt Design

The system prompt sent to Claude:
1. Establishes role as a shopping assistant
2. Provides the compact product catalog (id, name, category, price, tags only — no descriptions, to reduce tokens)
3. Enforces strict JSON-only output with a defined schema (`{ productIds, summary }`)
4. Sets hard limits: 1–4 results, no markdown, no extra fields

The response is then:
- Parsed with `JSON.parse` (any failure → 502)
- Validated: returned `productIds` are filtered against the real catalog
- Cached in-memory keyed on the normalised query string

---

## Error Handling

| Scenario | Handling |
|----------|----------|
| Missing query | 400 + user-friendly message |
| AI returns bad JSON | 502 + "unparseable response" message |
| Anthropic rate limit / auth | 503 + "service unavailable" message |
| Unknown error | 500 + generic message |
| Invalid product IDs from AI | Silently filtered — only real IDs hydrated |

Raw SDK errors are never forwarded to clients.

---

## Possible Improvements

- **Embeddings + vector search** — embed product descriptions and run semantic similarity search for more accurate matching without burning LLM tokens every request
- **Retrieval-Augmented Generation (RAG)** — combine vector retrieval with LLM reranking for large catalogs
- **Redis caching** — replace the in-memory Map with Redis for multi-instance deployments
- **Streaming responses** — stream the AI summary token-by-token for faster perceived performance
- **Observability** — add structured logging (Pino), distributed tracing (OpenTelemetry), and LLM call metrics
- **Rate limiting** — add per-IP request limits to protect the AI endpoint
- **Product detail pages** — `/product/:id` routes with richer information and related suggestions
- **Faceted filtering UI** — combine AI search with manual category/price filters in the frontend

---

## Time Spent

_[Placeholder — fill in before submitting]_

Approx. 3–4 hours: architecture setup, API design, LLM integration, component structure, styling, error handling, README.
