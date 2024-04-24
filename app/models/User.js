import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      unique: true,
    },
    friends: {
      type: Map,
      of: Boolean,
      default: {},
    },
    skills: {
      type: [String],
      default: [],
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    picture: {
      type: String,
      default: "",
    },
    isSuperuser:{
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: null,
    },
    occupation: {
      type: String,
      default: null,
    },
    viewedProfile: {
      type: Number,
      default: 0,
    },
    impressions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
});

// UserSchema.pre(/^find/, function () {
//   this.select({ password: 0, __v: 0});
// });

const User = mongoose.model("User", UserSchema);

export default User;
