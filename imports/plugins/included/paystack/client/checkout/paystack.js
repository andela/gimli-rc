/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Random } from "meteor/random";
// import { Reaction } from "/client/api";
import {AutoForm} from "meteor/aldeed:autoform";
import { Cart } from "/lib/collections";
import { Paystack } from "../../lib/api";
import { PaystackPayment } from "../../lib/collections/schemas";
import "../../lib/api/paystackApi";
import "./paystack.html";

// enable the submit button when there is no error
const enableButton = (template, buttonText) => {
  $(":input").removeAttr("disabled");
  $("#btn-complete-order").text(buttonText);
  return $("#btn-processing").addClass("hidden");
};


const paymentAlert = (template, errorMessage) => {
  return $(".alert").removeClass("hidden").text(errorMessage);
};

// respond to error returned by paystack
const handlePaystackSubmitError = (error) => {
  // check if error has property message or if it is a string
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    return paymentAlert("Oops! " + serverError);
  } else if (error) {
    return paymentAlert("Oops! " + error, null, 4);
  }
};

Template.paystackPaymentForm.helpers({
  PaystackPayment() {
    return PaystackPayment;
  }
});

AutoForm.addHooks("paystack-payment-form", {
  onSubmit(doc) {
    Meteor.call("paystack/getKeys", (err, keys) => {
      const cart = Cart.findOne();
      const amount = Math.round(cart.cartTotal()) * 100;
      const template = this.template;
      const key = keys.public;
      const details = {
        key,
        name: doc.payerName,
        email: doc.payerEmail,
        reference: Random.id(),
        amount,
        callback(response) {
          const secret = keys.secret;
          const reference = response.reference;
          if (reference) {
            Paystack.verify(reference, secret, (error, res) => {
              if (error) {
                handlePaystackSubmitError(template, error);
                enableButton(template, "Resubmit payment");
              } else {
                const transaction = res.data;
                const paymentMethod = {
                  processor: "Paystack",
                  storedCard: transaction.authorization.card_type,
                  method: "Paystack Payment",
                  transactionId: transaction.reference,
                  currency: transaction.currency,
                  amount: transaction.amount / 100,
                  status: "passed",
                  mode: "authorize",
                  createdAt: new Date(),
                  transactions: []
                };
                Alerts.toast("Transaction successful");
                paymentMethod.transactions.push(transaction.authorization);
                Meteor.call("cart/submitPayment", paymentMethod);
              }
            });
          }
        },
        onClose() {
          enableButton(template, "Complete payment");
        }
      };
      try {
        PaystackPop.setup(details).openIframe();
      } catch (error) {
        console.log('errror from paystack', error);
        handlePaystackSubmitError(template, error);
        enableButton(template, "Complete payment");
      }
    });
    return false;
  }
});
