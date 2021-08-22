var gameInfo = {
	w: window.innerWidth * 0.95,
	h: window.innerHeight * 0.92,
	pipes: 0,
	speed: 3,
	gravity: 4,
	live: true
};
console.log(gameInfo);
var player = {
	x:30,
	y:gameInfo.h/2,
	w:40,
	h:40,
	imFlying: false
};


if(gameInfo.w > gameInfo.h){
gameInfo.speed = gameInfo.w * 0.01 ;
gameInfo.gravity = gameInfo.h * 0.02 ;
var obstacles = [
	{	x:gameInfo.w,
		y:0,
		w:40,
		h:gameInfo.h * 0.6},
	{	
		x:gameInfo.w,
		y:gameInfo.h * 0.9,
		w:40,
		h:gameInfo.h * 0.1 },
	{	
		x:gameInfo.w * 1.25,
		y:0,
		w:40,
		h:gameInfo.h * 0.2},
	{
		x:gameInfo.w * 1.25,
		y:gameInfo.h * 0.5,
		w:40,
		h:gameInfo.h * 0.5 },
	{	
		x:gameInfo.w * 1.5,
		y:0,
		w:40,
		h:gameInfo.h * 0.4},
	{
		x:gameInfo.w * 1.5,
		y:gameInfo.h * 0.7,
		w:40,
		h:gameInfo.h * 0.3},
	{	
		x:gameInfo.w * 1.75,
		y:0,
		w:40,
		h:gameInfo.h * 0.1},	
	{	
		x:gameInfo.w * 1.75,
		y:gameInfo.h * 0.4,
		w:40,
		h:gameInfo.h * 0.6}	

];
} else {
	gameInfo.speed = gameInfo.w * 0.0125 ;
gameInfo.gravity = gameInfo.h * 0.015 ;
var obstacles = [
	{	x:gameInfo.w,
		y:0,
		w:40,
		h:gameInfo.h * 0.6},
	{	
		x:gameInfo.w,
		y:gameInfo.h * 0.9,
		w:40,
		h:gameInfo.h * 0.1 },
	{	
		x:gameInfo.w * 1.5,
		y:0,
		w:40,
		h:gameInfo.h * 0.2},
	{
		x:gameInfo.w * 1.5,
		y:gameInfo.h * 0.5,
		w:40,
		h:gameInfo.h * 0.5 }
		];
}

 var gameBGes = [
    {	x:0,
    	y:0,
    },
    {	x:gameInfo.w,
    	y:0,
    }
    ];  
console.log(gameInfo);

// return a random number up to input of i
var randNum = function(i){
	return Math.floor(Math.random() * i);
};
// flight control
var moveMe = function(){
	player.imFlying = true;
};
var stopMe = function(){
	player.imFlying = false;
};
var sprites = {};
// create an image element 
var byteBG = new Image(); 
byteBG.src = "./byteFlyteBG.jpg"; 

// setup canvas
// var canvasBG = document.getElementById("gameBG");
// canvasBG.width = gameInfo.w;
// canvasBG.height = gameInfo.h;





// setup canvas area
var canvas = document.getElementById("gameCanvas");
canvas.width = gameInfo.w;
canvas.height = gameInfo.h;
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", moveMe);
canvas.addEventListener("mouseup", stopMe);
canvas.addEventListener("touchstart", moveMe);
canvas.addEventListener("touchend", stopMe);

// var load = function(){
	// sprites.background = new Image();
	// sprites.background.src = background.png;
// sprites.background = new Image();
//         sprites.background.src = 'images/floor.png';
// };

  
        		


var update = function(){
	gameBGes.forEach(function(element){
		if(element.x < 0 -  gameInfo.w){
			element.x = gameInfo.w;			
		}
		element.x -= gameInfo.speed;
	});

	if(player.y <=0 || player.y >= gameInfo.h-player.h){
		gameOver();
	}
	if(player.imFlying){
		player.y -= gameInfo.gravity * 2;
	} else {
		player.y += gameInfo.gravity;
	}
	var topOb = true;
	var topY = 0;

	obstacles.forEach(function(element){
		if(collideOscope(player, element)){
			gameOver();
		}	
		if(element.x + 40 < 0){
			element.x = gameInfo.w;
			if(topOb){
			element.h = randNum(gameInfo.h * 0.65 ) + 5;
			let hAdd = gameInfo.h * 0.3;
			topY = element.h + hAdd;
			gameInfo.pipes++;
				} else {
					element.y = topY;
					element.h = gameInfo.h;
				}
		}
		topOb = !topOb;
		element.x -= gameInfo.speed;
	});
};

var draw = function(){
	ctx.clearRect(0,0,gameInfo.w, gameInfo.h);
	gameBGes.forEach(function(element){
    ctx.drawImage(byteBG, element.x, 0, gameInfo.w, gameInfo.h );
      });
	ctx.fillStyle = "#fff";  
	ctx.font = "30px Arial";
	ctx.fillText(gameInfo.pipes, gameInfo.w/2, 50);
	ctx.fillRect(player.x,player.y,player.w,player.h);
	obstacles.forEach(function(element){
        ctx.fillRect(element.x, element.y, element.w, element.h);
      });
	
	// ctx.drawImage(sprites.background, 0, 0);
};

// animation setup and run
var step = function(){	
	update();
	draw();
	if(gameInfo.live){
	window.requestAnimationFrame(step);
	}
};
// collision checker
var collideOscope = function(r1, r2){
	 return r1.x < r2.x + r2.w && 
          r1.x + r1.w > r2.x && 
          r1.y < r2.y + r2.h && 
          r1.y + r1.h > r2.y;
};
var gameOver = function(){
		stopMe();
		gameInfo.live = false;		
		alert("You Made It to: " + gameInfo.pipes + "! \n Try Again!");
		window.location = "";

};
