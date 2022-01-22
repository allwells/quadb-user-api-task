const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./quadb_tech_db.sqlite",
})

module.exports = sequelize