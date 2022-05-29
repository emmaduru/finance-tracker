const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
    description: {
        type: String,
        required: "Transaction description is required.",
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: "Transaction type is required."
    },
    amount: {
        type: Number,
        require: "Transaction amount is required."
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Transaction", transactionSchema)