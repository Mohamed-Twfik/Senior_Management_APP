import mongoose from "mongoose";

const savedPostSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    post: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Post",
    },
});

savedPostSchema.pre(/^find/, function () {
    this.populate("user", "firstName lastName email picture _id");
    this.populate("post");
});

const SavedPost = mongoose.model("SavedPost", savedPostSchema);
export default SavedPost;