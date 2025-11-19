document.addEventListener("DOMContentLoaded", () => {
  // Apply background images
  document.querySelectorAll(".section").forEach(sec => {
    const bg = sec.dataset.bg;
    if (bg) sec.style.backgroundImage = `url('${bg}')`;
  });

  // --- NAVIGATION BAR ---
  document.querySelectorAll(".navbar a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      showSection(targetId);
    });
  });

  // --- NEXT / PREVIOUS BUTTONS ---
  window.nextSection = showSection;
  window.prevSection = showSection;

  function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
  }

  // --- QUIZ A ---
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

  // --- QUIZ B ---
  const quizData = [
    { q: "Which hike has dense trees?", o: ["Forest","Canyon","Mountain"], a:0 },
    { q: "Which hike is rocky and steep?", o: ["Forest","Canyon","Mountain"], a:2 },
    { q: "Which area is known for deep stone walls?", o:["Forest","Canyon","Mountain"], a:1 },
    { q: "Which trail is best for endurance?", o:["Forest","Canyon","Mountain"], a:2 },
    { q: "Which area is heavily shaded?", o:["Forest","Canyon","Mountain"], a:0 },
    { q: "Which trail has loose rocks and cliffs?", o:["Forest","Canyon","Mountain"], a:1 }
  ];

  const quizContainer = document.getElementById("quiz-container");
  const restartBtn = document.getElementById("restart-quiz");

  function renderQuiz() {
    if (!quizContainer) return;
    quizContainer.innerHTML = "";
    const scoreBox = document.createElement("div");
    scoreBox.id = "quiz-score";
    scoreBox.style.margin = "12px 0";
    scoreBox.textContent = "Score: 0 / " + quizData.length;
    quizContainer.appendChild(scoreBox);

    quizData.forEach((item,i)=>{
      const qWrap = document.createElement("div");
      qWrap.className = "quiz-question";

      const p = document.createElement("p");
      p.textContent = (i+1)+". "+item.q;
      qWrap.appendChild(p);

      const answersDiv = document.createElement("div");
      answersDiv.className = "answers";
      answersDiv.style.display = "flex";
      answersDiv.style.gap = "8px";

      item.o.forEach((opt, idx)=>{
        const b = document.createElement("button");
        b.type="button";
        b.className="choice";
        b.dataset.q = i;
        b.dataset.idx = idx;
        b.textContent = opt;
        answersDiv.appendChild(b);
      });

      qWrap.appendChild(answersDiv);
      quizContainer.appendChild(qWrap);
    });

    setupQuizButtons();
    resetQuizState();
  }

  const answered = new Array(quizData.length).fill(false);
  const corrects = new Array(quizData.length).fill(false);

  function setupQuizButtons() {
    quizContainer.querySelectorAll(".choice").forEach(btn=>{
      btn.onclick = ()=>{
        const qIdx = Number(btn.dataset.q);
        const idx = Number(btn.dataset.idx);
        if(answered[qIdx]) return;

        const isCorrect = quizData[qIdx].a===idx;
        answered[qIdx]=true;
        corrects[qIdx]=isCorrect;

        btn.classList.add(isCorrect?"correct":"incorrect");
        btn.disabled = true;
        btn.parentElement.querySelectorAll("button").forEach(s=>{
          if(s!==btn) s.disabled=true;
        });

        const totalCorrect = corrects.reduce((acc,v)=>acc+(v?1:0),0);
        updateScore(totalCorrect);
      };
    });
  }

  function updateScore(n) {
    const scoreBox = document.getElementById("quiz-score");
    if(scoreBox) scoreBox.textContent = `Score: ${n} / ${quizData.length}`;
  }

  function resetQuizState(){
    for(let i=0;i<quizData.length;i++){answered[i]=false; corrects[i]=false;}
  }

  if(restartBtn) restartBtn.addEventListener("click", renderQuiz);

  renderQuiz();
});
