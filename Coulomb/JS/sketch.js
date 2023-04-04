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

    atoms.push( new Atom(450,350,col1,2) )
    atoms.push( new Atom(650,350,col1,-1) )

} // END OF SETUP

// ----------- P5 DRAW LOOP  -----------
function draw(){

    // Resize canvas to window size.
    scaleFactor = min(windowWidth/canvasWidth,windowHeight/canvasHeight)*0.95
    resizeCanvas(windowWidth,windowHeight)
    scale(scaleFactor)

    // -----------  GRAPHIKELEMENTE  -----------
    background(colBG)
    // Surrounding Rectangle
    stroke(255)
    noFill()
    setLineDash([1,2])
    rect(0,0,canvasWidth,canvasHeight)


    for ( let atom of atoms ){
        atom.checkOver()
        atom.updatePosition()
        atom.show()
    }

    let distance = dist (atoms[0].x,atoms[0].y,atoms[1].x,atoms[1].y) / 10
    let force =  5000 * atoms[0].charge * atoms[1].charge / ( distance * distance) 
    textSize(txt.heading)
    fill(colLine)
    text("Distance: " + distance.toFixed(2), 500,20)
    text("Force: " + force.toFixed(2), 500,40)


} // END OF DRAW LOOP



// Prevent dragging the page whil drag-&-dropping
function preventBehavior(e) {
    e.preventDefault()
};

document.addEventListener("touchmove", preventBehavior, {passive: false})