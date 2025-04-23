(function(){
  function buildQuiz(){
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        const answers = [];
        for(letter in currentQuestion.answers){

          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}"/>
              ${letter} :
              ${currentQuestion.answers[letter]}
            `
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // a collection of all the answers
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // set the score to 0
    let numCorrect = 0;
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if(userAnswer === currentQuestion.correctAnswer){
        numCorrect++; /*increment score by 1*/
        answerContainers[questionNumber].style.color = 'lightgreen';
      }      /*if the answer is correct, change the color to green and to red otherwise*/
      else{
          answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "This answer doesn't need a ruler, I guess?", 

      answers: { 

        a: "Government", 

        b: "measurement", 

        c: "centimetre", 

        d: "estimation" 

      }, 

      correctAnswer: "d" 

    }, 

    { 

      question: "Written from an island in Indonesia perhaps?", 

      answers: { 

        a: "Javascript", 

        b: "Tailwind", 

        c: "Typescript", 

        d: "Hypertext" 

      }, 

      correctAnswer: "a" 

    }, 

    { 

      question: "This language online is overstimulated", 

      answers: { 

        a: "Hypertext", 

        b: "Facebook", 

        c: "Javascript", 

        d: "English" 

      }, 

      correctAnswer: "a" 

    } 

  ]; 
 
  buildQuiz();
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // question and answers
  showSlide(currentSlide);

  // click to go forward or back or to submit answers
  // and show results
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();


