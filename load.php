<?php 
include('phpModul.php');
session_start();


if (isset($_POST["loaderAction"]) and $_POST["loaderAction"] == "load") {

    $phpModul = new PhpModul();
    $furniture_pic_id = $_POST['loaderId'];
    $backArray = $phpModul->loadWareHouse($furniture_pic_id);
    $backJson = json_encode($backArray);
    print_r($backJson);
}

?>

