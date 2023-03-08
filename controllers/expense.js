const express = require('express')
const path = require('path')
const Expense = require('../models/expense')

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views/index.html'))
}


exports.postAddExpenseDetails = async (req, res, next) => {

  try {
    console.log('inside postAddExpenseDetails controller')

    const expense = await Expense.create({

      amount: req.body.amount,
      description: req.body.description,
      date: req.body.date,
      category: req.body.category
    })

    // console.log(response)
    res.json(expense)

  } catch (error){ 
      console.log(error)
  }

}

exports.getExpenses = async (req, res, next) => {

  try {
    const expenses = await Expense.findAll()
    console.log('entered into getExpenses controller')
    // console.log(result)
    res.json(expenses)

  } catch(error) {
      console.log(error)
  }

}

exports.getDeleteExpense = async (req, res, next) => {

  try {
    const id = req.params.id;
    const expense = await Expense.findByPk(id)
    expense.destroy();
    res.json({ message: 'deleted the expense' });

  } catch(error) {
      console.log(error)
  }

}

exports.postEditExpense = async (req, res, next) => {

  try {
    console.log('entered into postEditExpense controller')
    const id = req.body.id;
    console.log(id)
    const expense = await Expense.findByPk(id)
    expense.amount = req.body.amount;
    expense.description = req.body.description;
    expense.category = req.body.category;
    expense.save();
    res.json(expense);

  } catch (error) {
    console.log(error)

  }

}

exports.getEditExpensePage = (req, res, next) => {

  res.sendFile(path.join(__dirname, '../', 'views/edit-expense-page.html'))
}


exports.getExpenseDetails = async (req, res, next) => {

  try {
    const id = req.params.id;
    const expense = await Expense.findByPk(id)
    res.json(expense)

  } catch (error) {
    console.log(error)
  }

}