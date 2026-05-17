<?php
$name = $_POST['name'];
$email = $_POST['email'];
$telephone = $_POST['phone'];
$gig_date = $_POST['date'];
$message = $_POST['message'];

$from = 'From: The Killerz';
$to = 'info@thekillerz.co.uk';
$subject = 'The Killerz Contact Form';
$body = "
    From: $name\n
    E-Mail: $email\n
    Telephone: $telephone\n
    Gig Date: $gig_date\n
    Message: $message
";

if (!empty($name) && !empty($email) && !empty($telephone) && !empty($gig_date)) {
    mail ($to, $subject, $body, $from);
}


?>
