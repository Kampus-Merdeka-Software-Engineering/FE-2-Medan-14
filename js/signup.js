const nameUser = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confPassword = document.getElementById("confPassword");

let checker_name = false;
let checker_phone = false;
let checker_email = false;
let checker_password = false;
let checker_confPassword = false;

nameUser.addEventListener("keyup", function (e) {
    if (nameUser.value === "") {
        setError(nameUser, "Name must not be blank");
        checker_name = false;
    } else if (checkSymbol(nameUser.value)) {
        setError(nameUser, "Name must not contain Symbol");
        checker_name = false;
    } else if (nameUser.value.length < 2) {
        setError(nameUser, "Name must be more than one letter");
        checker_name = false;
    } else if (!checkName(nameUser.value)) {
        setError(nameUser, "Name must not begin or end with a space");
        checker_name = false;
    } else {
        setSuccess(nameUser);
        checker_name = true;
    }
});

phone.addEventListener("keyup", function (e) {
    if (phone.value === "") {
        setError(phone, "The phone number must not be blank");
        checker_phone = false;
    } else if (checkString(phone.value)) {
        setError(phone, "The phone number may not contain letters");
        checker_phone = false;
    } else if (phone.value.length < 3) {
        setError(phone, "The phone number must consist of 3 to 12 numbers");
        checker_phone = false;
    } else if (checkSymbol(phone.value)) {
        setError(phone, "The phone number must not contain Symbol");
        checker_phone = false;
    } else if (checkWhiteSpace(phone.value)) {
        setError(phone, "The phone number must not begin or end with a space");
        checker_phone = false;
    } else if (!checkPhone(phone.value)) {
        setError(phone, "Invalid phone number");
        checker_phone = false;
        // } else if (!checkUniquePhone(phone.value)) {
        //     setError(phone, "Phone already registered");
        //     checker_phone = false;
    } else {
        setSuccess(phone);
        checker_phone = true;
    }
});

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
        // } else if (!checkUniqueEmail(email.value)) {
        //     setError(email, "Email already registered");
        //     checker_email = false;
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

        if (confPassword.value !== password.value && confPassword.value !== "") {
            setError(confPassword, "Password does not match");
            setError(password, "Password does not match");

            checker_confPassword = false;
            checker_password = false;
        } else if (confPassword.value === password.value && confPassword.value !== "") {
            setSuccess(confPassword);
            checker_confPassword = true;
        }
    }
});

confPassword.addEventListener("keyup", function (e) {
    if (confPassword.value !== password.value) {
        setError(confPassword, "Password does not match");
        setError(password, "Password does not match");

        checker_confPassword = false;
        checker_password = false;
    } else {
        setSuccess(confPassword);
        checker_confPassword = true;

        setSuccess(password);
        checker_password = true;
    }
});

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // urgent to prevent form submission

    if (checker_name == false || checker_phone == false || checker_email == false || checker_password == false || checker_confPassword == false) {
        // error handling

        setErrorBox("Please fill in the form correctly");
    } else {
        // for debugging
        // window.location.href = "home.html";

        // signup
        fetch(signupUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameUser.value,
                phone: phone.value,
                email: email.value,
                password: password.value,
            }),
            credentials: "include",
        })
            .then((response) => {
                console.log(response.status); // Log the response status code
                if (response.ok) {
                    // If signup is successful, redirect to home page
                    window.location.href = "login.html";
                } else {
                    response.json().then((data) => {
                        setErrorBox(data.msg);
                        setError(nameUser, data.msg);
                        setError(phone, data.msg);
                        setError(email, data.msg);
                        setError(password, data.msg);
                    });
                    checker_name = false;
                    checker_phone = false;
                    checker_email = false;
                    checker_password = false;
                }
            })
            .catch((error) => {
                // If there's an error, display it
                setErrorBox(error.message);
                setError(nameUser, error.message);
                setError(phone, error.message);
                setError(email, error.message);
                setError(password, error.message);

                checker_name = false;
                checker_phone = false;
                checker_email = false;
                checker_password = false;
            });
    }
});
