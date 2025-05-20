const expenseService = require('../services/expenseService');

exports.createExpense = async (req, res) => {
  try {
    const result = await expenseService.createExpense(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getGroupExpenses = async (req, res) => {
  try {
    const groupExpenses = await expenseService.getGroupExpenses(req.params.id);
    res.json(groupExpenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};