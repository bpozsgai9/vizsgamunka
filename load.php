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
    $furnitures = (array)($phpModul->loadFurnitures($projectId));
    $projectName = $phpModul->loadProjectName($projectId);

    for ($i = 0; $i < sizeof($furnitures); $i++){

        $positions = (array)($phpModul->loadPositions( $furnitures[$i]['furniture_id'] ));
        $warehouse = (array)($phpModul->loadWareHouseByName($furnitures[$i]['furniture_name']));
        array_push($furnitures[$i],
            [
                "x" => $positions["x"],
                "y" => $positions["y"],
                "z" => $positions["z"],
                "xr" => $positions["xr"],
                "yr" => $positions["yr"],
                "zr" => $positions["zr"],
                "scale" => $positions["scale"],
                "furniture_path" => $warehouse['furniture_path'],
                "furniture_material_path" => $warehouse['furniture_material_path'],
                "project_name" => $projectName
            ]
        );
    }
    $backJson = json_encode($furnitures);
    print_r($backJson);
}

?>

