import { prop, getModelForClass } from "@typegoose/typegoose";

class RecipeClass {
  @prop()
  public title?: string;
  @prop()
  public color?: string;
  @prop()
  public description?: string;
  @prop()
  public published?: boolean;

  // public toJson() {
  //   const { __v, _id, ...object } = this.toObject();
  // }
}
export const RecipeModel = getModelForClass(RecipeClass, {
  schemaOptions: { timestamps: true },
});

// module.exports = (mongoose: Mongoose) => {
//   var schema = mongoose.Schema(
//     {
//       title: String,
//       color: String,
//       description: String,
//       published: Boolean,
//     },
//     { timestamps: true }
//   );

//   schema.method("toJSON", function () {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

//   return mongoose.model("recipes", schema);
// };
