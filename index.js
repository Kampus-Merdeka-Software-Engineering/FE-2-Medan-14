// check login
fetch("https://be-2-medan-14-production.up.railway.app/me", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
})
    .then((response) => {
        if (response.status === 200) {
            ambilUser();
        } else {
            alert("Anda belum login");
        }
    })
    .catch((error) => console.error("Error:", error));

const formData = {
    email: "admin@gmail.com",
    password: "admin",
};

const login = async () => {
    fetch("https://be-2-medan-14-production.up.railway.app/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                console.log(data);
            }
        })
        .catch((error) => console.error("Error:", error));

    window.location.reload();
};

const ambilUser = async () => {
    const response = await fetch("https://be-2-medan-14-production.up.railway.app/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    const User = await response.json();

    const h = "text/html";
    let parser = new DOMParser();

    User.forEach((User) => {
        let productStr = `
            <ul class="specialty-list">
              <li>
              <a href="update.html?id=${User.id}">
                <img src="data:image/png;base64, ${User.photo}">
              </a>
              <div class="specialty-info">
                <h2>Id: ${User.id} - ${User.name}</h2>
                <p>${User.phone}</p>
                <p>${User.email}</p>
              </div>
              </li> 
            </ul>
            <p></p><p></p><p></p>
            
          `;
        let el = parser.parseFromString(productStr, h);
        let root = document.querySelector("div");
        root.appendChild(el.body.firstChild);
    });
};

const logout = async () => {
    fetch("https://be-2-medan-14-production.up.railway.app/logout", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                console.log(data);
            }
        })
        .catch((error) => console.error("Error:", error));

    window.location.reload();
};

// document.querySelector("form").addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent the form from submitting normally

//     let title = "event.target.elements.title.value";
//     let phone = "12345";
//     let email = "12345";
//     let password = "12345";
//     let file = event.target.elements.file.files[0];

//     let reader = new FileReader();
//     reader.onloadend = function () {
//         let base64String = reader.result;
//         return base64String; // Logs the base64 string
//     };

//     let formData = new FormData();
//     formData.append("name", title);
//     formData.append("phone", phone);
//     formData.append("email", email);
//     formData.append("password", password);
//     // formData.append("photo", reader.readAsDataURL(file));

//     console.log(title);

//     fetch("http://localhost:5000/users", {
//         method: "POST",
//         body: formData,
//     })
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.error("Error:", error));
// });
