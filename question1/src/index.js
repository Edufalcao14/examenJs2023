/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import questions from './utils/questions'


    const main = document.querySelector('main');
    const mainContainerQuestions = document.createElement('div');
    mainContainerQuestions.className = "container-questions";
    let questionsToShow = [];


    function getRandomInt() {
        return Math.floor(Math.random() * 31);
      }
      const mixArray = (array) => array.sort(() => Math.random() - 0.5);
    // Function to render questions
    const renderQuestions = () => {
        mainContainerQuestions.innerHTML = "";
        questionsToShow = [];

      for (let i = 0; i < 3; i+=1) {
          questionsToShow.push(questions[getRandomInt()]);
      }

        
        questionsToShow.forEach((question , questionIndex)=>{
            const questionContainer = document.createElement("div");
            questionContainer.className = "question";
            const textQuestion = `<h1> ${question.question} </h1>`;
            let  answersText =` `;
            const answersMixed = mixArray(question.answers);
            answersMixed.forEach((answer , answerIndex)=>{
             answersText += `
             <label>
             <input type="radio" name="${questionIndex}" value="${answerIndex}">
             ${answer.text}
            </label>
             `;
            });
            answersText += `</form> `;
            
            questionContainer.innerHTML = textQuestion + answersText;
            mainContainerQuestions.appendChild(questionContainer)
            
    });
    const submitButton = document.createElement("button");
    submitButton.className = "btn btn-success";
    submitButton.id = "btn"
    submitButton.textContent = "Calculer le score";
    submitButton.addEventListener("click", calculateScore);
    mainContainerQuestions.appendChild(submitButton);
    main.appendChild(mainContainerQuestions);
};
    // Function to calculate the score
    const calculateScore = () => {
        let score = 0;

        const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
        selectedOptions.forEach((option) => {
            const question= questionsToShow[option.name];
            const selectedOptionIndex = option.value;
            const isCorrectValue = question.answers[selectedOptionIndex].isCorrect
            if (isCorrectValue) {
                score +=1;
            }
        });
       
        showResult(score);
    };
 // Function to display the result
 const showResult = (score) => {
    mainContainerQuestions.innerHTML = `<p>Votre score est de ${score} sur 3</p>`;

    const restartButton = document.createElement("button");
    restartButton.className = "btn btn-success";
    restartButton.id = "btn"
    restartButton.textContent = "Recommencer";
    restartButton.addEventListener("click", renderQuestions);

    mainContainerQuestions.appendChild(restartButton);
};

renderQuestions();