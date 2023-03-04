const path=require('path')


exports.getSignup=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views/signup.html'))
}