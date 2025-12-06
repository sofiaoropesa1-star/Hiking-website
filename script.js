let currentSection = 0;
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
mapQuiz.style.transform = `translateX(-${mapIndex * 100}vw)`;
}
};
});


retakeQuiz.onclick = () => {
mapIndex = 0;
mapQuiz.style.transform = "translateX(0)";
};
