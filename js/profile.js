getProfileInfo()
    .then((profileInfo) => {
        document.getElementById("photoPreview").src = `data:image/png;base64,${profileInfo.photo}`; // replace 'photoUrl' with the actual property name in your data
        document.getElementById("userName").innerHTML = profileInfo.name; // replace 'name' with the actual property name in your data
        document.getElementById("userPhone").innerHTML = profileInfo.phone; // replace 'phone' with the actual property name in your data
        document.getElementById("userEmail").innerHTML = profileInfo.email; // replace 'email' with the actual property name in your data
    })
    .catch((error) => {
        console.error("Error:", error);
    });
