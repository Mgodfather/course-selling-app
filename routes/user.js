require('dotenv').config()
const { Router } = require("express")
const userRouter = Router()

const { userMiddleware } = require("../middlewares/userMiddleware")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { z } = require("zod")
const JWT_USER_SECRET = process.env.JWT_USER_SECRET
const { UserModel } = require("../db")
const { Purchasemodel } = require("../db")


userRouter.post('/signup', async function (req, res) {

    // input validation
    const requireBody = z.object({
        firstName: z.string().min(3).max(20),
        lastName: z.string().min(3).max(20),
        email: z.string().min(3).email(),
        password: z.string().min(6)
    })

    const { success, error } = requireBody.safeParse(req.body)

    if (!success) {
        res.json({
            message: "invalid formate",
            error
        })
        return
    }



    const { firstName, lastName, email, password } = req.body

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 6)


    // sending data in mongo db
    try {
        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        res.json({
            message: "you are signup",
            user
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: "user exist already"
        })
    }


})


userRouter.post('/signin', async function (req, res) {

    const { email, password } = req.body

    const user = await UserModel.findOne({
        email
    })

    if (!user) {
        res.json({
            message: "user not found"
        })
        return
    }

    const token = jwt.sign({
        id: user._id,
    }, JWT_USER_SECRET)

    const matchedPassword = await bcrypt.compare(password, user.password)

    if (matchedPassword) {
        res.json({
            message: `${user.firstName} signin successfully`,
            token
        })
    } else {
        res.json({
            message: "inncorect credentials"
        })
    }

})


userRouter.get('/purchases', userMiddleware, async function (req, res) {

    const { userId } = req

    const myCourses = await UserModel.findById(userId)
        .populate({
            path: "purchasedCourses",
            model: "courses",
            select: "title imgUrl"
        })

    console.log(myCourses);

    res.json({
        message: "my purchased courses endpoint",
        myCourses
    })

})

module.exports = ({
    userRouter
})