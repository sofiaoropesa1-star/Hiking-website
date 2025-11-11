// Mini quizzes
document.querySelectorAll('.mini-quiz .choice').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const parent = btn.closest('.mini-quiz');
    parent.querySelectorAll('.choice').forEach(c=>{
      c.classList.remove('correct','wrong');
    });
    if(btn.classList.contains('correct')){
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
    }
  });
});

// Full quiz
let quizIndex = 0;
const cards = document.querySelectorAll('.quiz-map .quiz-card');
function resetFullQuiz(){
  quizIndex = 0;
  cards.forEach(c=>{
    c.style.display='none';
    c.querySelectorAll('.choice').forEach(b=>b.classList.remove('correct','wrong'));
  });
  cards[quizIndex].style.display='block';
  document.getElementById('quizFeedback').textContent='';
}
resetFullQuiz();

cards.forEach(card=>{
  card.querySelectorAll('.choice').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(btn.classList.contains('correct')){
        btn.classList.add('correct');
        document.getElementById('quizFeedback').textContent='✅ Correct!';
        setTimeout(()=>nextCard(),500);
      } else {
        btn.classList.add('wrong');
        document.getElementById('quizFeedback').textContent='❌ Try again.';
      }
    });
  });
});

function nextCard(){
  cards[quizIndex].style.display='none';
  quizIndex++;
  if(quizIndex>=cards.length){
    document.getElementById('quizFeedback').textContent='🎉 Trail Complete! You can retake anytime.';
    return;
  }
  cards[quizIndex].style.display='block';
}

document.getElementById('retakeQuiz').addEventListener('click', resetFullQuiz);
