class Atom {
    constructor(x,y,col,charge) {
        this.x = x,
        this.y = y,
        this.dx = 0,
        this.dy = 0,
        this.radius = atomSize / 2,
        this.col = col,
        this.fill = colBG,
        this.charge = charge,
        this.writtenCharge = writeCharge(this.charge)
        this.mOver = false,
        this.dragging = false,
        this.buttons = [];

        this.buttons.push( new chargeButton(this.x, this.y, 1))
        this.buttons.push( new chargeButton(this.x, this.y, -1))
    }

    show(){
        strokeWeight(3)
        // set color of atom
        if ( this.mOver && this.charge > 0 ) { this.col = lightRed; this.fill = lightRed }
        else if (this.mOver && this.charge < 0) { this.col = lightBlue; this.fill = lightBlue }
        else if (this.charge > 0 ) { this.col = lightRed; this.fill = colBG }
        else if (this.charge < 0 ) { this.col = lightBlue; this.fill = colBG }
        else if (this.mOver) { this.col = darkGrey; this.fill = darkGrey }
        else { this.col = darkGrey; this.fill = colBG }

        stroke(this.col)
        fill(this.fill)
        
        // draw atom
        circle(this.x,this.y,this.radius * 2)
        // make text inside atom
        textSize(20)
        noStroke()
        if (this.mOver) fill(colLine); else fill(this.col);
        textAlign(CENTER)
        text(this.writtenCharge,this.x,this.y+txt.heading/3)

        for ( let b of this.buttons ){
            b.show(this.mOver)
        }
    }
    updatePosition(){
        if ( this.dragging ) {
            this.x = ( mouseX / scaleFactor + this.dx ) ;
            this.y = ( mouseY / scaleFactor+ this.dy ) ;

            for ( let b of this.buttons ) {
                b.updatePosition(this.x, this.y)
            }
        }
    }
    checkOver() {
        if ( 
            mouseX > this.x * scaleFactor - this.radius * scaleFactor && 
            mouseX < this.x * scaleFactor + this.radius * scaleFactor &&
            mouseY > this.y * scaleFactor - this.radius * scaleFactor &&
            mouseY < this.y * scaleFactor + this.radius * scaleFactor &&
            !this.mOver
            ) {
                this.mOver = true;
        }  else if (
            mouseX > this.x * scaleFactor - this.radius * scaleFactor && 
            mouseX < this.x * scaleFactor + this.radius * scaleFactor &&
            mouseY > this.y * scaleFactor - 2*this.radius * scaleFactor &&
            mouseY < this.y * scaleFactor + 2*this.radius * scaleFactor &&
            this.mOver
        ) {
            this.mOver = true;
        } else {
            this.mOver = false;
        }

        
        for ( let b of this.buttons ) {
            b.checkOver()
        }
        
    }
    pressed() {
        if ( this.mOver ) {
            this.dx = this.x  - mouseX / scaleFactor ;
            this.dy = this.y  - mouseY / scaleFactor;
            this.dragging = true;
        }
    }
    released() {
        this.dragging = false;
        for ( let b of this.buttons ) {
            if ( b.mOver ) {
                this.charge += b.changeCharge();
                this.writtenCharge = writeCharge(this.charge)
                if ( this.charge > 9 ) this.charge = 9;
                if ( this.charge < -9 ) this.charge = -9;
            }
        }
    }
}

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
    updatePosition(x,y){
        this.x = x,
        this.y = y - ( this.chargeButtonPosition + buttonSize/2) * this.addOrSubtract
    }
    checkOver(){
        if ( 
            mouseX > this.x * scaleFactor - buttonSize * scaleFactor && 
            mouseX < this.x * scaleFactor + buttonSize * scaleFactor &&
            mouseY > this.y * scaleFactor - buttonSize * scaleFactor &&
            mouseY < this.y * scaleFactor + buttonSize * scaleFactor
            ) {
                this.mOver = true;
        }  else {
            this.mOver = false
        }
    }
    changeCharge(){
        return this.addOrSubtract;
    }
}
