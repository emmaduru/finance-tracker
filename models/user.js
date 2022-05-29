const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: "Username is required.",
        minLength: [3, "Username should have at least 3 characters."],
        unique: true
    },
    email: {
        type: String,
        required: "Email Address is required.",
        validate: [isEmail, "Email Address is invalid."],
        unique: true,
        select: false
    },
    password: {
        type: String,
        required: "Password is required.",
        minLength: [6, "Password should have at least 6 characters."],
        select: false
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model("User", userSchema)