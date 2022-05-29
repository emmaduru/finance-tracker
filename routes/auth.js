const router = require("express").Router()
const {signup_page, signup} = require("../controllers/auth")

router.route("/signup").get(signup_page).post(signup)

module.exports = router