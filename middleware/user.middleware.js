const userDb = require("../dataBase/users");
const ApiError = require("../error/ApiError");
const fileService = require("../service/file.service");


module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params

            const users = await fileService.reader()

            const user = users.find((u) => u.id === +userId)

            if (!user) {
                throw new ApiError('User not found', 404)
            }

            req.users = users
            req.user = user

            next()
        }catch (e) {
            next(e)
        }
    },
    isBodyValid: (req, res, next) => {
        try {
            const {name, age} = req.body
            if (name.length < 3 || typeof name !== 'string') {
                return res.status(400).json('Wrong name')
            }
            if (age < 0 || Number.isNaN(+age)) {
                return res.status(400).json('Wrong age')
            }
            next()
        }catch (e) {
            next(e)
        }
    }
}