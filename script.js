// -------------- Utilities: background loader & audio --------------
document.addEventListener("DOMContentLoaded", () => {
  // Set section backgrounds from data-bg attributes
  document.querySelectorAll(".section").forEach(s => {
    const bg = s.dataset.bg;
    if (bg) s.style.backgroundImage = `url('${bg}')`;
  });

  // Simple WebAudio tones for correct/wrong actions
  const audioCtx = window.AudioContext ? new AudioContext() : null;
  function playTone(freq = 660, type = 'sine', duration = 0.14, gain = 0.15) {
    if (!audioCtx) return;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.value = 0;
    o.connect(g); g.connect(audioCtx.destination);
    o.start();
    g.gain.linearRampToValueAtTime(gain, audioCtx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    setTimeout(()=> o.stop(), (duration+0.02)*1000);
  }

  // -------------- Navigation: Home + Nav + Next/Preveous --------------
  const links = document.querySelectorAll('.navbar a');
  links.forEach(a => {
    a.addEventListener('click', () => {
      const id = a.dataset.target;
      showSection(id);
    });
  });

  // Home button
  const homeBtn = document.getElementById('homeBtn');
  homeBtn.addEventListener('click', () => showSection('intro'));

  // showSection: toggle active class and focus to top
  function showSection(id) {
    if (!id) return;
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    const sec = document.getElementById(id);
    if (!sec) return;
    sec.classList.add('active');
    // scroll to top of section for mobile
    sec.scrollTo?.({ top: 0, behavior: 'smooth' });
    // also update URL hash without page jump
    history.replaceState(null, '', `#${id}`);
  }

  // wired Next/Preveous buttons inside sections (data-next / data-prev)
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const next = btn.dataset.next;
      const prev = btn.dataset.prev;
      if (next) showSection(next);
      else if (prev) showSection(prev);
    });
  });

  // Make first visible section active if none
  if (!document.querySelector('.section.active')) {
    const first = document.querySelector('.section');
    if (first) first.classList.add('active');
  }

  // -------------- Quick Quiz A (3-button) --------------
  const resultA = document.getElementById('resultA');
  document.querySelectorAll('.quiz-a-answers .choice-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ans = btn.dataset.answer;
      // play audio context on first user gesture (resume if suspended)
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
      if (ans === 'canyon') {
        resultA.textContent = "Correct! Canyon trails have steep stone walls.";
        resultA.style.color = '#2ecc71';
        playTone(760, 'sine', 0.14, 0.12);
      } else {
        resultA.textContent = "Incorrect — try again.";
        resultA.style.color = '#ff6b6b';
        // two short descending beeps for wrong
        playTone(520, 'sine', 0.09, 0.08);
        setTimeout(()=> playTone(380,'sine',0.12,0.08), 120);
      }
    });
  });

  // -------------- Final Quiz B: data, render, navigation, sounds --------------
  const quizData = [
    { q: "Which hike has dense trees?", o: ["Forest","Canyon","Mountain"], a: 0 },
    { q: "Which hike is rocky and steep?", o: ["Forest","Canyon","Mountain"], a: 2 },
    { q: "Which area is known for deep stone walls and cliffs?", o: ["Forest","Canyon","Mountain"], a: 1 },
    { q: "Which trail is best for beginners?", o: ["Forest","Mountain","Canyon"], a: 0 },
    { q: "Which hike may require acclimatization?", o: ["Forest","Mountain","Canyon"], a: 1 },
    { q: "Which trail often has shade from tall trees?", o: ["Canyon","Forest","Mountain"], a: 1 }
  ];

  const finalRoot = document.getElementById('final-quiz');

  // Internal state
  let qIndex = 0;
  const answered = new Array(quizData.length).fill(false);
  const corrects = new Array(quizData.length).fill(false);

  // Render current question (single-question view)
  function renderFinal() {
    if (!finalRoot) return;
    finalRoot.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'quiz-card';

    // question header: number + text
    const heading = document.createElement('div');
    heading.innerHTML = `<strong>Question ${qIndex+1} of ${quizData.length}</strong><p style="margin:6px 0 0; color:var(--muted)"> ${quizData[qIndex].q}</p>`;
    card.appendChild(heading);

    // answers
    const answersRow = document.createElement('div');
    answersRow.className = 'answers-row';
    quizData[qIndex].o.forEach((opt, i) => {
      const b = document.createElement('button');
      b.className = 'nav-btn';
      b.textContent = opt;
      b.disabled = answered[qIndex];
      b.addEventListener('click', () => handleFinalAnswer(i, b));
      answersRow.appendChild(b);
    });
    card.appendChild(answersRow);

    // feedback + score
    const feedback = document.createElement('div');
    feedback.id = 'final-feedback';
    feedback.style.minHeight = '20px';
    card.appendChild(feedback);

    // navigation row (Preveous, Next Question)
    const nav = document.createElement('div');
    nav.className = 'quiz-nav';
    const prevBtn = document.createElement('button');
    prevBtn.className = 'nav-btn';
    prevBtn.textContent = 'Preveous';
    prevBtn.disabled = (qIndex === 0);
    prevBtn.addEventListener('click', () => { qIndex = Math.max(0, qIndex - 1); renderFinal(); });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'nav-btn';
    nextBtn.textContent = 'Next Question';
    nextBtn.disabled = (qIndex === quizData.length - 1);
    nextBtn.addEventListener('click', () => { qIndex = Math.min(quizData.length - 1, qIndex + 1); renderFinal(); });

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);

    // score display
    const score = document.createElement('div');
    score.id = 'final-score';
    score.textContent = `Score: ${corrects.filter(Boolean).length} / ${quizData.length}`;
    score.style.marginTop = '8px';

    card.appendChild(nav);
    card.appendChild(score);

    finalRoot.appendChild(card);
  }

  function handleFinalAnswer(choiceIdx, btnEl) {
    if (answered[qIndex]) return;
    answered[qIndex] = true;
    const correct = (choiceIdx === quizData[qIndex].a);
    corrects[qIndex] = correct;

    // mark clicked button
    if (correct) {
      btnEl.classList.add('choice', 'correct');
      document.getElementById('final-feedback').textContent = 'Correct!';
      playTone(880, 'sine', 0.16, 0.12);
    } else {
      btnEl.classList.add('choice', 'incorrect');
      document.getElementById('final-feedback').textContent = 'Incorrect!';
      // play two-tone negative
      playTone(520,'sine',0.09,0.08);
      setTimeout(()=> playTone(380,'sine',0.11,0.08), 110);
    }

    // disable all buttons in answers row
    const row = btnEl.parentElement;
    row.querySelectorAll('button').forEach(b => b.disabled = true);

    // update score
    const score = document.getElementById('final-score');
    if (score) score.textContent = `Score: ${corrects.filter(Boolean).length} / ${quizData.length}`;
  }

  // restart quiz
  const restartBtn = document.getElementById('restart-quiz');
  if (restartBtn) restartBtn.addEventListener('click', () => {
    for (let i = 0; i < quizData.length; i++) { answered[i] = false; corrects[i] = false; }
    qIndex = 0;
    renderFinal();
  });

  // initial render
  renderFinal();

  // ensure audio context resumes on first user gesture (some browsers require it)
  window.addEventListener('click', () => {
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  }, { once: true });

});
