const express = require('express')
const path = require('path')
const Expense = require('../models/expense')

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views/index.html'))
}

exports.postAddExpenseDetails = (req, res, next) => {
  if (req.body.id == null) {
    Expense.create({
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category
    }).then((response) => {
      console.log(response)
      res.json(response)

    })
  }
  else {
    Expense.findByPk(req.body.id)
      .then((response) => {
        response.amount = req.body.amount;
        response.description = req.body.description;
        response.category = req.body.category;
        response.save();
        res.json(response);
      })
      .catch((error) => {
        console.log(error)
      })

  }

}

exports.getExpenses = (req, res, next) => {

  Expense.findAll()
    .then((result) => {
      console.log('entered into getExpenses controller')
      console.log(result)
      res.json(result)
    })
    .catch((error) => {
      console.log(error)
    })
}

exports.getDeleteExpense = (req, res, next) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((response) => {
      response.destroy();
      res.json();

    })
    .catch((error) => {
      console.log(error)
    })

}

exports.getEditExpense = (req, res, next) => {

  res.redirect('/edit-expense-page')

}

exports.getEditExpensePage = (req, res, next) => {

  res.sendFile(path.join(__dirname, '../', 'views/edit-expense-page.html'))
}


exports.getExpenseDetails = (req, res, next) => {

  const id = req.params.id;

  Expense.findByPk(id)
    .then((response) => {
      res.json(response)
    })
    .catch((error) => {
      console.log(error)
    })
}