let niveaus = [];
let uebergaenge = [];
let banden = [];
let mySeries = [];

let state = "Energieniveaus";
let niveauButton;
let uberButton;
let deleteButton;

// Wavelength of Hydrogen Series, source: https://en.wikipedia.org/wiki/Hydrogen_spectral_series
let lymannSeries = [121.57, 102.57, 97.25, 94.97, 93.78, 91.175];
let balmerSeries = [656.3, 486.1, 434, 410.2, 364.6]; // del 397.0
let paschenSeries = [1875, 1282, 1094, 1500, 820]; //del 945.6 1005

// ----------- COLORS  -----------

colHighlight = "#eb5e28";
colDragged = "#F29875";
colArrow = "#eb5e28";
colLightGrey = "#ccc5b9"
colBlue = "#0E79B2"
colGrey = "#4b4b4b"

// ----------- P5 SETUP  -----------
function setup(){
    textFont("Open Sans");
    createCanvas(1000,700);
    
    
    //!! id's (first number) need to be 0,1,2 etc
    niveaus.push(new Energieniveau(0, 500))
    niveaus.push(new Energieniveau(1, 300))
    niveaus.push(new Energieniveau(2, 230))
    niveaus.push(new Energieniveau(3, 180))
    niveaus.push(new Energieniveau(4, 140))
    niveaus.push(new Energieniveau(5, 100))
    niveaus.push(new Energieniveau(6, 70))
  

 
    // Buttons
    niveauButton = createButton("Energieniveaus verschieben")
    niveauButton.position(buttonXpos,buttonYpos)
    niveauButton.mousePressed( function() {state = "Energieniveaus"})
    niveauButton.id("niveauButton")
    uberButton = createButton("Übergänge zeichnen")
    uberButton.position(buttonXpos,buttonYpos + buttonSpacing)
    uberButton.mousePressed( function() {state = "Uebergaenge"})
    uberButton.id("uberButton")
    deleteButton = createButton("Übergänge Löschen")
    deleteButton.position(buttonXpos,buttonYpos + 2 * buttonSpacing)
    deleteButton.mousePressed( function() {uebergaenge = []})

    // Banden zeichen
    for ( let l of lymannSeries) {
        banden.push( new Bande (spectrumXpos+10, spectrumYpos, l, 400, col[0], true) )
    }

    for ( let b of balmerSeries) {
        banden.push( new Bande (spectrumXpos+10, spectrumYpos, b, 400, col[1], true) )
    }

    for ( let p of paschenSeries) {
        banden.push( new Bande (spectrumXpos+10, spectrumYpos, p, 400, col[2],  true) )
    }

}

// ----------- MOUSE FUNCTIONS -----------
function mousePressed() {

    // !!! ALL CHANGES HERE MUST ALSO BE MADE ON TOUCHSTARTED
    if (state == "Energieniveaus") {
        for ( let niveau of niveaus ){
            niveau.pressed()
        }
    } else if ( state == "Uebergaenge" && mouseX > niveausXpos && mouseX < (niveausXpos + niveausSize ) ) {
        uebergaenge.push( new Uebergang(mouseX, mouseY));
    }
}

function mouseReleased() {



    if ( state == "Energieniveaus" ){  
        //release niveaus, jump back to old pos if necessary
        for ( let niveau of niveaus ){
            if (niveau.dragged) {niveau.released()};
        }
        //make an array for all y positions
        let allPositions = [];

        //populate the array with the y values of the niveaus
        for ( let n = 0; n < niveaus.length; n++ ){
            allPositions.push(niveaus[n].y)
        }
        // sort the array
        allPositions = allPositions.sort(function (a, b) {  return b - a;  }); 

        // go through the niveaus again, and give new id
        for ( let niveau of niveaus ){
            //Give each Niveau a New ID based on its position
            niveau.n = allPositions.indexOf(niveau.y)
            niveau.color = col[niveau.n]
        }


    } else if ( state == "Uebergaenge" ) {
        for ( let uebergang of uebergaenge){
            if (uebergang.dragged) {uebergang.released()};
        }

    }
}

// ----------- TOUCH FUNCTIONS -----------
function touchStarted(){
    if (state == "Energieniveaus") {
        for ( let niveau of niveaus ){
            niveau.checkOver();
            niveau.pressed()

        }
    } else if ( state == "Uebergaenge" && mouseX > niveausXpos && mouseX < (niveausXpos + niveausSize )) {
        uebergaenge.push( new Uebergang(mouseX, mouseY))
    }
}

// Map Energy

function mapEnergy(value, isNiveau) {
    let min = 70;
    let max = 570;
    let minE = 0;
    let maxE = -15;
    if ( isNiveau ) {
        return map(value, min, max, minE, maxE);
    } else {
        return map(value+min, min, max, 0, abs(maxE-minE))
    }
 
}

function buttonColors(){
    if (state == "Energieniveaus") {
        niveauButton.style("background-color", colLine)
        niveauButton.style("color", colBG)
        niveauButton.style("border-color", colLine)
        uberButton.style("background-color", colBG)
        uberButton.style("color", colLine)
    } else if ( state == "Uebergaenge") {
        uberButton.style("background-color", colLine)
        uberButton.style("color", colBG)
        uberButton.style("border-color", colLine)
        niveauButton.style("background-color", colBG)
        niveauButton.style("color", colLine)
    }
}

// ----------- P5 DRAW LOOP  -----------

function draw(){
    //resizeCanvas(windowWidth,windowHeight)
    //scale(min(windowWidth/800,windowHeight/600))
    buttonColors();
    
    // -----------  GRAPHIKELEMENTE  -----------
    background(colBG)
    
    // rect to see canvas size
    push()
    stroke(255)
    noFill()
    rect(0,0,900,700)
    pop()

    // Erstes Spektrum
    strokeWeight(1.5)
    stroke(colLine)
    line(spectrumXpos,spectrumYpos,spectrumXpos+410,spectrumYpos)
    line(spectrumXpos,spectrumYpos+20,spectrumXpos+410,spectrumYpos+20)
    //340
    line(spectrumXpos+10,spectrumYpos,spectrumXpos+10,spectrumYpos-5)
    line(spectrumXpos+95,spectrumYpos,spectrumXpos+95,spectrumYpos-5)
    line(spectrumXpos+200,spectrumYpos,spectrumXpos+200,spectrumYpos-5)
    line(spectrumXpos+305,spectrumYpos,spectrumXpos+305,spectrumYpos-5)

    noStroke()
    fill(colLine)
    //textFont("monospace")
    textSize(12)
    text("GEMESSENES WASSERSTOFFSPEKTRUM", spectrumXpos+2, spectrumYpos - 40 )
    textSize(10)
    text("100", spectrumXpos+2, spectrumYpos-10 )
    text("400", spectrumXpos+87, spectrumYpos-10  )
    text("1000", spectrumXpos+188, spectrumYpos-10  )
    text("1500", spectrumXpos+293, spectrumYpos-10  )
    text("nm", spectrumXpos+395, spectrumYpos-10 )

    
    // Zweites Spektrum
   
    fill(colHighlight)
    textSize(12)
    text("BERECHNETES WASSERSTOFFSPEKTRUM", spectrumXpos+2, spectrumYpos + spectrumDistance + 70 )
    textSize(10)
    text("100", spectrumXpos+2, spectrumYpos + spectrumDistance + 40 )
    text("400", spectrumXpos+87, spectrumYpos + spectrumDistance + 40 )
    text("1000", spectrumXpos+188, spectrumYpos + spectrumDistance + 40 )
    text("1500", spectrumXpos+293, spectrumYpos + spectrumDistance + 40 )
    text("nm", spectrumXpos+395, spectrumYpos + spectrumDistance + 40 )
       
    stroke(colHighlight)
    line(spectrumXpos,spectrumYpos+spectrumDistance,spectrumXpos+410,spectrumYpos+spectrumDistance)
    line(spectrumXpos,spectrumYpos+spectrumDistance+20,spectrumXpos+410,spectrumYpos+spectrumDistance+20)
    
    line(spectrumXpos+10,spectrumYpos+spectrumDistance+20,spectrumXpos+10,spectrumYpos+spectrumDistance+25)
    line(spectrumXpos+95,spectrumYpos+spectrumDistance+20,spectrumXpos+95,spectrumYpos+spectrumDistance+25)
    line(spectrumXpos+200,spectrumYpos+spectrumDistance+20,spectrumXpos+200,spectrumYpos+spectrumDistance+25)
    line(spectrumXpos+305,spectrumYpos+spectrumDistance+20,spectrumXpos+305,spectrumYpos+spectrumDistance+25)
    
    // Legende
    textSize(12)
    noStroke()
    fill(colLine)
    text("ENERGIENIVEAUS", niveausXpos-80, legendeYpos+8)
    text("LEGENDE", legendeXpos, legendeYpos+8 )
    text("AKTIONEN", buttonXpos, legendeYpos+8)
    fill(col[0])
    square(legendeXpos,legendeYpos+legendeSpacing,8)
    text("Lymann-Serie", legendeXpos+20, legendeYpos+legendeSpacing+8 )
    fill(col[1])
    square(legendeXpos,legendeYpos+2*legendeSpacing,8)
    text("Balmer-Serie", legendeXpos+20, legendeYpos+2*legendeSpacing+8 )
    fill(col[2])
    square(legendeXpos,legendeYpos+3*legendeSpacing,8)
    text("Paschen-Serie", legendeXpos+20, legendeYpos+3*legendeSpacing+8 )

     // TEXT
     noStroke();
     fill(colLine)
     push()
     textAlign(CENTER)
     textWrap(WORD)
     textSize(12)
     text(description.text,description.x,description.y,description.max)
     pop()

    // ----------- DO ALL THE FUN STUFF  -----------
    
    // Banden updaten und zeichnen
    for ( let bande of banden ) {
        bande.show()
    }


    // Energieniveaus Zeichnen
    for ( let niveau of niveaus ){
        niveau.update()
        niveau.checkOver()
        niveau.show()
    }

    // Übergägne Zeichnen
    for ( let [index, uebergang] of uebergaenge.entries() ){
        uebergang.update()
        uebergang.show()

        // Aufräumen
        if ( uebergang.deleted ) {
            uebergaenge.splice(index)
        }
    }
}


// Prevent dragging the page whil drag-&-dropping
function preventBehavior(e) {
    e.preventDefault(); 
};

document.addEventListener("touchmove", preventBehavior, {passive: false});