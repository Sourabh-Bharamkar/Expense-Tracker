const User=require('../models/user')
const jwt=require('jsonwebtoken')


exports.authenticate=async (req,res,next)=>{

    try{
        console.log('entered into authenticate middleware')
        //decrypting the token and passing the corresponding user through the request
        const token=req.headers.authorization;
        const user=jwt.verify(token,'Sourabh@8989')
        const user1=await User.findByPk(user.userId)
        req.user=user1;
        console.log(req.user)
        next();

    }catch(error){
        console.log(error)
        res.status(401).json({message:'Authentication error'})
    }

}