import User from "../../models/User.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";

export const validUserId = catchError(async (req, res, next)=>{
    const userId = req.params.userId || req.params.friendId;
    const user = await User.findById(userId);
    if (!user) return next(ErrorMessage(403, "Invalid Id"));
    req.wantedUser = user;
    next();
})