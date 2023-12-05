checkLogin().then((isLoggedIn) => {
    console.log("User is logged in: " + isLoggedIn);
    console.log("index: " + window.location.pathname.endsWith("index.html"));
    console.log("login: " + window.location.pathname.endsWith("login.html"));
    console.log("signup: " + window.location.pathname.endsWith("signup.html"));

    // if (!isLoggedIn) {
    //     if (!window.location.pathname.endsWith("") || !window.location.pathname.endsWith("login.html") || !window.location.pathname.endsWith("signup.html")) {
    //         alert("You are not logged in. You will be redirected to the login page.");
    //         window.location.href = "login.html";
    //     }
    // } else {
    //     if (window.location.pathname.endsWith("") || window.location.pathname.endsWith("login.html") || window.location.pathname.endsWith("signup.html")) {
    //         window.location.href = "home.html";
    //     }
    // }
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
