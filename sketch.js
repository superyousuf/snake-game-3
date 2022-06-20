var PLAY=0
var END=0
var gameState=PLAY;

var gameOver,gameOverImg;
var restart,restartImg;
var snake,snakeImage;
var food,foodImage;
var score=0;
var foodGroup;
var position=5;
var obstacles,obstacleImage;
var obstaclesGroup;
var edges;
var bgImg

function preload(){
bgImg=loadImage("img/bg.jpg");
snakeImage=loadImage("snake Image.jpg");
gameOverImg=loadImage("img/gameOver.png");
restartImg=loadImage("img/restart.png");


}

function setup(){
createCanvas(900,500);
snake=createSprite(20,8);
snake.addImage(snakeImage);
foodGroup=new Group();
obstaclesGroup=new Group();
edges=createEdgeSprites();

gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
}

function draw(){
  background(bgImg);
text("Score: "+score,500,20);
if(gameState===PLAY){


if(keyDown("UP_ARROW")){
  snake.y=snake.y-position;
}
if(keyDown("DOWN_ARROW")){
  snake.y=snake.y+position;
}
if(keyDown("LEFT_ARROW")){
  snake.x=snake.x-position;
}
if(keyDown("RIGHT_ARROW")){
  snake.x=snake.x+position;
}

spawnFood();
spawnObstacles();

if(snake.isTouching(foodGroup)){
snake.overlap(foodGroup,function(collector,collected){
  collected.remove();
});
score=score+1;
position=position+1;
}
if(snake.isTouching(obstaclesGroup)){
  gameState=END;

}
}
else if(gameState===END){
  foodGroup.destroyEach();
  obstaclesGroup.destroyEach();
  gameOver.visible = true;
  restart.visible = true;
}
drawSprites();


}
function spawnFood(){
  if(frameCount%100===0) {
    food=createSprite(random(10,590),random(10,390),10,10)
    food.lifetime=120;
    foodGroup.add(food);
  }
}
function spawnObstacles(){
  if(frameCount%400===0){
obstacles=createSprite(random(10,590),random(10,390),10,10);
obstacles.lifetime=200;
obstacles.velocityX=random(-2.75,3.0);
obstacles.velocityY=random(-3.0,3.0);
obstaclesGroup.add(obstacles);
obstacles.shapeColor="Red";
obstacles.bounceOff(edges[3]);
obstaclesGroup.add(obstacles);


}
 }
