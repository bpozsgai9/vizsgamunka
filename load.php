<?php 
include('phpModul.php');
session_start();

if (isset($_POST['projectBetoltesButton'])){
	//végigmegy a visszakapott értéken
	$phpModul = new PhpModul();

	$loadId = $_POST["projectBetoltesId"];
	//id és projectname van benne
	$project = $phpModul->loadProjectName($loadId);
	//id és furniture name van benne, kieg
	$furnitures = $phpModul->loadFurnitures($loadId);
	$furnituresId = [];
	foreach ($furnitures as $fId){
		$furnituresId.array_push($fId['id']);
	}
	//$positions = $phpModul->loadPositions(/*furniture_id*/ );
	


}

/*
if (isset($_POST["action"]) and $_POST["action"] == "load") {
	
}
*/

 ?>

