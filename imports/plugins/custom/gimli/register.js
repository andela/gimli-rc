import { Reaction } from "/server/api";

Reaction.registerPackage({
  // Name of the theme for presentation purposes
  label: "Gimli Theme",

  // Name of your theme to uniquely identify it from other themes
  name: "reaction-gimli-theme",
  autoEnable: true,
  layout: [{
    collection: "Products"
  }]
});
