const express=require('express')
const router=express.Router();

const premiumController=require('../controllers/premium')
const userAuthentication=require('../middlewares/auth')

router.get('/premium/leaderboard-page',premiumController.getLeaderboardPage)

router.get('/premium/show_leaderboard',userAuthentication.authenticate,premiumController.getShowLeaderboard)

router.get('/premium/expense-report',premiumController.getExpenseReportPage)

module.exports=router;