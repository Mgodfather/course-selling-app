const { Router } = require("express")
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { z } = require("zod")
const JWT_ADMIN_SECRET = "mayankkashyap"
const { AdminModel } = require('../db')
const app = express()
const adminRouter = Router()


adminRouter.post('/signup', async function (req, res) {

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
        const admin = await AdminModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        res.json({
            message: "you are signup",
            admin
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: "admin exist already"
        })
    }

})

adminRouter.post('/signin', async function (req, res) {

    const { email, password } = req.body

    const admin = await AdminModel.findOne({
        email
    })

    if (!admin) {
        res.json({
            message: "admin not found"
        })
        return
    }

    const token = jwt.sign({
        id: admin._id,
    }, JWT_ADMIN_SECRET)

    const matchedPassword = await bcrypt.compare(password, admin.password)

    if (matchedPassword) {
        res.json({
            message: `${admin.firstName} signin successfully`,
            token
        })
    } else {
        res.json({
            message: "inncorect credentials"
        })
    }

})


// app.use({adminMiddelware})

adminRouter.post('/course', function (req, res) {

    res.json({
        message: "signin endpoint"
    })

})

adminRouter.put('/course', function (req, res) {

    res.json({
        message: "signin endpoint"
    })

})

adminRouter.get('/course/all', function (req, res) {

    res.json({
        message: "signin endpoint"
    })

})



module.exports = ({
    adminRouter
})