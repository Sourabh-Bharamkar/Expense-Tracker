const express=require('express')
const router=express.Router();
const userController=require('../controllers/user')

router.get('/user/signup',userController.getSignupPage)

router.post('/user/signup',userController.postSignupUser)

router.post('/user/signup/verify',userController.postVerifyEmail)

router.get('/user/login',userController.getLoginPage)

router.post('/user/login/verify',userController.postVerifyLogin)

router.get('/user/expense',userController.getUserExpense)


module.exports=router;