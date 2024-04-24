import User from "../../models/User.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const Authentication = catchError(async (req, res, next) => {
  //! [1] check if send token
  let token = req.headers.authorization;
  if (!token) return next(ErrorMessage(401, "Not Token Found"));
  
  //! [2] check if token valid or not
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  let user = await User.findById(decoded.id);
  if (!user) return next(ErrorMessage(401, "Invalid Token"));

  //! [3] when user change password compare time
  // if (user.changePasswordAt) {
  //   let changePasswordDate = parseInt(user.changePasswordAt.getTime() / 1000);
  //   if (changePasswordDate > decoded.iat)
  //     return next(ErrorMessage(401, "Password Changed"));
  // }

  //! to send user for next middleware (allowedTo) to check on user.role
  req.user = user;
  next();
});