const params = new URLSearchParams(window.location.search);
const roomId = params.get("roomId");

if (!roomId) {
    window.history.back();
}

const photoDisplay = getElementById("photoDisplay");
const photoSelect = getElementById("photoSelect");
const roomName = getElementById("roomName");
const currentPrice = getElementById("currentPrice");
const discount = getElementById("discount");
const normalPrice = getElementById("normalPrice");
const category = getElementById("category");
const roomQty = getElementById("roomQty");
const bedroom = getElementById("bedroom");
const bathroom = getElementById("bathroom");
const roomSize = getElementById("roomSize");
const mediaTech = getElementById("mediaTech");
const kitchen = getElementById("kitchen");
const service = getElementById("service");
const description = getElementById("description");
const reviewCount = getElementById("reviewCount");
const reviewUserPhoto = getElementById("reviewUserPhoto");
const reviewUserName = getElementById("reviewUserName");
const reviewDate = getElementById("reviewDate");
const reviewText = getElementById("reviewText");

let roomData;
let roomReviewsData;

getRoomInfo(roomId)
    .then((data) => {
        roomData = data;

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

        reviewCount.innerHTML = `Showing 1/${roomReviewsData.reviews.length} Reviews`;
        reviewUserPhoto.src = `data:image/png;base64,${roomReviewsData.user.photo}`;
        reviewUserName.innerHTML = roomReviewsData.user.name;
        reviewDate.innerHTML = roomReviewsData.updatedAt.toISOString().slice(0, 10);
        setRatingReviews(roomReviewsData.rating);
        reviewText.innerHTML = roomReviewsData.review;
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// booking button
document.getElementById("booking").addEventListener("click", () => {
    window.location.href = `formbookings.html?roomId=${roomId}`;
});

document.getElementById("viewcomment").addEventListener("click", () => {
    window.location.href = `reviews.html?roomId=${roomId}`;
});
