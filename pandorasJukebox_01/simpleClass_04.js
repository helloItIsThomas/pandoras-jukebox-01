
class Vehicle{
  constructor(x, y, n){
    this.pos = createVector(x, y);
    this.acc = createVector(0,0);
    this.vel = createVector(0,0);
    this.mass = random(1,5);
    this.num = n;
    // this.maxSpeed = random(5,20);
    // this.maxForce = random(5,10);
    this.maxSpeed = 40;
    this.maxForce = 35;
    this.lifetime = 255;
  }

  finished(){
    return (this.lifetime < 0);
  }

  seek(target){
    let force = p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
  }

  arrive(target){
    let force = p5.Vector.sub(target, this.pos);
    let slowRad = 100;
    let d = force.mag();
    if(d < slowRad){
      let desSpeed = map(d, 0, slowRad, 0, this.maxSpeed);
      force.setMag(desSpeed);
    } else{
      force.setMag(this.maxSpeed);
    }
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
  }

  applyForce(forceA){
    this.f = forceA;
    this.f.div(this.mass);
    this.acc.add(this.f);
  }

  update(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxForce);
    this.pos.add(this.vel);
    this.acc.mult(0);
    // this line makes it so the acceleration doesnt endlessly exponentially increase.
    this.lifetime -= 0;
  }

  display(){
    fill(this.lifetime);
    circle(this.pos.x, this.pos.y, 50);
  }

  displayRot(){
    push();
    curveVertex(this.pos.x, this.pos.y);
    pop();
  }
}

class SubVehicle01 extends Vehicle{
  constructor(x, y){
    super(x, y);
  }

  display(){
    rect(this.pos.x, this.pos.y, 50, 10);
  }
}

class SubVehicle02 extends Vehicle{
  constructor(x, y){
    super(x, y);
  }

  display(){
    ellipse(this.pos.x, this.pos.y, 10, 50);
  }
}
