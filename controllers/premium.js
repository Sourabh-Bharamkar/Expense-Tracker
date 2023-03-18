const User = require('../models/user')
const Expense = require('../models/expense')
const path=require('path')

exports.getShowLeaderboard = async (req, res, next) => {
   try{

    const expenses=await Expense.findAll()
    const users=await User.findAll();

    const userIdWithTotalExpense={};
    const userNameWithTotalExpense=[];

    expenses.forEach((expense)=>{

        if(userIdWithTotalExpense[expense.userId])
        {
            userIdWithTotalExpense[expense.userId]+=expense.amount;
        }
        else{
            userIdWithTotalExpense[expense.userId]=expense.amount;
        }
    })

    users.forEach((user)=>{
       
        if(userIdWithTotalExpense[user.id]==undefined)
        {
            
            userNameWithTotalExpense.push({name:user.name, total_expense:0})
        }
        else{
            
            userNameWithTotalExpense.push({name:user.name, total_expense:userIdWithTotalExpense[user.id]})
        }
        
    })

   

    userNameWithTotalExpense.sort((a,b)=>{
        return b.total_expense-a.total_expense;
    })

    console.log(userNameWithTotalExpense)
    res.status(200).json(userNameWithTotalExpense)

   }catch(error){
    console.log(error)
   }
}


exports.getLeaderboardPage=(req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','views/leaderboard.html'))
}