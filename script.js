// ----------------------------
// Section Data
// ----------------------------
const sections = [
    {
        title: "Rugged Mountains",
        text: "Mountains offer challenging terrain and breathtaking views. Hikers should be prepared for steep climbs and cooler temperatures.",
        img: "images/rugged.jpg",
        question: "What should hikers be prepared for in the mountains?",
        correct: "steep climbs"
    },
    {
        title: "Deep Canyons",
        text: "Canyons provide unique geological formations and can vary from hot and dry to cool and shaded.",
        img: "images/canyon.jpg",
        question: "What do canyons provide to hikers?",
        correct: "geological formations"
    },
    {
        title: "Earth Pathways",
        text: "Dirt and earth trails are the most common type of hiking paths, offering moderate difficulty and great scenery.",
        img: "images/earth.jpg",
        question: "What type of trail is most common for hikers?",
        correct: "dirt"
    },
    {
        title: "Lush Forests",
        text: "Forests offer shade, wildlife, and peaceful sounds. Trails can be soft and covered in leaves.",
        img: "images/forest.jpg",
        question: "What do forests offer hikers?",
        correct: "shade"
    }
];

// ----------------------------
// Variables
// ----------------------------
let currentSection = 0;

// DOM elements
const titleEl = document.getElementById("section-title");
const textEl = document.getElementById("section-text");
const imgEl = document.getElementById("section-img");
const questionEl = document.getElementById("question-text");
const answerInput = document.getElementById("answer");
const feedbackEl = document.getElementById("feedback");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const checkBtn = document.getElementById("check-answer-btn");

// ----------------------------
// Load a Section
// ----------------------------
function loadSection() {
    const s = sections[currentSection];

    titleEl.textContent = s.title;
    textEl.textContent = s.text;
    imgEl.src = s.img;
    questionEl.textContent = s.question;

    answerInput.value = "";
    feedbackEl.textContent = "";

    // Disable prev button on first section
    prevBtn.disabled = currentSection === 0;

    // Change next button to Finish on last section
    nextBtn.textContent = currentSection === sections.length - 1 ? "Finish" : "Next";

    // Smooth fade animation
    document.querySelector(".section-container").classList.add("fade");
    setTimeout(() => {
        document.querySelector(".section-container").classList.remove("fade");
    }, 300);
}

// ----------------------------
// Check Answer
// ----------------------------
checkBtn.addEventListener("click", () => {
    const user = answerInput.value.trim().toLowerCase();
    const correct = sections[currentSection].correct.toLowerCase();

    if (user.includes(correct)) {
        feedbackEl.textContent = "Correct! Good job 👍";
        feedbackEl.style.color = "lightgreen";
    } else {
        feedbackEl.textContent = "Incorrect. Try again!";
        feedbackEl.style.color = "salmon";
    }
});

// ----------------------------
// Next Section
// ----------------------------
nextBtn.addEventListener("click", () => {
    if (currentSection < sections.length - 1) {
        currentSection++;
        loadSection();
    } else {
        alert("🎉 You finished the hiking guide!");
    }
});

// ----------------------------
// Previous Section
// ----------------------------
prevBtn.addEventListener("click", () => {
    if (currentSection > 0) {
        currentSection--;
        loadSection();
    }
});

// ----------------------------
// Start Page
// ----------------------------
loadSection();
