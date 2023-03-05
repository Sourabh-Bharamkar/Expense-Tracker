const express=require('express')
const router=express.Router();
const userController=require('../controllers/user')

router.get('/user/signup',userController.getSignupPage)

router.post('/user/signup',userController.postSignupUser)

router.post('/user/verify',userController.postVerifyUser)

router.get('/user/login',userController.getLoginPage)

module.exports=router;