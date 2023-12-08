// /*
let boxes = [...document.querySelectorAll(".container .box-container .box")];

/* 
check box filter 
*/
const selectBtn = document.querySelector(".navigation-select-btn"),
    items = document.querySelectorAll(".navigation-item");

selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
});

items.forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");

        let checked = document.querySelectorAll(".checked"),
            btnText = document.querySelector(".btn-text");

        if (checked && checked.length > 0) {
            btnText.innerText = `${checked.length} Selected`;
        } else {
            btnText.innerText = "Select Language";
        }
    });
});

// Select the navigation items
const navigationItems = document.querySelectorAll(".navigation-item");

// Store the selected categories
let selectedCategories = [];

// Add a 'click' event listener to each navigation item
navigationItems.forEach((item) => {
    item.addEventListener("click", function () {
        // Get the text of the clicked navigation item
        const category = this.querySelector(".navigation-item-text").textContent;

        // Check if the navigation item is checked
        if (this.classList.contains("checked")) {
            // If the navigation item is checked, add its category to the array
            selectedCategories.push(category);
        } else {
            // If the navigation item is not checked, remove its category from the array
            selectedCategories = selectedCategories.filter((selectedCategory) => selectedCategory !== category);
        }

        // Get all the property cards
        const propertyCards = [...document.querySelectorAll(".box")];
        let displayedCount = 0;

        // Function to filter and display the property cards
        function filterAndDisplayPropertyCards(selectedCategories) {
            // Reset the displayed count
            displayedCount = 0;

            // Filter and display the property cards
            propertyCards.forEach((card) => {
                if (selectedCategories.length === 0 || selectedCategories.includes(card.getAttribute("data-category"))) {
                    card.style.display = "inline-block";
                    displayedCount++;
                } else {
                    card.style.display = "none";
                }
            });
        }

        // Call the function with the selected categories
        filterAndDisplayPropertyCards(selectedCategories);
    });
});

/* 
tabs box filter 
*/
const tabsBox = document.querySelector(".tabs-box"),
    tabs = tabsBox.querySelectorAll(".tab"),
    arrowIcons = document.querySelectorAll(".icon i");

function adjustDisplay() {
    // Calculate the cumulative width of the tab items
    let cumulativeTabWidth = 0;
    tabs.forEach((tab) => {
        cumulativeTabWidth += tab.offsetWidth;
    });
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;

    // Compare the cumulative width of the tab items with the width of the tab box
    // and check if the viewport width is greater than 768 pixels
    if ((cumulativeTabWidth > 1000 && window.innerWidth > 768) || (maxScrollableWidth && window.innerWidth > 768)) {
        // If the cumulative width of the tab items is greater than 1000px
        // and the viewport width is greater than 768 pixels, show the arrow icons
        arrowIcons[0].parentElement.style.display = "none";
        arrowIcons[1].parentElement.style.display = "flex";
    } else {
        // If not, hide the arrow icons
        arrowIcons[0].parentElement.style.display = "none";
        arrowIcons[1].parentElement.style.display = "none";
    }
}

// Run adjustDisplay when the page loads
adjustDisplay();

// Run adjustDisplay whenever the viewport size changes
window.addEventListener("resize", adjustDisplay);
let isDragging = false;
const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    if (window.innerWidth > 768) {
        arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
        arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
    } else {
        arrowIcons[0].parentElement.style.display = "none";
        arrowIcons[1].parentElement.style.display = "none";
    }
};

arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        let scrollWidth = (tabsBox.scrollLeft += icon.id === "left" ? -340 : 340);
        handleIcons(scrollWidth);
    });
});

// Function to sort the property cards
function sortPropertyCards(criteria) {
    let sortedPropertyCards;

    if (criteria === "Most Popular") {
        // Sort the property cards by total booking
        sortedPropertyCards = boxes.sort((a, b) => Number(b.getAttribute("data-total-booking")) - Number(a.getAttribute("data-total-booking")));
    } else if (criteria === "Highest Rating") {
        // Sort the property cards by average rating
        sortedPropertyCards = boxes.sort((a, b) => Number(b.getAttribute("data-avg-rating")) - Number(a.getAttribute("data-avg-rating")));
    } else if (criteria === "Cheapest") {
        // Sort the property cards by price
        sortedPropertyCards = boxes.sort((a, b) => Number(a.getAttribute("data-current-price")) - Number(b.getAttribute("data-current-price")));
    } else if (criteria === "Most Expensive") {
        // Sort the property cards by price in descending order
        sortedPropertyCards = boxes.sort((a, b) => Number(b.getAttribute("data-current-price")) - Number(a.getAttribute("data-current-price")));
    }

    // Append the sorted property cards to the container
    const container = document.querySelector(".box-container");
    container.innerHTML = "";
    sortedPropertyCards.forEach((propertyCard, index) => {
        container.appendChild(propertyCard);
    });
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        // Remove the 'active' class from all tabs
        tabs.forEach((tab) => tab.classList.remove("active"));

        // Add the 'active' class to the clicked tab
        tab.classList.add("active");

        // Sort the property cards
        sortPropertyCards(tab.textContent);
    });
});

// Find the active tab
const activeTab = Array.from(tabs).find((tab) => tab.classList.contains("active"));

// Sort the property cards based on the active tab when the page first loads
if (activeTab) {
    sortPropertyCards(activeTab.textContent);
}

const dragging = (e) => {
    if (!isDragging) return;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX;
    handleIcons(tabsBox.scrollLeft);
};

const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
};

tabsBox.addEventListener("mousedown", () => (isDragging = true));
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
