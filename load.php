<?php 
include('phpModul.php');
session_start();

if (isset($_POST["action"]) and $_POST["action"] == "load") {
	
	//végigmegy a visszakapott értéken
	$phpModul = new PhpModul();

	$loadId = $_POST["loadId"];
	$project = $phpModul->loadProjectName($loadId);
	print_r($project);
}


 ?>

