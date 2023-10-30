class Card {
    constructor(charge,name,symbol,xPos){
        this.x = xPos,
        this.y = 100,
        this.dx=0,
        this.dy=0,
        this.height = Math.abs(charge)*50,
        this.width = 50,
        this.color = returnColor(charge),
        this.name = name,
        this.symbol = symbol,
        this.mOver = true,
        this.dragging = false
    }
    show(){
        setLineDash([1,0])
        stroke(this.color[1])
        fill(this.color[0])
        rect(this.x,this.y,this.width,this.height)
        noStroke()
        fill(colLine)
        text(this.symbol, this.x+this.width/2, this.y+this.height/2)
    }
    updatePosition(){
        if ( this.dragging ) {
            this.x = ( mouseX / scaleFactor + this.dx ) ;
            this.y = ( mouseY / scaleFactor+ this.dy ) ;
        }
    }
    checkOver() {
        if ( 
            mouseX > this.x * scaleFactor && 
            mouseX < this.x * scaleFactor + this.width * scaleFactor &&
            mouseY > this.y * scaleFactor  &&
            mouseY < this.y * scaleFactor + this.height * scaleFactor 
            ) {
                this.mOver = true;
        }  else {
            this.mOver = false;
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
    }
}