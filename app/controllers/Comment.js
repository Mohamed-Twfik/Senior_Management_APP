import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { catchError } from "../utils/catchAsyncError.js";
import { ApiFeature } from "../utils/ApiFeature.js";
import { deleteFileFromCloudinary, addFileToCloudinary } from "../utils/cloudinaryOps.js";

export const getPostComments = catchError(async (req, res, next) => {
    const post = req.post
    const page = req.params.page || 1;
    const totalCount = await Comment.countDocuments({$and:[{ post: post._id }, {parentCommentId: null}]});
    const apiFeature = new ApiFeature(Comment.find({$and:[{ post: post._id }, {parentCommentId: null}]}), {page}).paginate();
    const comments = await apiFeature.mongooseQuery.sort({ createdAt: "desc" });
    res.status(200).json({
        message: "All Comments",
        comments,
        totalCount,
    });
});

export const getCommentReplies = catchError(async(req, res , next) =>{
    const commentId = req.params.commentId;
    const page = req.params.page || 1;
    const totalCount = await Comment.countDocuments({parentCommentId:commentId});
    const apiFeature = new ApiFeature(Comment.find({parentCommentId:commentId}), {page}).paginate();
    const replies = await apiFeature.mongooseQuery.sort({ createdAt: "desc" });
    res.status(200).json({
        message:"replies for a comment",
        replies,
        totalCount
    });
});

export const getCommentById = catchError(async (req, res, next) => {
    const comment = req.comment
    res.status(200).json({
        message: "Comment Found",
        comment,
    });
});

export const createComment = catchError(async (req, res, next) => {
    let post;
    let comment;
    const user = req.user;
    const file = req.file;
    let commentData = {};
    if(file){
        const secure_url = await addFileToCloudinary(file);
        commentData["pictureComment"] = secure_url;
    }
    if(req.params.commentId){
        comment = req.comment;
        commentData["parentCommentId"] = comment._id;
        commentData["post"] = comment.post;
        comment = await Comment.findByIdAndUpdate(
            comment._id,
            {numberOfComments: comment.numberOfComments + 1},
            { new: true }
        );
        post = await Post.findById(comment.post);
    }else if(req.params.postId){
        post = req.post;
        commentData["post"] = post._id;
    }
    commentData["comment"] = req.body.comment;
    commentData["user"] = user._id;
    
    const newComment = new Comment(commentData);
    const updatedPost = await Post.findByIdAndUpdate(
        post._id,
        {numberOfComments: post.numberOfComments + 1, points: post.points + 5},
        { new: true }
    );
    await newComment.save();
    res.status(200).json({
        message: "Comment Successfully",
        comment: newComment,
    });
});

export const updateComment = catchError(async (req, res, next) => {
    const comment = req.comment;
    const file = req.file;
    let commentData = {};
    if(comment.pictureComment) deleteFileFromCloudinary(comment.pictureComment);
    
    if(file){
        const secure_url = await addFileToCloudinary(file);
        commentData["pictureComment"] = secure_url;
    }
    else commentData["pictureComment"] = "";

    commentData["comment"] = req.body.comment;
    commentData["likes"] = {};
    commentData["numberOfLikes"] = 0;

    const updatedComment = await Comment.findByIdAndUpdate(
        comment._id,
        commentData,
        { new: true }
    );

    res.status(200).json({
        message: "Update Successfully",
        comment: updatedComment,
    });
});

export const likeComment = catchError(async (req, res, next) => {
    const comment = req.comment;
    const user = req.user;
    let numberOfLikes = comment.numberOfLikes;
    const isLiked = comment.likes.get(user._id);
    if (isLiked) {
        comment.likes.delete(user._id);
        numberOfLikes = numberOfLikes - 1;
    } else {
        comment.likes.set(user._id, true);
        numberOfLikes = numberOfLikes + 1;
    }
    const updatedComment = await Comment.findByIdAndUpdate(
        comment._id,
        { likes: comment.likes, numberOfLikes },
        { new: true }
    );
    res.status(200).json({
        message: "Like Successfully",
        comment: updatedComment,
    });
});

export const deleteComment = catchError(async (req, res, next) => {
    const comment = req.comment;
    const post = req.post;
    let deletedCount = 0;
    await Comment.findByIdAndDelete(comment._id);
    
    if(comment.parentCommentId){
        deletedCount = 1;
        await Comment.findByIdAndUpdate(
            comment.parentCommentId,
            {$inc: {numberOfComments: -deletedCount}},
            { new: true }
        );
    }else{
        const deletedComments = await Comment.deleteMany({parentCommentId: comment._id});
        deletedCount = deletedComments.deletedCount + 1;
    }
    const updatedPost = await Post.findByIdAndUpdate(
        comment.post,
        {$inc:{numberOfComments: -deletedCount, points: -deletedCount*5}},
        { new: true }
    );
    if(comment.pictureComment) deleteFileFromCloudinary(comment.pictureComment);
    
    res.status(200).json({
        message: "Delete Successfully",
    });
});