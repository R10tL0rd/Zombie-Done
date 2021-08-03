var bkground, backgroundImage;
var shooter, shooter1Image, shooter2Image, shooter3Image;
var zombie, zombieImage;
var zombieGroup;
var bullet, bulletImage;
var bulletGroup;
var bulletFiredSound;
var punchSound;
var score = 0;
var life = 3;
var heart, heart1Image;
var heart2, heart2Image;
var heart3, heart3Image;
var gameState = "play";
var loseSound;
var restart;
var restartImage

function preload() {
  backgroundImage = loadImage("images/bg.jpeg");
  shooter1Image = loadImage("images/shooter_1.png");
  shooter2Image = loadImage("images/shooter_2.png");
  shooter3Image = loadImage("images/shooter_3.png");
  zombieImage = loadImage("images/zombie.png");
  bulletImage = loadImage("images/Bullet.png");
  heart1Image = loadImage("images/heart1.png");
  heart2Image = loadImage("images/heart2.png");
  heart3Image = loadImage("images/heart3.png");
  bulletFiredSound = loadSound("assets/gunFired.mp3");
  punchSound = loadSound("assets/punch.mp3");
  loseSound = loadSound("assets/lose.mp3");
  restartImage = loadImage("images/restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  

  bkground = createSprite(displayWidth /2 -20, displayHeight /2 -40, 20, 20);
  bkground.addImage("background", backgroundImage);
  bkground.scale = 2.2

  shooter = createSprite(150, displayHeight /2 -40, 20, 20)
  shooter.addImage(shooter2Image)
  shooter.scale = .2
  
  heart = createSprite(displayWidth -200,40,20,20)
  heart.scale = 0.5

  restart = createSprite(displayWidth/2, displayHeight /2);
  restart.addImage(restartImage);
  restart.scale = 0.2;
  restart.visible = false;

  zombieGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  background(0);
  console.log(life);

  if(gameState === "play"){
    shooter.visible = true

    if(life === 3){
      heart.addImage(heart3Image);
    }
    if(life === 2){
      heart.addImage(heart2Image);
    }
    if(life === 1){
      heart.addImage(heart1Image);
    }
    if(life === 0){
      loseSound.play();
      gameState = "end";
    }

    if(keyDown("UP_ARROW") || touches.length>0){
      shooter.y = shooter.y - 30;
    }

    if(keyDown("DOWN_ARROW") || touches.length>0){
      shooter.y = shooter.y + 30;
    }

    if(keyWentDown("SPACE") || touches.length>0){
      bullet = createSprite (280,shooter.y -40,20,10)
      bullet.addImage(bulletImage);
      bullet.scale = .1
      bulletFiredSound.play();
      bulletGroup.add(bullet);
      bullet.velocityX = 40
      shooter.addImage(shooter3Image);
      shooter.depth = bullet.depth;
      shooter.depth = shooter.depth + 2;
    }
      else if(keyWentUp("SPACE") || touches.length>0){
      shooter.addImage(shooter2Image);
    }
  

    enemy();

    if(zombieGroup.isTouching(bulletGroup)){
      for (var index = 0; index < zombieGroup.length; index++) {
        if(zombieGroup[index].isTouching(bulletGroup)){
          zombieGroup[index].destroy()
          for (var i = 0; i < bulletGroup.length; i++) {
            bulletGroup.get(i).destroy();
            score = score + 10;
          }
        }
      }
    }

    if(zombieGroup.isTouching(shooter)){
      for (var index = 0; index < zombieGroup.length; index++) {
        if(zombieGroup[index].isTouching(shooter)){
          zombieGroup[index].destroy();
          punchSound.play();
          life = life- 1;
        }
      }
    }
  }

  drawSprites();

  textSize(30)
  fill("white")
  //textFont()
  text("Score ="+score,displayWidth /50, 50)

  if(gameState === "end"){
    restart.visible = true;
    textSize(100);
    fill ("red");
    text("You Lose!",displayWidth /2 -240,400);
    zombieGroup.destroyEach();
    shooter.visible = false;
    if(mousePressedOver(restart) || touches.length>0){
      restart.visible = false;
      score = 0;
      life = 3;
      gameState = "play";
    }
  }
}

function enemy() {
  if(frameCount % 20 === 0){
    zombie = createSprite(random(1000, 1500), random(100,500), 40, 40);
    zombie.addImage("zombie",zombieImage);
    zombie.scale = .16;
    zombie.velocityX= -(3*2 + score /100);
    zombie.lifetime = 750;
    zombie.setCollider("rectangle", 0,0,400,1800)
    zombieGroup.add(zombie);1
  }
}