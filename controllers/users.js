const usersRouter = require("express").Router()
const bcrypt = require("bcrypt")
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

    console.log(users)
    response.status(200).json(users)
})

usersRouter.get("/:id", async (request, response) => {
    const userId = request.params.id
    const user = await User.findAll({ where: { user_id: userId } })

    if(user) {
        response.status(200).json(user)
    } else {
        response.status(404).end()
    }
})

usersRouter.post("/", type, async (request, response) => {
    const body = request.body
    const imagePath = request.file.path

    console.log("FILE",request.file)
    console.log("BODY:", body)
    console.log("IMAGE PATH:", imagePath)

    const SALT_ROUNDS = Buffer.allocUnsafe(10)
    const passwordHash = bcrypt.hash(body.password, SALT_ROUNDS)

    const newUser = {
        user_name: body.user_name,
        user_email: body.user_email,
        user_password: passwordHash,
        user_image: imagePath,
        total_orders: body.total_orders,
        created_at: body.created_at,
        last_logged_in: body.last_logged_in
    }

    const user = await User.create(newUser)
    response.json(user)
})

module.exports = usersRouter
