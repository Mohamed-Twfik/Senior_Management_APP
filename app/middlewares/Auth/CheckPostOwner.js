import { catchError } from "../../utils/catchAsyncError.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";

export const checkPostOwner = catchError(async (req, res, next)=>{
    const post = req.post
    const user = req.user
    if(post.user._id.toString() !== user._id.toString()) return next(ErrorMessage(401, "Access Denied"));
    next()
})