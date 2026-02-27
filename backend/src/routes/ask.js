// routes/ask.js
// POST /api/ask  — natural-language product search via AI

const { Router } = require("express");
const { askAI } = require("../lib/ai");
const { products } = require("../lib/products");

const router = Router();

// Simple in-memory cache: query → { productIds, summary }
const cache = new Map();
const CACHE_MAX = 100;

router.post("/", async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== "string" || !query.trim()) {
    return res.status(400).json({ error: "query is required and must be a non-empty string" });
  }

  const normalised = query.trim().toLowerCase();

  // Return cached result if available
  if (cache.has(normalised)) {
    const cached = cache.get(normalised);
    const matchedProducts = products.filter((p) =>
      cached.productIds.includes(p.id)
    );
    return res.json({ ...cached, products: matchedProducts, cached: true });
  }

  try {
    const aiResult = await askAI(query.trim());

    // Hydrate full product objects from validated IDs
    const matchedProducts = products.filter((p) =>
      aiResult.productIds.includes(p.id)
    );

    const payload = {
      productIds: aiResult.productIds,
      summary: aiResult.summary,
      products: matchedProducts,
      cached: false,
    };

    // Store in cache (evict oldest when full)
    if (cache.size >= CACHE_MAX) {
      cache.delete(cache.keys().next().value);
    }
    cache.set(normalised, {
      productIds: aiResult.productIds,
      summary: aiResult.summary,
    });

    res.json(payload);
  } catch (err) {
    // Distinguish between JSON parse failure and upstream error
    if (err instanceof SyntaxError) {
      return res.status(502).json({
        error: "AI returned an unparseable response. Please try again.",
      });
    }

    // Anthropic SDK errors (rate limit, auth, etc.)
    if (err?.status) {
      return res.status(503).json({
        error: "AI service is temporarily unavailable. Please try again.",
      });
    }

    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

module.exports = router;
