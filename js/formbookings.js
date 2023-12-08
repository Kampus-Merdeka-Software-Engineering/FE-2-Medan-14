const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const totalRoom = document.getElementById("totalRoom");

const roomNameDisplay = document.getElementById("roomNameDisplay");
const currentPriceDisplay = document.getElementById("currentPriceDisplay");
const totalDaysDisplay = document.getElementById("totalDaysDisplay");
const totalRoomDisplay = document.getElementById("totalRoomDisplay");
const totalPriceDisplay = document.getElementById("totalPriceDisplay");

const params = new URLSearchParams(window.location.search);
const roomId = params.get("roomId");
const bookingId = params.get("bookingId");

const currentPrice = 100000;
currentPriceDisplay.innerHTML = "Current Price: Rp" + currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let checker_startDate = true;
let checker_endDate = true;
let checker_totalRoom = false;

setSuccess(startDate);
setSuccess(endDate);

let today = dateFormatter(new Date());
let tomorrow = dateFormatter(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));

startDate.min = today;
endDate.min = tomorrow;

if (bookingId) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("edit").style.display = "inherit";

    // for debugging
    startDate.value = "2023-12-12";
    endDate.value = "2023-12-18";
    totalRoom.value = "3";

    setSuccess(totalRoom);
    checker_totalRoom = true;

    roomNameDisplay.innerHTML = "Test";
    totalDaysDisplay.innerHTML = "Total Days: " + calculateTotalDays(startDate.value, endDate.value) + " Days";
    totalRoomDisplay.innerHTML = "Total Rooms: " + totalRoom.value + " Rooms";
    totalPriceDisplay.innerHTML =
        "Total: Rp" +
        calculateTotalPrice(calculateTotalDays(startDate.value, endDate.value), totalRoom.value, currentPrice)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
} else if (roomId) {
    document.getElementById("submit").style.display = "inherit";
    document.getElementById("edit").style.display = "none";

    startDate.value = today;
    endDate.value = tomorrow;

    totalDaysDisplay.innerHTML = "Total Days: " + calculateTotalDays(startDate.value, endDate.value) + " Days";
} else {
    window.history.back();
}

startDate.addEventListener("change", function (e) {
    if (startDate.value === "") {
        setError(startDate, "Must not be blank");
        checker_startDate = false;
    } else if (startDate.value < today) {
        setError(startDate, "Must not be in the past");
        checker_startDate = false;
    } else if (startDate.value >= endDate.value) {
        setError(startDate, "Can't be same/after end");
        checker_startDate = false;
    } else if (startDate.value < endDate.value && endDate.value != "") {
        setSuccess(startDate);
        checker_startDate = true;

        setSuccess(endDate);
        checker_endDate = true;

        totalDaysDisplay.innerHTML = "Total Days: " + calculateTotalDays(startDate.value, endDate.value) + " Days";

        if (totalRoom.value != "") {
            totalPriceDisplay.innerHTML =
                "Total: Rp" +
                calculateTotalPrice(calculateTotalDays(startDate.value, endDate.value), totalRoom.value, currentPrice)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }
});

endDate.addEventListener("change", function (e) {
    if (endDate.value === "") {
        setError(endDate, "Must not be blank");
        checker_endDate = false;
    } else if (endDate.value <= startDate.value) {
        setError(endDate, "Can't be same/before start");
        checker_endDate = false;
    } else if (endDate.value > startDate.value && startDate.value != "") {
        setSuccess(endDate);
        checker_endDate = true;

        setSuccess(startDate);
        checker_startDate = true;

        totalDaysDisplay.innerHTML = "Total Days: " + calculateTotalDays(startDate.value, endDate.value) + " Days";

        if (totalRoom.value != "") {
            totalPriceDisplay.innerHTML =
                "Total: Rp" +
                calculateTotalPrice(calculateTotalDays(startDate.value, endDate.value), totalRoom.value, currentPrice)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }
});

totalRoom.addEventListener("change", function (e) {
    if (totalRoom.value === "") {
        setError(totalRoom, "Must not be blank");
        checker_totalRoom = false;
    } else if (totalRoom.value < 1) {
        setError(totalRoom, "Must be at least 1");
        checker_totalRoom = false;
    } else {
        setSuccess(totalRoom);
        checker_totalRoom = true;

        totalRoomDisplay.innerHTML = "Total Rooms: " + totalRoom.value + " Rooms";

        if (startDate.value != "" && endDate.value != "") {
            totalPriceDisplay.innerHTML =
                "Total: Rp" +
                calculateTotalPrice(calculateTotalDays(startDate.value, endDate.value), totalRoom.value, currentPrice)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }
});

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // urgent to prevent form submission

    if (checker_startDate == false || checker_endDate == false || checker_totalRoom == false) {
        // error handling

        setErrorBox("Please fill in the form correctly");
    } else {
        // for debugging
        window.location.href = "bookings.html";
    }
});

document.getElementById("edit").addEventListener("click", function (event) {
    event.preventDefault(); // urgent to prevent form submission

    if (checker_startDate == false || checker_endDate == false || checker_totalRoom == false) {
        // error handling

        setErrorBox("Please fill in the form correctly");
    } else {
        // for debugging
        window.location.href = "bookings.html";
    }
});
