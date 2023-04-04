/*
TO TO

- Make Triange appear above and below atoms to change charge

*/


function setLineDash(list) {
    drawingContext.setLineDash(list)
  }

function writeCharge(charge) {
    if ( charge > 0 ) {
        return charge + "+"
    } else  if ( charge < 0 ) {
        return Math.abs(charge) + "-"
    } else {
        return "0"
    }
}
function drawForceRectangle(){
        let distance = dist (atoms[0].x,atoms[0].y,atoms[1].x,atoms[1].y) / 10
        let force =  20000 * atoms[0].charge * atoms[1].charge / ( distance * distance ) 
        fill(darkYellow)
        rect(canvasWidth/2,canvasHeight-60,force,20)
}

function drawGraphicElements() {

    // Surrounding Rectangle
    stroke(colLine)
    noFill()
    setLineDash([1,2])
    rect(0,0,canvasWidth,canvasHeight)

    //Background Grid
    //Vertical
    for ( let x = 1; x < 12 ; x++) {
        stroke(90)
        line(x*100,50,x*100,canvasHeight-150)
    }
    //Horizontal
    for ( let y = 1 ; y < 7 ; y++) {
        line(100,y*100-50,canvasWidth-100,y*100-50)
    }

    // Force Scale
    noStroke()
    fill(lightYellow)
    for ( let x = -5; x < 6; x++) {
        if ( x != 0) rect(canvasWidth/2+x*100-1,canvasHeight-65,2,30)
        else rect(canvasWidth/2+x*100-2,canvasHeight-70,4,40)
    }
    for ( let x = -5; x < 6; x++) {
        rect(canvasWidth/2+x*100+49,canvasHeight-55,2,10)
    }
    setLineDash([1,0])
    stroke(lightYellow)
    line(50,canvasHeight-50,canvasWidth-50,canvasHeight-50)
    noStroke()
    triangle(50,canvasHeight-50,60,canvasHeight-55,60,canvasHeight-45)
    //triangle(canvasWidth/2,canvasHeight-50,60,canvasHeight-55,60,canvasHeight-45)
    triangle(canvasWidth-50,canvasHeight-50,canvasWidth-60,canvasHeight-55,canvasWidth-60,canvasHeight-45)
    //triangle(canvasWidth/2,canvasHeight-50,canvasWidth-60,canvasHeight-55,canvasWidth-60,canvasHeight-45)

    // Force Scale Text
    
    textAlign(CENTER)
    textSize(16)
    text("0",canvasWidth/2,canvasHeight-100)
    textAlign(RIGHT)
    text("abstossende Kraft",canvasWidth-100,canvasHeight-100)
    textAlign(LEFT)
    text("anziehende Kraft",100,canvasHeight-100)
}
// ----------- MOUSE FUNCTIONS -----------
function mousePressed() {
    for ( let atom of atoms ) {
        atom.pressed();
    }
}
function mouseReleased() {
    for ( let atom of atoms ) {
        atom.released();
    }
}



// ----------- TOUCH FUNCTIONS -----------
function touchStarted(){
}

// ----------- KEY FUNCTIONS -----------
function keyPressed() {
} // END OF KEY FUNCTIONS


// ----------- P5 SETUP  -----------
function setup(){
    textFont('Open Sans')

    let myCanvas = createCanvas(canvasWidth,canvasHeight)
    myCanvas.parent("content_1")

    atoms.push( new Atom(500,350,col1,2) )
    atoms.push( new Atom(700,350,col1,1) )

} // END OF SETUP

// ----------- P5 DRAW LOOP  -----------
function draw(){

    textSize(txt.heading)

    // Resize canvas to window size.
    scaleFactor = min(windowWidth/canvasWidth,windowHeight/canvasHeight)*0.95
    resizeCanvas(windowWidth,windowHeight)
    scale(scaleFactor)
    background(colBG)


    drawForceRectangle()
    drawGraphicElements()
    

    for ( let atom of atoms ){
        atom.checkOver()
        atom.updatePosition()
        atom.show()
    }

} // END OF DRAW LOOP



// Prevent dragging the page whil drag-&-dropping
function preventBehavior(e) {
    e.preventDefault()
};

document.addEventListener("touchmove", preventBehavior, {passive: false})