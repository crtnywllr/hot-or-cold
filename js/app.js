<<<<<<< HEAD
//initialize variables
'use strict';
var secretNumber, 
userGuess, 
pastGuesses = [], 
count,
guessHtml, 
userFeedback,
alreadyGuessed,
newButton,
form ,
input,
feedback,
countElement,
guessList;

$(document).ready(pageLoad);

 function pageLoad(){
	
	/*--- Display information modal box ---*/
  	$('.what').click(function(){
    	$('.overlay').fadeIn(1000);
  	});
  	/*--- Hide information modal box ---*/
  	$('a.close').click(function(){
  		$('.overlay').fadeOut(1000);
  	});

  	//fetch dom objects
  	newButton = $('a.new');
  	form = $('form');
  	input = form.find('#userGuess');
  	feedback = $('#feedback');
  	countElement = $('#count');
  	guessList = $('#guessList');

    //page load
    newGame();
    //event handlers
    form.submit(function(event){
      event.preventDefault();
      getUserGuess();
    });
    newButton.click(newGame);
}

//new game function
function newGame(){
	form.find('input[type=submit]').css('opacity','1');
	resetVariables();
	render();
	generateNumber();
}

//get the user guess
function getUserGuess(){
	//get the user guess
	userGuess = input.val();
	//reset input value
	input.val('');
	//focus on input for next guess
	input.focus();
	//ensure valid input
	if(checkGuess()){return ;}
	//generate feedback
	generateFeedback();
	//track the past user guesses
	trackGuess();
	//increment the count
	guessCount();
	//render changes to the page
	render();
}

  	//check for valid input
  	function checkGuess(){
  		if(userGuess % 1 !== 0){
  			alert('please input a number');
  			return true;
  		}
  		if(userGuess < 0 || userGuess > 101){
  			alert('please choose a number between zero and 100');
  			return true;
  		}
  		if(pastGuesses.length > 0){
			$.each(pastGuesses,function(guess,value){
				if(userGuess == value){
					alreadyGuessed = true;
				}
			}); 
		}
		if(alreadyGuessed){
			alreadyGuessed = false;
			alert('You guessed this number already');
			return true;
		}
    return false;
	}

//generate user feedback
function generateFeedback(){
	if(secretNumber == userGuess){
		winner();
	} else if(Math.abs(secretNumber - userGuess) < 10){
		userFeedback = 'hot';
	} else if(Math.abs(secretNumber - userGuess) < 20 && Math.abs(secretNumber - userGuess) > 9){
		userFeedback = ' Kinda hot';
	} else if(Math.abs(secretNumber - userGuess) < 30 && Math.abs(secretNumber - userGuess) > 19){
		userFeedback = 'less than warm';
	} else {
		userFeedback = 'cold';
	}
}

//keep track of the users past guesses
function trackGuess(){
	pastGuesses.push(userGuess);
	guessHtml = '';
	if(pastGuesses[0].length) {
		$.each(pastGuesses,function(guess,value){
			guessHtml += '<li>' + value + '</li>';
		});
	}
}

//keep track of guess count
function guessCount(){
	count++;
}

	//page render function
function render(){
	guessList.html(guessHtml);
	countElement.html(count);
	feedback.html(userFeedback);
}

function winner(){
	userFeedback = 'You Won. Click new game to play again';
	form.find('input[type=submit]').css('opacity','0');
}
  	
//generate secret number
function generateNumber(){
	secretNumber = Math.floor(Math.random()*100)+1;
}

//reset variable 
function resetVariables(){
	count = 0;
	pastGuesses = [];
	guessHtml='';
	userGuess = '';
	userFeedback = 'Make your Guess!';
}
  	
  	

  


=======
//Step 1 Set Global Variables
var computerChoice = setNumber();
var counter = 1;
var oldGuess = 0;


//Step 2 Declare Functions
//new game
function newGame() {
    document.location.reload(true);
    //alert("I have activated a new game");
}

//set random number
function setNumber() {
    var compChoice = Math.floor(Math.random() * 101);
    console.log("Secret Number Is: " + compChoice);
    return compChoice;
}

function guessedNumber() {
    var guessValue = $('#userGuess').val();
    console.log("Guessed number: " + guessValue);
}

//test input for validity
function checkGuess() {
    //alert('I have activated function checkGuess');
    var guessValue = $('#userGuess').val();
    var newGuess = guessValue;
    var guessValueCorrect = true;
    if (Math.floor(guessValue) != (guessValue)) {
        var guessValue = alert("Please don't enter letters or symbols - try a number between 1 and 100.");
        guessValueCorrect = false;
    }
    if (guessValue.indexOf('.') >= 0) {
        var guessValue = alert('No decimals, please! Try a whole number between 1 and 100.');
        guessValueCorrect = false;
    }

    if (guessValue.indexOf(' ') >= 0) {
        var guessValue = alert("Please don't enter spaces - try a number!");
        guessValueCorrect = false;
    }

    if (guessValue < 1 || guessValue > 100) {
        var guessValue = alert("Please enter only numbers between 1 and 100.");
        guessValueCorrect = false;
    }
    if (guessValueCorrect == true) {
        guessCount(counter);
        storeGuess(guessValue);
        giveHints(computerChoice, guessValue);
        if (oldGuess != 0) {
            relativeHints(computerChoice, oldGuess, newGuess);
        }
    }
    guessValue = $('#userGuess').val('');
    oldGuess = newGuess;
}

//add numbers to guess count
function guessCount(counter) {
    $('#count').text(counter);
}

//add to guess history
function storeGuess(guessValue) {
    $('#guessList').append("<li>" + guessValue + "</li>");
    // alert("I have activated function storeGuess");
}

//give hints
function giveHints(computerChoice, guessValue) {
    var difference = Math.abs(computerChoice - guessValue);
    if (difference >= 50) {
        $('#feedback').text("You are Antartica levels of cold!");
    } else if ((difference < 50) && (difference >= 40)) {
        $('#feedback').text("You are Norwegian winter levels of cold!");
    } else if ((difference < 40) && (difference >= 30)) {
        $('#feedback').text("You are put a sweater on levels of chilly!");
    } else if ((difference < 30) && (difference >= 20)) {
        $('#feedback').text("You are summer evening levels of warm!");
    } else if ((difference < 20) && (difference >= 10)) {
        $('#feedback').text("You are on the equator levels of hot!");
    } else if ((difference < 10) && (difference >= 1)) {
        $('#feedback').text("You are inside of an oven hot!");
    } else {
        $('#feedback').text("You won! Well done.");
        $('#guessButton').prop('disabled', true);
        $('#userGuess').prop('disabled', true);
    }
}
//give relative hints
function relativeHints(computerChoice, oldGuess, newGuess) {
    var oldDiff = Math.abs(oldGuess - computerChoice);
    var newDiff = Math.abs(newGuess - computerChoice);
    if (oldDiff > newDiff) {
        $('#relative-feedback').text("You are getting warmer!");
    } else if (oldDiff < newDiff) {
        $('#relative-feedback').text("You are getting colder!");
    } else {
        $('#relative-feedback').text("You are the same distance away!");
    }
}
>>>>>>> refs/remotes/origin/master

//Step 3 Use functions
$(document).ready(function () {
    //start new game
    $(".new").on('click', function () {
        newGame();
    })

    //validate guess
    $("#guessButton").on('click', function () {
        checkGuess();
        counter++;
    })

    /*--- Display information modal box ---*/
    $(".what").click(function () {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });


});
$(document).on('keypress', function (key) {
    //keyCode == 13 is the ENTER key
    if (key.keyCode == 13) {
        checkGuess();
        counter++;
    }
});
