const express = require("express");
const router = express.Router();

// ✅ FIXED IMPORT
const aiController = require("../controllers/aiController");

// ✅ DEBUG (IMPORTANT)
console.log("Controller:", aiController);

router.post("/ask-ai", aiController.askAI);
router.post("/save", aiController.savePrompt);
router.get("/history", aiController.getHistory);

module.exports = router;