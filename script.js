document.addEventListener('DOMContentLoaded', () => {

  // ---- setup ----
  const slides = Array.from(document.querySelectorAll('.slide'));
  const overlay = document.getElementById('earth-overlay');
  const quizContainer = document.getElementById('quiz-container');
  let current = slides.findIndex(s => s.classList.contains('active'));
  if (current < 0) current = 0;

  // ensure slides use dataset backgrounds (fix path case-sensitivity)
  slides.forEach(s => {
    const bg = s.dataset.bg;
    if (bg) s.style.backgroundImage = `url("${bg}")`;
  });

  // helper: show slide
  function showSlide(index) {
    slides.forEach((s,i) => s.classList.toggle('active', i === index));
    current = index;
    // if we landed on quiz slide, build quiz
    if (slides[index].classList.contains('quiz-slide')) {
      buildQuiz();
      // scroll quiz to start
      quizContainer.scrollLeft = 0;
    }
  }

  // next button handler: show Earth overlay, then show next slide
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.next-btn');
    if (!btn) return;
    // determine next index (data-next must be numeric)
    const nextIndex = Number(btn.dataset.next);
    if (Number.isNaN(nextIndex)) return;

    // play Earth zoom
    overlay.classList.add('active');
    // after overlay zoom-out, swap slides
    setTimeout(() => {
      overlay.classList.remove('active');
      showSlide(Math.min(nextIndex, slides.length - 1));
    }, 1100);
  });

  // mini-quiz feedback
  document.body.addEventListener('click', (e) => {
    const choice = e.target.closest('.mini-choice');
    if (!choice) return;
    const container = choice.closest('.mini-quiz');
    const resultEl = container.querySelector('.mini-result');
    const correct = choice.dataset.correct === "true";
    // color feedback
    container.querySelectorAll('.mini-choice').forEach(b => b.classList.remove('correct','wrong'));
    choice.classList.add(correct ? 'correct' : 'wrong');
    resultEl.textContent = correct ? 'Correct!' : 'Incorrect — try again';
  });

  // ---------------- Final Map Quiz ----------------
  const quizData = [
    { q: "What should you bring on a hike?", options: ["Candy", "Water", "TV"], a: 1 },
    { q: "If you get lost, you should...", options: ["Run", "Stay calm", "Hide"], a: 1 },
    { q: "What prevents dehydration?", options: ["Drink water", "Avoid water", "Eat chips"], a: 0 },
    { q: "Best time to hike safely?", options: ["At night", "Daylight", "Storm"], a: 1 },
    { q: "How to treat a small cut?", options: ["Wash & bandage", "Ignore it", "Use unclean cloth"], a: 0 },
    { q: "What to check before hiking?", options: ["Weather", "Movie times", "Lottery"], a: 0 }
  ];

  function buildQuiz() {
    if (!quizContainer) return;
    // avoid rebuilding if already built (simple guard)
    if (quizContainer.dataset.built === "1") return;
    quizContainer.innerHTML = '';
    quizData.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'map-card';
      const prompt = document.createElement('p');
      prompt.textContent = `${i+1}. ${item.q}`;
      card.appendChild(prompt);

      item.options.forEach((opt, idx) => {
        const b = document.createElement('button');
        b.className = 'final-choice';
        b.textContent = opt;
        b.dataset.q = i;
        b.dataset.idx = idx;
        b.addEventListener('click', () => {
          const correct = item.a === idx;
          b.classList.add(correct ? 'correct' : 'wrong');
          // do not allow changing answer style after click for that button
          // automatically scroll to next card (if any)
          setTimeout(() => {
            quizContainer.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
          }, 250);
        });
        card.appendChild(b);
      });

      // result placeholder (optional)
      const res = document.createElement('div');
      res.id = `final-result-${i+1}`;
      res.style.marginTop = '8px';
      card.appendChild(res);

      quizContainer.appendChild(card);
    });
    quizContainer.dataset.built = "1";
  }

  // retake button
  const retake = document.getElementById('retake');
  if (retake) {
    retake.addEventListener('click', () => {
      // clear choices styling and reset scroll
      quizContainer.querySelectorAll('.final-choice').forEach(b => b.classList.remove('correct','wrong'));
      quizContainer.scrollLeft = 0;
    });
  }

  // ensure starting slide is visible
  showSlide(current);
  // debug
  console.log('script.js loaded — slides:', slides.length);
});
