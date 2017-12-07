<?php
  function downloadJs($file_url, $save_to) {
    $content = file_get_contents($file_url);
    file_put_contents($save_to, $content);
  }
  downloadJs('http://code.jivosite.com/script/widget/Hbrb9gnAHW', realpath("./script/widget") . '/Hbrb9gnAHW');
  downloadJs('http://code.jivosite.com/script/widget/config/Hbrb9gnAHW', realpath("./script/widget/config") . '/Hbrb9gnAHW');
  downloadJs('http://code.jivosite.com/script/widget/config/LMssaBAmCE', realpath("./script/widget/config") . '/LMssaBAmCE');
?>