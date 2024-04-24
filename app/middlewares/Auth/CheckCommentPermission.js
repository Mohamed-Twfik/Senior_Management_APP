import Post from "../../models/Post.js"
import { catchError } from "../../utils/catchAsyncError.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";

export const checkCommentPermission = catchError(async (req, res, next)=>{
    const comment = req.comment;
    const user = req.user;
    const post = await Post.findById(comment.post);
    if(comment.user._id.toString() !== user._id.toString() && post.user._id.toString() === user._id.toString()) return next(ErrorMessage(401, "Access Denied"));
    req.post = post;
    next();
})