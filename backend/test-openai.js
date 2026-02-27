require("dotenv").config();
const OpenAI = require("openai");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function test() {
  try {
    console.log("🔑 Testing OpenAI API with key:", process.env.OPENAI_API_KEY?.substring(0, 20) + "...");
    
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Say 'Hello from OpenAI!'" }
      ],
      max_tokens: 50,
    });

    console.log("✅ OpenAI Response:", response.choices[0].message.content);
  } catch (error) {
    console.error("❌ OpenAI Error:", error.message);
    if (error.status) {
      console.error("Status:", error.status);
      console.error("Type:", error.type);
      console.error("Code:", error.code);
    }
  }
}

test();
