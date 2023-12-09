const params = new URLSearchParams(window.location.search);
const roomId = params.get("roomId");

if (!roomId) {
    window.history.back();
}

const roomName = document.getElementById("roomName");
const reviewBox = document.getElementById("reviewBox");

function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < rating; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    return stars;
}

let roomReviewsData = [];
getRoomReviewsInfo(roomId)
    .then((data) => {
        roomReviewsData = data.bookings;

        roomName.innerHTML = `${data.name} Reviews`;

        // Remove any existing reviews
        reviewBox.innerHTML = "";

        // Add new reviews
        roomReviewsData.forEach((review) => {
            reviewBox.innerHTML += `
                <div class="testimonial-card">
                    <div class="testimonial-profile">
                        <div class="testimoni-top">
                            <div class="testimonial-picture">
                                <img src="data:image/png;base64,${review.user.photo}" alt="" />
                            </div>
                            <div class="user-name">
                                <strong>${review.user.name}</strong>
                                <span>${new Date(review.updatedAt).toISOString().slice(0, 10)}</span>
                            </div>
                        </div>

                        <div class="testimonial-reviews">
                            ${generateStars(review.rating)}
                        </div>
                    </div>
                    <div class="testimonial-comment">
                        <p>
                            ${review.review}
                        </p>
                    </div>
                </div>
            `;
        });
    })
    .catch((error) => {
        console.error("Error:", error);
    });
