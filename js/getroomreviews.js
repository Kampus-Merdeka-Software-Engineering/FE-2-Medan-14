async function getRoomReviewsInfo(roomId) {
    try {
        const response = await fetch(`${roomReviewsUrl}/${roomId}`, {
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

        const roomReviewsInfo = await response.json();
        return roomReviewsInfo;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
