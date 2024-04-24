import Tag from "../models/Tag.js";
import Post from "../models/Post.js";
import { catchError } from "../utils/catchAsyncError.js";

export const rankTags = catchError(async (req, res, next)=>{
    const tags = await Tag.find().sort({postsNumber: "desc"}).limit(5);
    res.status(200).json({
        message: "Ranking Tags",
        tags
    });
});

export const rankPosts = catchError(async (req, res, next)=>{
    const posts = await Post.find().sort({points: "desc"}).limit(5);
    res.status(200).json({
        message: "Ranking Posts",
        posts
    });
});