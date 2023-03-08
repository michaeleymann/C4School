class Button {
    constructor(xPos,text,col){
        this.x = bt.x+xPos*bt.size,
        this.y = bt.y,
        this.width = bt.size,
        this.height = bt.size,
        this.text = text,
        this.color = col,
        this.mOver= false
    }
    show() {
        setLineDash([0,0])
        strokeWeight(1)
        textAlign(CENTER)
        textSize(bt.size*0.5)

        if ( this.mOver ) {
            stroke(this.color)
            fill(this.color)
            rect(this.x,this.y,this.width*0.8,this.height*0.8)
            noStroke()
            fill(colLine)
            text(this.text, this.x + bt.size * 0.4, this.y + bt.size * 0.55)

        } else {
            stroke(this.color)
            noFill()
            rect(this.x,this.y,this.width*0.8,this.height*0.8)
            noStroke()
            fill(this.color)
            text(this.text, this.x + bt.size * 0.4, this.y + bt.size * 0.55)
        }
    }
    checkOver() {
        if ( 
            mouseX > this.x * scaleFactor && 
            mouseX < ( this.x * scaleFactor + this.width * scaleFactor ) &&
            mouseY > this.y * scaleFactor &&
            mouseY < this.y * scaleFactor + this.height * scaleFactor
            ) {
            
            this.mOver = true;
        } else {
            this.mOver = false;
        }
    }
    select() {
        if ( this.mOver ){
            if (this.text == "+" && state < 118 ) {
                state = state += 1;
            } else if (this.text =="-" && state > 0 ){
                state = state -= 1
            } 
        }
      
    }
}

class Konfiguration {
    constructor(xPos,yPos,number,col,text){
        this.x = cn.x+(xPos-1)*cn.size,
        this.y = cn.y+(yPos-1),
        this.width = cn.size,
        this.height = cn.size,
        this.number = number,
        this.color = col,
        this.text = text
    }
    show() {
        if ( this.text == 0 ) {
            setLineDash([1,2])
        } else {
            setLineDash([0,0])
        }
        strokeWeight(1)
        textAlign(CENTER)
        textSize(cn.size*0.4)
        stroke(this.color)
        noFill()
        rect(this.x,this.y,this.width*0.8,this.height*0.8)
        noStroke()
        fill(this.color)
        text(this.text, this.x + cn.size * 0.4, this.y + cn.size * 0.55)
    }

    update() {
        if ( this.number <= currentE.length){
            this.text = currentE[this.number-1];

        } else {
            this.text = "0"
        }
    }
}

class Element {
    constructor(xPos,yPos,name,number,symbol,period,ek,col) {
        this.x = xPos*ps.size+ps.x,
        this.y = yPos*ps.size+ps.y,
        this.row = xPos,
        this.column = yPos,
        this.width = ps.size,
        this.height = ps.size,
        this.name = name,
        this.number = number,
        this.symbol = symbol,
        this.period = period,
        this.color = col,
        this.mOver = true,
        this.selected = false,
        //this.ek = cleanEK(ek)
        this.ek = ek
    }
    
    show() {
        setLineDash([0,0])
        strokeWeight(1)
        textAlign(CENTER)
        textSize(ps.size*0.4)

        if (this.mOver) {

            stroke(this.color)
            fill(this.color)
            rect(this.x,this.y,this.width*0.8,this.height*0.8)
            noStroke()
            fill(colLine)
            text(this.symbol, this.x + ps.size * 0.4, this.y + ps.size * 0.55)


        } else if (this.selected) {

            stroke(this.color)
            fill(this.color)
            rect(this.x,this.y,this.width*0.8,this.height*0.8)
            noStroke()
            fill(colLine)
            text(this.symbol, this.x + ps.size * 0.4, this.y + ps.size * 0.55)

        } else {

            stroke(this.color)
            noFill()
            rect(this.x,this.y,this.width*0.8,this.height*0.8)
            noStroke()
            fill(this.color)
            text(this.symbol, this.x + ps.size * 0.4, this.y + ps.size * 0.55)

        }
    }

    checkOver() {
        if ( 
            mouseX > this.x * scaleFactor && 
            mouseX < ( this.x * scaleFactor + this.width * scaleFactor ) &&
            mouseY > this.y * scaleFactor &&
            mouseY < this.y * scaleFactor + this.height * scaleFactor
            ) {
            
            this.mOver = true;
        } else {
            this.mOver = false;
        }
    }

    select() {
        if ( this.mOver) {
            this.selected = true;
            currentE = this.ek;
            state = this.number;
        }
    } 
}

class Energy_Level {
    constructor(n,yPos,col,sublev,subpos) {
        this.y = lv.y-(yPos*lv.spacing),
        this.color = col,
        this.n = n,
        this.sub_levels = sublev,
        this.sub_positions = subpos
    }
    
    show() {
        setLineDash([5, 0])
        strokeWeight(2)
        stroke(this.color)
        line(lv.x,this.y,lv.x+50,this.y) // MAIN NIVEAU
        noStroke()
        fill(this.color)
        textAlign("left")
        text(this.n,lv.x,this.y-5)
        for ( let step = 0; step < this.sub_positions.length; step++) {
            stroke(this.color)
            strokeWeight(1)
            setLineDash([2, 2])
            line(lv.x+50,this.y,lv.x+150,lv.y-this.sub_positions[step]*lv.spacing) // CONNECT
            setLineDash([2, 0])
            strokeWeight(2)
            line(lv.x+150,lv.y-this.sub_positions[step]*lv.spacing, lv.x+250, lv.y-this.sub_positions[step]*lv.spacing) // SUB NIVEAU
            noStroke()
            fill(this.color)
            textAlign("right")
            text(this.n + this.sub_levels[step],lv.x+250,lv.y-5-this.sub_positions[step]*lv.spacing)
            
        }
    }
}