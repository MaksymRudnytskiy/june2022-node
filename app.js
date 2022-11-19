const express = require('express')
const fs = require('fs/promises')
const path = require("path");

// const userDb = require('./dataBase/users')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users', async (req, res) => {
    console.log('user endpoint')

    const userDb = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'))
    const users = JSON.parse(userDb.toString())

    res.json(users)
})

app.get('/users/:userId', async (req, res) => {

    const {userId} = req.params
    const userDb = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'))
    const users = JSON.parse(userDb.toString())
    const findUser = users.find((user) => user.id === +userId)

    if (!findUser) {
        return res.json('ID not found')
    }

    res.json(findUser)
})

app.post('/users', async (req, res) => {
    const userInfo = req.body

    if (!userInfo.name || typeof userInfo.name === "string") {
        return res.status(400).json('Invalid User')
    }
    if (userInfo.age < 0 || Number.isNaN(+userInfo.age)) {
        return res.status(400).json('Invalid age')
    }

    const userDb = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'))
    const users = JSON.parse(userDb.toString())
    const newUser = {
        name: userInfo.name,
        age: userInfo.age,
        id: users[users.length - 1].id + 1}

    users.push(newUser)

    await fs.writeFile(path.join(__dirname, 'dataBase', 'users.json'), JSON.stringify(users))

    res.status(201).json(newUser)
})

app.put('/users/:userId', async (req, res) => {

    const newUserInfo = req.body
    const {userId} = req.params
    const userDb = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'))
    const users = JSON.parse(userDb.toString())
    const findId = users.findIndex((user) => user.id === +userId)

    if (findId === -1) {
        return res.json('ID not found')
    }

    users[findId] = {...users[findId], ...newUserInfo}
    users.push(newUserInfo)

    await fs.writeFile(path.join(__dirname, 'dataBase', 'users.json'), JSON.stringify(users))

    res.json(users[findId])
})

app.delete('/users/:userId', async (req, res) => {

    const {userId} = req.params
    const userDb = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'))
    const users = JSON.parse(userDb.toString())
    const findId = users.findIndex((user) => user.id === +userId)

    if (findId === -1) {
        return res.json('ID not found')
    }


    users.splice(findId, 1)

    await fs.writeFile(path.join(__dirname, 'dataBase', 'users.json'), JSON.stringify(users))

    res.sendStatus(204)
})

app.get('/', (req, res) => {
    console.log('Welcome')
})

app.listen(5000, () => {
    console.log('Server listen 5000')
})

