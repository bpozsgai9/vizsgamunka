var furnitureModal = document.getElementById("furnitureModal");
var projectModal = document.getElementById("projectModal");

////////////////////////////////////////////////////////////////////////
var furnitureModalButton = document.getElementById("furnitureModalButton");
var projectModalButton = document.getElementById("projectModalButton");

////////////////////////////////////////////////////////////////////////
var closefurnitureModal = document.getElementById("closefurnitureModal");
var closeProjectModal = document.getElementById("closeProjectModal");


////////////////////////////////////////////////////////////////////////
furnitureModalButton.onclick = function () {
	furnitureModal.style.display = "block";
}

projectModalButton.onclick = function () {
	projectModal.style.display = "block";
}

////////////////////////////////////////////////////////////////////////
// When the user clicks on <span> (x), close the modal
closefurnitureModal.onclick = function () {
	furnitureModal.style.display = "none";
}
closeProjectModal.onclick = function () {
	projectModal.style.display = "none";
}

////////////////////////////////////////////////////////////////////////
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == furnitureModal) {
		furnitureModal.style.display = "none";
	} else if (event.target == projectModal) {
		projectModal.style.display = "none";
	}
}

