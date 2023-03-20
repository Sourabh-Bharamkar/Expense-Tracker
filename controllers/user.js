const path = require('path')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Sib = require('sib-api-v3-sdk')
const dotenv = require('dotenv')
dotenv.config();



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

    } catch (error) {

        console.log(error)

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

    } catch (error) {

        res.json(error);
    }

}


exports.getLoginPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views/login.html'))
}


function generateAccessToken(id, name) {
    return jwt.sign({ userId: id, name: name }, 'Sourabh@8989')
}


exports.postVerifyLogin = async (req, res, next) => {

    try {
        console.log('inside postVerifyLogin')
        const { email, password } = req.body;
        const users = await User.findAll({ where: { email: email } })

        if (users.length == 0) {
            return res.json({ message: 'user not found' })
        }
        const user = users[0];

        bcrypt.compare(password, user.password, (err, match) => {
            console.log(match)
            if (!match) {
                res.status(400).json({ message: 'password is incorrect' })
            }
            else {
                return res.status(200).json({ message: 'login successful', token: generateAccessToken(user.id, user.name) })
            }

        })

    } catch (error) {

        console.log(error)

    }

}


exports.getUserExpense = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views/index.html'))
}

exports.getIsPrimiumUser = (req, res, next) => {

    if (req.user.isPremiumMember == true) {
        res.status(200).json({ isPremium: true })
    }
    else {
        res.status(200).json({ isPremium: false })
    }

}

exports.postForgotPassword = async (req, res, next) => {

    try {

        const userEmail = req.body.email;
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.API_KEY;

        const transacEmailApi = new Sib.TransactionalEmailsApi();
        const sender = {
            email: 'bharamkarsourabh8989@gmail.com'
        };
        const reciever = [{
            email: `${userEmail}`
        }]

       await  transacEmailApi.sendTransacEmail({
            sender: sender,
            subject: 'password recover',
            to: reciever,
            textContent: 'Reset your password'

        })

        res.status(200).json({message:'message send successfully'})

    } catch (error) {
        console.log(error)
    }


}