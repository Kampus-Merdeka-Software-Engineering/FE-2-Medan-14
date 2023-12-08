const allStar = document.querySelectorAll(".rating .star");
const ratingValue = document.querySelector(".rating input");
const review = document.getElementById("review");

const params = new URLSearchParams(window.location.search);
const bookingId = params.get("bookingId");

if (!bookingId) {
    window.history.back();
}

let checker_rating = false;
let checker_review = false;

allStar.forEach((item, idx) => {
    item.addEventListener("click", function () {
        let click = 0;
        ratingValue.value = idx + 1;

        allStar.forEach((i) => {
            i.classList.replace("bxs-star", "bx-star");
            i.classList.remove("active");
        });
        for (let i = 0; i < allStar.length; i++) {
            if (i <= idx) {
                allStar[i].classList.replace("bx-star", "bxs-star");
                allStar[i].classList.add("active");
            } else {
                allStar[i].style.setProperty("--i", click);
                click++;
            }
        }

        if (ratingValue.value === "") {
            checker_rating = false;
        } else {
            checker_rating = true;
        }
    });
});

review.addEventListener("keyup", function (e) {
    if (review.value.trim() === "") {
        setError(review, "Review must not be blank");
        checker_review = false;
    } else {
        setSuccess(review);
        checker_review = true;
    }
});

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // urgent to prevent form submission

    if (checker_rating === false || checker_review === false) {
        // error handling

        setErrorBox("Please fill in the form correctly");
    } else {
        // for debugging
        window.location.href = "bookings.html";
    }
});
