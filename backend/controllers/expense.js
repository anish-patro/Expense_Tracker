const ExpenseSchema = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    description,
    date,
    category,
  });

  try {
    if (!title || !description || !category || !date)
      return res.status(400).json({ message: "All fields are required" });

    if (amount < 0 || !amount === "number")
      return res
        .status(400)
        .json({ message: " amount must be a postive number" });

    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: error });
  }

  console.log(expense);
};

exports.getExpenses = async (req, res) => {
  try {
    const expense = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json("server error!");
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "expense deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
};
