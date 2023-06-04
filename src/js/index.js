// imort json data (which holds questions)
import jsonData from '../dataset.json' assert {type:"json"};


function showSpinner(){
    document.querySelector(".spinner").classList.add("show");
}
function hideSpinner(){
    document.querySelector(".spinner").classList.remove("show");
}
// showSpinner();


const questionBox=document.querySelector(".questionBox");
const answersBox=document.querySelector(".options");
const nextButton=document.querySelector(".next");
const previousButton=document.querySelector(".previous");
const submitButton=document.querySelector(".sumbit")

let index=3;
let score=0;

const page=window.location.pathname;  // this stores the current page address

//this function will call specific functions accourding to current page
function init(){
        switch(page){
    case "/Pages/music.html":
       musicQuiz();
        break;
    case "/Pages/modern_art.html":
        modernArtQuiz();
        break;
    case "/Pages/coding.html":
        codingQuiz();
        break;
    }
}

document.addEventListener("DOMContentLoaded",init);  //calling init function
    

    // these three functions send different arguments based on the viewing page 

    function musicQuiz(){
        let currentTopic=jsonData.music;  // this stores the music questions array from json
    //    let index=0;
        showQuestion(currentTopic);
         forTopic(currentTopic);
    }

    function modernArtQuiz(){
        let currentTopic=jsonData['modern-art']; // this stores the modern questions array
        showQuestion(currentTopic);
         forTopic(currentTopic);
    }

    function codingQuiz(){
        let currentTopic=jsonData.coding;  // this stores the coding questions array
        showQuestion(currentTopic);
          forTopic(currentTopic);
    }


    // this function  shows question question and answer based on argument passed to it. 
function showQuestion(currentTopic){
    resetState();
    let currentObject=currentTopic[index];
    // const correctAnswer=currentQuestion.answer;
    let questionNo=index+1;
    questionBox.innerText=`${questionNo}. ${currentObject.question}`;

    currentObject.options.forEach(element => {
        const button=document.createElement("button");
        button.innerText=element;
        button.classList.add("button");
        answersBox.appendChild(button);
    });
}

function resetState(){      // resets previous state 
    while(answersBox.firstChild){
        answersBox.removeChild(answersBox.firstChild);
    }
}

nextButton.addEventListener("click",showNextQuestion); // shows the next question

function showNextQuestion(){
      index++;
    if(index<currentTopic.length){    
        showQuestion(currentTopic);
    }else{
        nextButton.disabled = true;
        // submitButton.disabled=false;
        // const submit=document.createElement("button")
    }
}

previousButton.addEventListener("click",showPreviousQuestion);  // shows the previous question

function showPreviousQuestion(){
    if(index>0){
         index--;
        showQuestion(currentTopic);
    }
    if(index<currentTopic.length){
        nextButton.disabled = false;
    }
}
