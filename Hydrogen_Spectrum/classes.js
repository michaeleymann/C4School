// Energieniveaus
class Energieniveau { 
    constructor(id, ypos) {
      this.id = id,
      this.y = ypos,
      this.x = niveausXpos,
      this.n = id, 
      this.width = niveausSize, // CHANGE MOUSE/TOUCH FUNCTIONS WHEN CHANGING THIS!
      this.thickness = 2,
      this.color = col[this.id],
      this.highlightColor = colHighlight,
      this.draggedColor = colDragged,
      this.dragged = false,
      this.mOver = false,
      this.grabOffset = 5,
      this.eV = mapEnergy(this.y, true)
    }

    update() {

        // Linie mit der Maus bewegen
        if (this.dragged) {
          this.y = mouseY
          this.eV = mapEnergy(this.y, true)
        
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
        // And update niveau.n according to the position 

        let otherPositions = [];
        for (let n = 0; n < niveaus.length; n++) {

            if ( n != this.id){
                otherPositions.push(niveaus[n].y)
            }
        }
        for ( let pos of otherPositions){
            // 3 is the margin for not stacking niveaus on top of each other
            if ( this.y > (pos-3) && this.y < (pos+3) ){
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

        
        // Write eV Numver to each Energieniveau
        push();
        fill(colLine);
        noStroke();
        textSize(10)
        //textFont("monospace")
        textAlign(RIGHT)
        text("n = "+ (this.n+1) + " ("+this.eV.toFixed(1) + " eV)", this.x - 10, this.y + 3)
        pop()
        
    }
}

// Pfeile für die Übergänge zwischen Niveaus
class Uebergang { 
    constructor(startX, startY) {
      this.startX = startX,
      this.startY = startY,
      this.endX = mouseX,
      this.endY = mouseY,
      this.color = colArrow,
      this.thickness = 1,
      this.dragged = true,
      this.deleted = false,
      this.eV = mapEnergy(abs(this.startY-this.endY), false),
      this.wavelength = 1239.8/(this.eV+0.00000001)
      this.bande = new Bande (spectrumXpos+10, spectrumYpos + spectrumDistance, this.wavelength, 400, colHighlight, false)
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
                this.endLocked = niveau.id;
            } 
        }
    }

    update() {
        if ( this.dragged ){
            this.endX = this.startX;
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


        this.eV = mapEnergy(abs(this.startY-this.endY), false);
        this.wavelength = 1239.8/(this.eV+0.00000001);
        this.bande.x = map(
            this.bande.xOrigin + this.wavelength, 
            this.bande.xOrigin + 100, 
            this.bande.xOrigin + 2000, 
            this.bande.xOrigin, this.bande.xOrigin+this.bande.width);
    }

    show(){
        if (!this.dragged && !this.deleted) {
            for ( let niveau of niveaus ) {
                let y = Math.max(this.endY, this.startY)
                if (y == niveau.y) {
                    this.color = col[niveau.n]
                    this.bande.color = col[niveau.n]
                }
            }

        }
        strokeWeight(this.thickness)
        stroke(this.color)
        fill(this.color)
        line(this.startX, this.startY, this.endX, this.endY)
        if ( this.startY < this.endY) {
            triangle(this.endX, this.endY-1, this.endX-3, this.endY-8, this.endX+3, this.endY-8)
        } else {
            triangle(this.startX, this.startY-1, this.startX-3, this.startY-8, this.startX+3, this.startY-8)
        }

    this.bande.show()
    }


}

// Banden für das Wasserstoffatom, berechnet aus den Übergängen
class Bande {
    constructor(xOrigin, yOrigin, wavelength, width, color, isFixed) {
        this.xOrigin = xOrigin,
        this.x = map(xOrigin + wavelength, xOrigin+100, xOrigin+2000, xOrigin, xOrigin+width),
        this.y = yOrigin,
        this.length = 20,
        this.width = width,
        this.weight = bandeThickness,
        this.color = color,
        this.fixed = isFixed
    
    }

    show() {
        strokeWeight(this.weight)
        stroke(this.color)
        line(this.x, this.y, this.x, this.y + this.length)
    }
   
}   