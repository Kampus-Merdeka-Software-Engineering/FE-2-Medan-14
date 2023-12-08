// Fetch data from the API
fetch(roomUrl, {
    credentials: "include", // Include credentials in the request
})
    .then((response) => response.json())
    .then((data) => {
        // Get the listRooms div
        let listRooms = document.getElementById("listRooms");

        // Clear the listRooms div
        listRooms.innerHTML = "";

        // Loop through the data
        for (let item of data) {
            // Create a new div
            let div = document.createElement("div");
            div.className = "box";
            div.dataset.category = item.category;
            div.dataset.rating = item.avgRating;
            div.dataset.booking = item.totalBooking;
            div.dataset.price = item.currentPrice;

            // Add the HTML for the property card
            div.innerHTML = `
                <div class="property-card">
                    <figure class="card-banner">
                        <a href="detailrooms.html?roomId=${item.id}">
                            <img src="data:image/png;base64,${item.photos[0].photo}" alt="${item.name}" class="w-100" />
                        </a>

                        <div class="card-badge green">For Rent</div>
                    </figure>

                    <div class="card-content">
                        <div class="card-price">
                            <p class="card-discount-price">
                                <span class="discount">${item.discount * 100}%</span>
                                <span class="normal-price">Rp${item.normalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                            </p>
                            <h4>Rp${item.currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}/Malam</h4>
                        </div>

                        <h3 class="h3 card-title">
                            <a href="detailrooms.html?roomId=${item.id}">${item.name} - ${item.category}</a>
                            <p class="card-rating">
                                <i class="fa-solid fa-star"></i>
                                <span class="rating-text">${item.avgRating.toFixed(2)}</span>
                                <span class="total-booking">(${item.totalBooking})</span>
                            </p>
                        </h3>

                        <p class="card-text">${item.description}</p>

                        <ul class="card-list">
                            <li class="card-item">
                                <strong>${item.bedroom.split(",")[0]}</strong>
                                <i class="fa-solid fa-bed"></i>
                                <span>Bedrooms</span>
                            </li>

                            <li class="card-item">
                                <strong>${item.bathroom.split(",")[0]}</strong>
                                <i class="fa-solid fa-bath"></i>
                                <span>Bathrooms</span>
                            </li>

                            <li class="card-item">
                                <strong>${item.roomSize.slice(0, -3)}</strong>
                                <i class="fa-regular fa-square"></i>
                                <span>m²</span>
                            </li>
                        </ul>
                    </div>

                    <div class="card-footer">
                        <a href="detailrooms.html?roomId=${item.id}">
                            <button class="card-button">Detail</button>
                        </a>
                    </div>
                </div>
            `;

            // Add the new div to the listRooms div
            listRooms.appendChild(div);
        }
    })
    .catch((error) => console.error("Error:", error));
