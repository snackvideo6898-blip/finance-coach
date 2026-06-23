const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// ➤ ADD EXPENSE (POST)
router.post("/", async (req, res) => {
  try {
    const { title, amount } = req.body;
    if (!title || !amount) {
      return res.status(400).json({ message: "Title or amount missing" });
    }
    const expense = await Expense.create({ title, amount });
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ➤ GET ALL EXPENSES (GET)
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ UPDATE EXPENSE (PUT)
router.put("/:id", async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, amount: req.body.amount },
      { new: true }
    );
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ DELETE EXPENSE (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;