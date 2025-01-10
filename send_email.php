<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Your email address
    $to = "turkershub@gmail.com"; // Your email address
    $subject = "New Contact Form Message from $name";
    
    // Create the message content
    $body = "
    You have received a new message from your website contact form:\n\n
    Name: $name\n
    Email: $email\n\n
    Message:\n$message
    ";

    // Headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for your message! We will get back to you soon.";
    } else {
        echo "Sorry, there was an error sending your message. Please try again later.";
    }
}
?>