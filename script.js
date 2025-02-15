const images = ["bull.png", "bunny.png", "fox.png", "fox_female.png", "pig.png", "wolf.png"];
let current_index = 0;

const currentImageElement = document.getElementById("current-image");
const selectedImageInput = document.getElementById("selected-image");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const createButton = document.getElementById("create-player-button");
const nameInput = document.getElementById("player-name");
const container = document.getElementById("container");

function changeImage() {
    currentImageElement.src = "images/" + images[current_index];
    selectedImageInput.value = "images/" + images[current_index];
}

// Event listener for the previous button
prevButton.addEventListener("click", () => {
    if (current_index > 0) {
        current_index--;
    } else {
        current_index = images.length - 1; // Loop to the last image
    }
    changeImage();
});

// Event listener for the next button
nextButton.addEventListener("click", () => {
    if (current_index < images.length - 1) {
        current_index++;
    } else {
        current_index = 0; // Loop to the first image
    }
    changeImage();
});

createButton.addEventListener("click", () => {
    if (nameInput.value != "") {
        const player_card = document.createElement("div");
        player_card.classList.add("player-card");
        const player_card_name = document.createElement("h2");
        player_card_name.classList.add("player-card-name");
        player_card_name.innerText = nameInput.value;
        const player_card_img = document.createElement("img");
        player_card_img.classList.add("player-card-img");
        player_card_img.src = selectedImageInput.value;
        player_card.appendChild(player_card_name);
        player_card.appendChild(player_card_img);
        container.appendChild(player_card);
    }
});

// Initialize the first image
changeImage();