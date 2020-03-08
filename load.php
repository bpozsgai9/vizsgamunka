<?php 
include('phpModul.php');
session_start();
$phpModul = new PhpModul();

if (isset($_POST["loaderAction"]) and $_POST["loaderAction"] == "load") {

    $furniture_pic_id = $_POST['loaderId'];
    $backArray = $phpModul->loadWareHouse($furniture_pic_id);
    $backJson = json_encode($backArray);
    print_r($backJson);
}

if (isset($_POST["projectLoaderAction"]) and $_POST["projectLoaderAction"] == "projectload") {

    $projectId = $_POST['projektLoaderId'];
    $projectName = $phpModul->loadProjectName($projectId);
    $furnitureIndexAndName = $phpModul->loadFurnitures($projectId);
    $furnitureIndexAndPositions = [];
    //pozíciók kilistázása
    
    var_dump($furnitureIndexAndName);

}

?>

