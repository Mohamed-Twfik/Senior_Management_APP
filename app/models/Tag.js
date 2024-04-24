import mongoose from "mongoose";

const tagSchema = mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    postsNumber: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
 
);

tagSchema.pre(/^find/, function () {
  this.populate("user", "firstName lastName email picture _id");
});
const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
