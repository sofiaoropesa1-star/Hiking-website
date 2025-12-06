let current = 0;
const sections = document.querySelectorAll(".section");
const map = document.getElementById("map");

function showSection(index) {
  sections.forEach(sec => sec.classList.remove("active"));
  sections[index].classList.add("active");

  // Smooth zoom animation
  map.style.transform = "scale(1.3)";
  setTimeout(() => {
    map.style.transform = "scale(1.1)";
  }, 500);
}

// NEXT button
document.getElementById("nextBtn").addEventListener("click", () => {
  if (current < sections.length - 1) {
    current++;
    showSection(current);
  }
});

// PREVIOUS button
document.getElementById("prevBtn").addEventListener("click", () => {
  if (current > 0) {
    current--;
    showSection(current);
  }
});

// QUIZ
const answers = document.querySelectorAll(".answer");
let correctCount = 0;

answers.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.correct) {
      correctCount++;
    }
    
    btn.style.background = btn.dataset.correct ? "green" : "red";
    btn.style.pointerEvents = "none";

    // Show score if quiz is done
    if (correctCount >= 2) {
      document.getElementById("quiz-result").textContent =
        "🎉 Great job! You finished the quiz!";
    }
  });
});
