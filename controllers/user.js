const path = require('path')
const User = require('../models/user')
const bcrypt = require('bcrypt')

exports.getSignupPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views/signup.html'))
}

exports.postVerifyEmail = async (req, res, next) => {
    try {
        const email = req.body.email
        console.log('Inside post verify user')

        const users = await User.findAll({ where: { email: email } })

        if (users.length) {
            res.status(200)
            res.json({ message: 'user found' })
        }
        else {
            res.json({ message: 'user not found' });

        }


    } catch {
        (error) => {
            console.log(error)
        }
    }


}

exports.postSignupUser = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;

        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            const user = await User.create({
                name: name,
                email: email,
                password: hash
            })

            res.status(201).json({ message: 'Account created successfully' })
        })

    } catch {
        (err) => {

            res.json(err);
        }
    }

}

exports.getLoginPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views/login.html'))
}

exports.postVerifyLogin = async (req, res, next) => {

    try {
        console.log('inside postVerifyLogin')
        const { email, password } = req.body;
        const users = await User.findAll({ where: { email: email } })

        if (users.length == 0) {
            res.json({ message: 'user not found' })
        }
        const user = users[0];

        bcrypt.compare(password, user.password, (err, match) => {
            console.log(match)
            if (!match) {

                res.send({ message: 'password is incorrect' })

            }
            else {
                res.status(200).json({ message: 'login successful' })
            }

        })

    } catch {
        (error) => {

            res.json(error)
        }
    }

}