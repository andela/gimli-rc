import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "GIMLI RC THEME",
  name: "gimli",
  icon: "fa fa-vine",
  autoEnable: true,
  layout: [{
    layout: "coreLayoutGimli",
    workflow: "coreWorkflow",
    collection: "Products",
    theme: "default",
    enabled: true,
    priority: 1,
    structure: {
      template: "gimliHomepage",
      layoutHeader: "layoutHeader",
      layoutFooter: "gimliFooter",
      notFound: "productNotFOund",
      dashboardHeader: "",
      dashboardControls: "dashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
