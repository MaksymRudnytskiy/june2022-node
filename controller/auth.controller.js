const oauthService = require("../service/oauth.service");
const emailService = require("../service/email.service");
const OAuth = require("../dataBase/OAuth");
const {WELCOME, FORGOT_PASS} = require("../config/email-action.enum");
const {FORGOT_PASSWORD} = require("../config/token-action.enum");
const {FRONTEND_URL} = require("../config/config");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req

            await emailService.sendEmail('test@gmail.com', WELCOME)

            await oauthService.comparePasswords(user.password, body.password)

            const tokenPair = oauthService.generateAccessTokenPair({id: user._id})

            await OAuth.create({...tokenPair, _user_id: user._id})

            res.json({
                user,
                ...tokenPair
            })
        } catch (e) {
            next(e)
        }
    },

    forgotPassword:async (req, res, next) =>{
        try {
            const user = req.user

            const actionToken = oauthService.generateActionToken(FORGOT_PASSWORD, {email: user.email})

            const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`

            await emailService.sendEmail('test@mail.com', FORGOT_PASS, {url: forgotPassFEUrl})

            next()
        }catch (e) {
            next(e)
        }
    }
}