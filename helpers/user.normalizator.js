module.exports = {
    name: (name) => {
        return name.charAt(0).toUpperCase() + name.splice(1).toLowerCase()
    }
}