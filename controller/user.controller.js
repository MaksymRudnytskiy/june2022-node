const userDb = require("../dataBase/users");
const fileService = require("../service/file.service");
const {writer} = require("../service/file.service");

module.exports = {
    getAllUsers: async (req, res, next)=>{
        try {
            const users = await fileService.reader()

            res.json(users)
        }catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => {
        try {
            res.json(req.user)
        }catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const userInfo = req.body

            const users = await fileService.reader()

            const newUser = {
                name: userInfo.name,
                age: userInfo.age,
                id: users[users.length-1].id + 1
            }
            users.push(newUser)

            await writer(users)

            res.status(201).json(newUser)
        }catch (e) {
            next(e)
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const newUserInfo = req.body
            const {user, users} = req

            const index = users.findIndex((u)=>u.id === user.id)

            users[index] = {...users[index], ...newUserInfo}

            await fileService.writer(users)

            res.status(201).json(users[index])
        }catch (e) {
            next(e)
        }
    }
}