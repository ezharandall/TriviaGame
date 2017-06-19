var panel = $('#quiz-area');

$(document).on('click', '#start', function(e){
  game.start();
});

$(document).on('click', '#complete', function(e){
  game.complete();
});

//Questions for the quiz

var questions = [{
  question: "Who won the 2017 NBA Title?",
  answers: ['Cleveland Cavaliers', 'Washington Wizards', 'Golden State Warriors', 'San Antonio Spurs'],
  correctAnswer: "Golden State Warriors"
}, {
  question: "Which NFL team has been approved by the NFL to move to Las Vegas?",
  answers: ['Raiders', 'Rams', 'Redskins', 'Ravens'],
  correctAnswer: "Raiders"
}, {
  question: "Which team has a goaltender named Holtby?",
  answers: ["New York Rangers", "Pittsburgh Penguins", "Chicago Blackhawks", "Washington Capitals"],
  correctAnswer: "Washington Capitals"
}];

// The time of the quiz, start with 0 correct/incorrect
var game = {
  correct: 0,
  incorrect: 0,
  counter: 120,
// Explains if the counter goes to 0 end the quiz
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.complete();
    }
  },
// Once started countdown
  start: function() {
    timer = setInterval(game.countdown, 1000);
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">120</span> Seconds</h2>');
    $('#start').remove();

    for (var i = 0; i < questions.length; i++) {
      panel.append('<h2>' + questions[i].question + '</h2>');
      for (var j = 0; j < questions[i].answers.length; j++){
        panel.append('<input type="radio" name ="question' + '-' + i + '"value="' + questions[i].answers[j] + '">' + questions[i].answers[j]);
      }
    }
    panel.append('<button id="complete">Complete</button>');
  },
  complete: function(){

    $.each($("input[name='question-0']:checked"), function(){
       if ($(this).val() == questions[0].correctAnswer) {
        console.log(this);
          game.correct++;
      } else {
        game.incorrect++;
      }

    });
    $.each($("input[name='question-1']:checked"), function(){
       if ($(this).val() == questions[1].correctAnswer) {
          game.correct++;
      } else {
        game.incorrect++;
      }

    });
    $.each($("input[name='question-2']:checked"), function(){
       if ($(this).val() == questions[2].correctAnswer) {
          game.correct++;
      } else {
        game.incorrect++;
      }

    });

    this.results();
  },

// Results of the quiz
    results:function(){
      clearInterval(timer);

      $('#subwrapper h2').remove();
    panel.html('<h2>All complete!</h2>');
    panel.append('<h3>Correct Answers: ' + this.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + this.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (this.incorrect + this.correct)) + '</h3>');

    }


  };

