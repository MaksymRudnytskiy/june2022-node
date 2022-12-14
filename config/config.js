module.exports = {
    PORT: process.env.PORT || 5000,
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'passwordAccess',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'passwordRefresh'
}