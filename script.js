const likeButton = document.querySelector(".like-btn");

if (likeButton) {
    likeButton.addEventListener("click", function () {
        this.classList.toggle("liked");

        const heart = this.querySelector(".heart");
        const text = this.querySelector(".like-text");

        if (this.classList.contains("liked")) {
            heart.textContent = "♥";
            text.textContent = "Liked";

            // Play sound when liking
            const sound = new Audio("audio/macmac.mp3");
            sound.play().catch(function (error) {
                console.log("Sound could not play:", error);
            });

        } else {
            heart.textContent = "♡";
            text.textContent = "Like";
        }
    });
}


const readButton = document.querySelector("#readButton");
const readMessage = document.querySelector("#readMessage");

if (readButton && readMessage) {
    readButton.addEventListener("click", function () {

        // Prevent celebrating more than once
        if (this.classList.contains("completed")) {
            return;
        }

        this.classList.add("completed");
        this.textContent = "✓ Chapter Completed";

        readMessage.textContent =
            "🎉 Congratulations! You've finished this chapter!";

        playSuccessSound();
        celebrateReading();
    });
}

// Success sound
function playSuccessSound() {
    const sound = new Audio("audio/dangdang.mp3");

    sound.play().catch(function (error) {
        console.error("Could not play the success sound:", error);
    });
}

// Confetti celebration
function celebrateReading() {
    const symbols = ["✦", "✧", "●", "◆", "★"];
    const colors = ["#FF7A00", "#FFC266", "#FFFFFF", "#D98B32"];

    for (let i = 0; i < 70; i++) {
        const piece = document.createElement("span");

        piece.className = "read-confetti";
        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.color =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.fontSize = (10 + Math.random() * 14) + "px";

        piece.style.setProperty(
            "--drift",
            (Math.random() * 240 - 120) + "px"
        );

        piece.style.animationDelay = Math.random() * 0.8 + "s";

        document.body.appendChild(piece);

        piece.addEventListener("animationend", function () {
            this.remove();
        });
    }
}


const audioFile = "audio/garoeoeo.mp3";
const audioKey = "anklaAudioPlaying";
const timeKey = "anklaAudioTime";

function playStorySound() {
    const sound = new Audio(audioFile);
    sound.loop = false;

    const savedTime = sessionStorage.getItem(timeKey);

    if (savedTime) {
        sound.currentTime = Number(savedTime);
    }

    sound.play().catch(function (error) {
        console.log("Audio could not play:", error);
    });

    const savePosition = setInterval(function () {
        if (!sound.paused) {
            sessionStorage.setItem(timeKey, sound.currentTime);
        }

        if (sound.ended) {
            clearInterval(savePosition);
            sessionStorage.removeItem(audioKey);
            sessionStorage.removeItem(timeKey);
        }
    }, 300);

    window.addEventListener("beforeunload", function () {
        if (!sound.ended) {
            sessionStorage.setItem(timeKey, sound.currentTime);
        }
    });
}

document.querySelectorAll(".card a").forEach(function (book) {
    book.addEventListener("click", function () {
        sessionStorage.setItem(audioKey, "true");
        sessionStorage.setItem(timeKey, "0");
    });
});

if (sessionStorage.getItem(audioKey) === "true") {
    playStorySound();
}