import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import { catchError } from "../utils/catchAsyncError.js";
import { ErrorMessage } from "../utils/ErrorMessage.js";
import cloudinary from "../utils/cloudinary.js";

dotenv.config();

export const register = catchError(async (req, res, next) => {
  let picture = "";
  // check if the file uploaded
  if (req.file) {
    //? Start to upload image in cloudinary
    let { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: "Sociopedia/users" }
    );
    picture = secure_url;
  }

  // create new user
  const {
    firstName,
    lastName,
    email,
    password,
    location,
    occupation,
  } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    picture,
    location: location || null,
    occupation: occupation || null,
  });
  const user = await newUser.save();

  delete user.password;

  res.status(201).json({
    message: "Success",
  });
});

export const login = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const match = await bcrypt.compare(password, user ? user.password : "");
  if (user && match) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    return res.status(200).json({
      message: "Success",
      token,
      user,
    });
  }

  next(ErrorMessage(401, " Incorrect Email Or Password "));
});
