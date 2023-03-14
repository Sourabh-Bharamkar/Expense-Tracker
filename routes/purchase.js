const express=require('express')
const router=express.Router();
const purchaseController=require('../controllers/purchase')
const userAuthontication=require('../middlewares/auth')

router.get('/purchase/primium_membership',userAuthontication.authenticate,purchaseController.getPremiumMembership)

router.post('/purchase/update_transaction_status',userAuthontication.authenticate,purchaseController.postUpdateTransactionStatus)

module.exports=router;