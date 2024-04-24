import Post from "../../models/Post.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";

export const validPostId = catchError(async (req, res, next)=>{
    const {postId} = req.params;
    const post = await Post.findById(postId);
    if (!post) return next(ErrorMessage(403, "Invalid PostId"));
    req.post = post
   
    next();
})