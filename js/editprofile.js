const photo = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");
const nameUser = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confPassword = document.getElementById("confPassword");

let checker_photo = true;
let checker_name = true;
let checker_phone = true;
let checker_email = true;
let checker_password = true;
let checker_confPassword = true;

let base64String;
let profileInfo;

setSuccessPhoto(photo);
setSuccess(nameUser);
setSuccess(phone);
setSuccess(email);
setSuccess(password);
setSuccess(confPassword);

getProfileInfo()
    .then((info) => {
        profileInfo = info;

        base64String = profileInfo.photo;

        photoPreview.src = `data:image/png;base64,${base64String}`;
        nameUser.value = profileInfo.name;
        phone.value = profileInfo.phone;
        email.value = profileInfo.email;
    })
    .catch((error) => {
        console.error("Error:", error);
    });

photoPreview.addEventListener("click", function () {
    photo.click();
});

photo.addEventListener("change", function (e) {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = function () {
        base64String = reader.result.split(",")[1];

        let byteSize = (base64String.length * 3) / 4;

        if (byteSize > 2000000) {
            photoPreview.src = "./img/user2.png";
            setErrorPhoto(photo, "Photo must be less than 2MB");
            checker_photo = false;
        } else {
            photoPreview.src = `data:image/png;base64,${base64String}`;
            setSuccessPhoto(photo);
            checker_photo = true;
        }
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

nameUser.addEventListener("keyup", function (e) {
    if (nameUser.value === profileInfo.name) {
        setSuccess(nameUser);
        checker_name = true;
    } else if (nameUser.value === "") {
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
    if (phone.value === profileInfo.phone) {
        setSuccess(phone);
        checker_phone = true;
    } else if (phone.value === "") {
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
    } else {
        checkUniquePhone(phone.value)
            .then((isUnique) => {
                if (isUnique) {
                    // If the phone number is unique, do something
                    setSuccess(phone);
                    checker_phone = true;
                } else {
                    setError(phone, "Phone already registered");
                    checker_phone = false;
                }
            })
            .catch((error) => {
                // If there's an error, handle it
                setError(phone, error);
                checker_phone = false;
            });
    }
});

email.addEventListener("keyup", function (e) {
    if (email.value === profileInfo.email) {
        setSuccess(email);
        checker_email = true;
    } else if (email.value === "") {
        setError(email, "Email must not be blank");
        checker_email = false;
    } else if (checkWhiteSpace(email.value)) {
        setError(email, "Email must not contain white space");
        checker_email = false;
    } else if (!checkEmail(email.value)) {
        setError(email, "Invalid email");
        checker_email = false;
    } else {
        checkUniqueEmail(email.value)
            .then((isUnique) => {
                if (isUnique) {
                    // If the email is unique, do something
                    setSuccess(email);
                    checker_email = true;
                } else {
                    setError(email, "Email already registered");
                    checker_email = false;
                }
            })
            .catch((error) => {
                // If there's an error, handle it
                setError(email, error);
                checker_email = false;
            });
    }
});

password.addEventListener("keyup", function (e) {
    setError(confPassword, "Password does not match");
    checker_confPassword = false;

    if (password.value === "") {
        setSuccess(password);
        checker_password = true;

        if (confPassword.value === password.value) {
            setSuccess(confPassword);
            checker_confPassword = true;
        }
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
        } else if (confPassword.value === password.value) {
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

    if (checker_name == false || checker_phone == false || checker_email == false || checker_password == false || checker_confPassword == false || checker_photo == false) {
        // error handling
        setErrorBox("Please fill in the form correctly");
    } else {
        let data = {};

        if (nameUser.value !== profileInfo.name) {
            data.name = nameUser.value;
        }

        if (phone.value !== profileInfo.phone) {
            data.phone = phone.value;
        }

        if (email.value !== profileInfo.email) {
            data.email = email.value;
        }

        if (password.value !== "") {
            data.password = password.value;
            data.confPassword = confPassword.value;
        }

        if (base64String !== profileInfo.photo) {
            data.photo = base64String;
        }

        // Use fetch to send the data as JSON
        fetch(updateProfileUrl, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        })
            // rest of your code
            .then((response) => {
                if (response.ok) {
                    window.history.back();
                } else {
                    response.json().then((data) => {
                        setErrorBox(data.msg);
                        setSuccessPhoto(photo);
                        setSuccess(nameUser);
                        setSuccess(phone);
                        setSuccess(email);
                        setSuccess(password);
                        setSuccess(confPassword);
                    });
                    checker_name = true;
                    checker_phone = true;
                    checker_email = true;
                    checker_password = true;
                    checker_confPassword = true;
                    checker_photo = true;

                    nameUser.value = profileInfo.name;
                    phone.value = profileInfo.phone;
                    email.value = profileInfo.email;
                    password.value = "";
                    confPassword.value = "";
                    photoPreview.src = `data:image/png;base64,${profileInfo.photo}`;
                }
            })
            .catch((error) => {
                // If there's an error, display it
                setErrorBox(error.message);
                setSuccessPhoto(photo);
                setSuccess(nameUser);
                setSuccess(phone);
                setSuccess(email);
                setSuccess(password);
                setSuccess(confPassword);

                checker_name = true;
                checker_phone = true;
                checker_email = true;
                checker_password = true;
                checker_confPassword = true;
                checker_photo = true;

                nameUser.value = profileInfo.name;
                phone.value = profileInfo.phone;
                email.value = profileInfo.email;
                password.value = "";
                confPassword.value = "";
                photoPreview.src = `data:image/png;base64,${profileInfo.photo}`;
            });
    }
});
