// routes/products.js
// GET /api/products  — returns catalog with optional filtering

const { Router } = require("express");
const { products } = require("../lib/products");

const router = Router();

router.get("/", (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  const min = minPrice !== undefined ? parseFloat(minPrice) : null;
  const max = maxPrice !== undefined ? parseFloat(maxPrice) : null;

  if (minPrice !== undefined && isNaN(min)) {
    return res.status(400).json({ error: "minPrice must be a number" });
  }
  if (maxPrice !== undefined && isNaN(max)) {
    return res.status(400).json({ error: "maxPrice must be a number" });
  }

  let result = products;

  if (category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }
  if (min !== null) {
    result = result.filter((p) => p.price >= min);
  }
  if (max !== null) {
    result = result.filter((p) => p.price <= max);
  }

  res.json({ products: result, total: result.length });
});

module.exports = router;
