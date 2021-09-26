var bg,bgimg,bg2,bgimg2,start,shooter,shooterimg,heart1,heart1img,heart2,heart2img,heart3,heart3img;
var zombie1,bulletImg,bullet;
var zombie1Img,zombie2Img,zombie3Img,zombie4Img,info,infoimg,start,startimg;
var life=3;
var Score=0;
var gamestate="start";


function preload(){
bgimg=loadImage("assets/bg1.jpg")
bgimg2=loadImage("assets/bg2.jpg")
infoimg=loadImage("assets/info.png")
startimg=loadImage("assets/start.png")
shooterimg=loadImage("assets/shooter_3.png")
heart1img=loadImage("assets/heart_1.png")
heart2img=loadImage("assets/heart_2.png")
heart3img=loadImage("assets/heart_3.png")
zombie1Img=loadImage("assets/zombie.png")
zombie2Img=loadImage("assets/zombie1.png")
zombie3Img=loadImage("assets/zombie2.png")
zombie4Img=loadImage("assets/zombiewin.png")
bulletImg=loadImage("assets/bullet.png")
}


function setup() {
  createCanvas(800,600);
  

 
}



function draw() {

 // background(0,0,0);
 
 if(gamestate=="start"){
  bg2=createSprite(400,300)
  bg2.addImage(bgimg2);
  bg2.scale=0.7;

  start=createSprite(390,450)
start.addImage(startimg)

if(mousePressedOver(start)){

  gamestate="play";
}
 }

if (gamestate=="play"){
  bg=createSprite(400,300)
  bg.addImage(bgimg);
  bg.scale=0.5;
  shooter=createSprite(150,500,20,20);
  shooter.addImage(shooterimg)
  shooter.scale=0.3

  heart1=createSprite(120,50,20,20)
  heart1.addImage(heart1img)
  heart1.scale=0.2;
  heart1.visible=false;

  heart2=createSprite(80,50,20,20)
  heart2.addImage(heart2img)
  heart2.scale=0.2;
  heart2.visible=false;

heart3=createSprite(70,50,20,20)
  heart3.addImage(heart3img)
  heart3.scale=0.2;
//heart3.visible=false;
  zombieG=new Group()
  bulletG=new Group()

  textSize(20)
  text("Score ="+Score,390,30);

  if(keyDown("UP_ARROW") ){

    shooter.y=shooter.y-10;
    
    
    }
    
    if(keyDown("DOWN_ARROW") ){
    
      shooter.y=shooter.y+10;
    
      }
  createZombie1();
  if(life==3){
    heart1.visible=false;
    heart2.visible=false;
    heart3.visible=true;
  }
  if(life==2){

    heart1.visible=false;
    heart2.visible=true;
    heart3.visible=false;
  }
  if(life==1){

    heart1.visible=true;   
    heart2.visible=false;
    heart3.visible=false;
  
  }
  if(life==0){
gamestate="end";
heart1.visible=false;   
heart2.visible=false;
heart3.visible=false;

  }

  if(keyDown("F")){
bullet=createSprite(shooter.x+50,500,20,20)
bullet.addImage(bulletImg);
bullet.y=shooter.y-25;
bullet.velocityX=3
bullet.scale=0.1;
bulletG.add(bullet);
  }

  if(bulletG.isTouching(zombieG)){
    Score=Score+10
for(var zom=0;zom<zombieG.length;zom=zom+1){

  if(zombieG[zom].isTouching(bulletG)){
    bulletG.destroyEach();
    zombieG[zom].destroy();
  }
}
  }
 
if(zombieG.isTouching(shooter)){
for(var i=0;i<zombieG.length;i++){
if(zombieG[i].isTouching(shooter)){

  zombieG[i].destroy();
  life=life-1;
}

}
}

}

else if(gamestate=="end"){
  textSize(40)
  text("GAME OVER",400,300);
  zombieG.destroyEach();
  zombieG.setVelocityXEach(0);
  shooter.destroy();
}
 
  
drawSprites();
}
function createZombie1() {
  if (World.frameCount % 150 == 0) {
    var zombie1 = createSprite(800,Math.round(random(50,600), 10, 10));
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: zombie1.addImage(zombie1Img);
              break;
      case 2: zombie1.addImage(zombie2Img);
              break;
      case 3: zombie1.addImage(zombie3Img);
              break;
    
      default: break;
    }
  
  
  zombie1.scale=0.5;
  zombie1.velocityX =- 3;
 zombie1.lifetime =300;
  zombieG.add(zombie1);
}
}


 
 