// src/index.js
// Express server entry point

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const productsRouter = require("./routes/products");
const askRouter = require("./routes/ask");

const PORT = process.env.PORT || 3001;

// Mock AI - no API key needed

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/ask", askRouter);

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// 404 catch-all
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ API server running → http://localhost:${PORT}`);
});
