let niveaus = []

function setup(){
    createCanvas(500,500);

    niveaus.push(new Energieniveau(100))
    niveaus.push(new Energieniveau(50))
}

function mousePressed() {
    for ( let niveau of niveaus ){
        niveau.pressed()
    }
}

function mouseReleased() {
    for ( let niveau of niveaus ){
        niveau.released()
    }
}

function draw(){
    background(255)

    for ( let niveau of niveaus ){
        niveau.update()
        niveau.checkOver()
        niveau.show()
    }
    
}