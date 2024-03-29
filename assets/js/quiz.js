// constants and variables needed

const startButton = document.getElementById("start-btn");
const progress = document.getElementById("progress");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const ready = document.getElementById("landing-page");
const scoreDiv = document.getElementById("score-div");
let score = 0;
let shuffledQuestions;
let currentQuestion;
let currentQuestionIndex;
let timer = {};

//button to start the quiz on click and load the first question
startButton.addEventListener("click", startGame);

//button to set next question
nextButton.addEventListener("click", () => {
	currentQuestionIndex++;
	setNextQuestion();
	currentQuestion++;
	document.getElementById("current-question").innerHTML = currentQuestion;
});

//starts the game
function startGame() {
	startTimer();// starts the quiz timer
	ready.classList.add("hide"); // hides the landing page
	progress.classList.remove("hide");// shows the progress bar
	startButton.classList.add("hide"); // hides the start button
	scoreDiv.classList.add("hide"); //hides the results page
	//randomises the questions
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	//starts the progress from 1
	currentQuestion = 1;
	questionContainerElement.classList.remove("hide");
	setNextQuestion();
	//sets the score to 0 at start of quiz
	score = 0;
	document.getElementById("current-question").innerHTML = currentQuestion;
	document.getElementById("all-questions2").innerHTML = questions.length;
	document.getElementById("all-questions").innerHTML = questions.length;
}

//function to load the next question when next button is clicked
function setNextQuestion() {
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//shows the question and answers
function showQuestion(question) {
	questionElement.innerText = question.question;
	//populate the answers by creating a button for each of them
	question.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerText = answer.text;
		button.classList.add("btn");
		//check if the answer is correct by adding a data attribute to the button
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
			button.addEventListener("click", selectAnswer);
			answerButtonsElement.appendChild(button);
	});
}

//resets the question and  answers to a default state
function resetState() {
	clearStatusClass(document.body);
	nextButton.classList.add("hide");
	//if there is a child inside the answer buttons we remove it
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}

//selects the answer
function selectAnswer(e) {
	//the button we clicked on
	const selectedButton = e.target;
	//check if the answer we selected is correct
	const correct = selectedButton.dataset.correct;
	//create an array from the answers buttons children to set the status based on either is a correct answer or not
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct);
	});
	//shows our next button if we are not at the last question
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove("hide");
	}
	//if we are at the last question
	else {
		// stops the timer
		stopTimer();
		// results page is loaded
		scoreDiv.classList.remove("hide");
		// progress bar is hidden
		progress.classList.add("hide");
		// question container is hidden
		questionContainerElement.classList.add("hide");
		// start button becomes restart button
		startButton.innerText = "Restart?";
		startButton.classList.remove("hide");
	}

	//increments the score when correct answer is selected
	if (correct) {
	   score++;
	}
  
	// Show the score and percentage of correct answers
	document.getElementById("right-answers").innerHTML = score;
	document.getElementById("answers-percent").innerHTML = ((100 * score) / questions.length).toFixed(0);
	// prevent multiclicking 
	document.getElementById("answer-buttons").classList.add("no-click");
}

// sets the status class for the correct answers
function setStatusClass(element, correct) {
	clearStatusClass(element);
	// add the correct class which is colour green
	if (correct) {
		element.classList.add("correct");
	}
	// add the wrong class which is colour red 
	else {
		element.classList.add("wrong");
	}
}

//remove the classes when the status is reset
function clearStatusClass(element) {
	element.classList.remove("correct");
	element.classList.remove("wrong");
}

function startTimer() {
	// reset the running time to 0.
	timer.runningTime = 0;

	// start the timer
	timer.timer = setInterval(countTimer, 1000);
}

function countTimer() {
	timer.runningTime++;
	// calculate the minutes and seconds from running time
	let minute = Math.floor(timer.runningTime / 60);
	let second = timer.runningTime % 60;

	if (minute == 0) {
		minute = "00";
	} else if ((minute > 0) && (minute < 10)) {
		minute = "0" + minute;
	}
	if (second < 10) {
		second = "0" + second;
	}
	// display the running time
	$("#time").html(minute + ":" + second);
}

// stop the timer and show the final time in results page
function stopTimer() {
	clearInterval(timer.timer);
	$("#final-time").html($("#time").html());
}


// questions array
const questions = [{
	question: "Who scored the fastest Champions League goal of all-time?",
	answers: [{
		text: "Alessandro Del Piero",
		correct: false
	}, {
		text: "Alexandre Pato",
		correct: false
	}, {
		text: "Roy Makaay",
		correct: true
	}, {
		text: "Jack Wilshere",
		correct: false
	}]
}, {
	question: "Who is the oldest player to score in a Champions League final?",
	answers: [{
		text: "Paolo Maldini",
		correct: true
	}, {
		text: "David Beckham",
		correct: false
	}, {
		text: "Clarence Seedorf",
		correct: false
	}, {
		text: "Patrick Kulivert",
		correct: false
	}]
}, {
	question: "Who is the only player to have won the Champions League with three different clubs?",
	answers: [{
		text: "Ronaldo",
		correct: false
	}, {
		text: "Z. Ibrahimovic",
		correct: false
	}, {
		text: "Clarence Seedorf",
		correct: true
	}, {
		text: "Mark van Bommel",
		correct: false
	}]
}, {
	question: "Against which team did Lionel Messi score his only five-goal haul in the Champions League?",
	answers: [{
		text: "FC Midtjylland",
		correct: false
	}, {
		text: "Hajduk Split",
		correct: false
	}, {
		text: "FC Porto",
		correct: false
	}, {
		text: "Bayer Leverkusen",
		correct: true
	}]
}, {
	question: "Which city hosted the first ever UEFA Champions League final?",
	answers: [{
		text: "Madrid",
		correct: false
	}, {
		text: "Paris",
		correct: true
	}, {
		text: "Lisbon",
		correct: false
	}, {
		text: "Istanbul",
		correct: false
	}]
}, {
	question: "Who won UEFA Champions League final in 2001?",
	answers: [{
		text: "Manchester United",
		correct: false
	}, {
		text: "AC Milan",
		correct: false
	}, {
		text: "Real Madrid",
		correct: false
	}, {
		text: "Bayern Munchen",
		correct: true
	}]
}, {
	question: "Which player holds the record for most assists in a single Champions League season?",
	answers: [{
		text: "Cristiano Ronaldo",
		correct: false
	}, {
		text: "A. Di Maria",
		correct: false
	}, {
		text: "James Milner",
		correct: true
	}, {
		text: "Lionel Messi",
		correct: false
	}]
}, {
	question: "Who is the youngest player to score in a Champions League final?",
	answers: [{
		text: "Patrick Kulivert",
		correct: true
	}, {
		text: "Owen Hargreaves",
		correct: false
	}, {
		text: "Alphonso Davies",
		correct: false
	}, {
		text: "Carlos Alberto",
		correct: false
	}]
}, {
	question: "Who assisted Cristiano Ronaldo to score in 2007/08 final vs Chelsea?",
	answers: [{
		text: "Nani",
		correct: false
	}, {
		text: "Wes Brown",
		correct: true
	}, {
		text: "Ryan Giggs",
		correct: false
	}, {
		text: "Patrice Evra",
		correct: false
	}]
}, {
	question: "Who scored the only goal in the 1998 Champions League final between Real Madrid and Juventus?",
	answers: [{
		text: "Raúl",
		correct: false
	}, {
		text: "Antonio Conte",
		correct: false
	}, {
		text: "Filippo Inzaghi",
		correct: false
	}, {
		text: "Predrag Mijatovic",
		correct: true
	}]
}, {
	question: "Which club is the most successful in the tournament history, having won it 13 times?",
	answers: [{
		text: "Liverpool",
		correct: false
	}, {
		text: "Real Madrid",
		correct: true
	}, {
		text: "AC Milan",
		correct: false
	}, {
		text: "FC Barcelona",
		correct: false
	}]
}, {
	question: "Which Serbian was the first from his country to win the Champions League, in 2008?",
	answers: [{
		text: "Dusan Tadic",
		correct: false
	}, {
		text: "Nemanja Matic",
		correct: false
	}, {
		text: "Boris Radunovic",
		correct: false
	}, {
		text: "Nemanja Vidić",
		correct: true
	}]
}, {
	question: "Who scored four goals against Real Madrid in the first leg of the 2012/2013 semi-final?",
	answers: [{
		text: "Toni Kroos",
		correct: false
	}, {
		text: "Mario Gómez",
		correct: false
	}, {
		text: "Lewandowski",
		correct: true
	}, {
		text: "Arjen Robben",
		correct: false
	}]
}, {
	question: "Who was the first manager win the Champions League, the World Cup and the European Championship?",
	answers: [{
		text: "Jose Mourinho",
		correct: false
	}, {
		text: "V. del Bosque",
		correct: true
	}, {
		text: "Pep Guardiola",
		correct: false
	}, {
		text: "Joachim Löw",
		correct: false
	}]
}, {
	question: "I set a record for Champions League appearances with 177, for Real Madrid and Porto. Who am I?",
	answers: [{
		text: "Cristiano Ronaldo",
		correct: false
	}, {
		text: "Iker Casillas",
		correct: true
	}, {
		text: "Nani",
		correct: false
	}, {
		text: "Pepe",
		correct: false
	}]
}];