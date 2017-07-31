 import { Wallets, Accounts } from "/lib/collections";
 import * as Schemas from "/lib/collections/schemas/";
 import { check } from "meteor/check";

 Meteor.methods({
   "wallet/transaction": (userId, transactions) => {
    check(userId, String);
    console.log('transactions', transactions);
    check(transactions, Schemas.Transaction);
    let newBalance;
    const { amount, transactionType } = transactions;
    if (transactionType === "Credit") {
      newBalance = { balance: amount };
    }
     if (transactionType === "Debit") {
       if (transactions.to) {
        const recipient = Accounts.findOne({ "emails.0.address": transactions.to });
        const sender = Accounts.findOne(userId);
        if (recipient) {
          // call this method again but with a Credit transaction
          Meteor.call("wallet/transaction", recipient._id, {
            amount,
            from: sender.emails[0].address,
            date: new Date(),
            transactionType: "Credit"
          });
        } else {
          return "unknown recipient";
        }
      }
      newBalance = { balance: -amount };
    }

     try {
       Wallets.update(
          { userId },
          { $push: { transactions: transactions }, $inc: newBalance },
          { upsert: true }
        );
       return "success";
     } catch (error) {
       return "failed";
     }
   }
 });

