let navOpen = false;
// Set the width of the sidebar and the left margin of the page content to 15rem
function openNav() {
    document.getElementById("sidebar_1").style.width = "15rem";
    document.getElementById("content_1").style.marginLeft = "15rem";
    document.getElementById("sidebar_button_1").innerHTML = "✖"
    navOpen = true;

  }
  
// set same to 0px
function closeNav() {
  console.log("closed")
  document.getElementById("sidebar_1").style.width = "2rem";
  document.getElementById("content_1").style.marginLeft = "2rem";
  document.getElementById("sidebar_button_1").innerHTML = "☰"
  navOpen = false;
} 

function toggleNav() {
  if (navOpen) {
    closeNav();
  } else {
    openNav();
  }
}