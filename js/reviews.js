const params = new URLSearchParams(window.location.search);
const roomId = params.get("roomId");

if (!roomId) {
    window.history.back();
}

getRoomReviewsInfo(roomId).then((data) => {
    roomReviewsData = data;

    // Remove any existing reviews
    while (reviewUserPhoto.firstChild) {
        reviewUserPhoto.firstChild.remove();
    }

    // Add new reviews
    for (let i = 0; i < roomReviewsData.length; i++) {
        const reviewUserPhoto = document.createElement("img");
        reviewUserPhoto.src = roomReviewsData[i].userPhoto;
        reviewUserPhoto.alt = "User Photo";
        reviewUserPhoto.classList.add("user-photo");

        const reviewUserName = document.createElement("h3");
        reviewUserName.textContent = roomReviewsData[i].userName;

        const reviewDate = document.createElement("p");
        reviewDate.textContent = roomReviewsData[i].reviewDate;

        const reviewText = document.createElement("p");
        reviewText.textContent = roomReviewsData[i].reviewText;

        const reviewBox = document.createElement("div");
        reviewBox.classList.add("review-box");
        reviewBox.appendChild(reviewUserPhoto);
        reviewBox.appendChild(reviewUserName);
        reviewBox.appendChild(reviewDate);
        reviewBox.appendChild(reviewText);

        reviewUserPhoto.appendChild(reviewBox);
    }
});
