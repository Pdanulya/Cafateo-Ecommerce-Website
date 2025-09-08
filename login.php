<?php
session_start();

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    echo "Username and password are required.";
    exit;
}

$host = "localhost";
$dbname = "login-db";       
$dbUser = "root";           
$dbPass = "";               

$conn = new mysqli($host, $dbUser, $dbPass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT password FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($hashedPasswordFromDB);
        $stmt->fetch();

        
        if (password_verify($password, $hashedPasswordFromDB)) {
            echo "login successful!";
        } else {
            echo "login fail";
        }
    } 

    $stmt->close();
} else {
    echo "Error in preparing the statement.";
}

$conn->close();
?>
