import { catchError } from "../../utils/catchAsyncError.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";

export const checkCommentOwner = catchError(async (req, res, next)=>{
    const comment = req.comment
    const user = req.user
    if(comment.user._id.toString() !== user._id.toString()) return next(ErrorMessage(401, "Access Denied"));
    next()
})