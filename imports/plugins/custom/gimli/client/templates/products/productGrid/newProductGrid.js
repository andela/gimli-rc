import { Products, Category } from "/lib/collections";
import { applyProductRevision } from "/lib/api/products";

Template.newProductGrid.onCreated(() => {
  Meteor.subscribe("Products");
});

Template.newProductGrid.helpers({
  products(category) {
    // const pester = Products.find({
    //   ancestors: [],
    //   category: category
    // });
    console.log(category);
    const productCursor = Products.find({
      ancestors: [],
      // keep this, as an example
      // type: { $in: ["simple"] }
      // category: category
    }, {
      sort: {
        // [`positions.${currentTag}.position`]: 1,
        // [`positions.${currentTag}.createdAt`]: 1,
        createdAt: 1
      },
      limit: 5
    });

    const products = productCursor.map((product) => {
      return applyProductRevision(product);
    });
    return products;
  },
  mobile() {
    const productCursor = Products.find({
      ancestors: [],
      category: "mobile"
    }, {
      sort: {
        createdAt: 1
      },
      limit: 5
    });

    const products = productCursor.map((product) => {
      return applyProductRevision(product);
    });
    return products;
  },
  menFashion() {
    const productCursor = Products.find({
      ancestors: [],
      category: "mens-fashion"
    }, {
      sort: {
        createdAt: 1
      },
      limit: 5
    });

    const products = productCursor.map((product) => {
      return applyProductRevision(product);
    });
    return products;
  },
  womenFashion() {
    const productCursor = Products.find({
      ancestors: [],
      category: "womens-fashion"
    }, {
      sort: {
        createdAt: 1
      },
      limit: 5
    });

    const products = productCursor.map((product) => {
      return applyProductRevision(product);
    });
    return products;
  }
});
