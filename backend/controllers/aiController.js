const axios = require("axios");
const Prompt = require("../model/Prompt");

exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Flow App",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("FULL AI RESPONSE:", response.data);

    const aiText =
      response?.data?.choices?.[0]?.message?.content ||
      response?.data?.choices?.[0]?.text;

    if (!aiText) {
      return res.status(500).json({ message: "Empty AI response" });
    }

    res.json({ response: aiText });

  } catch (error) {
    console.error("AI FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      message: "AI request failed",
      error: error.response?.data || error.message,
    });
  }
};
exports.savePrompt = async (req, res) => {
  try {
    res.json({ message: "Save working ✅" });
  } catch (error) {
    res.status(500).json({ message: "Save failed ❌" });
  }
};

exports.getHistory = async (req, res) => {
  try {
    res.json({ message: "History working ✅" });
  } catch (error) {
    res.status(500).json({ message: "Fetch failed ❌" });
  }
};