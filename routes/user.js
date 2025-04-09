const { Router } = require("express")
const {UserModel} = require("../db")
const userRouter = Router()

userRouter.post('/signup', function (req, res) {

    res.json({
        message:"signup endpoint"
    })
    
})
userRouter.post('/signin', function (req, res) {
    res.json({
        message:"signin endpoint"
    })
    
})
userRouter.get('/purchases', function (req, res) {
    res.json({
        message:"my purchased courses endpoint"
    })

})

module.exports = ({
    userRouter
})