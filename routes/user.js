const express=require('express')
const router=express.Router();
const userController=require('../controllers/user')
const userAuthentication=require('../middlewares/auth')

router.get('/user/signup',userController.getSignupPage)

router.post('/user/signup',userController.postSignupUser)

router.post('/user/signup/verify',userController.postVerifyEmail)

router.get('/user/login',userController.getLoginPage)

router.post('/user/login/verify',userController.postVerifyLogin)

router.get('/user/expense',userController.getUserExpense)

router.get('/user/is_premium',userAuthentication.authenticate,userController.getIsPrimiumUser)


module.exports=router;