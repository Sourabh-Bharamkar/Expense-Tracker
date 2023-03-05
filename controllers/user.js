const path = require('path')
const User = require('../models/user')

exports.getSignupPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views/signup.html'))
}

exports.postVerifyUser = (req, res, next) => {
    const email = req.body.email
    console.log('Inside post verify user')

    User.findAll({ where: { email: email } })
        .then((users) => {

            if (users.length) {
                res.json(users[0])
            }
            else {
                res.json()
            }
        })

}

exports.postSignupUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.create({
        name: name,
        email: email,
        password: password
    })
        .then((user) => {
            res.json(user)
        })

}

exports.getLoginPage=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views/login.html'))
}