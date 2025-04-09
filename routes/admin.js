const { Router } = require("express")
const express = require("express")

const app = express()
const adminRouter = Router()

adminRouter.post('/signup', function (req, res) {

    res.json({
        message:"signup endpoint"
    })
    
})

adminRouter.post('/signin', function (req, res) {

    res.json({
        message:"signin endpoint"
    })
    
})


// app.use({adminMiddelware})

adminRouter.post('/course', function (req, res) {

    res.json({
        message:"signin endpoint"
    })
    
})

adminRouter.put('/course', function (req, res) {

    res.json({
        message:"signin endpoint"
    })
    
})

adminRouter.get('/course/all', function (req, res) {

    res.json({
        message:"signin endpoint"
    })
    
})



module.exports = ({
    adminRouter
})