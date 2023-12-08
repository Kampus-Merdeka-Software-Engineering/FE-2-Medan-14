checkLogin().then((isLoggedIn) => {
    isIndexPage = window.location.href === "https://kampus-merdeka-software-engineering.github.io/FE-2-Medan-14/" || window.location.pathname.endsWith("index.html");
    isLoginPage = window.location.pathname.endsWith("login.html");
    isSignupPage = window.location.pathname.endsWith("signup.html");

    if (!isLoggedIn) {
        if (!isIndexPage && !isLoginPage && !isSignupPage) {
            alert("You are not logged in. You will be redirected to the login page.");
            window.location.href = "login.html";
        }
    } else {
        if (isIndexPage || isLoginPage || isSignupPage) {
            window.location.href = "home.html";
        }
    }
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
        return false; // User is not logged in
    }
}
