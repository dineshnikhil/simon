var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];

var starting = false;
var level = 0;

$(document).keydown(function(){
    if(!starting){
        $("#level-title").text("level  " + level);
        nextSequence();
        starting = true;
    }
});

$(".bton").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

        
    } else {
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");


        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);


        $("#level-title").html("<span>Game over</span>, press Enter key to restart Game.");

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level  " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);
    
}




function playSound(name){
    switch(name){
        case "blue":
            var blueAudio = new Audio("sounds/blue.mp3");
            blueAudio.play();
            break;
        case "green":
            var greenAudio = new Audio("sounds/green.mp3");
            greenAudio.play();
            break;
        case "red":
            var redAudio = new Audio("sounds/red.mp3");
            redAudio.play();
            break;
        case "yellow":
            var yellowAudio = new Audio("sounds/yellow.mp3");
            yellowAudio.play();
            break;
    }
}

function animatePress (currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout (function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function startOver() {
    gamePattern = [];
    starting = false;
    level = 0;
}