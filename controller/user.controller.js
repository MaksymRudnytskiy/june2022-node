const User = require("../dataBase/User");
const {userService} = require("../service");

module.exports = {
    getAllUsers: async (req, res, next)=>{
        try {
            const users = await userService.findByParams({})

            res.json(users)
        }catch (e) {
            next(e)
        }
    },

    getUserById: (req, res, next) => {
        try {
            res.json(req.user)
        }catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            await User.create(req.body)

            res.status(201).json('created')
        }catch (e) {
            next(e)
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const newUserInfo = req.body
            const userId = req.params.userId

            await User.findByIdAndUpdate(userId, newUserInfo)

            res.json('Updated')
        }catch (e) {
            next(e)
        }
    },
    
    deleteUserById: async (req, res, next) =>{
        try {
            await User.deleteOne({_id: req.params.userId})

            res.status(204).send('Deleted')
        }catch (e) {
            next(e)
        }
    }
}