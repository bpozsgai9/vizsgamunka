<?php 
session_start();
include('phpModul.php');
include('forms.php');
//sütike
/*setcookie("login_state", $_SESSION["login_state"], time() + (86400), "/");
setcookie("user_permission", $_SESSION["user_permission"], time() + (86400), "/");
setcookie("user_name", $_SESSION["user_name"], time() + (86400), "/");*/
//print_r($_SESSION);

$phpModul = new PhpModul();
?>

<!DOCTYPE html>
<html lang="hu">
	<head>
		<title>TrueBox</title>
		<!--ha a kódolás nem utf-8, akkor a js keycode event nem fog működni-->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"> <!--mobilhoz-->
		<link href="https://fonts.googleapis.com/css?family=Space+Mono&display=swap" rel="stylesheet"> <!--font-->
		<link type="text/css" rel="stylesheet" href="main.css">
		<link rel="stylesheet" type="text/css" href="dragable.css">
		<link rel="stylesheet" type="text/css" href="modal.css">
	</head>
	<body>
		<div id="mydiv">
  		<div id="mydivheader">[+]</div>
			<?php
				echo "<div style='color: cyan'>Szia " . $_SESSION['user_name'] . "!</div>";
			?>
			<div style='color: cyan' id='projektNevHelye'></div>
			<br />
			<button id="infoId">Info</button><br />
			<button id="furnitureModalButton">Bútorválasztó</button><br />
			<button id="projectModalButton">Projektkezelő</button><br />
			<button id="exportButton">Export</button><br />
			<button id="mentesButton">Mentés</button><br />
			<div id="kiiratashelye"></div>		
			<?php
				//Kijelentkezés -> login.php-ban van az osztály
				$forms = new Forms(); 
				$forms->logout_form();
			?>
		</div>

		
		<!-- modal -->
		<div id="projectModal" class="modal"> 
			<!-- modal tartalom -->
			<div class="modal-content">
				<div class="modal-header">
					<span class="close" id="closeProjectModal">&times;</span>
					<h1>Projektkezelő</h1>
				</div>
				<div class="modal-body">
					<div class="ujProjekt">
				    	<h2>Új Projekt:</h2>
						<div class="vonal"></div>
						<br />
							<input type="text" id="projectNameInput" placeholder="Projekt Név">
							<button id="projectNameButton">Létrehoz</button>
						<h2>Eddigi Projektek:</h2>
						<div class="vonal"></div>
						<div id='projektLista'>
							<?php
								//listázás
								$phpModul->listProjects($phpModul->getCurrentUserId($_SESSION['user_name']));
								//törlés
								if (isset($_POST['deleteProject'])) {
										$phpModul->deleteProject($_POST['deleteProjectId']);
								}	
							?>
						</div>
					</div>
			    </div>
			    <div class="modal-footer">
					Jelöld ki amelyiket be szeretnéd tölteni
					<button id="projectBetoltesButton">Betöltés</button>
			    </div>
			</div>
		</div>

				<!-- modal -->
		<div id="furnitureModal" class="modal">
			<!-- modal tartalom -->
			<div class="modal-content">
				<div class="modal-header">
					<span class="close" id="closefurnitureModal">&times;</span>
					<h2>Bútorválasztó</h2>
				</div>
				<div class="modal-body">
					<div id="kattinthatoKepek">
					<?php
						$phpModul->listIcons(); 
					?>
					</div>
				</div>
				<div class="modal-footer">
					Jelöld ki amelyik tetszik
					<button id="loaderButton">Hozzáad</button>
				</div>
			</div>
		</div>
		<div id="canvasDiv"></div>
		<script src="jquery.min.js"></script>
		<script type="text/javascript" src="dragable.js"></script>
		<script type="text/javascript" src="modal.js"></script>
		<script type="module" src="modul.js"></script>
	</body>
</html>
