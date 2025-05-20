const Expense = require('../models/Expense');
const UserExpense = require('../models/UserExpense');

exports.createExpense = async ({ description, amount, paid_by, group_id, splits }) => {
  const expense = new Expense({
    description,
    amount,
    paidBy: paid_by,
    group: group_id
  });
  
  const savedExpense = await expense.save();
  
  const userExpenses = splits.map(split => ({
    expense: savedExpense._id,
    user: split.user_id,
    amountOwed: split.amount
  }));
  
  await UserExpense.insertMany(userExpenses);
  
  return { expense: savedExpense, splits };
};

exports.getGroupExpenses = async (groupId) => {
  return await Expense.find({ group: groupId })
    .populate('paidBy', 'name email')
    .sort({ createdAt: -1 });
};