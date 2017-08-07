import { Meteor } from "meteor/meteor";
import { Category } from "/lib/collections";
import { check } from "meteor/check";

Meteor.publish("Category", function CategoryPublication() {
  return Category.find();
});

Meteor.methods({
  "category.insert"(title) {
    check(title, String);
    Category.insert({
      title
    });
  }
});
