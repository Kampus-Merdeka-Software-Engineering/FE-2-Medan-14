const selectBtn = document.querySelector(".navigation-select-btn"),
  items = document.querySelectorAll(".navigation-item");

selectBtn.addEventListener("click", () => {
  selectBtn.classList.toggle("open");
});

items.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("checked");

    let checked = document.querySelectorAll(".checked"),
      btnText = document.querySelector(".navigation-btn-text");

    if (checked && checked.length > 0) {
      btnText.innerText = `${checked.length} Selected`;
    } else {
      btnText.innerText = "Select Language";
    }
  });
});
