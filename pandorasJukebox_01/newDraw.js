
function newDraw(){
  rand = random(1);
  strokeWeight(5);
  beginShape();
  for(let t=0; t<myShapes.length; t++){
    myTargets[t].display();
    if((frameCount*changeSpeed)%2==1){
      if(t == 0){
        if(switchNum == 0){
          switchNum = 1;
        } else if (switchNum == 1){
          switchNum = 0;
        }
      }
      myTargets[t].update();
    }
    myShapes[t].arrive(myTargets[t].pos);
    myShapes[t].applyForce(gravity);
    myShapes[t].update();
    myShapes[t].displayRot();
  }
  endShape();
  for(let i = myShapes.length-1; i >=0; i--){
    if(myShapes[i].finished()){
      myShapes.splice(i, 1);
    }
  }
  textSize(width*0.175);
}
