checkLogin().then((isLoggedIn) => {
    if (!isLoggedIn) {
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

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return true; // User is logged in
    } catch (error) {
        return false; // User is not logged in
    }
}
