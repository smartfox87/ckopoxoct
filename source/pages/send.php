<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.min.css">
    <title>Отправка заказа</title>
    <!-- Global Site Tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-107581745-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-107581745-1');
    </script>
    <!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
      (function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
          try {
            w.yaCounter46173273 = new Ya.Metrika({
              id:46173273,
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
          s = d.createElement("script"),
          f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/watch.js";

        if (w.opera == "[object Opera]") {
          d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
      })(document, window, "yandex_metrika_callbacks");
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/46173273" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->
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
      $backurl = "./index.php";
      
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
          function reload() {location = \"$backurl\"}; setTimeout('reload()', 5000);
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