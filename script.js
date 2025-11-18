let currentSection = 0;
const pages = document.querySelectorAll(".page");
const overlay = document.getElementById("earth-overlay");
const earth = document.getElementById("earth-img");

pages[0].style.backgroundImage = `url(${pages[0].dataset.bg})`;

document.querySelectorAll(".next").forEach(btn => {
    btn.addEventListener("click", () => {
        triggerZoom(btn.dataset.next);
    });
});

function triggerZoom(nextIndex) {
    overlay.style.display = "flex";
    earth.style.transform = "scale(0.1)";

    setTimeout(() => {
        earth.style.transform = "scale(3)";
    }, 50);

    setTimeout(() => {
        overlay.style.display = "none";
        goToSection(nextIndex);
    }, 1500);
}

function goToSection(index) {
    pages[currentSection].classList.remove("active");
    currentSection = Number(index);
    pages[currentSection].classList.add("active");

    let bg = pages[currentSection].dataset.bg;
    pages[currentSection].style.backgroundImage = `url(${bg})`;
}

/* QUIZ */
function checkQuiz(q, ans) {
    let result = document.getElementById("result");

    if (q === 1 && ans === "forest") result.innerText = "Correct!";
    else if (q === 2 && ans === "mountain") result.innerText = "Correct!";
    else result.innerText = "Incorrect!";
}

function restart() {
    goToSection(0);
}
    const div = document.createElement("div");
    div.className = "quiz-question";

    div.innerHTML =
      `<p>${i+1}. ${item.q}</p>` +
      item.o.map((opt,idx)=>
        `<button class='choice' data-q='${i}' data-idx='${idx}'>${opt}</button>`
      ).join("");

    quizContainer.appendChild(div);
  });

  setupQuizButtons();
}

function setupQuizButtons() {
  quizContainer.querySelectorAll(".choice").forEach(b => {
    b.onclick = () => {
      const q = quizData[b.dataset.q];
      const correct = q.a == b.dataset.idx;

      b.classList.add(correct ? "correct" : "incorrect");

      quizContainer.scrollBy({
        left: window.innerWidth,
        behavior: "smooth"
      });
    };
  });
}

document.getElementById("restart-quiz").onclick = renderQuiz;

renderQuiz();
    const div = document.createElement("div");
    div.className = "quiz-question";

    div.innerHTML =
      `<p>${i+1}. ${item.q}</p>` +
      item.o.map((opt,idx)=>
        `<button class='choice' data-q='${i}' data-idx='${idx}'>${opt}</button>`
      ).join("");

    quizContainer.appendChild(div);
  });

  setupQuizButtons();
}

function setupQuizButtons() {
  quizContainer.querySelectorAll(".choice").forEach(b => {
    b.onclick = () => {
      const q = quizData[b.dataset.q];
      const correct = q.a == b.dataset.idx;

      b.classList.add(correct ? "correct" : "incorrect");

      quizContainer.scrollBy({
        left: window.innerWidth,
        behavior: "smooth"
      });
    };
  });
}

document.getElementById("restart-quiz").onclick = renderQuiz;

renderQuiz();
