async function checkUniqueEmail(email) {
    try {
        const response = await fetch(checkEmailUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
            credentials: "include", // Include credentials
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.msg);
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function checkUniquePhone(phone) {
    try {
        const response = await fetch(checkPhoneUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone }),
            credentials: "include", // Include credentials
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.msg);
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
