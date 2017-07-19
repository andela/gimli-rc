import { Template } from "meteor/templating";

const instance = Template.instance();


Template.sortFilter.events({
  "change #price-filter": function (event) {
    instance.state.set("priceFilter", event.target.value);
  },
  "change #sort-value": function (event) {
    instance.state.set("sortValue", event.target.value);
  }
});
