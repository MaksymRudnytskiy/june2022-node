module.exports = {
    EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    PASSWORD: /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/,
    MONGO_ID: /^[a-fA-F\d]{24}$/
}