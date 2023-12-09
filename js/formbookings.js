const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const totalRoom = document.getElementById("totalRoom");

const roomNameDisplay = document.getElementById("roomNameDisplay");
const currentPriceDisplay = document.getElementById("currentPriceDisplay");
const totalDaysDisplay = document.getElementById("totalDaysDisplay");
const totalRoomDisplay = document.getElementById("totalRoomDisplay");
const totalPriceDisplay = document.getElementById("totalPriceDisplay");
const photoRoomDisplay = document.getElementById("photoRoomDisplay");

const params = new URLSearchParams(window.location.search);
const roomId = params.get("roomId");
const bookingId = params.get("bookingId");

if (!roomId && !bookingId) {
    window.history.back();
}

let checker_startDate = true;
let checker_endDate = true;
let checker_totalRoom = false;

let bookingInfo;
let roomInfo;
let maxRoom;

setSuccess(startDate);
setSuccess(endDate);

let today = dateFormatter(new Date());
let tomorrow = dateFormatter(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));

startDate.min = today;
endDate.min = tomorrow;

getRoomInfo(roomId)
    .then((data) => {
        roomInfo = data;

        roomNameDisplay.innerHTML = roomInfo.name;
        currentPriceDisplay.innerHTML = `Current Price: Rp${roomInfo.currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}/Night`;
        photoRoomDisplay.src = `data:image/png;base64,${roomInfo.photos[0].photo}`;

        if (bookingId && roomId) {
            document.getElementById("submit").style.display = "none";
            document.getElementById("edit").style.display = "inherit";

            getBookingInfo(bookingId).then((data) => {
                bookingInfo = data;

                totalRoom.max = roomInfo.roomQty + bookingInfo.totalRoom;
                maxRoom = roomInfo.roomQty + bookingInfo.totalRoom;

                startDate.value = bookingInfo.startDate;
                endDate.value = bookingInfo.endDate;
                totalRoom.value = bookingInfo.totalRoom;

                totalDaysDisplay.innerHTML = `Total Days: ${calculateTotalDays(bookingInfo.startDate, bookingInfo.endDate)} Days`;
                totalRoomDisplay.innerHTML = `Total Rooms: ${bookingInfo.totalRoom} Rooms`;
                totalPriceDisplay.innerHTML = `Total: Rp${bookingInfo.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
            });

            setSuccess(totalRoom);
            checker_totalRoom = true;
        } else if (roomId) {
            if (roomInfo.roomQty <= 0) {
                alert("No room available");
                window.history.back();
            }

            totalRoom.max = roomInfo.roomQty;
            maxRoom = roomInfo.roomQty;

            document.getElementById("submit").style.display = "inherit";
            document.getElementById("edit").style.display = "none";

            startDate.value = today;
            endDate.value = tomorrow;

            totalDaysDisplay.innerHTML = "Total Days: " + calculateTotalDays(startDate.value, endDate.value) + " Days";
        } else {
            window.history.back();
        }
    })
    .catch((error) => {
        setErrorBox(error.message);
    });

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
                calculateTotalPrice(calculateTotalDays(startDate.value, endDate.value), totalRoom.value, roomInfo.currentPrice)
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
                calculateTotalPrice(calculateTotalDays(startDate.value, endDate.value), totalRoom.value, roomInfo.currentPrice)
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
    } else if (totalRoom.value > maxRoom) {
        setError(totalRoom, "Must not exceed available room");
        checker_totalRoom = false;
    } else {
        setSuccess(totalRoom);
        checker_totalRoom = true;

        totalRoomDisplay.innerHTML = "Total Rooms: " + totalRoom.value + " Rooms";

        if (startDate.value != "" && endDate.value != "") {
            totalPriceDisplay.innerHTML =
                "Total: Rp" +
                calculateTotalPrice(calculateTotalDays(startDate.value, endDate.value), totalRoom.value, roomInfo.currentPrice)
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
        // create booking
        fetch(bookingUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roomId: roomId,
                startDate: startDate.value,
                endDate: endDate.value,
                totalRoom: totalRoom.value,
            }),
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = "bookings.html";
                } else {
                    response.json().then((data) => {
                        setErrorBox(data.error);
                        setError(startDate, "");
                        setError(endDate, "");
                        setError(totalRoom, "");
                    });
                    checker_startDate = false;
                    checker_endDate = false;
                    checker_totalRoom = false;

                    startDate.value = "";
                    endDate.value = "";
                    totalRoom.value = "";
                }
            })
            .catch((error) => {
                setErrorBox(error.message);
                setError(startDate, "");
                setError(endDate, "");
                setError(totalRoom, "");

                checker_startDate = false;
                checker_endDate = false;
                checker_totalRoom = false;

                startDate.value = "";
                endDate.value = "";
                totalRoom.value = "";
            });
    }
});

document.getElementById("edit").addEventListener("click", function (event) {
    event.preventDefault(); // urgent to prevent form submission

    if (checker_startDate == false || checker_endDate == false || checker_totalRoom == false) {
        setErrorBox("Please fill in the form correctly");
    } else if (startDate.value === bookingInfo.startDate && endDate.value === bookingInfo.endDate && totalRoom.value === bookingInfo.totalRoom) {
        window.location.href = "bookings.html";
    } else {
        let data = {};

        data.roomId = roomId;

        if (startDate.value !== bookingInfo.startDate) {
            data.startDate = startDate.value;
        }

        if (endDate.value !== bookingInfo.endDate) {
            data.endDate = endDate.value;
        }

        if (totalRoom.value !== bookingInfo.totalRoom) {
            data.totalRoom = totalRoom.value;
        }

        fetch(`${bookingUrl}/${bookingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = "bookings.html";
                } else {
                    response.json().then((data) => {
                        setErrorBox(data.error);
                        setSuccess(startDate);
                        setSuccess(endDate);
                        setSuccess(totalRoom);
                    });
                    checker_startDate = true;
                    checker_endDate = true;
                    checker_totalRoom = true;

                    startDate.value = bookingInfo.startDate;
                    endDate.value = bookingInfo.endDate;
                    totalRoom.value = bookingInfo.totalRoom;
                    totalDaysDisplay.innerHTML = `Total Days: ${calculateTotalDays(bookingInfo.startDate, bookingInfo.endDate)} Days`;
                    totalRoomDisplay.innerHTML = `Total Rooms: ${bookingInfo.totalRoom} Rooms`;
                    totalPriceDisplay.innerHTML = `Total: Rp${bookingInfo.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
                }
            })
            .catch((error) => {
                setErrorBox(error.message);
                setSuccess(startDate);
                setSuccess(endDate);
                setSuccess(totalRoom);

                checker_startDate = true;
                checker_endDate = true;
                checker_totalRoom = true;

                startDate.value = bookingInfo.startDate;
                endDate.value = bookingInfo.endDate;
                totalRoom.value = bookingInfo.totalRoom;
                totalDaysDisplay.innerHTML = `Total Days: ${calculateTotalDays(bookingInfo.startDate, bookingInfo.endDate)} Days`;
                totalRoomDisplay.innerHTML = `Total Rooms: ${bookingInfo.totalRoom} Rooms`;
                totalPriceDisplay.innerHTML = `Total: Rp${bookingInfo.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
            });
    }
});
