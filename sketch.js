
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 monkey = createSprite(80,315,20,20);
 monkey.addAnimation("moving", monkey_running);
 monkey.scale = 0.1;
  
 ground = createSprite(400,350,900,10);
 ground.velocityX = -4;
 ground.x = ground.width/2;
  
 obstacleGroup = createGroup();
 FoodGroup = createGroup();

}


function draw() {
 background(255);
  
 console.log(frameCount);
  
 if(ground.x<0) {
  ground.x = ground.width/2;
 }
  
 if(keyDown("space")) {
   monkey.velocityY = -12;
 } 
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  stroke = ("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time:" + survivalTime, 100, 50);
  
  food();
  obstacle();
  
 /* if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
  }*/
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
drawSprites();
}

function food() {
  if(frameCount % 80===0) {
    var banana = createSprite(600,100,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,200));
    banana.velocityX = -4;
    banana.lifetime = 150; 
    monkey.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function obstacle(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(600,320,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}



