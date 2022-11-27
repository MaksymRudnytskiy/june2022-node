const router = require('express').Router()
const controller = require('../controller/user.controller')
const mdlwr = require('../middleware/user.middleware')

router.get('/',  controller.getAllUsers)

router.get('/:userId', mdlwr.checkIfUserExist, controller.getUserById)

router.post('/', controller.createUser)

router.put('/:userId', mdlwr.checkIfUserExist, controller.updateUser)

router.delete('/:userId', controller.deleteUser)

module.exports = router