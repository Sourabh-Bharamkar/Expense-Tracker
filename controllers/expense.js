const path = require('path')
const Expense = require('../models/expense')
const User=require('../models/user')

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views/index.html'))
}


exports.postAddExpenseDetails = async (req, res, next) => {

  try {
    console.log('inside postAddExpenseDetails controller')

    const {amount,description,date,category}=req.body;
    console.log(req.user)
    const expense = await req.user.createExpense({

      amount: amount,
      description: description,
      date: date,
      category: category
    })

    //update total expense of user
    const totalExpense=req.user.totalExpense+Number(amount)
    req.user.totalExpense=totalExpense;
    req.user.save()


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
      //update total expense of user
      req.user.totalExpense-=expense.amount;
      req.user.save();

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
    //update users total expense 
    if(req.body.amount>expense.amount)
    {
      const amountIncrement=Number(req.body.amount) -expense.amount;
      console.log(amountIncrement)
      req.user.totalExpense+=amountIncrement;
      req.user.save()
    }
    else if(req.body.amount<expense.amount)
    {
      const amountDecrement=expense.amount-Number(req.body.amount);
      req.user.totalExpense-=amountDecrement;
      req.user.save()
    }
    
    //now update corresponding expense details
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

exports.getAddExpensePage=(req,res,next)=>{
  res.status(200).sendFile(path.join(__dirname,'../','views/add-expense.html'))
}


exports.getExpenseTable=(req,res,next)=>{
  res.status(200).sendFile(path.join(__dirname,'../','views/expense-table.html'))
}