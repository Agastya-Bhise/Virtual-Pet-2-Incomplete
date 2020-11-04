//Create variables here
var dog, happydog, foodS, foodStock;
var database;
var feedBtn;
var addBtn;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dogNormal = loadImage("Dog.png");
  dogHappy = loadImage("happydog.png");
}

function setup() {
  createCanvas(800, 500);
  dog = createSprite(200, 200, 10, 10);
  dog.addImage(dogNormal);
  database= firebase.database();
  dog.scale = 0.35;

  //foodObj = new Food(50, 50, 50, 50);

  feedBtn = createButton("Feed The Dog");
  feedBtn.position(675, 95);
  feedBtn.mousePressed(feedDog);

  addBtn = createButton("Add Food");
  addBtn.position(775, 95);
  addBtn.mousePressed(addFoods);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  

 

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
  //add styles here
  background(46, 139, 87);
  drawSprites();
  textSize(30);
  fill("white");
  text(foodS, 100, 30);



  fedTime=database.ref('FeedTime');
  
   fedTime=database.ref('FeedTime');
   fedTime.on("value", function(data){
     lastFed=data.val();
   });

   fill(255, 255, 254);
   textSize(15);
  
  if(lastFed >= 12){
   text("Last Feed : "+ lastFed%12 + " PM", 350, 30);
  }

  else if(lastFed === 0){
   text("Last Feed : "+ lastFed + " AM", 350, 30);
  }
}






function readStock(data)
{
foodS = data.val();
}

function writeStock(x)
{
if(x<=0)
{
  x=0;
}
else
{
  x = x - 1;
}
}



function feedDog(){
dog.addImage(dogHappy);


foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:x
  })

}

function addFoods(){
 foodS++;
 database.ref('/').update({
   Food : foodS
 })

}
