const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ApiError = require("../error/ApiError");
const {FORGOT_PASS} = require("../config/email-action.enum");
const tokenTypes = require("../config/token-action.enum")
const {CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET, FORGOT_PASSWORD_ACTION_TOKEN_SECRET} = require("../config/config");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword)

        if (!isPasswordsSame) {
            throw new ApiError('Wrong email or password', 400)
        }
    },

    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, 'password', {expiresIn: '15m'})
        const refreshToken = jwt.sign(dataToSign, 'passwordRefresh', {expiresIn: '30d'})

        return{
            accessToken, refreshToken
        }
    },

    generateActionToken: (actionType, dataToSign = {}) => {
        let secretWord = ''

        switch (actionType) {
            case tokenTypes.CONFIRM_ACCOUNT:
                secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET
                break
            case tokenTypes.FORGOT_PASSWORD:
                secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET
                break
        }

        return jwt.sign(dataToSign, secretWord, {expiresIn: '7d'})

    }
}