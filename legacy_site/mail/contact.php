<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Requiere los archivos de PHPMailer
require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // Cambia esto por tu servidor SMTP
        $mail->SMTPAuth   = true;
        $mail->Username   = 'tu_correo@gmail.com'; // Tu correo SMTP
        $mail->Password   = 'tu_contraseña'; // Tu contraseña SMTP
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Configuración del correo
        $mail->setFrom($email, $name);
        $mail->addAddress('escacspardinyes@gmail.com', 'Club Escacs Pardinyes'); // Dirección de destino

        // Contenido del correo
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        echo 'El missatge s\'ha enviat correctament';
    } catch (Exception $e) {
        echo "El missatge no s'ha pogut enviar. Error: {$mail->ErrorInfo}";
    }
}

?>
