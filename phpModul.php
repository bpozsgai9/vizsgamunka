<?php 

class PhpModul{

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

	public function getCurrentUserId($user_name){

		$sql = "SELECT user_id FROM users WHERE user_name ='" . $user_name . "'";
		$result = $this->conn->query($sql);

		if ($result->num_rows > 0) {
		    while($row = $result->fetch_assoc()) {
		        return $row["user_id"];
		    }
		} else {
		    return "0 results";
		}
	}

	public function getCurrentProjectId($projectName){

		$sql = "SELECT id FROM project WHERE project_name ='" . $projectName . "'";
		$result = $this->conn->query($sql);

		if ($result->num_rows > 0) {
		    while($row = $result->fetch_assoc()) {
		        return $row["id"];
		    }
		} else {
		    return "0 results";
		}

	}

	public function getFurnitureId($furniture_name, $project_id){
		
		$sql = "SELECT id FROM furniture WHERE furniture_name ='" . $furniture_name . "' 
		AND project_id = $project_id";

		$result = $this->conn->query($sql);

		if ($result->num_rows > 0) {
		    while($row = $result->fetch_assoc()) {
		        return $row["id"];
		    }
		} else {
		    return "0 results";
		}

	}


	public function saveProject($project_name, $user_id){

		//a $user id legyen a getCurrentUserId() függvény
		$sql = "INSERT INTO project (project_name, user_id) VALUES ('" . $project_name . "' , " . $user_id .  ")";

		if ($this->conn->query($sql) === TRUE) {
		    echo "";
		} else {
		    echo "SQL Hiba: " . $sql . "<br>" . $this->conn->error;
		}
	}

	public function saveFurnitures($name, $project_id){

		$sql = "INSERT INTO furniture (furniture_name, project_id)
		VALUES ('" . $name . "', '" . $project_id . "')";

		if ($this->conn->query($sql) === TRUE) {
			echo "Bútor mentve!";
		} else {
			echo "SQL Hiba: " . $sql . "<br>" . $this->conn->error;
		}
	}

	public function savePositions($x, $y, $z, $xr, $yr, $zr, $scale, $furniture_id){

		$sql = "INSERT INTO positions (x, y, z, xr, yr, zr, scale, furniture_id) 
		VALUES (" . $x . ", " .
					$y . ", " .
					$z . ", " .
					$xr . ", " .
					$yr . ", " .
					$zr . ", " .				
					$scale . ", " .
					$furniture_id . ")";
				
		if ($this->conn->query($sql) === TRUE) {
			echo "Bútor mentve";
		} else {
				echo "SQL Hiba: " . $sql . "<br>" . $this->conn->error;
		}
			
	}

	public function listIcons(){
		$sql = "SELECT furniture_name, furniture_pic_id, furniture_img FROM warehouse";
		$result = $this->conn->query($sql);

		//tábla teteje
		echo "<table>";

		if ($result->num_rows > 0) {
	    	while($row = $result->fetch_assoc()) {
				echo "<div style='display: inline-block; margin: 5px;'>";
					echo "<img src=" . $row['furniture_img'] . ">";
					echo "<input type='hidden' name='furniture_pic_id' value='" . $row['furniture_pic_id'] . "'>";
	    			echo "<div style='text-align: center;'>";
					echo "<label>" . $row['furniture_name'] ."</label>";
					echo "";  
	    			echo "</div>";
	  			echo "</div>";
	    		}
			} else {
		    	echo "Nincs adat";
			}
		echo "</table>";
	}

public function listProjects($user_id){

		//a $user id legyen a getCurrentUserId() függvény
		$sql = "SELECT id, project_name, datum FROM project WHERE user_id =" . $user_id;
		$result = $this->conn->query($sql);

		if ($result->num_rows > 0) {
	    	while($row = $result->fetch_assoc()) {
				echo "<div style='display: inline-block; margin: 5px;' class='letter'>";
					echo "<div style='text-align: center;'>";
					echo "<label style='font-size: 200%; color: red;'>" . strtoupper(($row['project_name'])[0]) ."</label><br />";
					echo "<label>" . $row['project_name'] ."</label><br />";
					echo "<label>" . $row['datum'] ."</label>";
					echo "</div>";
				echo "</div>";
				echo "<input type='hidden' name='project_id' value='" . $row['id'] . "'>";  
	    		}
			} else {
		    	echo "Nincs adat";
			}
		echo "</table>";
		//adatok vége
	}

	public function deleteProject($project_id){

		//fordított sorrend, törölni mindent
		$sql = "DELETE FROM project WHERE id =" . $project_id;

		if ($this->conn->query($sql) === TRUE) {
		    echo "Sikeres törlés!";
		} else {
		    echo "Hiba: " . $this->conn->error;
		}
	}

	//INNENTŐL FOLYTAT////////////////////////////////////////////////////////////////////////////////

	public function loadProjectName($id){

		$sql = "SELECT project_name FROM project WHERE id =" . $id;
		$result = $this->conn->query($sql);

		if ($result->num_rows > 0) {
		    while($row = $result->fetch_assoc()) {
		        return $row["project_name"];
		    }
		} else {
		    return "0 results";
		}
	}

	public function loadFurnitures($project_id){

		$sql = "SELECT id, furniture_name FROM furniture WHERE project_id =" . $project_id;
		$result = $this->conn->query($sql);

		$bigArray = [];
		if ($result->num_rows > 0) {
		    while($row = $result->fetch_assoc()) {
				$array = [ "furniture_id" => $row["id"], "furniture_name" => $row["furniture_name"] ];
				array_push($bigArray, $array);
			}
			return $bigArray;
		} else {
		    return "0 results";
		}

	}

	//itt tartok
	public function loadPositions($furniture_id){

		$sql = "SELECT x, y, z, xr, yr, zr, scale FROM positions WHERE furniture_id =" . $furniture_id;
		$result = $this->conn->query($sql);

		if ($result->num_rows > 0) {
		    while($row = $result->fetch_assoc()) {
				$array = [
						  "x" => $row["x"], 
						  "y" => $row["y"], 
						  "z" => $row["z"], 
						  "xr" => $row["xr"], 
						  "yr" => $row["yr"], 
						  "zr" => $row["zr"], 
						  "scale" => $row["scale"]
						];
			}
			return $array;
		} else {
		    return "0 results";
		}
	}

	public function loadWareHouse($furniture_pic_id){

		$sql = "SELECT furniture_name, furniture_path, furniture_material_path 
				FROM warehouse 
				WHERE furniture_pic_id = '" . $furniture_pic_id . "'";
		
		$result = $this->conn->query($sql);
		if ($result->num_rows > 0) {
		    while($row = $result->fetch_assoc()) {
				$array = [ $row["furniture_name"], $row["furniture_path"], $row["furniture_material_path"] ];
		        return $array;
		    }
		} else {
		    return "0 results";
		}
	}

	public function loadWareHouseByName($furniture_name){

		$sql = "SELECT furniture_path, furniture_material_path 
				FROM warehouse 
				WHERE furniture_name = '" . $furniture_name . "'";
		
		$result = $this->conn->query($sql);
		if ($result->num_rows > 0) {
		    while($row = $result->fetch_assoc()) {
				$array = [ 
					"furniture_path" => $row["furniture_path"], 
					"furniture_material_path" => $row["furniture_material_path"] 
				];
		        return $array;
		    }
		} else {
		    return "0 results";
		}
	}

}

 ?>