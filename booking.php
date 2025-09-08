<?php


$host = "localhost";
$user = "root";
$pass = "";
$login_db = "login-db";
$booking_db = "bookedtable";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $contact = $_POST['contact'] ?? '';
    $size = $_POST['size'] ?? 0;

    if (empty($name) || empty($email) || empty($contact) || empty($size)) {
        echo "<script>alert('All fields are required.'); window.history.back();</script>";
        exit;
    }

    $conn1 = new mysqli($host, $user, $pass, $login_db);
    if ($conn1->connect_error) {
        die("Connection failed: " . $conn1->connect_error);
    }

    $email = $conn1->real_escape_string($email);
    $check_sql = "SELECT * FROM users WHERE username='$email'";
    $result = $conn1->query($check_sql);

    if ($result && $result->num_rows > 0) {
      
        $conn2 = new mysqli($host, $user, $pass, $booking_db);
        if ($conn2->connect_error) {
            die("Connection failed: " . $conn2->connect_error);
        }

        $name = $conn2->real_escape_string($name);
        $contact = $conn2->real_escape_string($contact);
        $email = $conn2->real_escape_string($email);
        $size = (int)$size;

        $insert_sql = "INSERT INTO bookings (name, email, contact, size) VALUES ('$name', '$email', '$contact', '$size')";
        if ($conn2->query($insert_sql) === TRUE) {
            header("Location: menu_new.html");
            exit();
        } else {
            echo "<script>alert('Booking failed: " . $conn2->error . "'); window.history.back();</script>";
        }

        $conn2->close();
    } else {
        
        echo "<script>alert('Email not found! Please sign up first.'); window.history.back();</script>";
    }

    $conn1->close();
} else {
    echo "Invalid request.";
}
?>
