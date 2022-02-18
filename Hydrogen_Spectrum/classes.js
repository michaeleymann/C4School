// Energieniveaus
class Energieniveau { 
    constructor(id, ypos) {
      this.id = id,
      this.y = ypos,
      this.x = 0,
      this.width = 100,
      this.thickness = 2,
      this.color = "#000000",
      this.highlightColor = "#cc0000",
      this.draggedColor = "#ff0000"
      this.dragged = false,
      this.mOver = false,
      this.grabOffset = 5
    }

    update() {

        // Linie mit der Maus bewegen
        if (this.dragged) {
          this.y = mouseY
        
          // Übergangspfeile mit Niveaus bewegen, wenn diese verschoben werden
          this.updateUeberaenge();
        }
    }

    updateUeberaenge() {

        for ( let uebergang of uebergaenge ) {
            if ( uebergang.endLocked == this.id) {
                uebergang.endY = this.y
            } else if ( uebergang.startLocked == this.id ) {
                uebergang.startY = this.y
            }
        }
    }
    

    // Feststellen, ob Maus auf der Linie ist
    checkOver() {
        if ( 
            mouseX > this.x && 
            mouseX < ( this.x + this.width ) &&
            mouseY > this.y - this.grabOffset &&
            mouseY < this.y + this.grabOffset 
            ) {
            
            this.mOver = true;
        } else {
            this.mOver = false;
        }
    }
    
    pressed() {
        
        // Save last position before dragging so it can be reset
        // in case it gets stacked on an other niveau
        this.lastpos = this.y
        
        // Check if mouse is over line, set dragged status
        if ( this.mOver) {
            this.dragged = true;
        }
    }

    released() {
        
        // Prevent stacking niveaus on top of each other

        let positions = [];
        for (let n = 0; n < niveaus.length; n++) {
            if ( n != this.id){
                positions.push(niveaus[n].y)
            }
        }
        for ( let pos of positions){
            // 5 is the margin for not stacking niveaus on top of each other
            if ( this.y > (pos-5) && this.y < (pos+5) ){
                this.y = this.lastpos
                this.updateUeberaenge()
            }
        }        
       
        // Drop niveau at given place
        this.dragged = false;
    }

    show() {
        strokeWeight(this.thickness)
        if (this.dragged) {
            stroke(this.draggedColor)
            line(this.x, this.y, this.x + this.width, this.y)
        } else if (this.mOver) {
            stroke(this.highlightColor)
            line(this.x, this.y, this.x + this.width, this.y)
        } else {
            stroke(this.color)
            line(this.x, this.y, this.x + this.width, this.y)
        }
    }
}

// Pfeile für die Übergänge zwischen Niveaus
class Uebergang { 
    constructor(startX, startY) {
      this.startX = startX,
      this.startY = startY,
      this.endX = mouseX,
      this.endY = mouseY,
      this.color = "#0000ff"
      this.dragged = true,
      this.deleted = false
    }
    
    released() {

        this.dragged = false;
        this.endX = this.startX;

        this.deleted = true;

        // Übergänge nur fertig zeichnen, wenn sie auf einem Niveau enden
        // und Ende des Übergangs mit Niveau verknüpfen
        for ( let niveau of niveaus) {
            if ( this.endY > niveau.y-5 && this.endY < niveau.y+5 ) {
                this.deleted = false;
                this.endY = niveau.y;
                this.endLocked = niveau.id
            } 
        }
    }

    update() {
        if ( this.dragged ){
            this.endX = mouseX;
            this.endY = mouseY;

            // Übergänge nur zeichnen, wenn sie auf einem Niveau beginnen
            // und Beginn des Übergangs mit Niveau verknüpfen
            this.deleted = true;
            for ( let niveau of niveaus) {
                if ( this.startY > niveau.y-5 && this.startY < niveau.y+5 ) {
                    this.deleted = false;
                    this.startY = niveau.y;
                    this.startLocked = niveau.id;
                } 
            }
        }
    }

    show(){
        stroke(this.color)
        fill(this.color)
        line(this.startX, this.startY, this.endX, this.endY)
        if ( this.startY < this.endY) {
            triangle(this.endX, this.endY-1, this.endX-4, this.endY-10, this.endX+4, this.endY-10)
        } else {
            triangle(this.startX, this.startY-1, this.startX-4, this.startY-10, this.startX+4, this.startY-10)
        }

    }
}

// Banden für das Wasserstoffatom, berechnet aus den Übergängen
class Bande {
    constructor() {

    }

    // Methoden
}