$(function () {
  var menu = $(".main-nav__list");
  var fixedMenuDesktop = $(".main-nav").stickme();

  $(".promo").owlCarousel({
    items: 1,
    nav: true,
    navText: [],
    dots: false,
    loop: true
  });

  if ($(window).outerWidth() < 768) {
    $(".rates__list").owlCarousel({
      items: 1,
      nav: true,
      navText: [],
      dots: false,
      loop: true
    });
  }

  $(".main-nav__toggle-menu").click(function (event) {
    event.preventDefault();
    if ($(this).hasClass("main-nav__toggle-menu--open")) {
      $(this).removeClass("main-nav__toggle-menu--open");
      $(this).addClass("main-nav__toggle-menu--close");
      menu.addClass("main-nav__list--show");
    } else {
      $(this).removeClass("main-nav__toggle-menu--close");
      $(this).addClass("main-nav__toggle-menu--open");
      menu.removeClass("main-nav__list--show");
    }
  });

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function writeCostMonth(output) {
    $(output).data("cost", $(output).text());
  }

  function calcDiscount(input, output) {
    var costMonth = $(output).data("cost");
    var countMonth = $(input).val();
    var totalCost = "";
    switch (countMonth) {
      case "1":
        totalCost = costMonth;
        break;
      case "3":
        totalCost = (countMonth * costMonth) - (countMonth * costMonth) / 100 * parseInt($("#discount--3").text());
        break;
      case "6":
        totalCost = (countMonth * costMonth) - (countMonth * costMonth) / 100 * parseInt($("#discount--6").text());
        break;
      case "12":
        totalCost = (countMonth * costMonth) - (countMonth * costMonth) / 100 * parseInt($("#discount--12").text());
    }
    if (isNumeric(totalCost)) {
      return totalCost;
    }
    return "Некорректное число";
  }

  function outputCostRate(call, input, output) {
    var cost = call(input, output);
    $(output).text(cost);
  }

  writeCostMonth("#rates__output--4");
  writeCostMonth("#rates__output--2");

  $("#rates__4").change(function () {
    outputCostRate(calcDiscount, "#rates__4", "#rates__output--4");
  });

  $("#rates__2").change(function () {
    outputCostRate(calcDiscount, "#rates__2", "#rates__output--2");
  });

});