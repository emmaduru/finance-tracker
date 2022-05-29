const router = require("express").Router()
const {list_transactions, create_transaction, delete_transaction} = require("../controllers/transaction")

router.route("/create").post(create_transaction)
router.route("/:id/delete").delete(delete_transaction)
router.route("/").get(list_transactions)

module.exports = router