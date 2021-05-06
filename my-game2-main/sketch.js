var knight, canvas;
var ghost1,ghost2,ghost3,ghost4;
var princess,backgroundImage;
var spike,gamestate="play";
var door,gameover,gameoverImg;
var floor,retry,retryImg;
var ghostGroup,score=0;
var spikeGroup;
var ground;

function preload(){
knightImage = loadAnimation("images/k1.png","images/k2.png","images/k3.png");
ghostImage = loadImage("images/ghost.png");
princessImage = loadImage("images/princess3.png");
backgroundImage = loadImage("images/bg.jpg");
spikeImg = loadImage("images/spike.png");
door = loadImage("images/door.jpg");
gameoverImg = loadImage("images/game over.png");
retryImg = loadImage("images/retry.png");
}

function setup(){
canvas = createCanvas(displayWidth, displayHeight);

ground=createSprite(0,displayHeight-100,1000,20);

floor = createSprite(0, 400, displayWidth, displayHeight);
floor.addImage(backgroundImage);
floor.scale=1.4;


knight = createSprite(200,displayHeight-140,20,50);
princess = createSprite(displayWidth-150,50,20,50);
knight.addAnimation("running",knightImage);
princess.addImage(princessImage);

gameover=createSprite(displayWidth/2,displayHeight/2-150)
gameover.addImage(gameoverImg);
gameover.scale=0.8;
retry=createSprite(displayWidth/2,displayHeight/2);
retry.addImage(retryImg);
retry.scale=0.3;
princess.scale = 0.1;
spikeGroup=new Group();
ghostGroup=new Group();
}

function draw(){
background("white");

if(gamestate==="play"){
gameover.visible=false;
retry.visible=false;
princess.visible=false;
floor.velocityX=-3;
score=score+Math.round(getFrameRate()/60);
if(floor.x<0){
    floor.x=floor.width/2;
}
if(keyDown("space")){
    knight.velocityY=-12;
}
knight.velocityY+=0.5;
if(spikeGroup.isTouching(knight)||ghostGroup.isTouching(knight)){
    gamestate="end";
}
knight.collide(ground);
spawnSpikes();
spawnGhosts();
}
else if(gamestate==="end"){
    gameover.visible=true;
    retry.visible=true;
    ghostGroup.setLifetimeEach(-1);
    spikeGroup.setLifetimeEach(-1);

    floor.velocityX=0;
    knight.velocityY=0;
    ghostGroup.setVelocityXEach(0);
    spikeGroup.setVelocityXEach(0);
}
textSize(30);
fill("yellow");
text("Score:"+score,displayWidth/2,displayHeight/2);
if(mousePressedOver(retry)){
    reset();
}
drawSprites();

}
function spawnSpikes(){
    if(frameCount%100===0){
        spike=createSprite(1500,displayHeight-140,20,50);
        spike.addImage(spikeImg);
        spike.velocityX=-6;
        spike.scale=0.3;
        spike.lifetime=1000;
        spikeGroup.add(spike); 
    }
}
function spawnGhosts(){
    if(frameCount%130===0){
        ghost=createSprite(1500,Math.round(random(displayHeight/2+50,displayHeight/2-200)),20,30);
        ghost.addImage(ghostImage);
        ghost.velocityX=-6;
        ghost.scale=0.2;
        ghost.lifetime=1000;
        ghostGroup.add(ghost);
    }
}
function reset(){
    gamestate="play";
    ghostGroup.destroyEach();
    spikeGroup.destroyEach();
    
}