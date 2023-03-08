/*
-- TO DO --

up/down arrow: use array find method and arrow funciton callback to find
atom above / below in PS, switch state accordingly
*/

// Funktion für gestrichelte Linien (P5)
function setLineDash(list) {
    drawingContext.setLineDash(list)
  }

// Funktion für die Farben des Periodensystems
function makeColor(block,period) {
    if ( period == 1 ) {
        return col1
    } else if ( period == 2 ) {
        return col2
    } else if ( period == 3 && block != "d" || ( period == 4 && block == "d" )) {
        return col3
    } else if ( period == 4 && block != "d" || ( period == 5 && block == "d" ) || ( period == 6 && block == "f" ) ) {
        return col4
    } else if ( period == 5 && block != "d" && block != "f" || ( period == 6 && block == "d") || ( period == 7 && block == "f" ) ){
        return col5
    } else if ( period == 6 && block != "d" && block != "f" || ( period == 7 && block == "d")) {
        return col6
    } else if ( period == 7 && block != "f") {
        return col7
    } else {
        return colGrey
    }
}

// ----------- MOUSE FUNCTIONS -----------
function mousePressed() {
    // !!! ALL CHANGES HERE MUST ALSO BE MADE ON TOUCHSTARTED
    for ( let e of elements ) {
        e.selected = false
    }
}
function mouseReleased() {
    for ( let e of elements ) {
        e.select()
    }
    for ( let b of buttons ){
        b.select()
    }
}

// ----------- TOUCH FUNCTIONS -----------
function touchStarted(){
    for ( let e of elements ) {
        e.selected = false
    }
}

// ----------- KEY FUNCTIONS -----------

function keyPressed() {
    if (keyCode == LEFT_ARROW && state > 0 ) { 
      state -= 1
    } else if (keyCode == RIGHT_ARROW && state < 118 ) { 
        state += 1
    } /* UP DOWN FUNCTIONALITY, NOT SURE IF INCLUE THIS
    else if (keyCode == UP_ARROW ) {
        //Jump in Group Three
        if ( state == 71 ) {
            state = 39
        } else {
            // store current Atom object
            let currentAtom = elements.find(atom => atom.number == (state));
            // change column up if there is a suiting next atom
            if ( elements.find(atom => atom.column == currentAtom.column-1 && atom.row == currentAtom.row) ) {
            let nextAtom = elements.find(atom => atom.column == currentAtom.column-1 && atom.row == currentAtom.row)
            state=nextAtom.number
            }
        }
    } else if ( keyCode == DOWN_ARROW ) { 
        //Jump in Group Three
        if ( state == 39 ){
            state = 71

        } else {
            // change column down if there is a suiting next atom
            let currentAtom = elements.find(atom => atom.number == (state));
            if ( elements.find(atom => atom.column == currentAtom.column+1 && atom.row == currentAtom.row) ) {
            let nextAtom = elements.find(atom => atom.column == currentAtom.column+1 && atom.row == currentAtom.row)
            state=nextAtom.number
            }
        }
    } END OF UP DOWN FUNCTIONALITY */ 
} // END OF KEY FUNCTIONS


// ----------- P5 SETUP  -----------
function setup(){

    textFont('Open Sans')

    // create P5 canvas
    let myCanvas = createCanvas(canvasWidth,canvasHeight)
    myCanvas.parent("content_1")
    
    // create element objects from our atom data in data.js
    for ( let atom of atom_data ) {
        elements.push(new Element(atom.xpos,atom.ypos,atom.name,atom.number,atom.symbol,atom.period,atom.shells, makeColor(atom.block,atom.period)))
    }
    // create energy levels objects from our atom data in data.js
    for ( let e of energy_levels ) {
        levels.push(new Energy_Level(e.n,e.sub_positions[0],col[e.n-1],e.sub_levels,e.sub_positions))
    }

    // create Electron Configuration Box objects
    for ( let e of energy_levels ){
        configs.push(new Konfiguration(e.n,1,e.n,col[e.n-1],"0"))
    }

    // vreate Button Objects
    for ( let b of btns ) {
        buttons.push(new Button(b.position,b.text,b.color))
    }
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
   
    // State Auswählen
    for (let e of elements ){
        e.selected = false
    }
    currentE = ""
    if (state > 0 ){
        elements[state-1].selected = true
        currentE = elements[state-1].ek
    }

    // Atom zeichnen
    noStroke()
    fill(colLine)
    circle(at.x,at.y,at.nucleus_size)
    textAlign(CENTER)
    textSize(txt.heading)
    text("SCHALENMODELL", at.x,at.y-at.size*8)
    noFill()
    strokeWeight(1)
    for (bahn = 0; bahn < 7; bahn++ ){
        stroke(col[bahn])
        if (state > 0 ){
            if ( elements[state-1].period <= bahn) {
                setLineDash([1,2])
            } else {
                setLineDash([0,0])
            }
        } else {
            setLineDash([1,2])
        }

        circle(at.x,at.y,(bahn+1) * at.size*2)
    }

    // Elektronen im Atom zeichnen
    for ( shell = 0; shell < currentE.length; shell++){
        let locator = 0
        for ( ele = 0; ele < currentE[shell]; ele ++) {
            noStroke()
            fill(col[shell])
            circle(at.x + ( cos ( locator * TAU / currentE[shell]) * (shell+1) * at.size), at.y + ( sin ( locator * TAU / currentE[shell]) * (shell+1) * at.size),at.electron_size)
            locator++
        } 
    }

    // Periodensystem zeichnen
    //noStroke();
    //fill(colLine)
    //textAlign(CENTER)
    //textSize(txt.heading)
    //text("PERIODENSYSTEM", ps.x+ps.size*10,ps.y+ps.size)
    for ( let e of elements ) {
        e.show()
    }

    // Energieniveaus zeichnen
    noStroke()
    fill(colLine)
    textAlign(CENTER)
    textSize(txt.heading)
    text("ENERGIENIVEAUS", lv.x+125,lv.y-20*lv.spacing)
    for ( let l of levels ) {
        l.show()
    }

    // Elektronen in Energieniveaus einfüllen
    state_iterator = 0
    for ( i = 0; i < electrons.length; i++){  
        for (j = 0; j < electrons[i].length-1; j++) {
            if ( state_iterator == state ) {
                break
            }
            stroke(col[electrons[i][electrons[i].length-1]-1])
            strokeWeight(1.5)
            setLineDash([0,0])
            line(lv.x+160+j*6,lv.y-5-electrons[i][j]*lv.spacing,lv.x+160+j*6,lv.y+5-electrons[i][j]*lv.spacing)
            //circle(510+(i+1)*20,350,5)
            state_iterator++
        }
    }

    // Elektronenkonfiguratin zeichnen
    noStroke()
    fill(colLine)
    textAlign(CENTER)
    textSize(txt.heading)
    text("ELEKTRONENKONFIGURATION", cn.x+cn.size*3.5,cn.y-20)
    for ( let c of configs ) {
        c.update()
        c.show()
    }

    // Ausgewähltes Element zeichnen:
    setLineDash([0,0])
    stroke(colLine)
    noFill()
    textAlign(CENTER)
    rect(el.x,el.y,el.w,el.h)
    noStroke()
    fill(colLine)
    text("AKTUELLES ELEMENT",el.x+el.w/2,el.y-el.textsize*2)
    textSize(el.textsize)
    if (state > 0 ){
        fill(elements[state-1].color)
        text(elements[state-1].number,el.x+el.w/2,el.y+el.textsize*2)
        text(elements[state-1].name,el.x+el.w/2,el.y+el.h-el.textsize)
        textSize(el.textsize*4)
        textStyle(BOLD)
        text(elements[state-1].symbol,el.x+el.w/2,el.y+el.h/2+el.textsize*1.5)
        textStyle(NORMAL)
        //console.log(elements[state-1].name)
    }
    
    // Buttons
    for ( let b of buttons ) {
        b.checkOver()
        b.show()
    }

    // mOver and selector
    for ( let e of elements ){
        e.checkOver()
        e.show()
    }

    // TEXT
    noStroke();
    fill(colLine)
    textAlign(CENTER)
    textWrap(WORD)
    textSize(txt.body)
    text(description.text,description.x,description.y,description.max)


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