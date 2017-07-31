 import { Wallets } from "/lib/collections";
 // get user's wallet transaction
 Meteor.publish("transactionDetails", (userId) => {
   check(userId, String);
   return Wallets.find({ userId });
 });
