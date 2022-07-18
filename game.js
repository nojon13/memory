var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
var lastClick = userClickedPattern.length - 1;
var lastPrompt = gamePattern.length - 1;

$(document).keydown(function() {
    if (!started) {
        $("#instructions").text("");
        $("#level-title").text("Level " + level);
        setTimeout(function() {
            nextSequence();}, 500);
        started = true;
    }
});

$(".btn").on("click", buttonHandler);

function buttonHandler() {
    var userChosenColor = this.id;
    playSound(userChosenColor);
    $("#" + userChosenColor).fadeTo(100, 0.5);
    $("#" + userChosenColor).fadeTo(100, 1);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeTo(100, 0.5);
    $("#" + randomChosenColor).fadeTo(100, 1);
    animatePress(randomChosenColor);
    gamePattern.push(randomChosenColor);
}

function playSound(name) {
    var sound = new Audio('sounds/'+ name + '.mp3');
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("You lose, loser!");
        $("#instructions").text("Press any key to try again.");
        startOver();
    }
}
