const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
    dialect: "sqlite",
    host: "./quadb_tech_db.sqlite",
})

module.exports = sequelize