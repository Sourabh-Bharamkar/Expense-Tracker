const express=require('express')

const router=express.Router();
const expenseController=require('../controllers/expense')

router.get('/',expenseController.getHomePage)

router.post('/add-expense-details',expenseController.postAddExpenseDetails)

router.get('/expenses',expenseController.getExpenses)

router.get('/expense-details/:id',expenseController.getExpenseDetails)

router.get('/delete-expense/:id',expenseController.getDeleteExpense)

router.post('/edit-expense',expenseController.postEditExpense)

router.get('/edit-expense-page',expenseController.getEditExpensePage)


module.exports=router;