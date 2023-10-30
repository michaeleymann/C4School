

// DELETE WHEN DONE CODING
class chargeButton {
    chargeButtonPosition = atomSize/2;
    constructor(x,y,addOrSubtract) {
        this.x = x,
        this.y = y - ( this.chargeButtonPosition + buttonSize/2) * addOrSubtract
        this.addOrSubtract = addOrSubtract,
        this.mOver = false
   
    }
    show(visible){
        if (visible) {
            if (this.mOver) fill(lightYellow)
            else fill(darkYellow)
            triangle(
                this.x-buttonSize,this.y,
                this.x+buttonSize,this.y,this.x,
                this.y - buttonSize * this.addOrSubtract
            )
        }
        
    }
}
class Hexagon {
    constructor (x,y) {
        this.x = x,
        this.y = y,
        this.size = hexagonSize
    }

    display(){
    // Draw the hexagon
        beginShape();
          for (let angle = PI/6; angle < ( TWO_PI + PI/6); angle += PI / 3) {
            const hx = this.x + this.size * cos(angle);
            const hy = this.y + this.size * sin(angle);
            vertex(hx, hy);
          }
        endShape(CLOSE);
    }
}
