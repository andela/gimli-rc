import { Router } from "/client/api";
import { Products } from "/lib/collections";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Template } from "meteor/templating";

Session.set("searchString", "");
Template.gimliSearch.onCreated(() => {
  Meteor.subscribe("Products");
});

Template.gimliSearch.events({
  "keyup #searchInput": function(events) {
    if (events.keyCode === 13) {
      Router.go(`/catalog/search?q=${events.target.value}`);
      $("#searchInput").val("");
      Session.set("searchString", "");
    }
    Session.set("searchString", events.target.value);
  },
  "click .searchDropdown ul li a": function(events) {
    $("#searchInput").val("");
    Session.set("searchString", "");
  }
});

Template.gimliSearch.helpers({
  products() {
    const searchString = Session.get("searchString");
    if (searchString !== "") {
      return Products.find({
        ancestors: [],
        title: {$regex: `^${searchString}`, $options: "i"}
      }, {
        limit: 20
      });
    }
    return "";
  }
});
