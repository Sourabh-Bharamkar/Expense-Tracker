const User = require('../models/user')
const Expense = require('../models/expense')
const path = require('path')
const sequelize = require('../util/database')

exports.getShowLeaderboard = async (req, res, next) => {
    try {

        const leaderboardOfUsers = await User.findAll({

            attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total_expense']],

            include: [{
                model: Expense,
                attributes: []
            }],
            group: ['user.id'],
            order: [['total_expense', 'DESC']]

        })

        res.status(200).json(leaderboardOfUsers)

    } catch (error) {
        console.log(error)
    }
}


exports.getLeaderboardPage = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, '../', 'views/leaderboard.html'))
}