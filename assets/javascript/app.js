    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/sounds/Intro The Legend of Zelda Bolero Ravel version.mp3");

    // Theme Button
    $(".theme-button").on("click", function() {
        audioElement.play();
    });
    $(".pause-button").on("click", function() {
        audioElement.pause();
    });


    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredAnswers = 0;

    var countDown = {
        intervalID: '',
        secondsLeft: 30,
        start: function() {
            countDown.secondsLeft = 30;
            $('#time-remaining').text(countDown.secondsLeft);
            countDown.intervalID = setInterval(countDown.decrement, 1000);
        },

        decrement: function() {
            countDown.secondsLeft--;
            //TODO if secondsLeft < 0, call failure
            $('#time-remaining').text(countDown.secondsLeft);
            if (countDown.secondsLeft <= 0) {
                checkAnswer('OutOfTime');
            }
        },

        stop: function() {
            clearInterval(countDown.intervalID);
        }
    };

    var currentQuestion = 0;
    var questions = [{
        question: 'How much is a red rupee worth?',
        answerOne: '1',
        answerTwo: '5',
        answerThree: '20',
        answerFour: '50',
        correctAnswer: '20',
        image: 'assets/images/rupee.gif'
    }, {
        question: 'Ganon posses the Triforce of ...',
        answerOne: 'Courage',
        answerTwo: 'Evil',
        answerThree: 'Power',
        answerFour: 'Wisdom',
        correctAnswer: 'Power',
        image: 'assets/images/power.gif'
    }, {
        question: 'Which one was NOT an enemy?',
        answerOne: 'Drudge',
        answerTwo: 'Piranha Plant',
        answerThree: 'Goomba',
        answerFour: 'Kirby',
        correctAnswer: 'Drudge',
        image: 'assets/images/goomba.jpg'
    }, {
        question: 'What song was intended to be the theme for The Legend of Zelda?',
        answerOne: "Handel's Water Music",
        answerTwo: "Ravel's Bolero",
        answerThree: "Morricone's Ecstasy of Gold",
        answerFour: 'None of the Above',
        correctAnswer: "Ravel's Bolero",
        image: 'assets/images/title.gif'
    }, {
        question: 'After Ocarina of Time, how many timelines does the series split into?',
        answerOne: 'One',
        answerTwo: 'Two',
        answerThree: 'Three',
        answerFour: 'Four',
        correctAnswer: 'Three',
        image: 'assets/images/ZeldaTimeline3.png'
    }];


    /*
        question: '',
        answerOne: '',
        answerTwo: '',
        answerThree: '',
        answerFour: '',
        correctAnswer: '',
        image: ''
    */


    function nextQuestion() {
        $('#game').html("");
        $('#game').append("<h2>Time Remaining: <span id='time-remaining'></span></h2>");
        $('#game').append("<h2 id = 'trivia-question'>" + questions[currentQuestion].question + "</h2>");
        $('#game').append("<div class = 'list-group'>");
        $('.list-group').append("<button type='button' class='list-group-item' id='answer-one'>" + questions[currentQuestion].answerOne + "</button>");
        $('.list-group').append("<button type='button' class='list-group-item' id='answer-two'>" + questions[currentQuestion].answerTwo + "</button>");
        $('.list-group').append("<button type='button' class='list-group-item' id='answer-three'>" + questions[currentQuestion].answerThree + "</button>");
        $('.list-group').append("<button type='button' class='list-group-item' id='answer-four'>" + questions[currentQuestion].answerFour + "</button></div>");
        countDown.start();
    }

    function nextAnswer(wasAnswerCorrect) {
        //TODO pause timer
        $('#game').html("");
        $('#game').append("<h2>Time Remaining: " + countDown.secondsLeft + "</h2>");
        $('#game').append("<h2>" + wasAnswerCorrect + "</h2>");
        $('#game').append("<h2>The correct answer was: " + questions[currentQuestion].correctAnswer + "</h2>");
        $('#game').append("<img src='" + questions[currentQuestion].image + "' class='center' id='answer-image'>");
        currentQuestion++;
        if (currentQuestion < questions.length) {
            setTimeout(nextQuestion, 4000);
        }
        else {
            setTimeout(function() {
                gameOver();
            }, 3000);
        }
        //TODO: Final score screen

    }

    function checkAnswer(answer) {
        countDown.stop();
        var wasAnswerCorrect;
        if (answer === questions[currentQuestion].correctAnswer) {
            correctAnswers++;
            wasAnswerCorrect = "Correct!";
        }
        else if (answer === 'OutOfTime') {
            unansweredAnswers++;
            wasAnswerCorrect = "Out of Time!";

        }
        else {
            incorrectAnswers++;
            wasAnswerCorrect = "Nope!";
        }
        nextAnswer(wasAnswerCorrect);
    }

    function gameOver() {
        $('#game').html("");
        $('#game').append("<h2>Game Over: </h2>");
        $('#game').append("<h2>Correct Answers: " + correctAnswers + "</h2>");
        $('#game').append("<h2>Incorrect Answers: " + incorrectAnswers + "</h2>");
        $('#game').append("<h2>Unanswered: " + unansweredAnswers + "</h2>");
        $('#game').append("<div class = 'list-group'>");
        $('.list-group').append("<button type='button' class='list-group-item' id='restart'>Restart?</button>");
    }


    $(document).click(function(event) {
        switch (event.target.id) {
            case 'start-button':
                nextQuestion(0);
                break;
            case 'answer-one':
                checkAnswer($(event.target).text());
                break;
            case 'answer-two':
                checkAnswer($(event.target).text());
                break;
            case 'answer-three':
                checkAnswer($(event.target).text());
                break;
            case 'answer-four':
                checkAnswer($(event.target).text());
                break;
            case 'restart':
                correctAnswers = 0;
                incorrectAnswers = 0;
                unansweredAnswers = 0;
                currentQuestion = 0;
                nextQuestion();
                break;
        }
    });
    