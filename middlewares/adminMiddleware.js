require('dotenv').config()
const jwt = require("jsonwebtoken")

function adminMiddleware(req, res, next) {
    const { token } = req.headers

    if (!token) {
        res.json({
            message: "You are not signed in"
        })
        return
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_ADMIN_SECRET)
        req.creatorId = decodedData.id
        next()
    } catch (error) {
        res.status(403).json({
            message: "Invalid Token",
            error
        })
    }

}

module.exports = {
    adminMiddleware
}