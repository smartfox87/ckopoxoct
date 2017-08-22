// вывод нажатого в окне браузера символа ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var showKeyPress = {
  initialization: function () {
    $("body").prepend("<span id=\"showKeyPress\">");
    $("#showKeyPress").css({
      display: "inline-block",
      padding: "5px",
      position: "absolute",
      backgroundColor: "gold",
      zIndex: "999999999"
    }).fadeOut(0);
  },
  move: function (event) {
    var pos = $(document).find("input:focus").offset();
    $("#showKeyPress").css({top: pos.top - 5, left: pos.left - 30});
  },
  show: function (event) {
    $("#showKeyPress").clearQueue().fadeIn(0).text(String.fromCharCode(event.charCode)).delay(2000).fadeOut(0);
  }
};

$(document).ready(showKeyPress.initialization);
$(window).click(showKeyPress.move);
$(window).keypress(showKeyPress.show);


var showKeyPress = {
  initialization: function () {
    $("body").prepend("<span id=\"showKeyPress\">");
    $("#showKeyPress").css({
      display: "inline-block",
      padding: "5px",
      position: "absolute",
      backgroundColor: "gold",
      zIndex: "999999999",
      fontSize: "20px",
      fontWeight: "700"
    }).fadeOut(0);
  },
  move: function (event) {
    $("#showKeyPress").css({top: event.clientY + 20, left: event.clientX + 10});
  },
  show: function (event) {
    $("#showKeyPress").clearQueue().fadeIn(0).text(String.fromCharCode(event.charCode)).delay(2000).fadeOut(0);
  }
};

$(document).ready(showKeyPress.initialization);
$(window).mousemove(showKeyPress.move);
$(window).keypress(showKeyPress.show);

