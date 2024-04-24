import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        friend: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
    },
    { timestamps: true }
);

FriendSchema.pre(/^find/, function () {
    this.populate("friend", "firstName lastName email picture _id");
    this.populate("user", "firstName lastName email picture _id");
});

const Friend = mongoose.model("Friend", FriendSchema);

export default Friend;
