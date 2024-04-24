import express from 'express';
import { Authentication } from "../middlewares/Auth/Authentication.js";
import { checkCommentPermission } from '../middlewares/Auth/CheckCommentPermission.js';
import { checkCommentOwner } from '../middlewares/Auth/CheckCommentOwner.js';
import createCommentValidator from '../middlewares/Validations/createCommentValidator.js';
import { validPostId } from '../middlewares/Validations/ValidPostId.js';
import { validCommentId } from '../middlewares/Validations/ValidCommentId.js';
import { validPageNumber } from '../middlewares/Validations/ValidPageNumber.js';
import {
    getPostComments,
    getCommentReplies,
    getCommentById,
    createComment,
    updateComment,
    likeComment,
    deleteComment,
} from "../controllers/Comment.js"
import { upload } from '../utils/FileUpload.js';

const router = express.Router();

router.get("/post_comments/:postId/:page", validPostId, validPageNumber, getPostComments);
router.get("/replies/:commentId/:page", validCommentId, validPageNumber, getCommentReplies)
router.get("/:commentId", validCommentId, getCommentById)
router.post("/onPost/:postId", upload.single("pictureComment"), Authentication, validPostId, createCommentValidator, createComment);
router.post("/onComment/:commentId", upload.single("pictureComment"), Authentication, validCommentId, createCommentValidator, createComment);
router.patch("/:commentId", upload.single("pictureComment"), Authentication, validCommentId, checkCommentOwner, createCommentValidator, updateComment)
router.patch("/:commentId/like", Authentication, validCommentId, likeComment);
router.delete("/:commentId", Authentication, validCommentId, checkCommentPermission, deleteComment);

export default router;