const email = document.getElementById("email");
const password = document.getElementById("password");

let checker_email = false;
let checker_password = false;

email.addEventListener("keyup", function (e) {
    if (email.value === "") {
        setError(email, "Email must not be blank");
        checker_email = false;
    } else if (checkWhiteSpace(email.value)) {
        setError(email, "Email must not contain white space");
        checker_email = false;
    } else if (!checkEmail(email.value)) {
        setError(email, "Invalid email");
        checker_email = false;
    } else {
        setSuccess(email);
        checker_email = true;
    }
});

password.addEventListener("keyup", function (e) {
    if (password.value === "") {
        setError(password, "Password must not be blank");
        checker_password = false;
    } else if (password.value.length < 5) {
        setError(password, "Passwords must be 5 to 28 characters long");
        checker_password = false;
    } else if (checkWhiteSpace(password.value)) {
        setError(password, "Password must not contain white space");
        checker_password = false;
    } else {
        setSuccess(password);
        checker_password = true;
    }
});

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // urgent to prevent form submission

    if (checker_email == false || checker_password == false) {
        // error handling

        setErrorBox("Please fill in the form correctly");
    } else {
        // for debugging
        // window.location.href = "home.html";

        //  login
        fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email.value, password: password.value }),
            credentials: "include",
        })
            .then((response) => {
                console.log(response.status); // Log the response status code
                if (response.ok) {
                    // If login is successful, redirect to home page
                    window.location.href = "home.html";
                } else {
                    response.json().then((data) => {
                        setErrorBox(data.msg);
                        setError(email, data.msg);
                        setError(password, data.msg);
                    });
                    checker_email = false;
                    checker_password = false;
                }
            })
            .catch((error) => {
                // If there's an error, display it
                setErrorBox(error.message);
                setError(email, error.message);
                setError(password, error.message);

                checker_email = false;
                checker_password = false;
            });
    }
});
