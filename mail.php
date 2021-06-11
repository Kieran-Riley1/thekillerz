<?php
if(isset($_POST['submit'])){
    $ cd ~/index.html
    $ php -S localhost:8000
    $to = "kieran.riley@live.co.uk";

    $name = $_POST['name'];
    $email = $_POST['email'];
    if ($_POST['phone']){
        $phone = $_POST['phone'];
    }
    else
    {
        $phone = "";
    }

    if ($_POST['date']){
        $date = $_POST['date'];
    }
    else
    {
        $date = "";
    }

    $message = $_POST['message'];

    $body = "Gig Enquiry" . "\n\n" . "Name: " . $name  . "\n" . "Email: " . $email . "\n" . "Phone: " . $phone . "\n" . "Gig Date: " . $date . "\n" . "Message: " . $message;

    $subject = "The Killerz Enquiry";

    mail($to,$subject,$body);



?>