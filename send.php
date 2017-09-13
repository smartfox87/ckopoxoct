<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.min.css">
    <title>Отправка заказа</title>
  </head>
  <body>
    <?php
      header("Content-Type: text/html; charset=utf-8");
      $name = $_POST['name'];
      $company = $_POST['company'];
      $phone = $_POST['phone'];
      $email = $_POST['email'];
      $site = $_POST['site'];
      $rate = $_POST['rate'];
      $comment = $_POST['comment'];
      $transfer = '';
      if (isset($_POST['transfer'])) {
        $transfer = $_POST['transfer'];
      }
      $backurl = "./index.html";
      
      filterData($name);
      filterData($company);
      filterData($email);
      filterData($site);
      filterData($comment);
      if ($comment) {
        $comment = "\r\nКомментарий к заказу: " . $comment;
        $comment = wordwrap($comment, 70, "\r\n", false);
      };
      if ($transfer) {
        $transfer = "\r\nТребуется бесплатный перенос сайта";
      };
      $msg = "Имя: $name\r\nКомпания: $company\r\nНомер телефона: $phone\r\nE-mail: $email\r\nСайт: $site\r\nВыбранный тариф: $rate $transfer $comment";
      
      if (mail('sale@newsite.by', 'Заказ на сайте СкороХост', "$msg")) {
        echo "<p class='send-order  send-order--succes'>Ваш заказ принят! <br>
                  Подождите, сейчас вы будете перенаправлены на
            главную страницу...</p>";
        print "<script language='Javascript'><!--
          function reload() {location = \"$backurl\"}; setTimeout('reload()', 6000);
          //--></script>";
        exit;
      } else {
        echo "<p class='send-order  send-order--error'>При оформлении заказа возникли ошибки! <br>
          Подождите, сейчас вы будете перенаправлены на главную страницу...</p>";
      }
      
      function filterData($arg) {
        $arg = htmlspecialchars($arg);
        $arg = urldecode($arg);
        $arg = trim($arg);
      }
    ?>
  </body>
</html>