import express from 'express';
import { Authentication } from "../middlewares/Auth/Authentication.js";
import { checkPostOwner } from '../middlewares/Auth/CheckPostOwner.js';
import { checkPostPermission } from '../middlewares/Auth/CheckPostPermission.js';
import createPostValidator from "../middlewares/Validations/createPostValidator.js";
import validPostTags from '../middlewares/Validations/postTagsValidator.js';
import { validUserId } from '../middlewares/Validations/ValidUserId.js';
import { validPostId } from '../middlewares/Validations/ValidPostId.js';
import { validPageNumber } from '../middlewares/Validations/ValidPageNumber.js';
import {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost,
    deletePost,
    updatePost,
    getPostById,
    getTagPosts,
    savePost,
    getSavedPosts,
    deleteSavedPost,
    sharePost
} from "../controllers/Post.js";
import { upload } from "../utils/FileUpload.js";


const router = express.Router();

router.get("/all/:page", validPageNumber, getFeedPosts);
router.get("/user_posts/:userId/:page", validUserId, validPageNumber, getUserPosts);
router.get("/tag_posts/:page", validPostTags, validPageNumber, getTagPosts);
router.get("/:postId", validPostId, getPostById);

router.get("/save/:postId", Authentication, validPostId, savePost);
router.delete("/save/:postId", Authentication, validPostId, deleteSavedPost)
router.get("/saved_posts/:page", Authentication, validPageNumber, getSavedPosts);

router.post("/addPost", upload.array("picturePost"), Authentication, createPostValidator, validPostTags, createPost);
router.patch("/:postId", upload.array("picturePost"), Authentication, validPostId, checkPostOwner, createPostValidator, validPostTags, updatePost)
router.patch("/:postId/like", Authentication, validPostId, likePost);
router.delete("/:postId", Authentication, validPostId, checkPostPermission, deletePost);

router.post("/share/:postId", Authentication, validPostId, sharePost);

export default router;