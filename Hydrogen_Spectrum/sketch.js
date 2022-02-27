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
colBG = "#201d19";
colLine = "#ffffff";
colHighlight = "#eb5e28";
colDragged = "#F29875";
colArrow = "#eb5e28";
colLightGrey = "#ccc5b9"
colBlue = "#0E79B2"
colGrey = "#4b4b4b"

// ----------- P5 SETUP  -----------
function setup(){
    
    createCanvas(800,500);
    
    //!! id's (first number) need to be 0,1,2 etc
    niveaus.push(new Energieniveau(0, 400))
    niveaus.push(new Energieniveau(1, 150))
    niveaus.push(new Energieniveau(2, 90))
    niveaus.push(new Energieniveau(3, 60))
    niveaus.push(new Energieniveau(4, 40))
    niveaus.push(new Energieniveau(5, 30))
    niveaus.push(new Energieniveau(6, 130))


    // Buttons
    niveauButton = createButton("Energieniveaus verschieben")
    niveauButton.position(350,30)
    niveauButton.mousePressed( function() {state = "Energieniveaus"})
    niveauButton.id("niveauButton")
    uberButton = createButton("Übergänge zeichnen")
    uberButton.position(350,60)
    uberButton.mousePressed( function() {state = "Uebergaenge"})
    uberButton.id("uberButton")
    deleteButton = createButton("Übergänge Löschen")
    deleteButton.position(350,90)
    deleteButton.mousePressed( function() {uebergaenge = []})

    // Banden zeichen
    for ( let l of lymannSeries) {
        banden.push( new Bande (350, 300, l, 400, colLine, true) )
    }

    for ( let b of balmerSeries) {
        banden.push( new Bande (350, 300, b, 400, colLine, true) )
    }

    for ( let p of paschenSeries) {
        banden.push( new Bande (350, 300, p, 400, colLine,  true) )
    }

}

// ----------- MOUSE FUNCTIONS -----------
function mousePressed() {

    // !!! ALL CHANGES HERE MUST ALSO BE MADE ON TOUCHSTARTED
    if (state == "Energieniveaus") {
        for ( let niveau of niveaus ){
            niveau.pressed()
        }
    } else if ( state == "Uebergaenge" && mouseX > 80 && mouseX < 230) {
        uebergaenge.push( new Uebergang(mouseX, mouseY));
    }
}

function mouseReleased() {

    if ( state == "Energieniveaus" ){  
        for ( let niveau of niveaus ){
            niveau.released()
        }

    } else if ( state == "Uebergaenge" ) {
        for ( let uebergaeng of uebergaenge){
            uebergaeng.released()
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
    } else if ( state == "Uebergaenge" && mouseX > 80 && mouseX < 230) {
        uebergaenge.push( new Uebergang(mouseX, mouseY))
    }
}

// Map Energy

function mapEnergy(value, isNiveau) {
    let min = 0;
    let max = 500;
    let minE = 1;
    let maxE = -15;
    if ( isNiveau ) {
        return map(value, min, max, minE, maxE);
    } else {
        return map(value, min,max,0, abs(maxE-minE))
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
    rect(0,0,800,500)
    pop()

    // Erstes Epektrum
    strokeWeight(1.5)
    stroke(colLine)
    line(340,300,750,300)
    line(340,320,750,320)

    line(350,300,350,295)
    line(435,300,435,295)
    line(540,300,540,295)
    line(645,300,645,295)

    noStroke()
    fill(colLine);
    textFont("monospace")
    textSize(12)
    text("Gemessenes Wasserstoffpektrum", 342, 260 )
    textSize(10)
    text("100", 342, 290 )
    text("400", 427, 290 )
    text("1000", 528, 290 )
    text("1500", 633, 290 )
    text("nm", 735, 290 )

    
    // Zweites Spektrum
   
    fill(colHighlight)
    textSize(12)
    text("Berechnetes Wasserstoffpektrum", 342, 430 )
    textSize(10)
    text("100", 342, 400 )
    text("400", 427, 400 )
    text("1000", 528, 400 )
    text("1500", 633, 400 )
    text("nm", 735, 400 )
       
    stroke(colHighlight)
    line(340,360,750,360)
    line(340,380,750,380)
    
    line(350,385,350,380)
    line(435,385,435,380)
    line(540,385,540,380)
    line(645,385,645,380)
   

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