// Fetch data from the API
fetch(roomUrl, {
    credentials: "include", // Include credentials in the request
})
    .then((response) => response.json())
    .then((data) => {
        // Sort the data by totalBooking in descending order and limit to 5 items
        let sortedByTotalBooking = data.sort((a, b) => b.totalBooking - a.totalBooking).slice(0, 5);

        // Sort the data by discount in descending order and limit to 5 items
        let sortedByDiscount = data.sort((a, b) => b.discount - a.discount).slice(0, 5);

        // Generate the HTML for each item
        let htmlByTotalBooking = sortedByTotalBooking.map((item) => generateHTML(item)).join("");
        let htmlByDiscount = sortedByDiscount.map((item) => generateHTML(item)).join("");

        // Insert the HTML into the displayListTop and displayListDiscount elements
        document.getElementById("displayListTop").innerHTML = htmlByTotalBooking;
        document.getElementById("displayListDiscount").innerHTML = htmlByDiscount;
    })
    .catch((error) => console.error("Error:", error));

// Function to generate HTML for an item
function generateHTML(item) {
    return `
        <li>
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
                        <a href="detailrooms.html?roomId=${item.id}">${item.name} <br />- ${item.category}</a>
                        <p class="card-rating ${item.totalBooking <= 0 ? "hidden" : ""}">
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
        </li>
    `;
}
