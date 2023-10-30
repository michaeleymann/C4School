/*

IDEAS

GAMEIFY! BUILD ALL KINDS OF SALTS
CONGRATS, YOU BUILT XYZ MESSAGE
SALTS BUILT SCREEN
OR MAKE TASKS (BUILD ALCL3, BUILD MAGNESIUM OXIDE, ETC)
DIFFERENT MODES?
STARTING SCREEN WITH DIRECTIONS

Implement crafty.js because of draggability
and collision detection
or maybe another game index that uses a different logic


safe last position
only allow dropping an object if it doesnt overlap
else go back to last pos

or stick objects to each other and group them to blocks
show formula of each block and net charge (red if not ok, green if ok)
*/

// Funktion für gestrichelte Linien (P5)
function setLineDash(list) {
    drawingContext.setLineDash(list)
  }


// FUNCTIONS
function returnColor(charge) {
    if (charge > 0) {
        return [darkRed,lightRed]
    }
    else {
        return [darkBlue,lightBlue];
    }
}

// ----------- MOUSE FUNCTIONS -----------
function mousePressed() {
    for ( let c of cards) {
        c.pressed()
    }
    // !!! ALL CHANGES HERE MUST ALSO BE MADE ON TOUCHSTARTED
}
function mouseReleased() {
    for ( let c of cards) {
        c.released()
    }

}

// ----------- TOUCH FUNCTIONS -----------
function touchStarted(){
    for ( let c of cards) {
        c.pressed()
    }
}

// ----------- KEY FUNCTIONS -----------

function keyPressed() {
    
    /*
    if (keyCode == LEFT_ARROW && state > 0 ) { 
      state -= 1
    } else if (keyCode == RIGHT_ARROW && state < 118 ) { 
        state += 1
    } else if (keyCode === 32) {
        let fs = fullscreen();
        fullscreen( !fs );
    }
    */
   
} // END OF KEY FUNCTIONS

//Input Name des Elements zB Lithium
function createCard(name,xPos){
    //getObject(ions,name)
    myIon = ions.find(obj => obj.name === name) 

    cards.push(new Card(myIon.charge,myIon.name,myIon.symbol,xPos))
}
// ----------- P5 SETUP  -----------
function setup(){

    textFont('Open Sans')

    // create P5 canvas
    let myCanvas = createCanvas(canvasWidth,canvasHeight)
    myCanvas.parent("content_1")

createCard("Aluminium",100)
createCard("Aluminium",150)
createCard("Sauerstoff",200)
createCard("Sauerstoff",250)
createCard("Sauerstoff",300)
createCard("Lithium",350)
createCard("Lithium",400)
createCard("Fluor",450)
createCard("Fluor",500)
createCard("Fluor",550)
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
    

    for ( let c of cards) {
        c.checkOver();
        c.updatePosition();
        c.show();
    }
} // END OF DRAW LOOP



// Prevent dragging the page whil drag-&-dropping
function preventBehavior(e) {
    e.preventDefault()
};

document.addEventListener("touchmove", preventBehavior, {passive: false})


/* ----------- OTHER FUNCTIONS -----------

function cleanEK(s){
    s = s + " ";
    s = s.replaceAll("10 ","\u00b9\u2070 ");
    s = s.replaceAll("11 ","\u00b9\u00b9 ");
    s = s.replaceAll("12 ","\u00b9\u00b2 ");
    s = s.replaceAll("13 ","\u00b9\u00b3 ");
    s = s.replaceAll("14 ","\u00b9\u2074 ");
    s = s.replaceAll("1 ","\u00b9 ");
    s = s.replaceAll("2 ","\u00b2 ");
    s = s.replaceAll("3 ","\u00b3 ");
    s = s.replaceAll("4 ","\u2074 ");
    s = s.replaceAll("5 ","\u2075 ");
    s = s.replaceAll("6 ","\u2076 ");
    s = s.replaceAll("7 ","\u2077 ");
    s = s.replaceAll("8 ","\u2078 ");
    s = s.replaceAll("9 ","\u2079 ");
    
    return s;
}

*/