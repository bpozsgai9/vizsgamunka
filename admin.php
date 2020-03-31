<?php 
session_start();
include('forms.php');

class Admin{

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

	public function listData(){

		$sql = "SELECT user_id, user_email, user_name, user_permission, user_status FROM users ORDER BY user_id ASC";

		$result = $this->conn->query($sql);
		$sorszam = 0;
		//tábla teteje
		echo "<table id='table_id'>";
		  echo "<tr>";
			echo "<th>SORSZÁM</th>";
		    echo "<th>EMAIL</th>";
		    echo "<th>FELHASZNÁLÓNÉV</th>";
		    echo "<th>JOGOSULTSÁG</th>";
		    echo "<th>STÁTUSZ (BANN)</th>";
		  echo "</tr>";

		//adatok
		if ($result->num_rows > 0) {
    		while($row = $result->fetch_assoc()) {
				$sorszam++;
    			echo "<tr>";
    				//módosít
    				echo "<form action='admin.php' method='POST'>";
					echo "<td style='color: white; font-weight: bold'>". $sorszam . "</td>";
    				echo "<td><input type='text' name='update_email' value='" . $row['user_email'] . "'></td>";
    				echo "<td><input type='text' name='update_name' value='" . $row['user_name'] . "'></td>";
					//select
					echo "<td><select name='update_permission'>";
					if ($row['user_permission'] == 'user') {
						echo "<option value='user'>User</option>";
						echo "<option value='admin'>Admin</option>";
					}
					else if ($row['user_permission'] == 'admin') {
						echo "<option value='admin'>Admin</option>";
						echo "<option value='user'>User</option>";
					}
					echo "</select></td>";
					//státusz
					echo "<td><select name='update_status'>";
					if ($row['user_status'] == 0) {
						echo "<option value='0'>Aktív</option>";
						echo "<option value='1'>Bann</option>";
					}
					else if ($row['user_status'] == 1) {
						echo "<option value='1'>Bann</option>";
						echo "<option value='0'>Aktív</option>";
					}
					echo "</select></td>";
					echo "<input type='hidden' name='update_id' value='" . $row['user_id'] ."'>";
    				echo "<td><input type='submit' name='update' value='Módosít' style='background-color: orange';></td>";
    				echo "</form>";
    				//törlés
    				echo "<form action='admin.php' method='POST'>";
    				echo "<input type='hidden' name='delete_id' value='" . $row['user_id'] ."'>";
    				echo "<td><input type='submit' name='delete' value='Törlés'></td>";
    				echo "</form>";
  				echo "</tr>";
    		}
		} else {
    		echo "Nincs adat";
		}
		echo "</table>";
		//adatok vége
	}

	public function delete($user_id){

		$sql = "DELETE FROM users WHERE user_id =" . $user_id;

		if ($this->conn->query($sql) === TRUE) {
		    echo "Sikeres törlés!";
		} else {
		    echo "Hiba: " . $this->conn->error;
		}
	}

	public function update($user_id, $user_email, $user_name, $user_permission, $user_status){

		$sql = "UPDATE users SET 
		user_email = '" . $user_email . "', 
		user_name = '" . $user_name . "', 
		user_permission = '" . $user_permission . "', 
		user_status = '" . $user_status . "'
		WHERE user_id =" . $user_id;

		if ($this->conn->query($sql) === TRUE) {
		    echo "Sikeres frissítés!";
		} else {
		    echo "Hiba: " . $this->conn->error;
		}
	}

	public function insert($user_email, $user_name, $user_pwd, $user_permission, $user_status){

		$sql = "INSERT INTO users (user_email, user_name, user_pwd, user_permission, user_status)
		VALUES ('" . $user_email . "', '" . $user_name . "', '" . $user_pwd . "', '" . $user_permission . "', '" . $user_status . "')";

		if ($this->conn->query($sql) === TRUE) {
		    echo "Új felhasználó sikeresen létrehozva!";
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
	<link rel="stylesheet" type="text/css" href="admin.css">
	<link href="https://fonts.googleapis.com/css?family=Space+Mono&display=swap" rel="stylesheet">
</head>
<body>
	<div class="header">
		<?php 
			//print_r($_SESSION);
			$admin = new Admin(); 
			$forms = new Forms();
			$forms->logout_form();
		?>
		<h1>Admin oldal (felhasználók kezelése)</h1>
		</p>
	</div>
	<form action="admin.php" method="POST">
		<h2>Új felhasználó felvétele:</h2>
		<table>
			<tr>
				<th>Email:</th>
				<th>Felhasználónév:</th>
				<th>Jelszó:</th>
				<th>Jogosultság:</th>
				<th>Státusz:</th>
			</tr>
			<tr>
				<th><input type="text" name="insert_email"></th>
				<th><input type="text" name="insert_name"></th>
				<th><input type="text" name="insert_pwd"></th>
				<th>
				<select name="insert_permission">
				<option value='user'>User</option>
				<option value="admin">Admin</option>
				</select>
				</th>
				<th>
				<select name="insert_status">
				<option value='0'>Aktív</option>
				<option value="1">Bann</option>
				</select>
				</th>
				<th><input type="submit" name="insert" value="Felvétel" style='background-color: lime';></th>
			</tr>
		</table>
	</form>
	<?php

		if (isset($_POST['insert'])) {
			$admin->insert($_POST['insert_email'], $_POST['insert_name'], $_POST['insert_pwd'], $_POST['insert_permission'], $_POST['insert_status']);
		}
	?>
	<h2>További felhasználók:</h2>
	<?php
		$admin->listData();
		if (isset($_POST['delete'])) {
			$admin->delete($_POST['delete_id']);
		}
		if (isset($_POST['update'])) {
			$admin->update($_POST['update_id'], $_POST['update_email'], $_POST['update_name'], $_POST['update_permission'], $_POST['update_status']);
		}
	 ?>
</body>
</html>