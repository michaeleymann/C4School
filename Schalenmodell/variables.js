// ----------- SIZE & LAYOUT SETUP  -----------
let canvasWidth = 1200;
let canvasHeight = 700;
let ps = {x:0,y:50, size:25}; // Periodic Table Position
let lv = {x:900,y:700, spacing:33}; // Energie Levels Position (y: bottom)
let at = {x:675,y:510, size: 20, electron_size:7, nucleus_size:10}; // Schalenmodell
let ds = {x:125,y:400,max:250}; // Beschreibender Text
let bt = {x: 221, y: 520, size: 35} // BUTTONS
let cn = {x:570,y:260, size:30} // Elektronenkonfigutation
let el = {x: 628, y: 70, w: 90, h: 110, textsize:12} // Ausgewähltes Element

let txt = {heading:12,body:12}

// ---------- VARIABLES ----------
let state = 0;
let state_iterator = 0;
let atom_electrons = [];
let elements = [];
let levels = [];
let configs = [];
let currentE = [];
let buttons = [];
let scaleFactor = 1;



// ---------- COLORS ----------
let colBG = "#201d19";
//let colBG = "#FBFEF9";
let colLine = "#FBFEF9";

let col1 = "#ccddaa";
let col2 = "#ee99aa";
let col3 = "#6699cc";
let col4 = "#44bb99";
let col5 = "#aa4499";
let col6 = "#ee8866";
let col7 = "#eecc66";

let col = [col1,col2,col3,col4,col5,col6,col7]