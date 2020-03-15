//modal
var furnitureModal = document.getElementById("furnitureModal");
var projectModal = document.getElementById("projectModal");

//modalgombok
var furnitureModalButton = document.getElementById("furnitureModalButton");
var projectModalButton = document.getElementById("projectModalButton");

//bezárásgomb
var closefurnitureModal = document.getElementById("closefurnitureModal");
var closeProjectModal = document.getElementById("closeProjectModal");

//megjelenítés
furnitureModalButton.onclick = function () {
	furnitureModal.style.display = "block";
}

projectModalButton.onclick = function () {
	projectModal.style.display = "block";
}

//bezárás
closefurnitureModal.onclick = function () {
	furnitureModal.style.display = "none";
}
closeProjectModal.onclick = function () {
	projectModal.style.display = "none";
}

//kivülre kattintva bezárás
window.onclick = function (event) {
	if (event.target == furnitureModal) {
		furnitureModal.style.display = "none";
	} else if (event.target == projectModal) {
		projectModal.style.display = "none";
	}
}

