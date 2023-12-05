let loadMoreBtn = document.querySelector("#load-more");
let currentItem = 3;

loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll(".container .box-container .box")];
    for (var i = currentItem; i < currentItem + 3; i++) {
        boxes[i].style.display = "inline-block";
    }
    currentItem += 3;

    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = "none";
    }
};
