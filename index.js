const express = require("express")

const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")

const app = express()


app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)



app.listen(3000, () => {
    console.log('your server is running on port 3000 ');
})