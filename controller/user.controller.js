const fs = require("fs/promises");
const path = require("path");

// const userDb = require('./dataBase/users')

module.exports = {
    getAllUsers: async (req, res) => {
        console.log('user endpoint')

        const userDb = await fs.readFile(path.join('dataBase', 'users.json'))
        const users = JSON.parse(userDb.toString())

        res.json(users)
    },

    getUserById: async (req, res) => {

        const {userId} = req.params
        const userDb = await fs.readFile(path.join('dataBase', 'users.json'))
        const users = JSON.parse(userDb.toString())
        const findUser = users.find((user) => user.id === +userId)

        if (!findUser) {
            return res.json('ID not found')
        }

        res.json(findUser)
    },

    createUser: async (req, res) => {
        const userInfo = req.body

        if (!userInfo.name || typeof userInfo.name === "string") {
            return res.status(400).json('Invalid User')
        }
        if (userInfo.age < 0 || Number.isNaN(+userInfo.age)) {
            return res.status(400).json('Invalid age')
        }

        const userDb = await fs.readFile(path.join('dataBase', 'users.json'))
        const users = JSON.parse(userDb.toString())
        const newUser = {
            name: userInfo.name,
            age: userInfo.age,
            id: users[users.length - 1].id + 1
        }

        users.push(newUser)

        await fs.writeFile(path.join('dataBase', 'users.json'), JSON.stringify(users))

        res.status(201).json(newUser)
    },

    updateUser: async (req, res) => {

        const newUserInfo = req.body
        const {userId} = req.params
        const userDb = await fs.readFile(path.join('dataBase', 'users.json'))
        const users = JSON.parse(userDb.toString())
        const findId = users.findIndex((user) => user.id === +userId)

        if (findId === -1) {
            return res.json('ID not found')
        }

        users[findId] = {...users[findId], ...newUserInfo}
        users.push(newUserInfo)

        await fs.writeFile(path.join('dataBase', 'users.json'), JSON.stringify(users))

        res.json(users[findId])
    },

    deleteUser: async (req, res) => {

        const {userId} = req.params
        const userDb = await fs.readFile(path.join('dataBase', 'users.json'))
        const users = JSON.parse(userDb.toString())
        const findId = users.findIndex((user) => user.id === +userId)

        if (findId === -1) {
            return res.json('ID not found')
        }


        users.splice(findId, 1)

        await fs.writeFile(path.join('dataBase', 'users.json'), JSON.stringify(users))

        res.sendStatus(204)
    }
}