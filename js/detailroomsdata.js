const params = new URLSearchParams(window.location.search);
const roomId = params.get("roomId");

if (!roomId) {
    window.history.back();
}

const photoDisplay = document.getElementById("photoDisplay");
const photoSelect = document.getElementById("photoSelect");
const roomName = document.getElementById("roomName");
const currentPrice = document.getElementById("currentPrice");
const discount = document.getElementById("discount");
const normalPrice = document.getElementById("normalPrice");
const category = document.getElementById("category");
const roomQty = document.getElementById("roomQty");
const bedroom = document.getElementById("bedroom");
const bathroom = document.getElementById("bathroom");
const roomSize = document.getElementById("roomSize");
const mediaTech = document.getElementById("mediaTech");
const kitchen = document.getElementById("kitchen");
const service = document.getElementById("service");
const description = document.getElementById("description");
const reviewCount = document.getElementById("reviewCount");
const reviewUserPhoto = document.getElementById("reviewUserPhoto");
const reviewUserName = document.getElementById("reviewUserName");
const reviewDate = document.getElementById("reviewDate");
const reviewText = document.getElementById("reviewText");

const btnBooking = document.getElementById("booking");
const btnViewComment = document.getElementById("viewcomment");

btnBooking.addEventListener("click", () => {
    window.location.href = `formbookings.html?roomId=${roomId}`;
});

btnViewComment.addEventListener("click", () => {
    window.location.href = `reviews.html?roomId=${roomId}`;
});

let roomData;
let roomReviewsData;

getRoomInfo(roomId)
    .then((data) => {
        roomData = data;

        if (roomData.totalBooking <= 0) {
            document.getElementById("reviewBox").style.display = "none";
        }

        if (roomData.roomQty <= 0) {
            btnBooking.style.display = "none";
        }

        // Remove any existing images
        while (photoDisplay.firstChild) {
            photoDisplay.firstChild.remove();
        }

        // Add new images
        roomData.photos.forEach((photo) => {
            let img = document.createElement("img");
            img.src = `data:image/png;base64,${photo.photo}`;
            img.alt = "Room photo";
            photoDisplay.appendChild(img);
        });

        // Remove any existing images
        while (photoSelect.firstChild) {
            photoSelect.firstChild.remove();
        }

        // Add new images
        roomData.photos.forEach((photo, index) => {
            let imgItem = document.createElement("div");
            imgItem.className = "img-item";
            let a = document.createElement("a");
            a.href = "#";
            a.dataset.id = index + 1;
            let img = document.createElement("img");
            img.src = `data:image/png;base64,${photo.photo}`;
            img.alt = "Room photo";
            a.appendChild(img);
            imgItem.appendChild(a);
            photoSelect.appendChild(imgItem);
        });

        roomName.innerHTML = roomData.name;
        setRating(roomData.avgRating, roomData.totalBooking);
        currentPrice.innerHTML = `Rp${roomData.currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}/Malam`;
        discount.innerHTML = `${roomData.discount * 100}%`;
        normalPrice.innerHTML = `Rp${roomData.normalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
        category.innerHTML = `Category: ${roomData.category}`;
        roomQty.innerHTML = `Available Rooms: ${roomData.roomQty}`;
        bedroom.innerHTML = `Bedrooms: ${roomData.bedroom}`;
        bathroom.innerHTML = `Bathrooms: ${roomData.bathroom}`;
        roomSize.innerHTML = `Room Size: ${roomData.roomSize}`;
        mediaTech.innerHTML = `Media/Tech: ${roomData.mediaTech}`;
        kitchen.innerHTML = `Kitchen: ${roomData.kitchen}`;
        service.innerHTML = `Service: ${roomData.service}`;
        description.innerHTML = roomData.description;

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
    })
    .catch((error) => {
        console.error("Error:", error);
    });

getRoomReviewsInfo(roomId)
    .then((data) => {
        if (data.length <= 0) {
            document.getElementById("reviewBox").style.display = "none";
            return;
        }

        roomReviewsData = data.bookings[0];

        reviewCount.innerHTML = `Showing 1/${data.bookings.length} Reviews`;
        reviewUserPhoto.src = `data:image/png;base64,${roomReviewsData.user.photo}`;
        reviewUserName.innerHTML = roomReviewsData.user.name;
        reviewDate.innerHTML = new Date(roomReviewsData.updatedAt).toISOString().slice(0, 10);
        setRatingReviews(roomReviewsData.rating);
        reviewText.innerHTML = roomReviewsData.review;
    })
    .catch((error) => {
        console.error("Error:", error);
    });
