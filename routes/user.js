const express=require('express')
const router=express.Router();
const userController=require('../controllers/user')

router.get('/user/signup',userController.getSignup)

module.exports=router;