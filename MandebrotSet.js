
const maxiterations = 100;
let slider1; 
let slider2;
let slider3;
let slider4;
var xZoomGoal; // To the right of starting point
var yZoomGoal; // To the bottom of starting point 
var startZoomX;
var startZoomY;

var xLeftRange = -1.5;
var xRightRange = 1.5;
var yTopRange = -1.5;
var yBottomRange = 1.5;

function f_of_z(za, zb, ca, cb){
  
 //  f_n(z) = z^2 + c where c = a + bi
 var z_2_real_portion = pow(za, 2)- pow(zb, 2);
 var z_2_img_portion = 2*za*zb;
 return [z_2_real_portion + ca, z_2_img_portion + cb];
  
}

function setup() {
  frameRate(20);
  createCanvas(500,500);
  //slider1 = createSlider(-2,2,1.5,0.01);
  //slider1.position(20,20);
  //slider2 = createSlider(-2,2,1.5,0.01);
  //slider2.position(20,40);
  //slider3 = createSlider(-2,2,1.5,0.01);
  //slider3.position(20,60);
  //slider4 = createSlider(-2,2,1.5,0.01);
  //slider4.position(20,80);

}

function mouseDragged(){
  
  xZoomGoal = mouseX;
  yZoomGoal = mouseY;
  
}

function mouseReleased(){
 
  print("Start: " + [startZoomX, startZoomY]);
  print("End: " + [xZoomGoal, yZoomGoal]);
  
  // Remember the scaled position for later
  var scaledX = map(startZoomX, 0, 500, xLeftRange, xRightRange);
  var scaledY = map(startZoomY, 0, 500, yTopRange, yBottomRange);
  // Remember the scaled position for later
  var scaled_x_end = map(xZoomGoal, 0, 500, xLeftRange, xRightRange);
  var scaled_y_final = map(yZoomGoal, 0, 500, yTopRange, yBottomRange);
  
  xLeftRange = scaledX;
  xRightRange = scaled_x_end;
  yTopRange = scaledY;
  yBottomRange = scaled_y_final;
  
}


function mousePressed(){
  
  startZoomX = mouseX;
  startZoomY = mouseY;
  
}

function draw() {
  
  loadPixels();
  // Row
  for(let a = 0; a < 500; a++){
    // Column
     for(let b = 0; b < 500; b++){
        // Row * # of Columns + Column
        var index = a * 500 + b;
        set(a, b, (255,255,255));
        
        // f_n(z) = z^2 + c where c = a + bi
        // f_0(z) = 0
        var zReal = 0;
        var zImg = 0;
        
        var scaledA = map(a, 0, 500, xLeftRange, xRightRange);
        var scaledB = map(b, 0, 500, yTopRange, yBottomRange);
        
        
        // When you square a complex number, you get...
        // a^2 + 2abi - b^2
        for(let round = 0; round < maxiterations; round++){
          
          // Calculate the new z based on the old values
          var result = f_of_z(zReal, zImg, scaledA, scaledB);
          zReal = result[0];
          zImg = result[1];
          
          if(sqrt(pow(zReal, 2)+pow(zImg, 2)) > 2){
           //print(sqrt(pow(zReal, 2)+pow(zImg, 2)));
           set(a, b, (round,round,round));
           break; 
          }
        }
        
     }
       
  }
  
  updatePixels();

}
