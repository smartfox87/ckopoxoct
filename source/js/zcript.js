$(function () {
  var menu = $(".main-nav__list");
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
  var fixedMenuDesktop = $(".main-nav").stickme();
});