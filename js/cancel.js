document.getElementById("cancel").addEventListener("click", function (event) {
    event.preventDefault(); // urgent to prevent form submission

    window.history.back();
});
