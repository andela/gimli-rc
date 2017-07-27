/* eslint camelcase: 0 */
// meteor modules
import { Meteor } from "meteor/meteor";
import * as Collections from "/lib/collections";
// reaction modules
import { Reaction } from "/server/api";
import { Logger } from "/server/api";


Meteor.methods({

  /**
    * submit payment
    * @description gets paystack api keys
    * @return {Object} returns the paystack keys
    */
  "paystack/getKeys"() {
    const paystack = Collections.Packages.findOne({
      name: "paystack",
      shopId: Reaction.getShopId()
    });
    console.log('came here to get keys', paystack);
    return {
      public: paystack.settings.publicKey,
      secret: paystack.settings.secretKey
    };
  }
});
