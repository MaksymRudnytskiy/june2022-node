const userDb = require("../dataBase/users");
const router = require('express').Router()

router.get('/users', (req, res)=>{
    console.log('users endpoint')

    res.json(userDb)
})

router.get('/user/:userId',(req, res) => {

    const {userId} = req.params

    res.json(userDb[userId])
})

router.post('/users',(req, res) => {
    const userInfo = req.body

    userDb.push(userInfo)

    res.status(201).json('created')
})

router.put('/users/:userId', (req, res) => {

    const newUserInfo = req.body
    const userId = req.params.userId

    userDb[userId] = newUserInfo

    res.json('Updated')
})

module.exports = router