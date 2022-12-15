const {WELCOME, FORGOT_PASS} = require("../config/email-action.enum");

module.exports = {

    [WELCOME]: {
        subject: 'Welcome',
        templateName: 'welcome'
    },

    [FORGOT_PASS]: {
        subject: 'Pass error',
        templateName: 'forgot-pass'
    }
}