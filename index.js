const express = require("express")
const mongoose = require("mongoose")

const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

const app = express()


app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/admin', adminRouter)


async function main() {
    await mongoose.connect("mongodb+srv://mayankkashyap792:AegDCPQV06neHiJI@cluster0.xzmw85l.mongodb.net/course-selling-app")
    app.listen(3000, () => {
        console.log('your server is running on port 3000 ');
    })
}

main()