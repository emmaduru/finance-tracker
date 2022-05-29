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
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("home")
})

app.use("/auth", require("./routes/auth"))

app.listen(5000, (err) => {
    if (err) throw err;
    console.log("Server running at port 5000.")
})