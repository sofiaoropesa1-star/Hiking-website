document.addEventListener("DOMContentLoaded", () => {
    // Set background images
    document.querySelectorAll(".section").forEach(sec => {
        const bg = sec.dataset.bg;
        if (bg) sec.style.backgroundImage = `url('${bg}')`;
    });

    // NEXT BUTTON NAVIGATION
    document.querySelectorAll(".nextBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const nextId = btn.dataset.next;
            const current = btn.closest(".section");
            const next = document.getElementById(nextId);
            if (current && next) {
                current.classList.add("hidden");
                next.classList.remove("hidden");
            }
        });
    });

    // QUIZ A
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

    // QUIZ B
    const quizData = [
        { q: "Which hike has dense trees?", o: ["Forest","Canyon","Mountain"], a: 0 },
        { q: "Which hike is rocky and steep?", o: ["Forest","Canyon","Mountain"], a: 2 },
        { q: "Which area is known for deep stone walls and cliffs?", o: ["Forest","Canyon","Mountain"], a: 1 }
    ];

    const quizContainer = document.getElementById("quiz-container");
    const restartBtn = document.getElementById("restart-quiz");
    let answered = new Array(quizData.length).fill(false);
    let corrects = new Array(quizData.length).fill(false);

    function renderQuiz() {
        quizContainer.innerHTML = "";
        const scoreBox = document.createElement("div");
        scoreBox.id = "quiz-score";
        scoreBox.textContent = `Score: 0 / ${quizData.length}`;
        quizContainer.appendChild(scoreBox);

        quizData.forEach((item,i) => {
            const qWrap = document.createElement("div");
            qWrap.className = "quiz-question";

            const p = document.createElement("p");
            p.textContent = `${i+1}. ${item.q}`;
            qWrap.appendChild(p);

            const answersDiv = document.createElement("div");
            answersDiv.className = "answers";

            item.o.forEach((opt, idx) => {
                const b = document.createElement("button");
                b.textContent = opt;
                b.className = "choice";
                b.dataset.q = i;
                b.dataset.idx = idx;
                answersDiv.appendChild(b);
            });

            qWrap.appendChild(answersDiv);
            quizContainer.appendChild(qWrap);
        });

        setupQuizButtons();
        updateScore(0);
    }

    function setupQuizButtons() {
        quizContainer.querySelectorAll(".choice").forEach(btn => {
            btn.onclick = () => {
                const qIdx = Number(btn.dataset.q);
                const idx = Number(btn.dataset.idx);
                if (answered[qIdx]) return;
                answered[qIdx] = true;
                corrects[qIdx] = (quizData[qIdx].a === idx);
                btn.classList.add(corrects[qIdx] ? "correct" : "incorrect");
                btn.parentElement.querySelectorAll("button").forEach(s => s.disabled = true);
                const totalCorrect = corrects.reduce((acc,v)=> acc+(v?1:0),0);
                updateScore(totalCorrect);
            };
        });
    }

    function updateScore(n) {
        const scoreBox = document.getElementById("quiz-score");
        if (scoreBox) scoreBox.textContent = `Score: ${n} / ${quizData.length}`;
    }

    function resetQuizState() {
        answered.fill(false);
        corrects.fill(false);
    }

    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            resetQuizState();
            renderQuiz();
        });
    }

    resetQuizState();
    renderQuiz();

    // SMOOTH NAVIGATION
    document.querySelectorAll(".navbar a[href^='#']").forEach(link => {
        link.addEventListener("click", e => {
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({behavior:"smooth"});
            }
        });
    });
});
