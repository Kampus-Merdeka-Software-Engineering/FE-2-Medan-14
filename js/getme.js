async function getProfileInfo() {
    try {
        const response = await fetch(meUrl, {
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

        const profileInfo = await response.json();
        return profileInfo;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
