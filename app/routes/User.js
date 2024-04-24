import express from 'express';
import { Authentication } from '../middlewares/Auth/Authentication.js';
import { validUserId } from '../middlewares/Validations/ValidUserId.js';
import { validPageNumber } from '../middlewares/Validations/ValidPageNumber.js'
import updateUserValidator from '../middlewares/Validations/updateUserValidator.js';
import resetPasswordValidator from '../middlewares/Validations/resetPasswordValidator.js';
import {
    getUser,
    // getUserFriends,
    // addRemoveFriend,
    getAllUser,
    updateUser,
    deleteUser,
    updatePassword,
    resetPassword,
    sendCodeToEmail,
    deleteSkill
} from "../controllers/User.js";
import { upload } from "../utils/FileUpload.js";

const router = express.Router();

router.get("/:userId", validUserId, getUser);
router.get("/all/:page", Authentication, validPageNumber, getAllUser);
router.patch("/update", upload.single("picture"), Authentication, updateUserValidator, updateUser);
router.patch("/deleteSkill", Authentication, deleteSkill);
router.delete("/delete", Authentication, deleteUser);

router.post("/password/requestToReset", resetPasswordValidator, sendCodeToEmail);
router.patch("/password/update", Authentication, updatePassword);
router.patch("/password/reset", resetPassword);

// router.get("/:userId/friends/:page", validUserId, validPageNumber, getUserFriends);
// router.patch("/:friendId/friends", Authentication, validUserId, addRemoveFriend);

export default router;