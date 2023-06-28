
class Target{

  constructor(x, y, n){
    this.pos = createVector(x, y);
    this.num = n;
  }

  update(){
    switch (switchNum) {
      case 0:
        console.log("0");
        // this.pos.x = mouseX;
        // this.pos.y = mouseY;
        this.pos.x = random(width);
        this.pos.y = random(height);
        break;
      case 1:
        console.log("1");
        this.pos.x = pts[this.num].x;
        this.pos.y = pts[this.num].y;
        break;
      default:
    }
  }

  display(){
    if(showTarg == true){
      circle(this.pos.x, this.pos.y, 32);
    }
  }
}
