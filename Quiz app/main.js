import { questions } from './questions.js';

class QuizApp {
  constructor() {
    this.currentQuestion = 0;
    this.score = 0;
    this.questions = questions;
    this.initElements();
    this.bindEvents();
    this.showScreen('start-screen');
  }

  initElements() {
    // Screens
    this.startScreen = document.getElementById('start-screen');
    this.quizScreen = document.getElementById('quiz-screen');
    this.resultScreen = document.getElementById('result-screen');

    // Buttons
    this.startBtn = document.getElementById('start-btn');
    this.restartBtn = document.getElementById('restart-btn');

    // Quiz elements
    this.questionElement = document.getElementById('question');
    this.choicesElement = document.getElementById('choices');
    this.progressElement = document.getElementById('progress');
    this.questionNumberElement = document.getElementById('question-number');
    this.scoreElement = document.getElementById('score');
    this.finalScoreElement = document.getElementById('final-score');
    this.correctAnswersElement = document.getElementById('correct-answers');
  }

  bindEvents() {
    this.startBtn.addEventListener('click', () => this.startQuiz());
    this.restartBtn.addEventListener('click', () => this.restartQuiz());
  }

  showScreen(screenId) {
    [this.startScreen, this.quizScreen, this.resultScreen].forEach(screen => {
      screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
  }

  startQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.showScreen('quiz-screen');
    this.displayQuestion();
  }

  restartQuiz() {
    this.startQuiz();
  }

  displayQuestion() {
    const question = this.questions[this.currentQuestion];
    this.questionElement.textContent = question.question;
    this.progressElement.style.width = `${(this.currentQuestion / this.questions.length) * 100}%`;
    this.questionNumberElement.textContent = `Question ${this.currentQuestion + 1}/${this.questions.length}`;
    this.scoreElement.textContent = `Score: ${this.score}`;

    this.choicesElement.innerHTML = '';
    question.choices.forEach((choice, index) => {
      const button = document.createElement('div');
      button.className = 'choice';
      button.textContent = choice;
      button.addEventListener('click', () => this.handleAnswer(index));
      this.choicesElement.appendChild(button);
    });
  }

  async handleAnswer(choiceIndex) {
    const question = this.questions[this.currentQuestion];
    const choices = this.choicesElement.children;
    const selectedChoice = choices[choiceIndex];
    
    // Disable all choices
    Array.from(choices).forEach(choice => {
      choice.style.pointerEvents = 'none';
    });

    // Show correct/wrong animation
    if (choiceIndex === question.correct) {
      selectedChoice.classList.add('correct');
      this.score++;
    } else {
      selectedChoice.classList.add('wrong');
      choices[question.correct].classList.add('correct');
    }

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 1000));

    this.currentQuestion++;
    
    if (this.currentQuestion < this.questions.length) {
      this.displayQuestion();
    } else {
      this.showResults();
    }
  }

  showResults() {
    this.showScreen('result-screen');
    this.finalScoreElement.textContent = this.score;
    this.correctAnswersElement.textContent = `${this.score}/${this.questions.length}`;
  }
}

// Questions data
const quiz = new QuizApp();