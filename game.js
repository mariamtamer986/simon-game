var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;

$(document).keypress( function(event) {
    if(!gameStart) {
        nextSequence();
        gameStart = true;
        $("h1").text("Level " + level);
    }
});

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length) - 1);
});

function playSound(name) {
    var randomChosenAudio = new Audio("./sounds/" + name + ".mp3");
    randomChosenAudio.play();
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    var randomChosenButton = "#" + randomChosenColor;
    $(randomChosenButton).fadeOut(100).fadeIn(100);

    level++;
    $("#level-title").text("Level " + level);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);    
}

function checkAnswer(answer) {
    if(userClickedPattern[answer] === gamePattern[answer]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1500);  
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200); 

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}


