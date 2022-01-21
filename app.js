require("express-async-errors")
const csrf = require("csurf")
const express = require("express")
const helmet = require("helmet")
const app = express()


app.use(helmet())
app.use(csrf({ cookie: true }))
app.use(express.json())

module.exports = app