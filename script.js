let currentSection = 0;
const sections = document.querySelectorAll(".section");


// INITIAL BACKGROUND
sections.forEach(sec => {
sec.style.backgroundImage = `url(${sec.dataset.bg})`;
});


// NAVIGATION BUTTONS
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");


function showSection(index) {
sections.forEach(s => s.classList.remove("active"));
sections[index].classList.add("active");
}


function transitionTo(index) {
document.getElementById("zoom-transition").style.display = "flex";
setTimeout(() => {
showSection(index);
setTimeout(() => {
document.getElementById("zoom-transition").style.display = "none";
}, 1200);
}, 1200);
}


nextBtn.onclick = () => {
if (currentSection < sections.length - 1) {
currentSection++;
transitionTo(currentSection);
}
};


prevBtn.onclick = () => {
if (currentSection > 0) {
currentSection--;
transitionTo(currentSection);
}
};


// MINI QUIZ
const miniAnswers = document.querySelectorAll(".mini-answer");
miniAnswers.forEach(btn => {
btn.onclick = () => {
if (btn.dataset.correct) {
btn.classList.add("correct");
} else {
btn.classList.add("wrong");
}
};
});


// FINAL MAP QUIZ
let mapIndex = 0;
const mapQuiz = document.getElementById("map-quiz");
const finalAnswers = document.querySelectorAll(".final-answer");
const retakeQuiz = document.getElementById("retakeQuiz");


finalAnswers.forEach(btn => {
btn.onclick = () => {
if (mapIndex < 2) {
mapIndex++;
};
