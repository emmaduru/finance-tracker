const User = require("../models/user")
const {isEmail} = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

module.exports = {
    signup_page: (req, res) => {
        return res.render("auth/signup")
    },

    signup: async (req, res) => {
        const {username, email, password} = req.body;
        try {
            if (!username || !email || !password) throw new Error("All fields are required.")
            if (username.length < 3) throw new Error("Username should have at least 3 characters.")
            if (!isEmail(email)) throw new Error ("Email address is invalid.")
            if (password.length < 6) throw new Error("Password should have at least 3 characters.")

            const user = await User.create({username, email, password})
            const token = createToken(user._id)
            res.cookie("ft_auth", token, {
                maxAge: 24*60*60*1000,
                httpOnly: true
            })
            return res.json({success: true, error: null})
        } catch (err) {
            return res.json({success: false, error: err.message})
        }
    },

    signin_page: (req, res) => {
        return res.render("auth/signin")
    },

    signin: async(req, res) => {
        const {username, password} = req.body;
        try {
            if (!username || !password) throw new Error("All fields are required")

            const user = await User.findOne({username}).select("+password")
            if (user && await bcrypt.compare(password, user.password)) {
                const token = createToken(user._id)
                res.cookie("ft_auth", token, {
                    maxAge: 24*60*60*1000,
                    httpOnly: true
                })
                return res.json({success: true, error: null})
            }

            throw new Error("Invalid Username or Password")

        } catch (err) {
            return res.json({success: false, error: err.message})
        }
    },
    
    signout: (req, res) => {
        res.cookie("ft_auth", "", {
            maxAge: 1,
            httpOnly: true
        })
        return res.redirect("/auth/signin")
    }
}