const Car = require("../dataBase/Car");

module.exports = {
    findByParams: async (filter = {}) => {
        return Car.find(filter)
    },

    create: async (carInfo) => {
        return Car.create(carInfo)
    }
}