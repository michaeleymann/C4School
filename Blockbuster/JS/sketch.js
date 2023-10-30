

function setup() {
  // Create a canvas
  createCanvas(canvasWidth, canvasHeight);

  // Set the background color
  background(colBG);

  // Set the stroke weight and color
  strokeWeight(2);
  stroke(colBG);

  // Calculate the horizontal and vertical spacing between hexagons
  const horizontalSpacing = hexagonSize * sqrt(3);
  const verticalSpacing = hexagonSize *1.5;

  // Loop to create the grid of hexagons
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      // Calculate the position of the hexagon
      const x = xPos + hexagonSize + i * horizontalSpacing + (j % 2) * horizontalSpacing / 2;
      const y = yPos + hexagonSize + j * verticalSpacing;

      hexagons.push(new Hexagon(x,y))
      // Create a new hexagon object

    }
  }


}

// Run the setup function when the page loads
function draw(){
    for ( let h of hexagons ) {
        h.display()
    }
}
