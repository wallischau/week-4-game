/*Crystal game                     */
/*Author: Wallis Chau              */
/*Description: Crystal game        */
/*             User tries to match */
/*             sum with target sum */
/*Date: 8/7/17                     */
/* Note: This program uses object  */
/*       oriented approach         */

const INTRO_MSG = "Start";
const IN_GAME_MSG = "select a crystal";
const WIN_MSG = "You won";
const LOSE_MSG = "you lost";
var started = false;

$(document).ready(function() {
//define object type for gamee stat
function GameStat(target, score, win, lose) {
	//private
	this.targetNumber = target;
	this.pScore = score;
	this.win = win;
	this.lose = lose;
	//privilege
	this.setTargetNum = function(num) {
		this.targetNumber = num;
	};
	this.getTargetNum = function() {
		return(this.targetNumber);
	}
	this.incWin = function() {
		this.win++;
	};
	this.incLose = function() {
		this.lose++;
	};
	this.getWin = function() {
		return this.win;
	}
	this.getLose = function() {
		return this.lose;
	}
	this.updateScore = function(num) {
		this.pScore += num;
	};
	this.clearScore = function() {
		this.pScore = 0;
	}
	this.getScore = function() {
		return(this.pScore);
	};
}



//define object type for crystal
function Crystal(col, txt, val) {
	//private
	this.color = col;
	this.text = txt;
	this.value = val;
	//privileged
	this.setval = function(num) {
		this.value = num;
		console.log(this);
	};	
	this.getval = function() {
		return(this.value);
	};

}

/* randomize target number                      */
/* description: genereate random number between */
/*              start and end values inclusive  */
/* parameter: start - start value               */
/*            end - end value                   */
/* return: random number                        */
function getRandomNumber(start, end) {
	var num = Math.floor(Math.random() * (end-start + 1));
	return(num + start);
}

/* check winning status                         */
/* description: compare 2 numbers               */
/* parameter: num - first number                */
/*            target - second number            */
/* return: -1: num is bigger                    */
/*          0: equal                            */
/*          1: num is smaller                   */
function checkWin(num, target) {
	if(num > target) {
		return -1;
	}
	else if (num === target) {
		return 1;
	}
	else
		return 0;
}

/* display win/lose status                     */
/* description: display the win and lose count */
/*              and update the winning message */
/*              reset the game if game ends    */
/* parameter: result - result status           */
function updateWinStatus(result) {
	if (result === 1) {
		gameStat.incWin();
		$('#win').html(gameStat.getWin());
		displayWinMsg(true, true);
		resetGame();
	}
	else if(result === -1) {
		gameStat.incLose();
		displayWinMsg(true, false);
		$('#lose').html(gameStat.getLose());
		resetGame();
	}
	//do nothing if result === 0, game continues
}

/* display play message                       */
/* description: update the message at start   */
/* parameter: isStarted - bool                */
function updateHeadingMsg(isStarted) {
	if (isStarted) {
		$('#HeadMsg').html(IN_GAME_MSG);
	}
	else {
		$('#HeadMsg').html(INTRO_MSG);
	}
}

/* display win/lose message                    */
/* description: display the win/lose message   */
/* parameter: visible - bool, element display  */
/*            win - bool, status               */
function displayWinMsg(vis, win) {
	$('#winmsg').html(WIN_MSG);
	if (win) {
		//set color
		$('#winmsg').css('color', 'green');
		$('#winmsg').html(WIN_MSG);
	}
	else
	{
		$('#winmsg').css('color', 'red');
		$('#winmsg').html(LOSE_MSG);
	}
	if (vis) {
		$('#winmsg').attr("class", "visible");
	}
	else
	{
		$('#winmsg').attr("class", "invisible");

	}
}

/* reset when restart game                    */
/* description: reset the game                */
function resetGame() {
	started = false;
	updateHeadingMsg(started);
	//hide crystal cursor until game starts   */
	$('.cr').css('cursor','none');
}

/* setup init values                          */
/* description: reset all values              */
/*              generate new numbers          */
function gameSetup() {
	if (started) {
	//init value within a range
	gameStat.setTargetNum(getRandomNumber(19,120));
	//update target score display
	$('#targetscore').html("<h2>" + gameStat.getTargetNum() + "</h2>");
	
	//initial values
	crystal1.setval(getRandomNumber(1,12));
	crystal2.setval(getRandomNumber(1,12));
	crystal3.setval(getRandomNumber(1,12));
	crystal4.setval(getRandomNumber(1,12));
	//reset user score
	gameStat.clearScore();
	//update score display
	$('#score').html("<h2>" + gameStat.getScore() + "</h2>");
	displayWinMsg(false, true);
	//show cursor at cyrstals
	$('.cr').css('cursor','pointer');

	} //started
}


//create object game status
var gameStat = new GameStat(39, 0, 0, 0);
//create crystal objects
var	crystal1 = new Crystal('yellow', 'c1', 1);
var	crystal2 = new Crystal('green', 'c2', 2);
var	crystal3 = new Crystal('lightblue', 'c3', 3);
var	crystal4 = new Crystal('red', 'c4', 4);

//associate obj to element
$('#crystal-1').data("key", crystal1);
$('#crystal-2').data("key", crystal2);
$('#crystal-3').data("key", crystal3);
$('#crystal-4').data("key", crystal4);


//click event to start the game
$('#HeadMsg').click(function () {
	if (!started) {
		started = true;
		updateHeadingMsg(started);
		gameSetup();
	}
});


//click event on class='cr'
$('.cr').on("click", function() {
	if (started) {
		console.log($(this));
		var temp = $('#' + $(this).prop('id')).data		("key");
		console.log(temp);
		var score = temp.getval();
		//update user score
		gameStat.updateScore(score);
		console.log(gameStat);
		//display user score
		$('#score').html("<h2>" + gameStat.getScore() + "</h2>");
		//check win/lose
		var result = checkWin(gameStat.getScore(), 		gameStat.getTargetNum());
		//update win/lose status
		updateWinStatus(result);
	} //started
});

}); //doc ready
