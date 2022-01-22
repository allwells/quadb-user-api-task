require("express-async-errors")
const cors = require("cors")
const express = require("express")
const helmet = require("helmet")
const app = express()
const morgan = require("morgan")
const middleware = require("./utils/middleware")
const usersRouter = require("./controllers/users")
const sequelize = require("./database")
const logger = require("./utils/logger")

// try {
//     sequelize.authenticate()
//     logger.info("Connection has been established successfully.")
// } catch (error) {
//     logger.error("Unable to connect to the database:", error)
// }

sequelize.sync()
    .then(() => logger.info("Database connection successful!"))
    .catch(err => logger.error("Database connection failed!", err))

morgan.token("body", (request, response) => {
    return JSON.stringify(request.body)
})

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

app.use("/users",usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app