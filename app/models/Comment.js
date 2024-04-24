import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    pictureComment: {
      type: String,
      default: "",
    },
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    numberOfComments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

CommentSchema.pre(/^find/, function () {
    this.populate("user", "firstName lastName email picture _id");
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
