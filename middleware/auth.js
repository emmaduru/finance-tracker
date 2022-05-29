const User = require("../models/user")
const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    const token = req.cookies.ft_auth;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {complete: true})
        const user = await User.findById(decoded.payload.id)
        if (user) {
            res.locals.user = user
            return true
        } else {
            res.locals.user = null
            return false
        }
    } else {
        res.locals.user = null
        return false
    }
}

const protect = async (req, res, next) => {
    if (await verifyToken(req, res, next)) return next()
    else return res.redirect("/auth/signin")
}

const checkUser = async (req, res, next) => {
    await verifyToken(req, res, next)
    return next()
}

module.exports = {protect, checkUser}