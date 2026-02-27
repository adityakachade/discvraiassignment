// lib/products.js
// In-memory product catalog — swap with DB in production

const products = [
  {
    id: "p1",
    name: "NovaBlade 15 Pro",
    category: "Laptops",
    price: 1899,
    description:
      "Flagship 15\" OLED laptop with dedicated GPU, 32GB RAM, and 1TB NVMe SSD. Built for creators and gamers who demand the best.",
    tags: ["gaming", "creator", "premium", "OLED", "high-performance"],
  },
  {
    id: "p2",
    name: "SwiftBook Air",
    category: "Laptops",
    price: 649,
    description:
      "Ultra-light 13\" everyday laptop with 12-hour battery life, fast SSD storage, and a vibrant display.",
    tags: ["budget", "portable", "lightweight", "everyday", "student"],
  },
  {
    id: "p3",
    name: "CoreBook Studio",
    category: "Laptops",
    price: 1199,
    description:
      "Mid-range 14\" workstation with anti-glare screen, excellent keyboard, and robust build quality.",
    tags: ["mid-range", "work", "productivity", "reliable"],
  },
  {
    id: "p4",
    name: "Apex S24 Ultra",
    category: "Smartphones",
    price: 1099,
    description:
      "Top-tier Android flagship with a 200MP camera system, titanium build, and all-day battery performance.",
    tags: ["premium", "camera", "flagship", "android", "5G"],
  },
  {
    id: "p5",
    name: "Moto Clarity 5G",
    category: "Smartphones",
    price: 299,
    description:
      "Affordable 5G smartphone with clean software, two-day battery life, and a crisp 90Hz display.",
    tags: ["budget", "5G", "battery", "everyday", "android"],
  },
  {
    id: "p6",
    name: "SonicArc Pro",
    category: "Headphones",
    price: 379,
    description:
      "Over-ear ANC headphones with audiophile-grade 40mm drivers, 30-hour playtime, and multi-device pairing.",
    tags: ["noise-cancelling", "premium", "wireless", "music", "ANC"],
  },
  {
    id: "p7",
    name: "BudBeat True",
    category: "Headphones",
    price: 89,
    description:
      "Compact true-wireless earbuds with punchy bass, IPX5 sweat resistance — perfect for gym sessions.",
    tags: ["budget", "earbuds", "wireless", "sports", "gym"],
  },
  {
    id: "p8",
    name: "ChargePad Trio",
    category: "Accessories",
    price: 59,
    description:
      "3-in-1 wireless charging pad for phone, earbuds, and smartwatch simultaneously. Declutter your desk.",
    tags: ["charging", "wireless", "accessory", "desk", "multi-device"],
  },
];

module.exports = { products };
