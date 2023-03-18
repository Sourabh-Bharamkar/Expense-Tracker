const express=require('express')
const router=express.Router();

const premiumController=require('../controllers/premium')
const userAuthontication=require('../middlewares/auth')

router.get('/premium/leaderboard-page',premiumController.getLeaderboardPage)

router.get('/premium/show_leaderboard',userAuthontication.authenticate,premiumController.getShowLeaderboard)

module.exports=router;