const router = require('express').Router()

const controller = require('../controller/auth.controller')
const mdlwr = require("../middleware/auth.middleware");
const userMdlwr = require("../middleware/user.middleware");

router.post('/login', mdlwr.isBodyValid, userMdlwr.getUserDynamically('email'), controller.login)

router.post('/password/forgot', userMdlwr.getUserDynamically('email'), controller.forgotPassword)


module.exports = router