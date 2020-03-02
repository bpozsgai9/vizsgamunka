<?php 
include('phpModul.php');
session_start();

if (isset($_POST['projectBetoltesButton'])){
	//végigmegy a visszakapott értéken
	$phpModul = new PhpModul();

	$loadId = $_POST["projectBetoltesId"];
	//id és projectname van benne
	$project = $phpModul->loadProjectName($loadId);
	print_r($project);
	//id és furniture name van benne, kieg
	$furnitures = $phpModul->loadFurnitures($loadId);
	//$positions = $phpModul->loadPositions(/*furniture_id*/ );
	


}

/*
if (isset($_POST["action"]) and $_POST["action"] == "load") {
	
}
*/

 ?>

