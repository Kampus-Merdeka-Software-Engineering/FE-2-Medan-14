const edit = document.getElementById("edit");
const checkout = document.getElementById("checkout");
const review = document.getElementById("review");

edit.addEventListener("click", () => {
    window.location.href = "formbookings.html?bookingId=1";
});

checkout.addEventListener("click", () => {});

review.addEventListener("click", () => {
    window.location.href = "formreview.html?bookingId=1";
});
