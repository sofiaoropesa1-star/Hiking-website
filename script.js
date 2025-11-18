function nextSection(num) {
    let current = document.querySelector(".section:not(.hidden)");
    let next = document.getElementById("section" + num);

    current.classList.add("hidden");
    next.classList.remove("hidden");
}

function checkAnswer(ans) {
    let result = document.getElementById("result");

    if (ans === "canyon") {
        result.innerHTML = "Correct! Canyon trails are known for steep cliffs.";
        result.style.color = "lightgreen";
    } else {
        result.innerHTML = "Incorrect. Try again!";
        result.style.color = "red";
    }
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
