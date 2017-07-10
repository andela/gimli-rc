/*
  Mega menu events
*/

Template.sideNav.onRendered(() => {
  this.$("body").on("mouseenter", ".mega-menu-item", (event) => {
    $(event.currentTarget).find(".submenu").fadeIn(1000);
  });

  this.$("body").on("mouseleave", ".mega-menu-item", (event) => {
    $(event.currentTarget).find(".submenu").fadeOut(500);
  });
});

Template.banner.rendered = () => {
  $(".bxslider").bxSlider({
    auto: true
  });
};
