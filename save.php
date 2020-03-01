<?php
include('phpModul.php');
session_start();

if (isset($_POST["action"]) and $_POST["action"] == "save"){

	$phpModul = new PhpModul();

	//bútorok mentése a projektbe
	$furnituresData = json_decode($_POST["furnituresJsonData"]);
	for ($i= 0; $i < sizeof($furnituresData); $i++) { 
		$furnituresData[$i] = (array) $furnituresData[$i];
	}
	
	//print_r($furnituresData);

	//adatbázisba mentés
	foreach ($furnituresData as $furniture) {

		$phpModul->saveFurnitures($furniture['furniture_name'], $phpModul->getCurrentProjectId($_SESSION['current_project_name']));
		$phpModul->savePositions($furniture['x'],
								 $furniture['y'],
								 $furniture['z'],
								 $furniture['xr'],
								 $furniture['yr'],
								 $furniture['zr'],
								 $furniture['scale'],
								 $phpModul->getFurnitureId($furniture['furniture_name']));
	}
}
	
?>