const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Look at this series: 80, 10, 70, 15, 60, .... What number should come next?',
    answers: [
      { text: '20', correct: true },
      { text: '50', correct: false }
    ]
  },
  {
    question: 'The A state government has chalked out a plan for the underdeveloped B district where 66 per cent of the funds will be placed in the hands of a committee of local representatives Courses of action: The A state government should decide guidelines and norms for the functioning of the committee.  Other state government may follow similar plan if directed by the Central government',
    answers: [
      { text: 'If only I follows', correct: true },
      { text: 'If only II follows', correct: false},
      { text: 'If either I or II follows', correct: false },
      { text: 'If neither I nor II follows', correct: false}
    ]
  },
  {
    question: 'If a giraffe has two eyes, a monkey has two eyes, and an elephant has two eyes, how many eyes do we have?',
    answers: [
      { text: '3', correct: false },
      { text: '4', correct: true },
      { text: '2', correct: false },
      { text: '1', correct: false }
    ]
  },
  {
    question: 'One rabbit saw 6 elephants while going towards River. Every elephant saw 2 monkeys are going towards river. Every monkey holds one tortoice in their hands.How many animals are going towards the river?',
    answers: [
      { text: '5', correct: false },
      { text: '8', correct: true }
    ]
  }
]