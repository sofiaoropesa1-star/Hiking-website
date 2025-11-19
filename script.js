document.addEventListener("DOMContentLoaded", () => {
    // Set background images from data-bg
    document.querySelectorAll(".section").forEach(sec => {
        if (sec.dataset.bg) sec.style.backgroundImage = `url('${sec.dataset.bg}')`;
    });

    // --- Section Navigation ---
    window.nextSection = function(id) {
        document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
        const next = document.getElementById(id);
        if (next) next.classList.remove("hidden");
    };

    window.preveousSection = function(id) {
        document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
        const prev = document.getElementById(id);
        if (prev) prev.classList.remove("hidden");
    };

    // --- Smooth Scroll for navbar ---
    document.querySelectorAll(".navbar a[href^='#']").forEach(link => {
        link.addEventListener("click", e => {
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
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
        {q:"Which hike has dense trees?", o:["Forest","Canyon","Mountain"], a:0},
        {q:"Which hike is rocky and steep?", o:["Forest","Canyon","Mountain"], a:2},
        {q:"Which area is known for deep stone walls and cliffs?", o:["Forest","Canyon","Mountain"], a:1},
        {q:"Which hike has soft dirt paths?", o:["Mountain","Canyon","Forest"], a:2},
        {q:"Which trail is high altitude?", o:["Mountain","Forest","Canyon"], a:0},
        {q:"Which area is famous in Southwest U.S.?", o:["Forest","Canyon","Mountain"], a:1}
    ];

    const quizContainer = document.getElementById("quiz-container");
    const restartBtn = document.getElementById("restart-quiz");
    const answered = new Array(quizData.length).fill(false);
    const corrects = new Array(quizData.length).fill(false);

    function renderQuiz() {
        if (!quizContainer) return;
        quizContainer.innerHTML = "";
        const scoreBox = document.createElement("div");
        scoreBox.id = "quiz-score";
        scoreBox.textContent = `Score: 0 / ${quizData.length}`;
        quizContainer.appendChild(scoreBox);

        quizData.forEach((item,i)=>{
            const qWrap = document.createElement("div");
            qWrap.className="quiz-question";
            const p = document.createElement("p");
            p.textContent = (i+1)+". "+item.q;
            qWrap.appendChild(p);

            const answersDiv = document.createElement("div");
            answersDiv.style.display="flex";
            answersDiv.style.gap="8px";
            item.o.forEach((opt,idx)=>{
                const b=document.createElement("button");
                b.className="choice";
                b.dataset.q=i;
                b.dataset.idx=idx;
                b.textContent=opt;
                answersDiv.appendChild(b);
            });
            qWrap.appendChild(answersDiv);
            quizContainer.appendChild(qWrap);
        });
        setupQuizButtons();
        updateScore(0);
    }

    function setupQuizButtons() {
        quizContainer.querySelectorAll(".choice").forEach(btn=>{
            btn.onclick=()=>{
                const qIdx=Number(btn.dataset.q);
                const idx=Number(btn.dataset.idx);
                if(answered[qIdx]) return;
                const isCorrect = quizData[qIdx].a === idx;
                answered[qIdx]=true;
                corrects[qIdx]=isCorrect;
                btn.classList.add(isCorrect?"correct":"incorrect");
                btn.disabled=true;
                // disable siblings
                btn.parentElement.querySelectorAll("button").forEach(s=>s.disabled=true);
                updateScore(corrects.filter(c=>c).length);
            }
        });
    }

    function updateScore(n) {
        const scoreBox = document.getElementById("quiz-score");
        if(scoreBox) scoreBox.textContent = `Score: ${n} / ${quizData.length}`;
    }

    function resetQuizState() {
        for(let i=0;i<quizData.length;i++){
            answered[i]=false;
            corrects[i]=false;
        }
    }

    if(restartBtn) {
        restartBtn.addEventListener("click", ()=>{
            resetQuizState();
            renderQuiz();
        });
    }

    resetQuizState();
    renderQuiz();
});
