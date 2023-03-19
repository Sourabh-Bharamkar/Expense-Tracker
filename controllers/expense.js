const path = require('path')
const Expense = require('../models/expense')
const User = require('../models/user')
const sequelize = require('../util/database')

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views/index.html'))
}


exports.postAddExpenseDetails = async (req, res, next) => {

  const t = await sequelize.transaction();
  try {

    console.log('inside postAddExpenseDetails controller')

    const { amount, description, date, category } = req.body;
    console.log(req.user)
    const expense = await req.user.createExpense({
      amount: amount,
      description: description,
      date: date,
      category: category
    }, { transaction: t })

    //update total expense of user
    const totalExpense = req.user.totalExpense + Number(amount);
    await User.update({ totalExpense: totalExpense }, { whre: { id: req.user.id }, transaction: t })

    await t.commit();
    // console.log(response)
    res.status(201).json(expense)

  } catch (error) {
    await t.rollback()
    console.log(error)
    res.status(500).json({ message: 'failed to create resource' })
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


exports.postDeleteExpense = async (req, res, next) => {

  const t = await sequelize.transaction();
  try {
    const id = req.body.id;
    const user = req.user;
    const expense = await Expense.findByPk(id)

    const noOfRowsDestroyed = await Expense.destroy({ where: { id: id }, transaction: t })

    if (noOfRowsDestroyed === 0) {
      await t.rollback();
      res.status(404).json({ message: 'failed to delete' })

    }

    //update total expense of user
    const updatedTotalExpense = req.user.totalExpense - expense.amount;
    await User.update({ totalExpense: updatedTotalExpense }, { where: { id: req.user.id }, transaction: t })

    await t.commit();

    res.status(200).json({ message: 'deleted the expense successfully' });


  } catch (error) {
    await t.rollback()
    console.log(error)
    res.status(500).json({ message: 'failed to delete' })
  }

}


exports.postEditExpense = async (req, res, next) => {

  const t = await sequelize.transaction()
  try {

    console.log('entered into postEditExpense controller')
    const { id, amount, description, category } = req.body;

    const user = req.user;
    const expense = await Expense.findByPk(id)

    //update users total expense 
    if (req.body.amount > expense.amount) {

      const amountIncrement = Number(req.body.amount) - expense.amount;
      const updatedTotalExpense = req.user.totalExpense + amountIncrement;

      await User.update({ totalExpense: updatedTotalExpense }, { where: { id: req.user.id }, transaction: t })

    }
    else if (req.body.amount < expense.amount) {
      const amountDecrement = expense.amount - Number(req.body.amount);
      const updatedTotalExpense = req.user.totalExpense - amountDecrement;
      await User.update({ totalExpense: updatedTotalExpense }, { where: { id: req.user.id }, transaction: t })

    }

    //now update corresponding expense details
    await Expense.update({ amount: amount, description: description, category: category }, { where: { id: id }, transaction: t })
    await t.commit();
    const updatedExpenseDetails = await Expense.findByPk(id)
    res.status(200).json(updatedExpenseDetails);

  } catch (error) {
    await t.rollback();
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

exports.getAddExpensePage = (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../', 'views/add-expense.html'))
}


exports.getExpenseTable = (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../', 'views/expense-table.html'))
}