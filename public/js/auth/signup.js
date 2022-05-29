const signupForm = document.querySelector("#signup-form")
let error = ""
const errMsg = document.querySelector(".err-msg")
const setError = (err) => {
    errMsg.innerHTML = `
        <div class="card card-body text-danger">${error}</div>
        `
        return
}

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = signupForm.username.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const confirm_password = signupForm.confirm_password.value;

    if (password !== confirm_password) setError("Passwords do not match.")

    if (password.length < 6)setError("Password should have at least 3 characters.")

    if (username.length < 3)setError("Username should have at least 3 characters.")

    if (!username || !email || !password || !confirm_password) setError("All fields are required.")


    try {
        const res = await fetch("/auth/signup", {
            method: "POST",
            body: JSON.stringify({username, email, password}),
            headers: {"Content-Type": "application/json"}
        })
        const data = await res.json()

        if (data.success) window.location.replace("/auth/signin")
        else setError(data.error)

    } catch (err) {
        console.log(err)
    }
})