<?php 

class Registration{

	private $servername = "localhost";
	private $username = "root";
	private $password = "";
	private $dbname = "trueboxdb";
	private $conn = NULL;

	public function __construct(){
		
		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		if ($this->conn->connect_error) {
    		die("Kapcsolati hiba: " . $conn->connect_error);
		} 
	}

	public function __destruct(){
		$this->conn->close();
	}

	public function insert($user_email, $user_name, $user_pwd){

		$sql = "INSERT INTO users (user_email, user_name, user_pwd, user_permission, user_status)
		VALUES ('" . $user_email . "', '" . $user_name . "', '" . $user_pwd . "', 'user', 'login_ok')";

		if ($this->conn->query($sql) === TRUE) {
		    echo "Új felhasználó sikeresen létrehozva!";
		    header("Location: login.php");
		} else {
		    echo "Hiba: " . $sql . "<br>" . $this->conn->error;
		}
	}

}



 ?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="registration.css">
</head>
<body>
	<form action="registration.php" method="POST">
		<div class="signinPanel">
			<div class="signnHeading">
				<label>regisztráció</label>
			</div>
			<div class="signinInput">
				<input type="text" name="insert_email" placeholder="email">
				<div class="vonal"></div>
				<input type="text" name="insert_name" placeholder="felhasználónév">
				<div class="vonal"></div>
				<input type="password" name="insert_pwd" placeholder="jelszó">
			</div>
			<div class="signinSubmit">
				<input type="submit" name="insert" value="Fiókom létrehozása">
			</div>
			<div class="visszaA">
				<a href="login.php">Vissza</a>
			</div>
		</div>
	</form>

	<?php
		$registration = new Registration();
		if (isset($_POST['insert'])) {
			$registration->insert($_POST['insert_email'], $_POST['insert_name'], $_POST['insert_pwd']);
		}
	?>

</body>
</html>