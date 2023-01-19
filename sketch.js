const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground
var engine
var world
var rope
var fruit
var fruitCon
var bgImg
var food
var rabbit
var Bunny
var buttom
var blink
var eat
var sad
var bgSound
var cutSound
var sadSound
var eatSound
var ballonSound 
var mutebtn
var buttom2
var buttom3
var rope2
var rope3
var fruitCon2
var fruitCon3
var CanW
var CanH


function preload(){
  bgImg=loadImage("background.png")
  food=loadImage("melon.png")
  rabbit=loadImage("Rabbit-01.png")
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  bgSound=loadSound("sound1.mp3")
  cutSound=loadSound("rope_cut.mp3")
  sadSound=loadSound("sad.wav")
  eatSound=loadSound("eating_sound.mp3")
  ballonSound=loadSound("air.wav")

  blink.playing=true
  eat.playing=true
  sad.playing=true

  eat.looping=false
  sad.looping=false
}


function setup() 
{
  var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if (isMobile) {
    CanW=displayWidth
    CanH=displayHeight
    createCanvas(displayWidth+80,displayHeight)
  } else {
    CanW=windowWidth
    CanH=windowHeight
    createCanvas(windowWidth,windowHeight)
  }
  engine = Engine.create()
  world = engine.world
  frameRate(80);

  bgSound.play()
  bgSound.setVolume(0.0)

  buttom=createImg("cut_button.png")
  buttom.position(50,90)
  buttom.size(60,60)
  buttom.mouseClicked(Drop)

  buttom2=createImg("cut_button.png")
  buttom2.position(330,95)
  buttom2.size(60,60)
  buttom2.mouseClicked(Drop2)

  buttom3=createImg("cut_button.png")
  buttom3.position(390,215)
  buttom3.size(60,60)
  buttom3.mouseClicked(Drop3)

  mutebtn=createImg("mute.png")
  mutebtn.position(430,20)
  mutebtn.size(60,60)
  mutebtn.mouseClicked(mute)

  ground = new Ground(900,CanH-20,1800,20)
  rope = new Rope(9,{x:75,y:90})
  rope2 = new Rope(8,{x:370,y:90})
  rope3 = new Rope(6,{x:410,y:220})

  var options={density:0.001}

  fruit=Bodies.circle(300,300,20,options)
  Matter.Composite.add(rope.body,fruit)

  fruitCon= new Link(rope,fruit)
  fruitCon2=new Link(rope2,fruit)
  fruitCon3=new Link(rope3,fruit)

  blink.frameDelay=20
  eat.frameDelay=20
  sad.frameDelay=20

  Bunny= createSprite(160,CanH-95,100,100)
  Bunny.addImage(rabbit)
  Bunny.scale=0.2
  Bunny.debug=false
  Bunny.setCollider("circle",0,0,30)

  Bunny.addAnimation("blinking",blink)
  Bunny.addAnimation("eating",eat)
  Bunny.addAnimation("sadding",sad)
  Bunny.changeAnimation("blinking")

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER)


}

function draw() 
{
  background("darkblue");
  image(bgImg,0,0,displayWidth+1550,displayHeight+600)
  Engine.update(engine)
  ground.display()

  rope.show()
  rope2.show()
  rope3.show()

  if (fruit!=null) {
    image(food,fruit.position.x,fruit.position.y,72,72)
  }

  if (Collide(fruit,Bunny)==true) {
    Bunny.changeAnimation("eating")
    eatSound.play() 
  }

  if (fruit!=null&&fruit.position.y>=550) {
    Bunny.changeAnimation("sadding")
    bgSound.stop()
    sadSound.play()
    fruit=null
  }


  drawSprites()

}

function Drop(){
  cutSound.play()
  rope.break()
  fruitCon.detach()
  fruitCon=null
}

function Drop2(){
  cutSound.play()
  rope2.break()
  fruitCon2.detach()
  fruitCon2=null
}

function Drop3(){
  cutSound.play()
  rope3.break()
  fruitCon3.detach()
  fruitCon3=null
}

function Collide(body,sprite){
  if (body!=null) {
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if (d<=80) {
      World.remove(engine.world,fruit)
      fruit=null
      return true
    }else{
      return false
    }
  }
}



function mute(){
  if (bgSound.isPlaying()) {
    bgSound.stop()
  } else {
    bgSound.play()
  }
}
