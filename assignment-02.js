/*  
    need to create and store sequence and also store input sequence,
    if they don't match then failed.
    Update score and highgscore if necessary.
    need function for:
        pressing each button
        flashing the button
        start button turning light on
        keep track of score
        update score/highscore

*/
// Accessing all elements from html file in javascript
const startButton = document.getElementById("startButton");
const onoff2 = document.getElementById("onoff2");
const greenCircle = document.getElementById("0");
const redCircle = document.getElementById("1");
const blueCircle = document.getElementById("3");
const yellowCircle = document.getElementById("2");
const highScore = document.getElementById("highScore");
const lastScore = document.getElementById("lastScore");

//variables needed for game

let userinput = false;      //Used to determine when the use can click the circles
let sequence = [];      // array which stores the sequences of colours
let playerSequence = [];        // array which stores the users inputs
let correct = true;         //boolean to see if user gets sequence correct
let turn = 1;       //keeps track of the round number 
let seqnum = 0;         //keeps track of the index of the sequence array
let intervalTime = 1200;        //the time between circle flashes (gets faster as game goes on)
let myInterval;          //Used the create the game interval
let clearColTime = 200;     //The speed of which the original colour is restored to the circles
let gameOn = false;             //Determines whether the start button can be pressed
let timeoutId;              //Used for the 5 second timer 
let lastScoreNum = 0;        //Used to keep track of last score
let highScoreNum = 0;        //Used to keep track of high score
let num;                //used to flash the circles at the end

//colours used for game (I changed the yellow to slightly orange as the yellow 
//colour was hard to see flash)
const flashRed = "#ef544d";
const flashGreen = "#b4e48d";
const flashYellow = "#ffd996";
const flashBlue = "#7ca9e8";
const setRed = "#e81001";
const setGreen = "#6bc51c";
const setYellow = "#fe9d2c";
const setBlue = "#2c7be3";


//Turning the button green when start button is clicked and starting the game
startButton.addEventListener("click", function()
{   
    if(!gameOn)
    {
        //displays a hidden green circle to show the game has started
        onoff2.style.display = 'block';

        //starts the game after 3000ms total between the interval time and the timeout function
        setTimeout(function()
        {
            startGame();
        },1800)
    }
});
//This function is called to start the game and initialises all the variables to their defaults
// so none of the information from the previous games transfer over
function startGame()
{
    gameOn = true;
    userinput = false;
    turn = 1;
    seqnum = 0;
    sequence = [];
    playerSequence = [];
    myInterval = 0;
    correct = true;
    intervalTime = 1200; 
    
    //fills the sequence array with all the moves beforehand
    for (var i = 0; i < 2000; i++)
    {
        
        sequence.push(Math.floor(Math.random() *4));

    }
    //creates an interval which will follow the sequence array
    myInterval = setInterval(startRound,intervalTime);

}
function startRound()
{
    //set userinput to ensure user cannot press buttons while the sequence is playing
    userinput = false;
    //if the number of circles that have flashed matches the round number then it clears
    // the interval and allows the user to click the circles
    if (seqnum == turn)
    {
        clearInterval(myInterval);
        clearColor();
        userinput = true;

        //starts a countdown which ends the game after 5seconds if a button is not clicked
        timeoutId = setTimeout(function(){
            endGame();
        },5000);
    }

    // This flashes the next colour in the sequence 
    else
    {
        clearColor();
        setTimeout(flash(sequence[seqnum],400));
        seqnum++;
    }

}

//The array stores values from 0-3, this takes in the number and runs another function depending
// on the colour assigned to it
function flash(num)
{
    if (num == 0) zero();
    if (num == 1) one();
    if (num == 2) two();
    if (num == 3) three();
}
//These next four sections of code are all the same but for the 4 different circles
//It waits for the user to click the circle and then adds the value of that circle to a second array
//It also refreshes the 5 second timer and flashes the circle when clicked
//The check() function is called to make sure it was the correct circle

greenCircle.addEventListener('click', function()
{
    if(userinput)
    {
        playerSequence.push(0);
        clearTimeout(timeoutId);
        check();
        zero();


        setTimeout(function(){
            clearColor();
        },clearColTime);
    }
});
redCircle.addEventListener('click', function()
{
    if(userinput)
    {
        playerSequence.push(1);
        clearTimeout(timeoutId);
        check();
        one();
        

        setTimeout(function(){
            clearColor();
        },clearColTime);
    }
});
blueCircle.addEventListener('click', function()
{
    if(userinput)
    {
        playerSequence.push(3);
        clearTimeout(timeoutId);
        check();
        three();


        setTimeout(function(){
            clearColor();
        },clearColTime);
    }
});
yellowCircle.addEventListener('click', function()
{
    if(userinput)
    {
        playerSequence.push(2);
        clearTimeout(timeoutId);
        check();
        two();
        

        setTimeout(function(){
            clearColor();
        },clearColTime);
    }
});

//The check() function, firstly restarts the 5 second timer
//Checks if the most recent circle in the player arrray matches the same circle in the order array
//and if they do not match then it sets a boolean value to false which will in turn end the game
//If all circles were correct and you have reached the end of the sequence then it restarts the 
//the interval with one more turn(or round)
function check()
{
    timeoutId = setTimeout(function(){
        endGame();
    },5000);
    if (playerSequence[playerSequence.length-1] != sequence[playerSequence.length-1])
    {
        correct = false;
    }
    if (!correct)
    {
        clearTimeout(timeoutId);
        endGame();
    }
    if(correct && turn == playerSequence.length)
    {
        clearTimeout(timeoutId);
        turn++;
        seqnum = 0;
        playerSequence = [];

        //This increases the speed of the interval after the 5th,9th and 13th turn
        if(turn == 5 || turn == 9 || turn == 13)
        {
            console.log("faster");
            intervalTime = intervalTime*0.65;
        }


        myInterval = setInterval(startRound,intervalTime);
    }
}

//The functions zero()-three() are called when the circles are required to flash
function zero()
{
    console.log("zero");
    greenCircle.style.backgroundColor = flashGreen;

    setTimeout(function(){
        clearColor();
    },clearColTime);
    
}
function one()
{
    console.log("one");
    redCircle.style.backgroundColor = flashRed;

    setTimeout(function(){
        clearColor();
    },clearColTime);
    
}
function two()
{
    console.log("two");
    yellowCircle.style.backgroundColor = flashYellow;

    setTimeout(function(){
        clearColor();
    },clearColTime);
    
}
function three()
{
    console.log("three");
    blueCircle.style.backgroundColor = flashBlue;

    setTimeout(function(){
        clearColor();
    },clearColTime);
    
}

//This function is used throughout the program if the circles ever need to be
//reset to the original colours
function clearColor()
{
    greenCircle.style.backgroundColor = setGreen;
    redCircle.style.backgroundColor = setRed;
    yellowCircle.style.backgroundColor = setYellow;
    blueCircle.style.backgroundColor = setBlue;
    
}
//This function is called when the player loses the game
function endGame()
{
    //The gameOn boolean allows for the start button to be clicked so another game can start
    gameOn = false;
    userinput = false;
    clearColor();
    //The green start circle is hidden again to show the red off circle.
    onoff2.style.display = 'none';

    //If the score is <10, a 0 must be concatanated onto the number to appear correctly
    if (turn < 11)
    {
        //As the turn begins at 1, the true score will be turn-1 as that is how many
        //rounds you have completed successfully
        lastScoreNum = turn-1;
        lastScore.innerHTML = "0" + (lastScoreNum);
    }
    else
    {
        lastScoreNum = turn-1;
        lastScore.innerHTML = "" + (lastScoreNum);
    }
    //If the most recent score is higher than the high score then the highscore is also
    //updated to the most recent score
    if (lastScoreNum > highScoreNum)
    {
        highScoreNum = lastScoreNum;

        if(highScoreNum < 10)
        {
            highScore.innerHTML = "0" + (highScoreNum);
        }
        else{
            highScore.innerHTML = "" + highScoreNum;
        }
        
    }
    //This flashes the circles 5 times after the game is lost

    num=0;

    let colInterval = setInterval(function(){
        if (num === 5)
        {
            clearInterval(colInterval);
        }
        else
        {
            flashCol();
            setTimeout(function(){
                clearColor();
            },clearColTime);
            num++;
        }

    }, 300);
    
}
//This function is used to flash the colours in the end
function flashCol()
{
    greenCircle.style.backgroundColor = flashGreen;
    redCircle.style.backgroundColor = flashRed;
    yellowCircle.style.backgroundColor = flashYellow;
    blueCircle.style.backgroundColor = flashBlue;
}


