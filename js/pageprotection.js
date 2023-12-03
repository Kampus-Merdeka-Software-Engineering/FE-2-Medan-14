checkLogin().then((isLoggedIn) => {
    if (!isLoggedIn) {
        alert("You are not logged in. You will be redirected to the login page.");

        window.location.href = "login.html";
    }

    console.log("User is logged in");
});

async function checkLogin() {
    try {
        const response = await fetch(meUrl, {
            method: "GET",
            credentials: "include", // include, same-origin, *omit
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return true; // User is logged in
    } catch (error) {
        console.error(error); // Log the error for debugging
        return false; // User is not logged in
    }
}
