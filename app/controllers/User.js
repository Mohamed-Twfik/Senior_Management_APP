import User from "../models/User.js";
import bcrypt from "bcrypt";
import sendMail from "../utils/nodeMail.js";
import { catchError } from "../utils/catchAsyncError.js";
import { ErrorMessage } from "../utils/ErrorMessage.js";
import { ApiFeature } from "../utils/ApiFeature.js";
import { deleteFileFromCloudinary, addFileToCloudinary } from "../utils/cloudinaryOps.js";

function generateCode (length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
      code += characters.charAt (Math.floor(Math.random() * characters.length));
  }
  return code;
}

/* READ */
export const getUser = catchError(async (req, res, next) => {
  const user = req.wantedUser
  res.status(200).json({
    message: "User Found",
    user,
  });
});

export const getAllUser = catchError(async (req, res, next) => {
  const {page} = req.params;
  const apiFeature = new ApiFeature(User.find({}, {friends: 0}), {page}).paginate();
  const users = await apiFeature.mongooseQuery;
  const totalCount = await User.countDocuments();
  res.status(200).json({
    message: "All Users",
    users,
    totalCount
  });
});

// export const getUserFriends = catchError(async (req, res, next) => {
//   const user = req.wantedUser;
//   const userFriends = await User.findById(user._id).select({friends: 1, _id:0});
//   let result = [];

//   for (const [key, value] of userFriends.friends) {
//     if(value){
//       const friend = await User.findById(key, {friends: 0});
//       result.push(friend);
//     }
//   }

//   let page = req.params.page * 1 || 1;
//   const limit = 2;
//   const skip = (page - 1) * limit;
//   result = result.slice(skip, skip + limit);

//   res.status(200).json({
//     message: "All User Friends",
//     totalCount: result.length,
//     friends: result,
//   });
// });

/* UPDATE */
export const updateUser = catchError(async (req, res, next) => {
  let user = req.user;
  const file = req.file;

  const firstName = req.body.firstName || user.firstName;
  const lastName = req.body.lastName || user.lastName;
  const email = req.body.email || user.email;
  const location = req.body.location || user.location;
  const occupation = req.body.occupation || user.occupation;
  const skill = req.body.skill;
  let picture = user.picture;

  // check if the file uploaded
  if (file) {
    if(picture){
      deleteFileFromCloudinary(picture);
    }
    const secure_url = await addFileToCloudinary(file);
    picture = secure_url;
  }
  if(skill){
    await User.findByIdAndUpdate(user._id, {
      $addToSet: {skills: skill}
    }, {new: true});
  }
  user = await User.findByIdAndUpdate(user._id, {
    firstName,
    lastName,
    email,
    picture,
    location,
    occupation,
  }, {new: true, select: {friends: 0}});

  res.status(200).json({
    message: "User Updated",
    user,
  });
});

export const deleteSkill = catchError(async (req, res, next)=>{
  const user = req.user;
  const skill = req.body.skill;
  const newUser = await User.findByIdAndUpdate(user._id, {
    $pull:{skills: skill}
  }, {new: true});

  res.status(200).json({
    message: "Skill Deleted",
    newUser,
  });
});

export const updatePassword = catchError(async (req, res, next) => {
  const user = req.user;
  const {oldPassword, newPassword} = req.body;
  if(oldPassword === newPassword){
    next(ErrorMessage(404, `old password and new password are the same`));
  }
  const match = await bcrypt.compare(oldPassword, user ? user.password : "");
  if(!match){
    next(ErrorMessage(404, `old password is wrong`));
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    message: "Password Updated",
  });
});

export const sendCodeToEmail = catchError(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({email: email});
  if(!user) next(ErrorMessage(401, " Email Not Found! "));
  const code = generateCode(6);
  let message = `Hello ${user.firstName} ${user.lastName}, code for reset password is ${code}`;
  let subject = "Reset Password";
  user.code = code;
  await user.save();
  sendMail(email, subject, message)
  res.status(200).json({
    message: "Code Sent",
  });
});

export const resetPassword = catchError(async (req, res, next) => {
  const {code, password, email} = req.body;
  const user = await User.findOne({email:email});
  if(code !== user.code) next(ErrorMessage(404, `code is wrong`));
  user.password = password;
  delete user.code;
  await user.save();
  res.status(200).json({
    message: "Password Updated",
  });
});

// export const addRemoveFriend = catchError(async (req, res, next) => {
//   const user = req.user;
//   const friend = req.wantedUser;

//   const friendShip = await Friend.find({user: user._id, friend: friend._id});

//   if(friendShip){
//     await Friend.findByIdAndDelete(friendShip._id)
//   }else{
//     const newFriendShip = new Friend({user: user._id, friend: friend._id});
//     await newFriendShip.save();
//   }
//   res.status(200).json({
//     message: "done",
//     user,
//   });
// });

/* DELETE */
export const deleteUser = catchError(async (req, res, next) => {
  const user = req.user;
  await User.findByIdAndDelete(user._id);
  res.status(200).json({
    message: "User Deleted",
  });
});
