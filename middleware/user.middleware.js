const userDb = require('../dataBase/users')

module.exports = {
    checkIfUserExist: (req, res, next) => {
        const {userId} =req.params

        const user = userDb[userId]

        if (!user){
            throw new Error('User not Found')
        }

        next()
    }
}