// lib/ai.js
// OpenAI API integration

const OpenAI = require("openai");
const { products } = require("./products");

// Initialize OpenAI with API key from environment
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

/**
 * Ask AI to match products to a user query.
 * @param {string} query
 * @returns {{ productIds: string[], summary: string }}
 */
async function askAI(query) {
  console.log("🔍 Processing query:", query);
  
  // Fallback to mock responses if no API key
  if (!openai) {
    console.log("⚠️ No OpenAI API key found, using mock responses");
    return getMockResponse(query);
  }

  try {
    // Create compact product catalog for the prompt
    const productCatalog = products.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      tags: p.tags
    }));

    const prompt = `You are a helpful shopping assistant. Based on the user's query, find the most relevant products from this catalog and return a JSON response.

Product Catalog:
${JSON.stringify(productCatalog, null, 2)}

User Query: "${query}"

Return ONLY a JSON object with this exact format:
{
  "productIds": ["id1", "id2"],
  "summary": "Brief explanation of why these products match the query"
}

Rules:
- Return 1-4 product IDs maximum
- Only return IDs that exist in the catalog
- Keep summary concise (under 100 words)
- Return valid JSON only, no markdown or extra text`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful shopping assistant that returns only valid JSON responses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const text = completion.choices[0].message.content;
    console.log("🤖 OpenAI response:", text);
    
    // Parse JSON response
    const aiResponse = JSON.parse(text);
    
    // Validate product IDs exist in our catalog
    const validProductIds = aiResponse.productIds.filter(id => 
      products.some(p => p.id === id)
    );
    
    return {
      productIds: validProductIds,
      summary: aiResponse.summary || "Products matched based on your query.",
    };
    
  } catch (error) {
    console.error("❌ OpenAI API error:", error);
    // Fallback to mock responses on API error
    return getMockResponse(query);
  }
}

/**
 * Fallback mock response for testing without API key
 */
function getMockResponse(query) {
  const lowercaseQuery = query.toLowerCase();
  
  let matchedProducts = [];
  let summary = "";
  
  if (lowercaseQuery.includes("budget") || lowercaseQuery.includes("cheap")) {
    if (lowercaseQuery.includes("laptop")) {
      matchedProducts = ["p2"];
      summary = "The SwiftBook Air is perfect for budget-conscious users who need a reliable everyday laptop with excellent battery life.";
    } else if (lowercaseQuery.includes("phone") || lowercaseQuery.includes("smartphone")) {
      matchedProducts = ["p5"];
      summary = "The Moto Clarity 5G offers great value with 5G connectivity and solid performance at an affordable price.";
    }
  } else if (lowercaseQuery.includes("gaming") || lowercaseQuery.includes("performance")) {
    if (lowercaseQuery.includes("laptop")) {
      matchedProducts = ["p1"];
      summary = "The Nova Blade 15 Pro is a powerhouse gaming laptop with dedicated graphics and high-refresh display for serious gamers.";
    }
  } else if (lowercaseQuery.includes("premium") || lowercaseQuery.includes("high-end")) {
    if (lowercaseQuery.includes("laptop")) {
      matchedProducts = ["p1"];
      summary = "For premium users who want the best, the Nova Blade 15 Pro delivers top-tier performance with OLED display.";
    } else if (lowercaseQuery.includes("phone") || lowercaseQuery.includes("smartphone")) {
      matchedProducts = ["p4"];
      summary = "The Apex S24 Ultra is the ultimate flagship smartphone with exceptional camera quality and premium build.";
    }
  } else if (lowercaseQuery.includes("headphone") || lowercaseQuery.includes("audio")) {
    if (lowercaseQuery.includes("noise") || lowercaseQuery.includes("anc")) {
      matchedProducts = ["p6"];
      summary = "The SonicArc Pro provides premium noise cancellation and audiophile-grade sound for immersive listening.";
    } else if (lowercaseQuery.includes("budget") || lowercaseQuery.includes("cheap")) {
      matchedProducts = ["p7"];
      summary = "The BudBeat True earbuds offer great sound quality and wireless convenience at an affordable price.";
    }
  } else if (lowercaseQuery.includes("wireless") || lowercaseQuery.includes("charging")) {
    matchedProducts = ["p8"];
    summary = "The ChargePad Trio lets you charge multiple devices simultaneously, reducing cable clutter on your desk.";
  }
  
  if (matchedProducts.length === 0) {
    summary = "No matching products found. Try searching for laptops, smartphones, headphones, or accessories.";
  }
  
  return {
    productIds: matchedProducts,
    summary: summary,
  };
}

module.exports = { askAI };
