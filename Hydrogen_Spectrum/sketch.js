let niveaus = []
let uebergaenge = []
let state = "Energieniveaus"
let niveauButton;
let uberButton;
let deleteButton;


// ----------- P5 SETUP  -----------
function setup(){

    createCanvas(500,500);
    //!! id's (first number) need to be 0,1,2 etc
    niveaus.push(new Energieniveau(0, 300))
    niveaus.push(new Energieniveau(1, 150))
    niveaus.push(new Energieniveau(2, 70))
    niveaus.push(new Energieniveau(3, 30))
    niveaus.push(new Energieniveau(4, 10))


    // Buttons
    niveauButton = createButton("Energieniveaus festlegen")
    niveauButton.position(200,30)
    niveauButton.mousePressed( function() {state = "Energieniveaus"})
    uberButton = createButton("Übergänge festlegen")
    uberButton.position(200,60)
    uberButton.mousePressed( function() {state = "Uebergaenge"})
    deleteButton = createButton("Übergänge Löschen")
    deleteButton.position(200,90)
    deleteButton.mousePressed( function() {uebergaenge = []})
}

// ----------- MOUSE FUNCTIONS -----------
function mousePressed() {

    if (state == "Energieniveaus") {
        for ( let niveau of niveaus ){
            niveau.pressed()
        }
    } else if ( state == "Uebergaenge" && mouseX < 150) {
        uebergaenge.push( new Uebergang(mouseX, mouseY))
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
    } else if ( state == "Uebergaenge" && mouseX < 150) {
        uebergaenge.push( new Uebergang(mouseX, mouseY))
    }
}




// ----------- P5 DRAW LOOP  -----------

function draw(){
    background("#fafdf9")

    for ( let niveau of niveaus ){
        niveau.update()
        niveau.checkOver()
        niveau.show()
    }

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