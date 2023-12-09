// Fetch data from the API
fetch(bookingUrl, {
    credentials: "include", // Include credentials in the request
})
    .then((response) => response.json())
    .then((data) => {
        // For each booking in the data...
        data.forEach((booking) => {
            // Based on the booking status, append the HTML string to the corresponding box
            if (booking.status === "Pending") {
                document.getElementById("pendingBox").innerHTML += generateBookingCardHTML(booking);
            } else if (booking.status === "Processed") {
                document.getElementById("processedBox").innerHTML += generateBookingCardHTML(booking);
            } else if (booking.status === "Checkout") {
                document.getElementById("checkoutBox").innerHTML += generateBookingCardHTML(booking);
            } else if (booking.status === "Done") {
                document.getElementById("doneBox").innerHTML += generateBookingCardHTML(booking);
            }
        });
    })
    .catch((error) => console.error("Error:", error));

function generateBookingCardHTML(item) {
    return `
          <div class="courses-container">
              <div class="rooms-card">
                  <a href="detailbookings.html?bookingId=${item.id}">
                      <img class="rooms-preview" src="data:image/png;base64,${item.room.photos[0].photo}" alt="" />
                  </a>
                  <div class="rooms-info">
                      <h6>${item.status} - ${new Date(item.createdAt).toISOString().slice(0, 10)}</h6>
                      <a href="detailbookings.html?bookingId=${item.id}">
                          <h2>${item.id} - ${item.room.name}</h2>
                          <button class="btn">Detail</button>
                      </a>
                  </div>
              </div>
          </div>
      `;
}
