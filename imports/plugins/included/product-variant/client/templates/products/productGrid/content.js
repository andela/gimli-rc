/**
 * gridContent helpers
 */

Template.gridContent.helpers({
  displayPrice: function () {
    if (this.price) {
      return this.price.range;
    }
    return this.price.range;
  }
  // displayPrice: function () {
  //   return ReactionProduct.getVariantPriceRange(this._id);
  // }
});
