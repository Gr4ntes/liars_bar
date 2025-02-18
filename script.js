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
        
        // Get the container element by its ID
        const circleCont = document.createElement('div');
        circleCont.classList.add("circle_cont")
        circleCont.style.animationPlayState = "paused";
        
        const rounds = document.createElement('div');
        rounds.className = 'round_styles';
        rounds.style.setProperty('--n', '6');
        circleCont.appendChild(rounds);

        let bullets = [];
        // Function to create and append the round styles divs
        for(let i = 1; i <= 6; i++) {
            const round = document.createElement('div');
            round.className = `style round ${i}`;
            round.style.setProperty('--i', `${i+3}`);
            
            // Create bullet child element
            const bullet = document.createElement('div');
            bullet.style.animationPlayState = "paused";
            bullet.className = `bullet _${i}`;
            bullets.push(bullet);
            
            // Add inner elements to the bullet
            const border = document.createElement('div');
            border.className = `inner-bullet-border`;
            
            const inside = document.createElement('div');
            inside.className = 'inner-bullet-inside';
            
            border.appendChild(inside);
            bullet.appendChild(border);
            
            round.appendChild(bullet);
            
            // Add to circleCont
            rounds.appendChild(round);
        }
        
        circleCont.appendChild(rounds);
        // Create and append the center div
        const centerDiv = document.createElement('div');
        centerDiv.className = 'center style';
        
        const middleDiv = document.createElement('div');
        middleDiv.className = 'middle';
        centerDiv.appendChild(middleDiv);
        
        circleCont.appendChild(centerDiv);
        player_card.appendChild(circleCont);
        

        const shootButton = document.createElement("button");
        shootButton.classList.add("shoot-button");
        shootButton.innerText = "Test your luck!";
        shootButton.addEventListener("click", async () => {
            circleCont.style.animationPlayState = "running";
            for (i = 0; i < bullets.length; i++ ){
                bullets[i].style.animationPlayState = "running";
            }
            await new Promise(r => setTimeout(r, 700));
            console.log("sleep finished");
            circleCont.style.animationPlayState = "paused";
            for (i = 0; i < bullets.length; i++ ){
                bullets[i].style.animationPlayState = "paused";
            }
        });
        player_card.appendChild(shootButton);
        container.appendChild(player_card);
    }
});

// Initialize the first image
changeImage();