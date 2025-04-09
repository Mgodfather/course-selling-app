const { Router } = require("express")

const courseRouter = Router()

courseRouter.post('/purchase',function(req, res) {
    res.json({
        message:"purchase enpoint"
    })
} )

courseRouter.get('/preview',function(req, res) {
    res.json({
        message:"preview all courese enpoint"
    })

} )

module.exports = ({
    courseRouter
})