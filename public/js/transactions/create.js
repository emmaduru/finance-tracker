const createTransaction = document.querySelector("#create-transaction")
let error = ""
const errMsg = document.querySelector(".err-msg")
const setError = (err) => {
    errMsg.innerHTML = `
        <div class="card card-body text-danger">${err}</div>
        `
        return
}

createTransaction.addEventListener("submit", async (e) => {
    e.preventDefault()

    const description = createTransaction.description.value;
    const amount = Number(createTransaction.amount.value);
    const type = createTransaction.type.value

    console.log(amount)

    if (!description || !amount || !type) setError("All fields are required.")
    if (type !== "income" && type !== "expense") setError("Transaction type is invalid.")
    if (typeof(amount) !== "number") setError("Amount must be a number.")

    try {
        const res = await fetch("/transactions/create", {
            method: "POST",
            body: JSON.stringify({description, amount, type}),
            headers: {"Content-Type": "application/json"}
        })
        const data = await res.json()

        if (data.success) window.location.reload()
        else setError(data.error)
    } catch(err) {
        console.log(err)
    }
})