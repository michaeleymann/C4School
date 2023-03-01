// ----------- SIZE & LAYOUT SETUP  -----------
let canvasWidth = 1200;
let canvasHeight = 700;
let ps = {x:350,y:12, size:25}; // Periodic Table Position
let lv = {x:50,y:700, spacing:33}; // Energie Levels Position (y: bottom)
let at = {x:625,y:570, size: 15, electron_size:7, nucleus_size:10};
let ds = {x:900,y:28,max:250}; // Beschreibender Text
let cn = {x:520,y:370, size:30} // Elektronenkonfigutation
let bt = {x: 970, y: 150, size: 30} // BUTTONS

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