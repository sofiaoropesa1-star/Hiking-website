document.addEventListener("DOMContentLoaded", () => {

  const slides = [...document.querySelectorAll(".slide")];
  const overlay = document.getElementById("earth-overlay");
  const quizContainer = document.getElementById("quiz-container");
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  const retakeBtn = document.getElementById("retake");
  let current = 0;

  // Set slide backgrounds
  slides.forEach(s => {
    const bg = s.dataset.bg;
    if(bg) s.style.backgroundImage = `url(${bg})`;
  });

  function showSlide(i){
    slides.forEach((s, idx) => s.classList.toggle("active", idx===i));
    current = i;
  }

  // Next button
  document.body.addEventListener("click",(e)=>{
    const btn = e.target.closest(".next-btn");
    if(!btn) return;
    const next = Number(btn.dataset.next);
    overlay.classList.add("active");
    setTimeout(()=>{
      overlay.classList.remove("active");
      showSlide(next);
    },1100);
  });

  // Previous button
  document.body.addEventListener("click",(e)=>{
    const btn = e.target.closest(".prev-btn");
    if(!btn) return;
    const prev = Number(btn.dataset.prev);
    showSlide(prev);
  });

  // Mini quiz
  document.body.addEventListener("click",(e)=>{
    const choice = e.target.closest(".mini-choice");
    if(!choice) return;
    const container = choice.closest(".mini-quiz");
    const result = container.querySelector(".mini-result");
    const isCorrect = choice.dataset.correct === "true";
    container.querySelectorAll(".mini-choice").forEach(b=>b.classList.remove("correct","wrong"));
    choice.classList.add(isCorrect ? "correct":"wrong");
    result.textContent = isCorrect ? "Correct!":"Try again";
  });

  // Final Quiz Data (10 questions)
  const quizData = [
    {q:"What should you bring on a hike?", options:["Candy","Water","TV"], a:1},
    {q:"If you get lost, you should…", options:["Run","Stay calm","Hide"], a:1},
    {q:"What’s important to check before hiking?", options:["Weather","Movies","Shoes"], a:0},
    {q:"Which is unsafe while hiking?", options:["Steep trail","Bring water","Wear proper shoes"], a:0},
    {q:"What’s the recommended footwear for hiking?", options:["Flip-flops","Hiking boots","Sneakers"], a:1},
    {q:"How should you signal for help if lost?", options:["Shout endlessly","Use whistle or mirror","Hide under a tree"], a:1},
    {q:"What is a good snack for a hike?", options:["Chips","Trail mix","Candy only"], a:1},
    {q:"Why is hydration important?", options:["Keeps energy up","Makes you sleepy","Slows walking"], a:0},
    {q:"If it starts raining on a hike, you should…", options:["Keep going without gear","Use raincoat and find shelter","Ignore it"], a:1},
    {q:"Which is an example of Leave No Trace principle?", options:["Leave trash behind","Take photos and pack out trash","Cut down trees"], a:1}
  ];

  function updateProgress(index){
    progressText.textContent = `Question ${index+1} of ${quizData.length}`;
    const percent = ((index+1)/quizData.length)*100;
    progressBar.style.width = percent+"%";
  }

  function buildQuiz(){
    quizContainer.innerHTML="";
    quizData.forEach((item,i)=>{
      const card = document.createElement("div");
      card.className="map-card";

      const q = document.createElement("p");
      q.textContent = `${i+1}. ${item.q}`;
      card.appendChild(q);

      item.options.forEach((text,idx)=>{
        const b = document.createElement("button");
        b.className="final-choice";
        b.textContent=text;

        b.onclick = ()=>{
          b.classList.add(idx===item.a?"correct":"wrong");
          const currentIndex = Array.from(quizContainer.children).indexOf(card);
          updateProgress(currentIndex);
          const nextCard = card.nextElementSibling;
          if(nextCard){
            nextCard.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"});
            updateProgress(currentIndex+1);
          }
        };

        card.appendChild(b);
      });

      quizContainer.appendChild(card);
    });
    updateProgress(0);
  }

  // Retake Quiz
  retakeBtn.addEventListener("click",()=>{
    buildQuiz();
    quizContainer.scrollTo({left:0,behavior:"smooth"});
  });

  buildQuiz();
  showSlide(0);

});
