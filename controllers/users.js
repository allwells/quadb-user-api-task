const usersRouter = require("express").Router()
const multer = require("multer")
const uploadsDest = "uploads/"
const User = require("../models/user")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadsDest)
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + "-" + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter })
const type = upload.single("img")

usersRouter.get("/", async (request, response) => {
    const users = await User.findAll()

    console.log(users.every(user => user instanceof User)) // true
    console.log("All users:", JSON.stringify(users, null, 2))
    console.log(users)
    response.status(200).json(users)
})

module.exports = usersRouter