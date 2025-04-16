const { Router } = require("express")
const courseRouter = Router()

const { userMiddleware } = require("../middlewares/userMiddleware")
const { CourseModel, UserModel } = require('../db')
const { Purchasemodel } = require('../db')


courseRouter.post('/purchase', userMiddleware, async function (req, res) {

    const { courseId } = req.body
    const { userId } = req

    const courseBuy = await UserModel.updateOne({ _id : userId }, {
       "$push": {purchasedCourses: courseId}
    })

    res.json({
        message: "purchased successfully",
        courseBuy
    })
})

courseRouter.get('/preview', userMiddleware, async function (req, res) {

    // const { userId } = req

    const previewCourses = await CourseModel.find({})

    res.json({
        message: "preview all courese enpoint",
        previewCourses
    })

})


module.exports = ({
    courseRouter
})