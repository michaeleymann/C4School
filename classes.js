// Energieniveaus
class Energieniveau { 
    constructor(ypos) {
      this.y = ypos,
      this.x = 0,
      this.width = 100,
      this.thickness = 2,
      this.color = "#000000", // more colors for states!
      this.highlightColor = "#cc0000",
      this.draggedColor = "#ff0000"
      this.dragged = false,
      this.mOver = false,
      this.grabOffset = 5
    }

    update() {
        if (this.dragged) {
          this.y = mouseY
        }
    }

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
    
    pressed() { // ACTIVATE THIS ON MOUSEPRESSED EVENT
        if ( 
            mouseX > this.x && 
            mouseX < ( this.x + this.width ) &&
            mouseY > this.y - this.grabOffset &&
            mouseY < this.y + this.grabOffset 
            ) {
            
            this.dragged = true;
        }

    }

    released() {
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
    constructor() {
      this.pos = 0,
      this.size = 0 
    }

    // Methoden
}

// Banden für das Wasserstoffatom, berechnet aus den Übergängen
class Bande {
    constructor() {

    }

    // Methoden
}