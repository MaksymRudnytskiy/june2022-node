const userDb = require("../dataBase/users");

module.exports = {
    getAllUsers: (req, res, next)=>{
        try {
            console.log('users endpoint')

            res.json(userDb)
        }catch (e) {
            next(e)
        }
    },

    getUserById: (req, res, next) => {
        try {
            throw new Error('getUserById error')
            res.json(req.user)
        }catch (e) {
            next(e)
        }
    },

    createUser: (req, res, next) => {
        try {
            const userInfo = req.body

            userDb.push(userInfo)

            res.status(201).json('created')
        }catch (e) {
            next(e)
        }
    },

    updateUser: (req, res, next) => {
        try {
            const newUserInfo = req.body
            const userId = req.params.userId

            userDb[userId] = newUserInfo

            res.json('Updated')
        }catch (e) {
            next(e)
        }
    }
}