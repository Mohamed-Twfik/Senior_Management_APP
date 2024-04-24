import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Tag from "../models/Tag.js";
import SavedPost from "../models/SavedPosts.js";
import { catchError } from "../utils/catchAsyncError.js";
import { ApiFeature } from "../utils/ApiFeature.js";
import { deleteFileFromCloudinary, addFileToCloudinary } from "../utils/cloudinaryOps.js";

export const getFeedPosts = catchError(async (req, res, next) => {
  const page = req.params.page || 1;
  const totalCount = await Post.countDocuments();
  const apiFeature = new ApiFeature(Post.find(), {page}).paginate();
  const posts = await apiFeature.mongooseQuery.sort({ createdAt: "desc" });
  res.status(200).json({
    message: "All Posts",
    totalCount,
    posts,
  });
});

export const getUserPosts = catchError(async (req, res, next) => {
  const user = req.wantedUser
  const page = req.params.page || 1;
  const apiFeature = new ApiFeature(Post.find({ user: user._id }), {page}).paginate();
  const posts = await apiFeature.mongooseQuery.sort({ createdAt: "desc" });
  const totalCount = await Post.countDocuments({ user: user._id });
  res.status(200).json({
    message: "All Posts",
    posts,
    totalCount
  });
});

export const getTagPosts = catchError(async (req, res, next) => {
  const tags = req.tags;
  const page = req.params.page || 1;
  const sortBy = JSON.parse(req.query.sortBy);
  let apiFeature;
  let posts;
  let totalCount;
  if(tags){
    const tagsIds = tags.map(tag=>tag._id);
    apiFeature = new ApiFeature(Post.find({tags:{$in: tagsIds}}), {page}).paginate();
    totalCount = await Post.countDocuments({ tags: { $in: tagsIds } });
  }else{
    apiFeature = new ApiFeature(Post.find(), {page}).paginate();
    totalCount = await Post.countDocuments();
  }

  if(sortBy){
    posts = await apiFeature.mongooseQuery.sort({ points: "desc" });
  
  }else{
    posts = await apiFeature.mongooseQuery.sort({ createdAt: "desc" });
  }
  res.status(200).json({
    message: "All Posts",
    posts,
    totalCount
  });
});

export const getPostById = catchError(async (req, res, next) => {
  const post = req.post
  
  res.status(200).json({
    message: "Post Found",
    post,
  });
});

export const savePost = catchError(async (req, res, next) => {
  const post = req.post;
  const user = req.user;
  const savedPost = await SavedPost.findOne({user: user._id, post: post._id});
  if(savedPost){
    return res.status(200).json({
      message: "Post already saved",
    });
  }else{
    const savedPost = new SavedPost({user: user._id, post: post._id});
    await savedPost.save();
    return res.status(200).json({
      message: "Post Saved",
    });
  }
});

export const deleteSavedPost = catchError(async (req, res, next) => {
  const user = req.user;
  const post = req.post;
  await SavedPost.findOneAndDelete({$and:[{user: user._id}, {post: post._id}]});
  res.status(200).json({
    message: "Deleted Successfully",
  });
});

export const getSavedPosts = catchError(async (req, res, next) => {
  const user = req.user;
  const page = req.params.page || 1;
  const apiFeature = new ApiFeature(SavedPost.find({user: user._id}), {page}).paginate();
  const savedPosts = await apiFeature.mongooseQuery.sort({ createdAt: "desc" });
  const totalCount = await SavedPost.countDocuments({ user: user._id });
  res.status(200).json({
    message: "All Saved Posts",
    posts: savedPosts,
    totalCount
  });
});

export const createPost = catchError(async (req, res, next) => {
  const { description } = req.body;
  const tags = req.tags;
  const user = req.user;
  const picturePost = [];
  const files = req.files;
  let postData = {};
  if(tags) postData["tags"] = tags;

  if(req.params.postId){
    const post = req.post;
    if(post.originalPost) postData["originalPost"] = post.originalPost;
    else postData["originalPost"] = req.params.postId;
  }

  if(files){
    for (const file of files) {
      const secure_url = await addFileToCloudinary(file);
      picturePost.push(secure_url);
    }
    postData["picturePost"] = picturePost;
  }

  postData["user"] = user._id;
  postData["description"] = description;

  const newPost = new Post(postData);
  await newPost.save();
  
  if(tags){
    for (let i = 0; i < tags.length; i++) {
      const tagId = tags[i]._id;
      await Tag.findByIdAndUpdate(tagId, {$inc: {postsNumber: 1}});
    }
  }

  res.status(200).json({
    message: "added successfully",
    post: newPost,
  });
});

export const sharePost = catchError(async (req, res, next) => {
  const { description } = req.body;
  const user = req.user;
  const postData = {};
  const post = req.post;

  if(post.originalPost) postData["originalPost"] = post.originalPost;
  else postData["originalPost"] = post._id;
  
  postData["user"] = user._id;
  postData["description"] = description || [];
  
  await Post.findByIdAndUpdate(postData["originalPost"], {$inc: {points: 5, shareNumber: 1}});
  const newPost = new Post(postData);
  await newPost.save();

  res.status(200).json({
    message: "shared successfully",
    post: newPost,
  });
});

export const updatePost = catchError(async (req, res, next) => {
  const post = req.post;
  const { description } = req.body;
  const tags = req.tags;
  const picturePost = [];
  const files = req.files;
  let postData = {};

  const oldTags = post.tags;
  if (oldTags) {
    for (const tag of oldTags) {
      await Tag.findByIdAndUpdate(tag._id, {
        $inc: { postsNumber: -1 }
      });
    }
  }

  if(tags) {
    postData["tags"] = tags;
    for (const tag of tags) {
      await Tag.findByIdAndUpdate(tag._id, {
        $inc: { postsNumber: 1 }
      });
    }
  } else postData["tags"] = [];

  if(req.body.picturePost) postData["picturePost"] = req.body.picturePost;
  else {
    if(files){
      if(post.picturePost.length > 0){
        post.picturePost.forEach(async (file) => {
          deleteFileFromCloudinary(file);
        });
      }
      for (const file of files) {
        const secure_url = await addFileToCloudinary(file);
        picturePost.push(secure_url);
      }
      postData["picturePost"] = picturePost;
    } else postData["picturePost"] = post.picturePost;
  }

  postData["description"] = description || post.description;
  const updatedPost = await Post.findByIdAndUpdate(
    post._id,
    postData,
    { new: true }
  );

  // const oldTags = post.tags;
  // if (oldTags) {
  //   for (const tag of oldTags) {
  //     await Tag.findByIdAndUpdate(tag._id, {
  //       $inc: { postsNumber: -1 }
  //     });
  //   }
  // }

  // if (tags) {
  //   for (const tag of tags) {
  //     await Tag.findByIdAndUpdate(tag._id, {
  //       $inc: { postsNumber: 1 }
  //     });
  //   }
  // }

  res.status(200).json({
    message: "Update Successfully",
    post: updatedPost,
  });
});

export const likePost = catchError(async (req, res, next) => {
  const post = req.post;
  const user = req.user;
  let numberOfLikes = post.numberOfLikes;
  let points = post.points;
  const isLiked = post.likes.get(user._id);
  if (isLiked) {
    post.likes.delete(user._id);
    numberOfLikes = numberOfLikes - 1;
    points = points - 1;
  } else {
    post.likes.set(user._id, true);
    numberOfLikes = numberOfLikes + 1;
    points = points + 1;
  }
  const updatedPost = await Post.findByIdAndUpdate(
    post._id,
    { likes: post.likes, numberOfLikes, points },
    { new: true }
  );
  res.status(200).json({
    message: "Like Successfully",
    post: updatedPost,
  });
});

export const deletePost = catchError(async (req, res, next) => {
  const post = req.post;
  const tags = await Tag.find({ _id: { $in: post.tags } });
  const deletedPost = await Post.findOneAndDelete({ _id: post._id });

  if(deletedPost.originalPost){
    await Post.findByIdAndUpdate(deletedPost.originalPost, {$inc: {points: -5, shareNumber: -1}});
  }

  if (tags) {
    for (let i = 0; i < tags.length; i++) {
      const tagId = tags[i]._id;
      await Tag.findByIdAndUpdate(tagId, {$inc: {postsNumber: -1}});
    }
  }

  await Comment.deleteMany({ post: post._id });
  if (deletedPost.picturePost.length > 0) {
    deletedPost.picturePost.forEach(async (file) => {
      deleteFileFromCloudinary(file);
    });
  }
  res.status(200).json({
    message: "Delete Successfully",
  });
});