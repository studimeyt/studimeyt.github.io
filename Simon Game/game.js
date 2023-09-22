var buttonColours = ["green","red","yellow","blue"]; 

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var heading = $("#level-title");

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});


// Checking the button for clicks
$(".btn").on("click",function(){
    // $(this) ---> it's very important
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // Animating button
    animatePress(userChosenColour);

    // Playing button sounds
    playSound(userChosenColour); 
    
    // Checking Answer
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){  
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
        
    }
    else{
        playSound("wrong");
        heading.text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)

        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    heading.text("Level "+level);

    // Selecting random button from all 4
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    // Button Flash
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    // Sound for the selected button
    playSound(randomChosenColor);
}


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}