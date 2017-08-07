/**
 * gridContent helpers
 */

Template.gridContent.helpers({
  displayPrice: function () {
    if (this.price) {
      return this.price.range;
    }
    return this.price.range;
  },
  priceFormat(price) {
    return price.toLocaleString("en");
  }
  // displayPrice: function () {
  //   return ReactionProduct.getVariantPriceRange(this._id);
  // }
});
