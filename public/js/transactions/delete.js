const deleteBtns = document.querySelectorAll(".delete-btn")

deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", async (e) => {
        e.preventDefault()

        try {
            const res = await fetch (`/transactions/${deleteBtn.id}/delete`, {
                method: "DELETE"
            })
            const data = await res.json()

            if (data.success) window.location.reload()
        } catch (err) {
            console.log(err)
        }
    })
})