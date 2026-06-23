const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// TEST ROUTE
router.get("/", (req, res) => {
  res.json({ message: "Auth route working" });
});

// SIMPLE REGISTER (example)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    res.json({
      email,
      password: hashedPassword
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;