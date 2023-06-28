
function drawGrid(){g
  push();
  noFill();
  strokeWeight(5);
  translate(gridGX, gridGY);
  for(let x=0; x<gridCountX; x++){
    for(let y=0; y<gridCountY; y++){
      // rect(x*shapeSizeW, y*shapeSizeH, shapeSizeW, shapeSizeH);
      rect(x*(shapeSizeW), y*(shapeSizeH), newSSW, newSSH);
    }
  }
  pop();
}
