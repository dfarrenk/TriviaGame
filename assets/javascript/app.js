$('#start-button').click(function() {
    $('#game').html('');
});

var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredAnswers = 0;

//interval variables
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
        $('#time-remaining').text(countDown.secondsLeft);
    }
}


//move into start button later
countDown.start();
