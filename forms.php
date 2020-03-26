<?php 
class Forms{
	
	public function login_form(){
		
		?>
		<!DOCTYPE html>
		<html>
		<head>
			<title></title>
			<link href="https://fonts.googleapis.com/css?family=Space+Mono&display=swap" rel="stylesheet">
			<link rel="stylesheet" type="text/css" href="login.css">
		</head>
		<body>
			<div class="loginPanel">
				<div class="loginHeading">
					<label>truebox</label>
				</div>
				<form method="POST">
					<div class="loginInput">
						<input type="text" name="input_username" placeholder="felhasználónév">
						<div class="vonal"></div>
						<input type="password" name="input_password" placeholder="jelszó">
					</div>
					<div class="loginSubmit">
						<input type="hidden" name="action" value="cmd_login">
						<input type="submit" value="bejelentkezés">
					</div>
					<div class="signinA">
						<a href="registration.php">regisztráció</a>
					</div>
				</form>
			</div>
			<!-- <div class="container"></div>
			<script type="module" src="forms.js"></script> -->
		</body>
		</html>
		<?php		
	}

	public function logout_form(){
		echo "<form method='POST'>";
			echo "<input type='hidden' name='action' value='cmd_logout'>";
			echo "<input type='submit' name='logout_submit' value='Kijelentkezés'>";
		echo "</form>";
		if (isset($_POST['logout_submit'])) {
			session_destroy();
			header("Location: login.php");
		}
	}
}