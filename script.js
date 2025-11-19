// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Apply background images from data-bg attributes
  document.querySelectorAll(".section").forEach(sec => {
    const bg = sec.dataset.bg;
    if (bg) sec.style.backgroundImage = `url('${bg}')`;
  });

  // --- Quiz A (Simple 3-button quiz) ---
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

  // --- Quiz B (Map-style quiz / multi-question) ---
  // Simple quiz data (you can edit/extend this)
  const quizData = [
    {
      q: "Which hike has dense trees?",
      o: ["Forest", "Canyon", "Mountain"],
      a: 0
    },
    {
      q: "Which hike is rocky and steep?",
      o: ["Forest", "Canyon", "Mountain"],
      a: 2
    },
    {
      q: "Which area is known for deep stone walls and cliffs?",
      o: ["Forest", "Canyon", "Mountain"],
      a: 1
    }
  ];

  const quizContainer = document.getElementById("quiz-container");
  const restartBtn = document.getElementById("restart-quiz");

  // Render the quiz into #quiz-container
  function renderQuiz() {
    if (!quizContainer) return;
    quizContainer.innerHTML = ""; // clear
    const scoreBox = document.createElement("div");
    scoreBox.id = "quiz-score";
    scoreBox.style.margin = "12px 0";
    scoreBox.textContent = "Score: 0 / " + quizData.length;
    quizContainer.appendChild(scoreBox);

    quizData.forEach((item, i) => {
      const qWrap = document.createElement("div");
      qWrap.className = "quiz-question";
      qWrap.style.marginBottom = "14px";

      const p = document.createElement("p");
      p.textContent = (i + 1) + ". " + item.q;
      qWrap.appendChild(p);

      const answersDiv = document.createElement("div");
      answersDiv.className = "answers";
      answersDiv.style.display = "flex";
      answersDiv.style.gap = "8px";
      answersDiv.style.flexWrap = "wrap";

      item.o.forEach((opt, idx) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "choice";
        b.dataset.q = i;
        b.dataset.idx = idx;
        b.textContent = opt;
        b.style.padding = "8px 12px";
        b.style.cursor = "pointer";
        answersDiv.appendChild(b);
      });

      qWrap.appendChild(answersDiv);
      quizContainer.appendChild(qWrap);
    });

    // attach handlers
    setupQuizButtons();
    // ensure score reset
    updateScore(0);
  }

  // Track answered questions to avoid double counting
  const answered = new Array(quizData.length).fill(false);
  const corrects = new Array(quizData.length).fill(false);

  function setupQuizButtons() {
    if (!quizContainer) return;
    quizContainer.querySelectorAll(".choice").forEach(btn => {
      btn.onclick = () => {
        const qIdx = Number(btn.dataset.q);
        const idx = Number(btn.dataset.idx);
        // ignore if question already answered
        if (answered[qIdx]) return;

        const isCorrect = quizData[qIdx].a === idx;
        answered[qIdx] = true;
        corrects[qIdx] = isCorrect;

        // visual feedback
        btn.classList.add(isCorrect ? "correct" : "incorrect");
        btn.disabled = true;

        // disable sibling buttons for same question
        const siblings = btn.parentElement.querySelectorAll("button");
        siblings.forEach(s => s.disabled = true);

        // update score display
        const totalCorrect = corrects.reduce((acc, v) => acc + (v ? 1 : 0), 0);
        updateScore(totalCorrect);

        // optional: scroll to next question (if you have wide layout)
        // quizContainer.scrollBy({ left: window.innerWidth, behavior: "smooth" });
      };
    });
  }

  function updateScore(n) {
    const scoreBox = document.getElementById("quiz-score");
    if (scoreBox) scoreBox.textContent = `Score: ${n} / ${quizData.length}`;
  }

  function resetQuizState() {
    for (let i = 0; i < quizData.length; i++) {
      answered[i] = false;
      corrects[i] = false;
    }
  }

  // Restart behavior
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      resetQuizState();
      renderQuiz();
    });
  }

  // Initial render
  resetQuizState();
  renderQuiz();

  // Optional: smooth behavior for nav links (nice on single-page)
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
