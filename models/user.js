const { Model, DataTypes } = require("sequelize")
const sequelize = require("../database")

class User extends Model {}

User.init({
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    user_name: {
        type: DataTypes.STRING
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_image: {
        type: DataTypes.STRING
    },
    total_orders: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.NOW
    },
    last_logged_in: {
        type: DataTypes.STRING
    },
},
{
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: "users"
})


module.exports = User