import { Router } from "/client/api";
Template.tour.events({
  "click span#get-started": function () {
  		Router.go("/");
    const intro = introJs();
    intro.setOptions({
      steps: [
        {
          intro: "Hi, I\'m Jade. I\'m super excited to be onboarding " +
          "you to Reaction Commerce. Click Next to get Started. You can " +
          "end the tour anytime by clicking Skip."
        },
        {
          element: document.querySelector(".dropdown"),
          intro: "Choose your preferred language from here"
        },
        {
          element: document.querySelector(".navbar-item"),
          intro: "Access all shops by clicking here"
        },
        {
          element: document.querySelector(".search"),
          intro: "This is where you can search for products"
        },
        {
          element: document.querySelector("#side-nav"),
          intro: "You can also shop by category"
        },
        {
          element: document.querySelector(".cart-icon"),
          intro: "Click here to access your shopping cart"
        },
        {
          element: document.querySelector(".product-grid"),
          intro: "This grid shows basic product information"
        },
        {
          element: document.querySelector(".product-desc"),
          intro: "Click a product title to veiw more information about the product"
        }
      ]
    });
    intro.start();
  }
});
