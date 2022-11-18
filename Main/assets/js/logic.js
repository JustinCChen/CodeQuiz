let startbtn = document.getElementById("start")
let timer = document.getElementById('time')
let questionsTitle = document.getElementById("question-title");
let choices = document.getElementById("choices");
let startScreen = document.getElementById("start-screen")
let questionStart = document.getElementById("questions")
let endScreen = document.getElementById("end-screen");
let feedbackEl = document.getElementById("feedback")
let submitBtn = document.getElementById("submit")
var finalScore = document.getElementById('final-score');

let index = 0;
let currentQuestion;
let timeLeft = 75;


let soundRight = new Audio('assets/sfx/correct.wav');
let soundWrong = new Audio('assets/sfx/incorrect.wav');




// function timeCount(){
//   timeLeft = 75;
//   let timeCount = setInterval(function(){
//     timeLeft--;
//     timer.textContent = timeLeft;
//     if(timeLeft === 0){
//       clearInterval(timeCount);
//       final();
//     }
//   },1000) 
// }

let timeCount = setInterval(clockStart, 1000);


function clockStart() {
  timeLeft--;
  if (timeLeft < 0) {
    timeLeft = 0;
  }
   timer.textContent = timeLeft;
  if (timeLeft <= 0) {
    gameEnd();
    final();
  }
}

function gameEnd(){
  clearInterval(timeCount)
  finalScore.textContent = timeLeft;
}


startbtn.addEventListener('click', function () { 
  clockStart(); 
  startScreen.setAttribute('class', 'hide');
  questionStart.removeAttribute('class');
  getQuestion();

})
let questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

function getQuestion (){
  console.log(questions)
  currentQuestion = questions[index];
  questionsTitle.textContent = currentQuestion.title;
  for (i= 0 ; i < currentQuestion.choices.length ; i++){
    let choiceBtn = document.createElement("button")
    choiceBtn.setAttribute("class", "myChoice")
    //value
    choiceBtn.setAttribute("value",currentQuestion.choices[i])
    choiceBtn.textContent = currentQuestion.choices[i];
    choices.appendChild(choiceBtn);
  }
  console.log(questions)
  //  chooseAnwser();
}

//   //point to answer
//   // click to see is true or false
//   //true index++
//   //false timeleft -15
//   // questionStart. set class hide
 // 
choices.onclick = chooseAnwser;
function chooseAnwser(event) {
  let clicked = event.target;
  if (!clicked.matches('.myChoice')) {
    return;
  }
  console.log(questions)
  if (clicked.value === currentQuestion.answer){
    index++;
    if (index > questions.length -1){
      choices.textContent = "";
      clearInterval(timeCount);
      finalScore.textContent = timeLeft;
      return final();
    }
    choices.textContent = "";
    getQuestion();
    soundRight.play();
  }else{
    timeLeft -= 15;
    soundWrong.play();
  }
  
}
submitBtn.onclick = final;

function final(){
  questionStart.setAttribute("class" ,"hide")
  endScreen.removeAttribute("class")
  // get input information
  //create object
  // save into object
  //save it in local storage
  // *to array
  let initialsEl = document.getElementById("initials")
  let initials = initialsEl.value
  if(initials !== ''){
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    
    let nameObj = {
      initials,
      score: timeLeft
    };
    highscores.push(nameObj);
    
    localStorage.setItem('highscores', JSON.stringify(highscores));
    location.href = 'highscores.html';

  }
}
