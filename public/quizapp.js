  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
  import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyClnzQ4pFirP7OIlclWQHDckwv79yijNUE",
    authDomain: "quiz-app-2a5dd.firebaseapp.com",
    databaseURL: "https://quiz-app-2a5dd-default-rtdb.firebaseio.com",
    projectId: "quiz-app-2a5dd",
    storageBucket: "quiz-app-2a5dd.appspot.com",
    messagingSenderId: "308483402650",
    appId: "1:308483402650:web:0ba1cc7abf7bd3559a6823",
    measurementId: "G-2GWLFP3HRT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  var db = getDatabase();

  var questions = [];
  function getQuestions(){
  var reference = ref(db, 'questions/');
  var showQuestions = [];

  onValue(reference,function(data){
      showQuestions = Object.values(data.val());
      questions.length = 0;
      for(var i = 0; i < showQuestions.length; i++){
        showQuestions[i].numb = i+1;
        questions.push(showQuestions[i]);
        // console.log(questions)
        renderQuiz()
      } 
  })
  
}

getQuestions()

var currentQuestion = document.getElementById('currentQuestion');
var totalQuestions = document.getElementById('totalQuestions');
var question = document.getElementById('question');
var answers = document.getElementById('answers');
var result = document.getElementById('result');
var passStatus = document.getElementById('status');
var clearResult = document.getElementById('clear');
var indexNumber = 0;
var marks = 0;
var percentage;

window.next = function(){
    if(indexNumber+1 == questions.length){
        alert("Quiz Completed")
        indexNumber = 0
        result.innerHTML = `Your Score is ${marks}`
        if(marks<questions.length/2){
            passStatus.className += ' text-danger'
            passStatus.innerHTML = 'FAIL!'
        }
        else{
            passStatus.className += ' text-success'
            passStatus.innerHTML = `Passed with ${percentage = (marks/questions.length)*100}%`
        }
        
        renderQuiz()
    }
    else{
        indexNumber = indexNumber + 1
        renderQuiz()
    }
}

window.authenticateAnswer = function(selectedAnswer, correctAnswer){
    var userOption = selectedAnswer.innerHTML
    if(userOption == correctAnswer){
        marks = marks + 1;
    }
    var allBtns = answers.getElementsByTagName('button');
    // console.log(allBtns)
    for(var i = 0; i < allBtns.length; i++){
        allBtns[i].disabled = true;
        if(allBtns[i].innerHTML == correctAnswer){
            allBtns[i].className += ' bg-success'
            allBtns[i].className += ' fw-bold'
        }
        else{
            allBtns[i].className += ' bg-danger'
        }
    }
}

window.renderQuiz = function(){
    question.innerHTML = questions[indexNumber].question;
    totalQuestions.innerHTML = questions.length
    currentQuestion.innerHTML = indexNumber + 1
    answers.innerHTML = ''
    for(var i = 0; i < questions[indexNumber].option.length; i++){
        answers.innerHTML += `
        <div class="col-md-6 py-2">
            <button onclick = "authenticateAnswer(this, '${questions[indexNumber].correctOption}')" class="btn fs-5 w-100 btn-info p-2">${questions[indexNumber].option[i]}</button>
        </div>`
    }  
}

window.clearData = function(){
    passStatus.innerHTML = ''
    result.innerHTML = ''
}