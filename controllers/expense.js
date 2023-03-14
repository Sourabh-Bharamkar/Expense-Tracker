const path = require('path')
const Expense = require('../models/expense')

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views/index.html'))
}


exports.postAddExpenseDetails = async (req, res, next) => {

  try {
    console.log('inside postAddExpenseDetails controller')

    console.log(req.user)
    const expense = await req.user.createExpense({

      amount: req.body.amount,
      description: req.body.description,
      date: req.body.date,
      category: req.body.category
    })

    // console.log(response)
    res.json(expense)

  } catch (error) {
    console.log(error)
  }

}


exports.getExpenses = async (req, res, next) => {

  try {
    console.log('Entered into getExpense Controller')
    console.log(req.user)
    const expenses = await req.user.getExpenses();//
    console.log('entered into getExpenses controller')
    // console.log(result)
    res.json(expenses)

  } catch (error) {
    console.log(error)
  }

}


exports.getDeleteExpense = async (req, res, next) => {

  try {
    const id = req.params.id;
    const user = req.user;
    const expense = await Expense.findByPk(id)
    if (expense.userId == user.id) {
      expense.destroy();
      res.status(200).json({ message: 'deleted the expense' });
    }
    else {
      res.status(403).json({ message: 'autherization error' })
    }

  } catch (error) {
    console.log(error)
  }

}

exports.postEditExpense = async (req, res, next) => {

  try {
    console.log('entered into postEditExpense controller')
    const id = req.body.id;
    console.log(id);
    const user = req.user;
    const expense = await Expense.findByPk(id)

    if (user.id == expense.userId) {
      expense.amount = req.body.amount;
      expense.description = req.body.description;
      expense.category = req.body.category;
      expense.save();
      res.json(expense);
    }
    else {
      res.status(403).json({ message: 'autherization error' })
    }


  } catch (error) {
    console.log(error)

  }

}



exports.getExpenseDetails = async (req, res, next) => {

  try {
    const user = req.user;
    const id = req.params.id;
    const expense = await Expense.findByPk(id)

    if (expense.userId == user.id) {
      res.status(200).json(expense)
    }
    else {
      res.status(403).json({ message: 'autherization error' })
    }


  } catch (error) {
    console.log(error)

  }

}