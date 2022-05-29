require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const app = express()

mongoose.connect(process.env.DB_URL, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB.")
})

app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))
app.set("view engine", "ejs")

const {protect, checkUser} = require("./middleware/auth")

app.use("*", checkUser)

app.get("/", protect, (req, res) => {
    res.redirect("/transactions")
})

app.use("/auth", require("./routes/auth"))
app.use("/transactions", require("./routes/transaction"))

const port = process.env.PORT || 5000

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running at port ${port}.`)
})