const express = require('express')
const fs = require('fs/promises')
const path = require("path");

require('dotenv').config()

const userRouter = require('./router/user.router')
const configs = require('./config/config')
// const userDb = require('./dataBase/users')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', userRouter)



app.get('/', (req, res) => {
    console.log('Welcome')
})

app.listen(configs.PORT, () => {
    console.log(`Server listen ${process.env.PORT}`)
})

