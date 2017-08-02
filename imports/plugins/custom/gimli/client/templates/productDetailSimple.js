import { Layout } from "../gimli-product-details";
import { isRevisionControlEnabled } from "/imports/plugins/core/revisions/lib/api";

Template.gimliSingleProductPage.replaces("productDetailSimple");

Template.gimliSingleProductPage.helpers({
  isEnabled() {
    return isRevisionControlEnabled();
  },
  PDC() {
    return Layout;
  }
});
