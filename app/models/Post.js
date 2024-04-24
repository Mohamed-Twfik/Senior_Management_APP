import mongoose from "mongoose";

//one individual post has all these traits
const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    originalPost: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    description: [],
    picturePost: {
      type: [String],
      default: [],
    },
    tags: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "Tag",
    },
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
    numberOfLikes:{
      type: Number,
      default: 0,
    },
    numberOfComments: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    shareNumber: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

postSchema.pre(/^find/, function () {
  this.populate("user", "firstName lastName email picture _id");
  this.populate("tags");
});
const Post = mongoose.model("Post", postSchema);

export default Post;
