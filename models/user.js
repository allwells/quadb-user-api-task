const { Model, DataTypes } = require("sequelize")
const sequelize = require("../database")

class User extends Model {}

User.init({
    userName: DataTypes.STRING,
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userImage: DataTypes.STRING,
    totalOrders: DataTypes.STRING,
    createdAt: DataTypes.NOW,
    lastLoggedIn: DataTypes.STRING,
},
{
    sequelize,
    modelName: "users"
})


module.exports = User