<?php
session_start();
include('forms.php');

if(isset($_POST["action"]) and $_POST["action"]=="cmd_logout"){
	$_SESSION["login_state"]="login_nemok";
	unset($_SESSION["user_permission"]);
}
if(isset($_POST["action"]) and $_POST["action"]=="cmd_login"){
	if (isset($_POST["input_username"]) and
		!empty($_POST["input_username"]) and
		isset($_POST["input_password"]) and
		!empty($_POST["input_password"])
		){
		$login = new users();
		
		//user_status-ra vizsgál
		$isBanned = $login->isBan($_POST["input_username"], $_POST["input_password"]);
		//egyező név és jelszóra vizsgál
		$_SESSION["login_state"] = $login->check_login(
										$_POST["input_username"],
										$_POST["input_password"]);
		
		if($_SESSION["login_state"]=="login_ok" && $isBanned == 0){

			$_SESSION["user_permission"] = $login->check_permission($_POST["input_username"]);	
		}									
	}
}

if(isset($_SESSION["login_state"])){
	if($_SESSION["login_state"]=="login_ok"){
			
		if(isset($_SESSION["user_permission"])){
			if($_SESSION["user_permission"]=="admin"){
				$forms = new Forms();
				$forms->logout_form();

				header("Location: admin.php");

			} elseif($_SESSION["user_permission"]=="user"){
				
				$_SESSION['user_name'] = $_POST['input_username'];
				
				header("Location: app.php");

			} else {
				echo "<h3>Nincs jogosultságod az oldal megtekintéséhez!</h3>";
				$_SESSION["login_state"]="login_nemok";
				unset($_SESSION["user_permission"]);				
				$forms = new Forms(); $forms->login_form();				
			}
		}
		if(!isset($_SESSION["user_permission"])){
			echo "<h3>Nincs jogosultságod az oldal megtekintéséhez!</h3>";
			$_SESSION["login_state"]="login_nemok";
			unset($_SESSION["user_permission"]);				
			$forms = new Forms(); $forms->login_form();			
		}
			
	} elseif($_SESSION["login_state"]=="login_nemok"){
		$forms = new Forms(); $forms->login_form();
	} else {
		$forms = new Forms(); $forms->login_form();
	}
}
if(!isset($_SESSION["login_state"])){
	$forms = new Forms(); $forms->login_form();
}

class users{
	public $servername = "localhost";
	public $username = "root";
	public $password = "";
	public $dbname = "trueboxdb";
	public $sql = NULL;
	public $result = NULL;
	public $row = NULL;
	public $kereses = NULL;
	public $rendezes = NULL;
	
	public function kapcsolodas(){
		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		if ($this->conn->connect_error) {
			die("Connection failed: " . $this->conn->connect_error);
		}
		$this->conn->query("SET NAMES 'UTF8';");		
	}
	public function kapcsolatbontas(){
		$this->conn->close();
	}
	public function __construct(){ self::kapcsolodas(); }
	public function __destruct(){ self::kapcsolatbontas(); }

	public function check_permission($username){
		$this->sql = "SELECT 
						`user_permission`
					  FROM 
						`users`
					  WHERE
						user_name = '$username'
					  ";	
		return $this->conn->query($this->sql)->fetch_object()->user_permission; 					  
	}
	public function check_login($username, $pwd){
		$this->sql = "SELECT 
						`user_name`, 
						`user_pwd` 
					  FROM 
						`users`
					  WHERE
						user_name = '$username' and
						user_pwd = '$pwd'
					  ";
		
		$this->result = $this->conn->query($this->sql);

		if ($this->result->num_rows == 1) {
			return "login_ok";
		} else {
			return "login_nemok";
		}
		
	}

	public function isBan($username, $pwd){
		
		$this->sql = "SELECT 
						`user_status`
					  FROM 
						`users`
					  WHERE
						user_name = '$username' and
						user_pwd = '$pwd'
					  ";
		
		$this->result = $this->conn->query($this->sql);
		
		if ($this->result->num_rows == 1) {
			while($row = $this->result->fetch_assoc()) {
		        return $row["user_status"];
		    }
		} else {
			return "0 érték";
		}

	}
}


?>