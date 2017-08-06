/**
 * product category schema
 */
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { schemaIdAutoValue } from "./helpers";

export const Category = new SimpleSchema({
  _id: {
    type: String,
    autoValue: schemaIdAutoValue
  },
  title: {
    type: String,
    optional: false
  }
});
