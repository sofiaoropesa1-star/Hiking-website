document.addEventListener("DOMContentLoaded", () => {
  // Set section backgrounds
  document.querySelectorAll(".section").forEach(sec => {
    const bg = sec.dataset.bg;
    if (bg) sec.style.backgroundImage = `url('${bg}')`;
  });

  // --- Quiz A ---
  window.checkAnswerA = function(answer) {
    const resultEl = document.getElementById("resultA");
    if (!resultEl) return;
    if (answer === "canyon") {
      resultEl.textContent = "Correct! Canyon trails are known for steep cliffs.";
      resultEl.style.color = "green";
    } else {
      resultEl.textContent = "Incorrect. Try again!";
      resultEl.style.color = "red";
    }
  };

  // --- Quiz B ---
  const quizData = [
    { q: "Which hike has dense trees?", o: ["Forest", "Canyon", "Mountain"], a: 0 },
    { q: "Which hike is rocky and steep?", o: ["Forest", "Canyon", "Mountain"], a: 2 },
    { q: "Which area is known for deep stone walls and cliffs?", o: ["Forest", "Canyon", "Mountain"], a: 1 },
    { q: "Which trail is best for beginners?", o: ["Forest", "Mountain", "Canyon"], a: 0 },
    { q: "Which hike may require acclimatization?", o: ["Forest", "Mountain", "Canyon"], a: 1 },
    { q: "Which trail often has shade from tall trees?", o: ["Canyon", "Forest", "Mountain"], a: 1 }
  ];

  const quizContainer = document.getElementById("quiz-container");
  const restartBtn = document.getElementById("restart-quiz");

  let currentQuestion = 0;
  const answered = new Array(quizData.length).fill(false);
  const corrects = new Array(quizData.length).fill(false);

  function renderQuestion(idx) {
    if (!quizContainer) return;
    quizContainer.innerHTML = "";

    const scoreBox = document.createElement("div");
    scoreBox.id = "quiz-score";
    scoreBox.textContent = `Score: ${corrects.filter(c => c).length} / ${quizData.length}`;
    quizContainer.appendChild(scoreBox);

    const item = quizData[idx];
    const qWrap = document.createElement("div");
    qWrap.className = "quiz-question";

    const p = document.createElement("p");
    p.textContent = `${idx + 1}. ${item.q}`;
    qWrap.appendChild(p);

    const answersDiv = document.createElement("div");
    answersDiv.className = "answers";
    answersDiv.style.display = "flex";
    answersDiv.style.gap = "8px";

    item.o.forEach((opt, i) => {
      const b = document.createElement("button");
      b.textContent = opt;
      b.className = "choice";
      b.disabled = answered[idx];
      if (answered[idx] && corrects[idx] && i === item.a) b.classList.add("correct");
      answersDiv.appendChild(b);

      b.addEventListener("click", () => {
        if (answered[idx]) return;
        answered[idx] = true;
        corrects[idx] = i === item.a;

        b.classList.add(corrects[idx] ? "correct" : "incorrect");
        Array.from(answersDiv.children).forEach(sib => sib.disabled = true);
        updateScore();
      });
    });

    qWrap.appendChild(answersDiv);
    quizContainer.appendChild(qWrap);

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next Question";
    nextBtn.addEventListener("click", () => {
      if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        renderQuestion(currentQuestion);
      }
    });
    quizContainer.appendChild(nextBtn);

    // Previous button
    const preveousBtn = document.createElement("button");
    preveousBtn.textContent = "Preveous Section";
    preveousBtn.style.marginLeft = "10px";
    preveousBtn.addEventListener("click", () => {
      if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion(currentQuestion);
      }
    });
    quizContainer.appendChild(preveousBtn);
  }

  function updateScore() {
    const scoreBox = document.getElementById("quiz-score");
    if (scoreBox) scoreBox.textContent = `Score: ${corrects.filter(c => c).length} / ${quizData.length}`;
  }

  function resetQuizState() {
    currentQuestion = 0;
    for (let i = 0; i < quizData.length; i++) {
      answered[i] = false;
      corrects[i] = false;
    }
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      resetQuizState();
      renderQuestion(currentQuestion);
    });
  }

  // Initial render
  resetQuizState();
  renderQuestion(currentQuestion);

  // Smooth nav links
  document.querySelectorAll(".navbar a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
