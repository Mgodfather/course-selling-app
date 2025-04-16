require('dotenv').config()
const jwt = require("jsonwebtoken")

function userMiddleware(req, res, next) {
    const { token } = req.headers

    if (!token) {
        res.json({
            message: "You are not signed in"
        })
        return
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_USER_SECRET)
        req.userId = decodedData.id
        next()
    } catch (error) {
        res.status(403).json({
            message: "Invalid Token",
            error
        })
    }

}

module.exports = ({
    userMiddleware: userMiddleware
})