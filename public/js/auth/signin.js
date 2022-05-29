const signinForm = document.querySelector("#signin-form")
let error = ""
const errMsg = document.querySelector(".err-msg")
const setError = (err) => {
    errMsg.innerHTML = `
        <div class="card card-body text-danger">${err}</div>
        `
        return
}

signinForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = signinForm.username.value;
    const password = signinForm.password.value;

    if (!username || !password) setError("All fields are required.")

    try {
        const res = await fetch("/auth/signin", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {"Content-Type": "application/json"}
        })
        const data = await res.json()

        if (data.success) window.location.replace("/")
        else setError(data.error)

    } catch (err) {
        console.log(err)
    }
})