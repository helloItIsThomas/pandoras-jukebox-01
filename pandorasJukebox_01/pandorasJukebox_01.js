
////////////////
// template for motion blur and chromatic aberration with alpha blur
var t;                      //init time
const T = 1;                //loop period
const NUM_FRAMES = 100;     //period frame number

// Motion blur and chromatic shift settings - the first three values are adjustable
const NUM_SUBSAMPLES = 10;     // sub-sampled sketches to take between the current and next frame
const SHUTTER_ANGLE = 1;        // 1 will capture all the distance to the next frame
const CHROM_ANGLE = 1;          // 1 will shift the different color channels (rgb)
const CHROM_DT = CHROM_ANGLE*T/NUM_FRAMES/2;
var preview = true;             // default is preview mode / this functionality could be deleted

// define RGB colors for chromatic shift
var colorsCS = ['#1D9E5A', '#217AB8', '#F8C644'];
// var colorsCS = ['#000000', '#000000', '#000000'];
////////////////////////////////////////////////

let shapeOne, shapeSubOne, shapeSubTwo;
let myShapes = [];
let myTargets = [];
let aTarget;
let rand;
let gravity;
let vehicle;
let fillColor, backColor;
let marsha;
let myString;
let showTarg, showGrid;

let gridSizeW, gridSizeH;
let shapeSizeW, shapeSizeH;
let newSSW, newSSH;
let gridCountX, gridCountY;
let gridGX, gridGY;

let myTextSize, myTextSize2, myTextSize3, myTextSize4, myTextSize5, myTextSize6, myTextSize7, myTextSize8;

let changeSpeed;
let circScl;

let pts;
let switchNum;

function preload(){
  marsha = loadFont('/marsha.otf');
}

function setup(){
  myString = "P";
  // textAlign(LEFT, TOP);
  // createCanvas(1080, 1350);
  createCanvas(windowWidth, windowHeight);
  gridGX = 20;
  gridGY = 20;
  gridCountX = 6;
  gridCountY = 9;

  gridSizeW = width - (gridGX);
  gridSizeH = height - (gridGY);
  shapeSizeW = gridSizeW / gridCountX;
  shapeSizeH = gridSizeH / gridCountY;
  newSSW = shapeSizeW-(gridGX);
  newSSH = shapeSizeH-(gridGY);

  switchNum = 0;

  pts = marsha.textToPoints(myString, width/2-50, height/2, 200,{
  sampleFactor: 0.025,
  simplifyThreshold: 0.0
  });

  changeSpeed = 0.05;
  circScl = 0.3;
  showTarg = false;
  showGrid = false;
  // backColor = color('#F3F3F3');
  // backColor = color('#0E0E0E');
  backColor = color(255);
  backColor.setAlpha(175);
  background(backColor);
  frameRate(60);
  rand = 0;
  gravity = createVector(-0.010, 0.150);
  shapeOne = new Vehicle(windowWidth/2, windowHeight/2);
  shapeSubOne = new SubVehicle01(windowWidth/2, windowHeight/2);
  for(let n=0; n<pts.length; n++){
    if(n<5){
      myShapes.push(new SubVehicle01(random(windowWidth), random(windowHeight), n));
    } else{
      myShapes.push(new SubVehicle02(random(windowWidth), random(windowHeight), n));
    }
  }
  for(let n=0; n<pts.length; n++){
    // myTargets.push(new Target(random(windowWidth), random(windowHeight), n));
    myTargets.push(new Target(pts[n].x, pts[n].y, n));
  }
  noCursor();
}

function draw(){

  textAlign(LEFT, TOP);
  // translate(-windowWidth/2, -windowHeight/2);
  // translate(-width/2,-height/2);
  var numSubSamples = (preview == false) ? NUM_SUBSAMPLES : 1;
  blendMode(BLEND); //lets the background function to clear the canvas
  // background('#F3F3F3');
  background(backColor);
  if(showGrid == true){
    drawGrid();
  }
  fill(0);
  myTextSize4 = 18.02;
  textSize(myTextSize2);
  textLeading(myTextSize2*1.1);
  strokeWeight(myTextSize2*0.035);
  text("Renegade Soundwaves by Pandora's Jukebox: sonic assemblages with hypnotic noir-dreamscapes and a multi-textured take on electronic music.", shapeSizeW*3+gridGX, shapeSizeH*8+gridGY, shapeSizeW*3, shapeSizeH);
  // text("LONDON\nMONTHLY", shapeSizeW*0+gridGX, height-myTextSize8*2, shapeSizeW*4, shapeSizeH*2);


  for (let i=0; i<numSubSamples; i++){
      push();
      t = map(frameCount-1 + i*SHUTTER_ANGLE/numSubSamples, 0, NUM_FRAMES, 0, T)%T; //sub-sampled time
      for (let c=0; c<3; c++){ // for each color RGB
          var tc = t - CHROM_DT*c;  // for chromatic aberration, offset time for each color
          colorc = color(colorsCS[c]);
          // colorc = color(255);
          colorc.setAlpha(255/numSubSamples); // adjust transparency for num of sub-samples
          fill(colorc);
          // noStroke();
          // noFill();
          // stroke(colorc);
          // DRAW HERE
          push();
          newDraw();
          pop();
      }
      pop();
  }
  fill(0);
  myTextSize = 85.94;
  myTextSize2 = 28.16;
  myTextSize3 = 107.42;
  myTextSize5 = 167.85;
  myTextSize6 = 44.00;
  myTextSize7 = 134.28;
  myTextSize8 = 68.75;
  // noStroke();
  strokeWeight(myTextSize5*0.04);
  textSize(myTextSize5);
  textLeading(myTextSize5*0.9);
  text("PANDORA'S\nJUKEBOX", gridGX, gridGY);
  textSize(myTextSize8);
  textLeading(myTextSize8*0.9);
  strokeWeight(myTextSize8*0.04);
  text("LONDON\nMONTHLY", shapeSizeW*0+gridGX, height-myTextSize8*2, shapeSizeW*4, shapeSizeH*2);
  // text("MONTHLY", shapeSizeW*0+gridGX, shapeSizeH*7+(gridGY+5), shapeSizeW*4, shapeSizeH);

  noFill();
  stroke(0);
  strokeWeight(10);
  rect(0,0,width,height);
  // fill(255,0,0);
  // noStroke();
  // circle(shapeSizeW*2+gridGX,shapeSizeH*3+gridGY,20);
  stroke('#1D9E5A');
  // var colorsCS = ['#1D9E5A', '#217AB8', '#F8C644'];
  // circle(mouseX, mouseY, 20);
  stroke(0);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  gridSizeW = width - (gridGX);
  gridSizeH = height - (gridGY);
  shapeSizeW = gridSizeW / gridCountX;
  shapeSizeH = gridSizeH / gridCountY;
  newSSW = shapeSizeW-(gridGX);
  newSSH = shapeSizeH-(gridGY);
}

function keyPressed(){
  if(key == 't'){
    if(showTarg == true){
      showTarg = false;
    }else{
      showTarg = true;
    }
  }
  if(key == 'g'){
    if(showGrid == true){
      showGrid = false;
    }else{
      showGrid = true;
    }
  }
}
