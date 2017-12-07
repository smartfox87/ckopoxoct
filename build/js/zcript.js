$(function () {
  var menu = $("ul.main-nav__list");
  var logo = $("div.main-nav__logo");
  var comment = $("textarea.order__field--comment");
  var toggleMenu = $("div.main-nav__toggle-menu");

  // инициализация анимации элементов при скроллинге
  new WOW().init();

  // фиксация главного меню
  $("header.site-header").stickMe({triggerAtCenter: false});

  if ($(window).outerWidth() < 768) {
    var topMenu = $(".main-nav__purchase-block").outerHeight();
    $(".main-nav__list").css("top", topMenu);

    // слайдер блока тарифов на мобильной версии
    $("div.rates__list").owlCarousel({
      items: 1,
      nav: true,
      rewind: true,
      navText: ["<svg class=\"symbol  symbol-arrow--left\"><use xlink:href=\"img/sprite/sprite.svg#arrow--left\"></use></svg>",
        "<svg class=\"symbol  symbol-arrow--right\"><use xlink:href=\"img/sprite/sprite.svg#arrow--right\"></use></svg>"],
      dots: false,
      responsive: {
        0: {
          center: false
        },
        630: {
          center: true
        }
      }
    });
    //слайдер блока преимуществ на мобильной версии
    $("div.features__list").owlCarousel({
      items: 1,
      nav: true,
      navText: ["<svg class=\"symbol  symbol-arrow--left\"><use xlink:href=\"img/sprite/sprite.svg#arrow--left\"></use></svg>",
        "<svg class=\"symbol  symbol-arrow--right\"><use xlink:href=\"img/sprite/sprite.svg#arrow--right\"></use></svg>"],
      dots: false,
      loop: true,
      onChanged: function () {
        accordion(".features__item", ".features__text");
      },
      responsive: {
        0: {
          center: false
        },
        630: {
          center: true
        }
      }
    });
    //слайдер блока результатов на мобильной версии
    $("div.results__list").owlCarousel({
      items: 1,
      nav: true,
      navText: ["<svg class=\"symbol  symbol-arrow--left\"><use xlink:href=\"img/sprite/sprite.svg#arrow--left\"></use></svg>",
        "<svg class=\"symbol  symbol-arrow--right\"><use xlink:href=\"img/sprite/sprite.svg#arrow--right\"></use></svg>"],
      dots: false,
      rewind: true,
      // loop: true,
      margin: 5
    }).on("changed.owl.carousel", function () {
      $("div.results__caption").toggleClass("results__caption--current");
    });
    //слайдер блока серверов на мобильной версии
    $("div.servers__list").owlCarousel({
      items: 1,
      nav: true,
      navText: ["<svg class=\"symbol  symbol-arrow--left\"><use xlink:href=\"img/sprite/sprite.svg#arrow--left\"></use></svg>",
        "<svg class=\"symbol  symbol-arrow--right\"><use xlink:href=\"img/sprite/sprite.svg#arrow--right\"></use></svg>"],
      dots: false,
      loop: true,
      onChanged: function () {
        accordion(".servers__item", ".servers__text");
      }
    });
  }

  // слайдер промо блока
  $("section.promo").owlCarousel({
    items: 1,
    nav: true,
    navText: ["<svg class=\"symbol  symbol-arrow--left\"><use xlink:href=\"img/sprite/sprite.svg#arrow--left\"></use></svg>",
      "<svg class=\"symbol  symbol-arrow--right\"><use xlink:href=\"img/sprite/sprite.svg#arrow--right\"></use></svg>"],
    dots: false,
    rewind: true,
    // loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 7000
  });

  //слайдер блока партнерав
  $("div.partners__list").owlCarousel({
    autoWidth: true,
    nav: true,
    navText: ["<svg class=\"symbol  symbol-arrow--left\"><use xlink:href=\"img/sprite/sprite.svg#arrow--left\"></use></svg>",
      "<svg class=\"symbol  symbol-arrow--right\"><use xlink:href=\"img/sprite/sprite.svg#arrow--right\"></use></svg>"],
    dots: false,
    loop: true
  });

  //слайдер блока отзывов
  $("div.reviews__list").owlCarousel({
    items: 1,
    dotsContainer: ".reviews__dots",
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 7000,
    onChanged: function (event) {
      var oldSlide = $(event.target).find(".active");
      if (oldSlide.length > 0) {
        $(event.target).find(".promo__video").addClass("promo__video--hide");
      } else {
        $(event.target).find(".promo__video").removeClass("promo__video--hide");
      }
    },
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

  // обработчик кнопки заказ
  $("a.main-nav__order").click(function () {
    menu.removeClass("main-nav__list--show");
    logo.removeClass("main-nav__logo--hide");
    toggleMenu.removeClass("main-nav__toggle-menu--close");
    toggleMenu.addClass("main-nav__toggle-menu--open");
  });

  // переключение состояния меню и логотипа мобильной версии
  toggleMenu.click(function (event) {
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

  // обработчик событий селектора количества месяцев тарифов
  $("#rates__4").change(function () {
    outputCostRate(calcDiscount, "#rates__4", "#rates__output--4");
  });
  $("#rates__2").change(function () {
    outputCostRate(calcDiscount, "#rates__2", "#rates__output--2");
  });

  // переключение тени при невлезающем тексте слайдера
  // $("div.promo__text").each(function (ind) {
  //   var parentHeight = $(this).height();
  //   var childHeight = $(this).children("p").height();
  //   if (parentHeight <= childHeight) {
  //     $(this).addClass("promo__text--full");
  //   } else {
  //     $(this).removeClass("promo__text--full");
  //   }
  // });

  // перключение слайдера по дублированным стрелкам
  $(".promo__prev").click(function () {
    $(".promo .owl-prev").trigger("click");
  });
  $(".promo__next").click(function () {
    $(".promo .owl-next").trigger("click");
  });
  $(".rates__next").click(function () {
    $(".rates .owl-next").trigger("click");
  });
  $(".results__prev").click(function () {
    $(".results .owl-prev").trigger("click");
  });
  $(".results__next").click(function () {
    $(".results .owl-next").trigger("click");
  });

  // обработчик ссылки показа поля для комментария
  $("#add-comment").click(function (event) {
    event.preventDefault();
    if (comment.hasClass("order__field--comment-show")) {
      $(this).text("Добавить комментарий");
      comment.removeClass("order__field--comment-show");
    } else {
      $(this).text("Убрать комментарий");
      comment.addClass("order__field--comment-show");
    }
  });


  // обработчик поля ввода номера телефона
  $("#phone").focus(function () {
    if ($(this).val().length <= 5) {
      $(this).val("+375 ");
    }
  });
  $("#phone").keypress(function (event) {
    var inputNumberKey = String.fromCharCode(event.charCode);
    var keyCode = event.keyCode;
    var cursorPosition = event.target.selectionStart;
    if (!(/[\d\+]/.test(String.fromCharCode(event.charCode)) || keyCode == 8 || keyCode == 9 || keyCode == 46 || keyCode == 37 || keyCode == 39)) {
      event.preventDefault();
    }
    if (event.target.selectionStart > 0 && inputNumberKey == "+") {
      event.preventDefault();
    }
    if ($(this).val().length == 14 && !(keyCode == 8 || keyCode == 9 || keyCode == 46 || keyCode == 37 || keyCode == 39)) {
      event.preventDefault();
    }
  });

  stylizationSelect("label.order__field--rate");
  stylizationSelect(".rates__select--2");
  stylizationSelect(".rates__select--4");
  writeCostMonth("#rates__output--4");
  writeCostMonth("#rates__output--2");
  accordion(".features__item", ".features__text", "features__item--show");
  accordion(".servers__item", ".servers__text", "servers__item--show");
  svg4everybody();
  document.getElementById("video").play();
});


//*******************************************************************************************************
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
function accordion(item, text, classShow) {
  $(item + " " + text).hide();
  $(item).hover(function () {
      var oldItem = $(text + ":visible");
      var activeItem = $(this).find(text);
      if (activeItem.is(":visible")) return false;
      $(this).addClass(classShow);
      oldItem.stop().slideUp();
      activeItem.stop().slideDown();
    },
    function () {
      $(this).removeClass(classShow);
      $(text + ":visible").slideUp();
    });
  $(item).click(function () {
    $(this).addClass(classShow);
    var oldItem = $(text + ":visible");
    var activeItem = $(this).find(text);
    if (activeItem.is(":visible")) return false;
    oldItem.stop().slideUp();
    activeItem.stop().slideDown();
  });
}

// имитация работы label как select
function stylizationSelect(item) {
  var select = $(item).children("select");
  var text = select.children("option:selected").text();
  $(item).children("span").text(text);
  select.change(function () {
    stylizationSelect(item);
  })
}