const sections = document.querySelectorAll(".section");
const buttons = document.querySelectorAll(".next-section");
const transition = document.getElementById("earth-transition");
let current = 0;

sections.forEach(s => s.style.backgroundImage = `url(${s.dataset.bg})`);

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    transition.classList.add("active");

    setTimeout(() => {
      sections[current].classList.remove("active");
      current = (current + 1) % sections.length;
      sections[current].classList.add("active");

      transition.classList.remove("active");
    }, 1200);
  });
});

const quizData = [
  {q:"What should you bring?", o:["Candy","Water","TV"], a:1},
  {q:"If lost you should…", o:["Run","Stay calm","Yell"], a:1},
  {q:"Sign of dehydration?", o:["Dry mouth","Cold","Good energy"], a:0},
  {q:"Best hiking time?", o:["Daylight","Night"], a:0},
  {q:"Wildlife safety?", o:["Keep distance","Feed them"], a:0},
  {q:"Check before hiking?", o:["Weather","Movies"], a:0}
];

const quizContainer = document.getElementById("quiz-container");

function renderQuiz() {
  quizContainer.innerHTML = "";
  
  quizData.forEach((item, i) => {
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
