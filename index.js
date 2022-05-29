const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/signup", (req, res) => {
    res.render("auth/signup")
})

app.get("/signin", (req, res) => {
    res.render("auth/signin")
})

app.listen(5000, (err) => {
    if (err) throw err;
    console.log("Server running at port 5000.")
})