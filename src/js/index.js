// import json data (which holds questions)
import jsonData from '../dataset.json' assert {type:"json"};

// variable decleration
const questionBox=document.querySelector(".questionBox");
const answersBox=document.querySelector(".options");
const nextButton=document.querySelector(".next");
const previousButton=document.querySelector(".previous");
const submitButton=document.querySelector(".sumbit")

function showSpinner(){
    document.querySelector(".spinner").classList.add("show");
}
function hideSpinner(){
    document.querySelector(".spinner").classList.remove("show");
}
// showSpinner();


let data=null;
let index=0;
let score=0;

const page=window.location.pathname;  // this stores the current page address

//this function will call specific functions accourding to current page
function init(){
        switch(page){
    case "/Pages/music.html":
       data=jsonData.music;
        break;
    case "/Pages/modern_art.html":
       data=jsonData['modern-art'];
        break;
    case "/Pages/coding.html":
        data=jsonData.coding;
        break;
    }
    showQuestion(data);
}

document.addEventListener("DOMContentLoaded",init);  //calling init function
    
    // this function  shows question question and answer based on argument passed to it. 
function showQuestion(data){
    resetState();
    let currentObject=data[index];
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
    if(index<data.length){    
        showQuestion(data);
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
        showQuestion(data);
    }
    if(index<data.length){
        nextButton.disabled = false;
    }
}
