// lib/ai.js
// Mock AI responses for testing

const { products } = require("./products");

/**
 * Ask AI to match products to a user query.
 * @param {string} query
 * @returns {{ productIds: string[], summary: string }}
 */
async function askAI(query) {
  console.log("🔍 Processing query:", query);
  
  // Simple keyword-based matching for demo
  const lowercaseQuery = query.toLowerCase();
  
  let matchedProducts = [];
  let summary = "";
  
  if (lowercaseQuery.includes("budget") || lowercaseQuery.includes("cheap")) {
    if (lowercaseQuery.includes("laptop")) {
      matchedProducts = ["p2"]; // SwiftBook Air
      summary = "The SwiftBook Air is perfect for budget-conscious users who need a reliable everyday laptop with excellent battery life.";
    } else if (lowercaseQuery.includes("phone") || lowercaseQuery.includes("smartphone")) {
      matchedProducts = ["p5"]; // Moto Clarity 5G
      summary = "The Moto Clarity 5G offers great value with 5G connectivity and solid performance at an affordable price.";
    }
  } else if (lowercaseQuery.includes("gaming") || lowercaseQuery.includes("performance")) {
    if (lowercaseQuery.includes("laptop")) {
      matchedProducts = ["p1"]; // Nova Blade 15 Pro
      summary = "The Nova Blade 15 Pro is a powerhouse gaming laptop with dedicated graphics and high-refresh display for serious gamers.";
    }
  } else if (lowercaseQuery.includes("premium") || lowercaseQuery.includes("high-end")) {
    if (lowercaseQuery.includes("laptop")) {
      matchedProducts = ["p1"]; // Nova Blade 15 Pro
      summary = "For premium users who want the best, the Nova Blade 15 Pro delivers top-tier performance with OLED display.";
    } else if (lowercaseQuery.includes("phone") || lowercaseQuery.includes("smartphone")) {
      matchedProducts = ["p4"]; // Apex S24 Ultra
      summary = "The Apex S24 Ultra is the ultimate flagship smartphone with exceptional camera quality and premium build.";
    }
  } else if (lowercaseQuery.includes("headphone") || lowercaseQuery.includes("audio")) {
    if (lowercaseQuery.includes("noise") || lowercaseQuery.includes("anc")) {
      matchedProducts = ["p6"]; // SonicArc Pro
      summary = "The SonicArc Pro provides premium noise cancellation and audiophile-grade sound for immersive listening.";
    } else if (lowercaseQuery.includes("budget") || lowercaseQuery.includes("cheap")) {
      matchedProducts = ["p7"]; // BudBeat True
      summary = "The BudBeat True earbuds offer great sound quality and wireless convenience at an affordable price.";
    }
  } else if (lowercaseQuery.includes("wireless") || lowercaseQuery.includes("charging")) {
    matchedProducts = ["p8"]; // ChargePad Trio
    summary = "The ChargePad Trio lets you charge multiple devices simultaneously, reducing cable clutter on your desk.";
  }
  
  // If no specific matches, return empty
  if (matchedProducts.length === 0) {
    summary = "No matching products found. Try searching for laptops, smartphones, headphones, or accessories.";
  }
  
  console.log("✅ Matched products:", matchedProducts);
  console.log("📝 Generated summary:", summary);
  
  return {
    productIds: matchedProducts,
    summary: summary,
  };
}

module.exports = { askAI };
