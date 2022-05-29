const router = require("express").Router()
const {signup_page, signup, signin_page, signin, signout} = require("../controllers/auth")

router.route("/signup").get(signup_page).post(signup)
router.route("/signin").get(signin_page).post(signin)
router.route("/signout").get(signout)

module.exports = router