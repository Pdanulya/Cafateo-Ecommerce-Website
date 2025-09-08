<?php
session_start();

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';


if (empty($username) || empty($password)) {
    echo "Username and password are required.";
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$host = "localhost";
$dbname = "login-db";       
$dbUser = "root";           
$dbPass = "";               


$conn = new mysqli($host, $dbUser, $dbPass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO users (username, password) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("ss", $username, $hashedPassword);
    if ($stmt->execute()) {
        echo "User registered successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
} else {
    echo "Error in preparing the statement.";
}

$conn->close();
?>
