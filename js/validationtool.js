function setError(input, message) {
    const inputBox = input.parentElement;
    const small = inputBox.querySelector("small");

    // add error message inside small
    small.innerText = message;

    // add error class
    inputBox.className = "input-box error";
}

function setSuccess(input) {
    const inputBox = input.parentElement; // .input-box

    // add success class
    inputBox.className = "input-box success";
}

function setErrorPhoto(input, message) {
    const inputBox = input.parentElement;
    const small = inputBox.querySelector("small");

    // add error message inside small
    small.innerText = message;

    // add error class
    inputBox.className = "input-box-photo error";
}

function setSuccessPhoto(input) {
    const inputBox = input.parentElement; // .input-box

    // add success class
    inputBox.className = "input-box-photo success";
}

function setErrorBox(message) {
    document.querySelector(".error-box").style.display = "flex";
    document.querySelector(".error-message").innerHTML = message;
}
