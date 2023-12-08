const imgs = document.querySelectorAll(".img-select a");
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage() {
    const displayWidth = document.querySelector(".img-showcase img:first-child").clientWidth;

    document.querySelector(".img-showcase").style.transform = `translateX(${-(imgId - 1) * displayWidth}px)`;
}

window.addEventListener("resize", slideImage);

// setting stars rating
function setRating(rating, totalBooking) {
    if (!rating || !totalBooking || rating < 1 || rating > 5 || totalBooking < 1) {
        document.getElementById("productRating").style.display = "none";
        return;
    }

    const stars = document.querySelectorAll("#productRating i");
    const ratingText = document.querySelector("#productRating span");

    // Reset all stars
    stars.forEach((star) => {
        star.classList.remove("fa-star");
        star.classList.remove("fa-star-half-alt");
        star.classList.add("fa-star-o");
    });

    // Set full stars
    for (let i = 0; i < Math.floor(rating); i++) {
        stars[i].classList.remove("fa-star-o");
        stars[i].classList.add("fa-star");
    }

    // Set half star
    if (rating % 1 !== 0) {
        stars[Math.floor(rating)].classList.remove("fa-star-o");
        stars[Math.floor(rating)].classList.add("fa-star-half-alt");
    }

    // Set rating text
    ratingText.innerHTML = `${rating.toFixed(2)} (${totalBooking} rating)`;
}

// Call the function with the desired rating
setRating(5, 1000);

// setting stars rating reviews
function setRatingReviews(rating) {
    if (!rating || rating < 1 || rating > 5) {
        document.getElementById("reviewsRating").style.display = "none";
        return;
    }

    const stars = document.querySelectorAll("#reviewsRating i");

    // Reset all stars
    stars.forEach((star) => {
        star.classList.remove("fa-star");
        star.classList.remove("fa-star-half-alt");
        star.classList.add("fa-star-o");
    });

    // Set full stars
    for (let i = 0; i < Math.floor(rating); i++) {
        stars[i].classList.remove("fa-star-o");
        stars[i].classList.add("fa-star");
    }

    // Set half star
    if (rating % 1 !== 0) {
        stars[Math.floor(rating)].classList.remove("fa-star-o");
        stars[Math.floor(rating)].classList.add("fa-star-half-alt");
    }
}

// Call the function with the desired rating
setRatingReviews(4);

// booking button
document.getElementById("booking").addEventListener("click", () => {
    window.location.href = "formbookings.html?roomId=1";
});
