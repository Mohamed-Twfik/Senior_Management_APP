import Comment from "../../models/Comment.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";

export const validCommentId = catchError(async (req, res, next)=>{
    const {commentId} = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) return next(ErrorMessage(403, "Invalid CommentId"));
    req.comment = comment
    next();
})