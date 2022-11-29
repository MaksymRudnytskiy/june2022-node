const express = require('express')

const userDb = require('./dataBase/users')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/users', (req, res)=>{
    console.log('users endpoint')

    res.json(userDb)
})

app.get('/user/:userId',(req, res) => {

    const {userId} = req.params

    res.json(userDb[userId])
})

app.post('/users',(req, res) => {
    const userInfo = req.body

    userDb.push(userInfo)

    res.status(201).json('created')
})

app.put('/users/:userId', (req, res) => {

    const newUserInfo = req.body
    const userId = req.params.userId

    userDb[userId] = newUserInfo

    res.json('Updated')
})

app.get('/',(req, res) => {
    res.json('Welcome')
})

app.listen(5000, () => {
    console.log('Server listen 5000')
})