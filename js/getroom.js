async function getRoomInfo(roomId) {
    try {
        const response = await fetch(`${roomUrl}/${roomId}`, {
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

        const roomInfo = await response.json();
        return roomInfo;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
