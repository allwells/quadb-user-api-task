const { Model, DataTypes } = require("sequelize")
const sequelize = require("../database")

class User extends Model {}

User.init({
    userName: DataTypes.STRING,
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_image: DataTypes.STRING,
    total_orders: DataTypes.STRING,
    created_at: DataTypes.NOW,
    last_logged_in: DataTypes.STRING,
},
{
    sequelize,
    modelName: "users"
})


module.exports = User