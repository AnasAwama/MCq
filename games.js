const question = document.querySelector('#question');
const choices =Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter=0
let availableQuestions = []

let questions = [
    {
        question: 'What is 2+2?',
        choice1:'2',
        choice2:'4',
        choice3:'21',
        choice4:'17',
        answer:2,
    },
    {
        question: 'What is 10+15?',
        choice1:'20',
        choice2:'45',
        choice3:'35',
        choice4:'15',
        answer:3,
    },
    {
        question: 'What is 4*8?',
        choice1:'35',
        choice2:'6',
        choice3:'356',
        choice4:'32',
        answer:4,
    },
    {
        question: 'What is 2/2?',
        choice1:'1',
        choice2:'5',
        choice3:'0',
        choice4:'7',
        answer:1,
    }
]

const SCORE_POINT=100
const MAX_QUESTIONS=4

startGame =() => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if( availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScor', score)

        return window.location.assign('ends.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width=`${(questionCounter/MAX_QUESTIONS)*100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion =availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach( choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINT)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)

    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()