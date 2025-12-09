document.addEventListener("DOMContentLoaded", () => {

  const slides = [...document.querySelectorAll(".slide")];
  const overlay = document.getElementById("earth-overlay");
  let current = 0;

  // Set background images
  slides.forEach(s => {
    const bg = s.dataset.bg;
    if (bg) s.style.backgroundImage = `url(${bg})`;
  });

  function showSlide(i) {
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
    current = i;
  }

  // Next button
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".next-btn");
    if (!btn) return;

    const next = Number(btn.dataset.next);

    overlay.classList.add("active");

    setTimeout(() => {
      overlay.classList.remove("active");
      showSlide(next);
    }, 1100);
  });

  // Previous button
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".prev-btn");
    if (!btn) return;

    const prev = Number(btn.dataset.prev);

    showSlide(prev);
  });

  // Mini quiz
  document.body.addEventListener("click", (e) => {
    const choice = e.target.closest(".mini-choice");
    if (!choice) return;

    const container = choice.closest(".mini-quiz");
    const result = container.querySelector(".mini-result");

    const isCorrect = choice.dataset.correct === "true";

    container.querySelectorAll(".mini-choice").forEach(b => b.classList.remove("correct","wrong"));
    choice.classList.add(isCorrect ? "correct" : "wrong");

    result.textContent = isCorrect ? "Correct!" : "Try again";
  });

  // Final quiz
  const quizContainer = document.getElementById("quiz-container");
  const quizData = [
    { q:"What should you bring on a hike?", options:["Candy","Water","TV"], a:1 },
    { q:"If you get lost, you should…", options:["Run","Stay calm","Hide"], a:1 }
  ];

  function buildQuiz() {
    quizContainer.innerHTML = "";
    quizData.forEach((item, i) => {
      const card = document.createElement("div");
      card.className = "map-card";

      const q = document.createElement("p");
      q.textContent = `${i+1}. ${item.q}`;
      card.appendChild(q);

      item.options.forEach((text, idx) => {
        const b = document.createElement("button");
        b.className = "final-choice";
        b.textContent = text;

        b.onclick = () => {
          b.classList.add(idx === item.a ? "correct" : "wrong");
          quizContainer.scrollBy({ left: window.innerWidth, behavior:"smooth" });
        };

        card.appendChild(b);
      });

      quizContainer.appendChild(card);
    });
  }

  buildQuiz();
  showSlide(0);

});
