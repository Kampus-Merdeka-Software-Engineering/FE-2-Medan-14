async function getBookingInfo(bookingId) {
    try {
        const response = await fetch(`${bookingUrl}/${bookingId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.msg);
        }

        const bookingInfo = await response.json();
        return bookingInfo;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
