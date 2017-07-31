import { Session } from "meteor/session";

Session.set("INDEX_OPTIONS", {
  template: "gimliHompage",
  layoutHeader: "layoutHeader",
  layoutFooter: "layoutFooter",
  notFound: "notFound",
  dashboardControls: "dashboardControls",
  adminControlsFooter: "adminControlsFooter"
});
Session.set("DEFAULT_WORKFLOW", "coreWorkflow");
