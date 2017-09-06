$(function () {
  // var fixedMenuDesktop = $(".site-header").stickme();
  // fixedMenuDesktop.update();
  // $.stickme({
  // top: 10
  // });
  $(".site-header").stickMe({triggerAtCenter: false});
  // переключение тени шапки при скроллинге
  // $(window).scroll(function () {
  //   if ($(document).scrollTop() > 0) {
  //     fixedMenuDesktop.addClass("main-nav--shadow");
  //   } else {
  //     fixedMenuDesktop.removeClass("main-nav--shadow");
  //   }
  // });

  // слайдер второго этажа промо блока
  $(".promo").owlCarousel({
    items: 1,
    nav: true,
    navText: ["<svg class=\"symbol  symbol-arrow--left\"><use xlink:href=\"img/sprite/sprite.svg#arrow--left\"></use></svg>",
      "<svg class=\"symbol  symbol-arrow--right\"><use xlink:href=\"img/sprite/sprite.svg#arrow--right\"></use></svg>"],
    dots: false,
    loop: true,
    autoplay: false,
    autoplayHoverPause: true,
    autoplayTimeout: 7000
  });

  if ($(window).outerWidth() < 768) {
    // слайдер блока тарифов на мобильной версии
    $(".rates__list").owlCarousel({
      items: 1,
      nav: true,
      navText: ["<svg class=\"symbol  symbol-arrow--left\"><use xlink:href=\"img/sprite/sprite.svg#arrow--left\"></use></svg>",
        "<svg class=\"symbol  symbol-arrow--right\"><use xlink:href=\"img/sprite/sprite.svg#arrow--right\"></use></svg>"],
      dots: false,
      loop: true
    });
    //слайдер блока преимуществ на мобильной версии
    $(".features__list").owlCarousel({
      items: 1,
      nav: true,
      navText: ["<svg class=\"symbol  symbol-arrow--left\"><use xlink:href=\"img/sprite/sprite.svg#arrow--left\"></use></svg>",
        "<svg class=\"symbol  symbol-arrow--right\"><use xlink:href=\"img/sprite/sprite.svg#arrow--right\"></use></svg>"],
      dots: false,
      loop: true
    });
  }

  //слайдер блока партнерав
  $(".partners__list").owlCarousel({
    autoWidth: true,
    nav: true,
    navText: ["<svg class=\"symbol  symbol-arrow--left\"><use xlink:href=\"img/sprite/sprite.svg#arrow--left\"></use></svg>",
      "<svg class=\"symbol  symbol-arrow--right\"><use xlink:href=\"img/sprite/sprite.svg#arrow--right\"></use></svg>"],
    dots: false,
    loop: true
  });

  //слайдер блока отзывов
  $(".reviews__list").owlCarousel({
    items: 1,
    // autoplay: true,
    dotsContainer: ".reviews__dots",
    loop: true,
    responsive: {
      0: {
        margin: 5,
        nav: true,
        navText: ["<svg class=\"symbol  symbol-arrow--left\"><use xlink:href=\"img/sprite/sprite.svg#arrow--left\"></use></svg>",
          "<svg class=\"symbol  symbol-arrow--right\"><use xlink:href=\"img/sprite/sprite.svg#arrow--right\"></use></svg>"]
      },
      760: {
        margin: 0,
        nav: false
      }
    }
  });

  // переключение состояния меню и логотипа мобильной версии
  $(".main-nav__toggle-menu").click(function (event) {
    event.preventDefault();
    if ($(this).hasClass("main-nav__toggle-menu--open")) {
      $(this).removeClass("main-nav__toggle-menu--open");
      $(this).addClass("main-nav__toggle-menu--close");
      menu.addClass("main-nav__list--show");
      logo.addClass("main-nav__logo--hide");
    } else {
      $(this).removeClass("main-nav__toggle-menu--close");
      $(this).addClass("main-nav__toggle-menu--open");
      menu.removeClass("main-nav__list--show");
      logo.removeClass("main-nav__logo--hide");
    }
  });

  writeCostMonth("#rates__output--4");
  writeCostMonth("#rates__output--2");
  accordion(".features__item", ".features__text");
  svg4everybody();

  // обработчик событий селектора количества месяцев тарифов
  $("#rates__4").change(function () {
    outputCostRate(calcDiscount, "#rates__4", "#rates__output--4");
  });
  $("#rates__2").change(function () {
    outputCostRate(calcDiscount, "#rates__2", "#rates__output--2");
  });

  // переключение тени при невлезающем тексте слайдера
  $(".promo__text").each(function (ind) {
    var parentHeight = $(this).height();
    var childHeight = $(this).children("p").height();
    if (parentHeight <= childHeight) {
      $(this).addClass("promo__text--full");
    } else {
      $(this).removeClass("promo__text--full");
    }
  });
  $("#promo").ready(function () {
  });

  // перключение слайдера о дублированным стрелкам
  $(".promo__prev").click(function () {
    $(".owl-prev").trigger("click");
  });
  $(".promo__next").click(function () {
    $(".owl-next").trigger("click");
  });
});

//*******************************************************************************************************

var menu = $(".main-nav__list");
var logo = $(".main-nav__logo");

// проверка на число
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// запись начальной цены тарифа в атрибут
function writeCostMonth(output) {
  $(output).data("cost", $(output).text());
}

// вычисление скидки на выбранный тариф
function calcDiscount(input, output) {
  var costMonth = $(output).data("cost");
  var countMonth = $(input).val();
  var totalCost = "";
  switch (countMonth) {
    case "1":
      totalCost = +costMonth;
      break;
    case "3":
      totalCost = ((countMonth * costMonth) - (countMonth * costMonth) / 100 * parseInt($("#discount--3").text())) / countMonth;
      break;
    case "6":
      totalCost = ((countMonth * costMonth) - (countMonth * costMonth) / 100 * parseInt($("#discount--6").text())) / countMonth;
      break;
    case "12":
      totalCost = ((countMonth * costMonth) - (countMonth * costMonth) / 100 * parseInt($("#discount--12").text())) / countMonth;
  }
  if (isNumeric(totalCost)) {
    return totalCost.toFixed(1);
  }
  return "Некорректное число";
}

// вывод цены на выбранный тариф со скидкой
function outputCostRate(call, input, output) {
  var cost = call(input, output);
  $(output).text(cost);
}

//аккордион блока преимуществ
function accordion(item, text) {
  $(item + " " + text).hide();
  $(item).hover(function () {
      var oldItem = $(text + ":visible");
      var activeItem = $(this).find(text);
      if (activeItem.is(":visible")) return false;
      oldItem.stop().slideUp();
      activeItem.stop().slideDown();
    },
    function () {
      $(text + ":visible").slideUp();
    });
  $(item).click(function () {
    var oldItem = $(text + ":visible");
    var activeItem = $(this).find(text);
    if (activeItem.is(":visible")) return false;
    oldItem.stop().slideUp();
    activeItem.stop().slideDown();
  });
}