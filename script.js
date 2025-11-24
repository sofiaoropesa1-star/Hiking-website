/* ----------------------------------------------------
   GLOBAL SETUP
-----------------------------------------------------*/

// The list of backgrounds in order of sections
const sectionBackgrounds = [
    "media/waterfall.jpg",
    "media/forest.jpg",
    "media/desert.jpg",
    "media/mountains.jpg"
];

let currentSection = 0;

/* ----------------------------------------------------
   EARTH ZOOM TRANSITION BETWEEN SECTIONS
-----------------------------------------------------*/

function goToNextSection() {
    const earth = document.getElementById("earth-zoom");
    const content = document.getElementById("content");
    const body = document.body;

    // If last section, stop
    if (currentSection >= sectionBackgrounds.length - 1) return;

    currentSection++;

    // Zoom out
    earth.classList.add("zoom-out");
    content.classList.add("fade-out");

    setTimeout(() => {
        // Change background after zoom out
        body.style.backgroundImage = `url(${sectionBackgrounds[currentSection]})`;

        // Zoom back in
        earth.classList.remove("zoom-out");
        earth.classList.add("zoom-in");

        content.classList.remove("fade-out");
        content.classList.add("fade-in");
    }, 1400);

    // Reset zoom classes after animation
    setTimeout(() => {
        earth.classList.remove("zoom-in");
    }, 2500);
}

/* ----------------------------------------------------
   MINI QUIZ (1–2 Questions Per Section)
-----------------------------------------------------*/

function checkMiniQuiz(answer, correctAnswer, resultID) {
    const resultBox = document.getElementById(resultID);

    if (answer === correctAnswer) {
        resultBox.innerHTML = "✔ Correct!";
        resultBox.style.color = "lightgreen";
    } else {
        resultBox.innerHTML = "✘ Incorrect. Try again.";
        resultBox.style.color = "salmon";
    }
}

/* ----------------------------------------------------
   FINAL QUIZ – MAP SCROLLING
-----------------------------------------------------*/

let currentMapQuestion = 0;

function showQuestion(index) {
    const map = document.getElementById("map-quiz");
    map.style.transform = `translateX(-${index * 100}vw)`;
}

function nextMapQuestion() {
    if (currentMapQuestion < 5) {
        currentMapQuestion++;
        showQuestion(currentMapQuestion);
    }
}

function previousMapQuestion() {
    if (currentMapQuestion > 0) {
        currentMapQuestion--;
        showQuestion(currentMapQuestion);
    }
}

/* ----------------------------------------------------
   FINAL QUIZ – CHECK ANSWERS
-----------------------------------------------------*/

function checkFinalAnswer(questionNumber, selectedAnswer, correctAnswer) {
    const box = document.getElementById(`final-result-${questionNumber}`);

    if (selectedAnswer === correctAnswer) {
        box.innerHTML = "✔ Correct!";
        box.style.color = "lightgreen";
    } else {
        box.innerHTML = "✘ Wrong.";
        box.style.color = "salmon";
    }
}

/* ----------------------------------------------------
   RETAKE FINAL QUIZ
-----------------------------------------------------*/

function resetFinalQuiz() {
    currentMapQuestion = 0;
    showQuestion(0);

    for (let i = 1; i <= 6; i++) {
        const box = document.getElementById(`final-result-${i}`);
        if (box) box.innerHTML = "";
    }
}

/* ----------------------------------------------------
   DEBUG (OPTIONAL – helps GitHub testing)
-----------------------------------------------------*/

console.log("script.js successfully loaded!");
