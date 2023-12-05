document.getElementById("logout").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default action (navigation)

    // Call your logout function here
    logout()
        .then(() => {
            console.log("Logged out successfully");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

async function logout() {
    try {
        const response = await fetch(logoutUrl, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.msg);
        }

        // Redirect the user to the login page
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error:", error);
    }
}
