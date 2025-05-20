const mongoose = require('mongoose');

const UserExpenseSchema = new mongoose.Schema({
  expense: { type: mongoose.Schema.Types.ObjectId, ref: 'Expense', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amountOwed: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('UserExpense', UserExpenseSchema);