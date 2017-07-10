import "./header.html";
Template.gimliHeader.helpers({
  domLoad() {
    $(".dropdown-button").dropdown();
    console.log('Im here');
  }
});
