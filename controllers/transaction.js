const Transaction = require("../models/transaction")

const sum = (items) => {
    let total = 0
    items.forEach(item => {
        total += item.amount
    })
    return total;
}

module.exports = {
    list_transactions: async (req, res) => {
        try {
            const transactions = await Transaction.find({user: res.locals.user._id})
            const income = transactions.filter(transaction => transaction.type == "income")
            const expenses = transactions.filter(transaction => transaction.type == "expense")
            
            res.render("home", {transactions: transactions.reverse(), income: sum(income), expenses: sum(expenses), title: "Transactions"})
        } catch (err) {
            return res.json({success: false, error: err.message})
        }
    },

    create_transaction: async (req, res) => {
        const {description, amount, type} = req.body;

        try {
            if (!description || !amount || !type) throw new Error("All fields are required.")
            if (type !== "income" && type !== "expense") throw new Error ("Transaction type is invalid.")
            if (typeof(amount) !== "number") throw new Error("Amount must be a number.")
            const transaction = await Transaction.create({description, type, amount, user: res.locals.user._id})
            return res.json({success: true, error: null})
        } catch (err) {
            return res.json({success: false, error: err.message})
        }
    },

    delete_transaction: async(req, res) => {
        const {id} = req.params;
        try {
            await Transaction.findOneAndDelete({id, user: res.locals.user._id})
            return res.json({success: true, error: null})
        } catch (err) {
            return res.json({success: false, error: err.message})
        }
    }
}