const params = new URLSearchParams(window.location.search);
const bookingId = params.get("bookingId");

if (!bookingId) {
    window.history.back();
}

const edit = document.getElementById("edit");
const checkout = document.getElementById("checkout");
const review = document.getElementById("review");

edit.style.display = "none";
checkout.style.display = "none";
review.style.display = "none";

// Fetch data from the API
getBookingInfo(bookingId)
    .then((data) => {
        // Update the HTML elements with the data
        document.getElementById("roomImageDisplay").src = `data:image/png;base64,${data.room.photos[0].photo}`;
        document.getElementById("roomNameDisplay").innerHTML = `${data.id} - ${data.room.name}`;
        document.getElementById("bookingsDateDisplay").innerHTML = `Booking Date: ${new Date(data.createdAt).toISOString().slice(0, 10)}`;
        document.getElementById("bookingsStatus").innerHTML = `Status: ${data.status}`;
        document.getElementById("currentPriceDisplay").innerHTML = `Current Price: Rp${data.room.currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
        document.getElementById("bookingsDurationDisplay").innerHTML = `Booking Duration: ${data.startDate} to ${data.endDate} (${calculateTotalDays(data.startDate, data.endDate)} Days)`;
        document.getElementById("totalRoomDisplay").innerHTML = `Total Rooms: ${data.totalRoom} Rooms`;
        document.getElementById("totalPriceDisplay").innerHTML = `Total Price: Rp${data.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

        document.getElementById("roomDetailLinkPhoto").href = `detailrooms.html?roomId=${data.room.id}`;
        document.getElementById("roomDetailLinkName").href = `detailrooms.html?roomId=${data.room.id}`;

        if (data.status === "Pending") {
            edit.style.display = "";
        } else if (data.status === "Processed") {
            checkout.style.display = "";
        } else if (data.status === "Checkout") {
            review.style.display = "";
        }
    })
    .catch((error) => console.error("Error:", error));

edit.addEventListener("click", () => {
    window.location.href = `formbookings.html?bookingId=${bookingId}`;
});

checkout.addEventListener("click", () => {
    fetch(`${bookingUrl}/${bookingId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    })
        .then((response) => {
            if (response.ok) {
                window.location.href = "bookings.html";
            }
        })
        .catch((error) => console.error("Error:", error));
});

review.addEventListener("click", () => {
    window.location.href = `formreview.html?bookingId=${bookingId}`;
});
