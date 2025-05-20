const User = require('../models/User');
const Expense = require('../models/Expense');
const UserExpense = require('../models/UserExpense');

exports.createUser = async ({ name, email }) => {
  const user = new User({ name, email });
  return await user.save();
};

exports.getUserBalance = async (userId) => {
  const owedExpenses = await UserExpense.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
      }
    },
    {
      $lookup: {
        from: 'expenses',
        localField: 'expense',
        foreignField: '_id',
        as: 'expense'
      }
    },
    {
      $unwind: '$expense'
    },
    {
      $group: {
        _id: '$expense.paidBy',
        totalOwed: { $sum: '$amountOwed' }
      }
    }
  ]);

  const balanceMap = {};
  owedExpenses.forEach(expense => {
    balanceMap[expense._id] = expense.totalOwed;
  });

  return { user_id: userId, owes: balanceMap };
};