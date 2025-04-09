const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
})

const AdminSchema = Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
})

const CourseSchema = Schema({
    creatorId: ObjectId,
    title: String,
    discription: String,
    imgUrl: String,
    price: Number
})

const PurchaseSchema = Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const UserModel = mongoose.model('users', UserSchema)
const AdminModel = mongoose.model('admins', AdminSchema)
const CourseModel = mongoose.model('courses', CourseSchema)
const Purchasemodel = mongoose.model('purchases', PurchaseSchema)

module.exports = ({
    UserModel,
    AdminModel,
    CourseModel,
    Purchasemodel
})