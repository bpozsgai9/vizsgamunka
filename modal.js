// Get the modal
var furnitureModal = document.getElementById("furnitureModal");
var projectModal = document.getElementById("projectModal");

////////////////////////////////////////////////////////////////////////
// Get the button that opens the modal
var furnitureModalButton = document.getElementById("furnitureModalButton");
var projectModalButton = document.getElementById("projectModalButton");

////////////////////////////////////////////////////////////////////////
// Get the <span> element that closes the modal
var closefurnitureModal = document.getElementById("closefurnitureModal");
var closeProjectModal = document.getElementById("closeProjectModal");


////////////////////////////////////////////////////////////////////////
// When the user clicks the button, open the modal 
furnitureModalButton.onclick = function() {
  furnitureModal.style.display = "block";
}

projectModalButton.onclick = function() {
  projectModal.style.display = "block";
}


////////////////////////////////////////////////////////////////////////
// When the user clicks on <span> (x), close the modal
closefurnitureModal.onclick = function() {
  furnitureModal.style.display = "none";
}
closeProjectModal.onclick = function() {
  projectModal.style.display = "none";
}

////////////////////////////////////////////////////////////////////////
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == furnitureModal) {
		furnitureModal.style.display = "none";
	} else if (event.target == projectModal) {
		projectModal.style.display = "none";
	}
}

