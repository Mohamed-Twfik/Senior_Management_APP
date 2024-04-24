import express from "express";
import { Authentication } from "../middlewares/Auth/Authentication.js";
import { checkAdmin } from "../middlewares/Auth/checkAdmin.js";
import { validTagId } from "../middlewares/Validations/ValidTagId.js";
import { validPageNumber } from "../middlewares/Validations/ValidPageNumber.js";
import createTagValidator from "../middlewares/Validations/createTagValidator.js";
import updateTagValidator from "../middlewares/Validations/updateTagValidator.js";
import { getAllTags, getTagById, createTag, updateTag, deleteTag, searchAllTags } from "../controllers/Tag.js";

const router = express.Router();

router.get("/searchTags",Authentication,searchAllTags)
router.get("/:page",validPageNumber, getAllTags)
router.get("/:tagId", Authentication, validTagId, getTagById);
router.post("/", Authentication, checkAdmin, createTagValidator, createTag);
router.patch("/:tagId", Authentication, checkAdmin, validTagId, updateTagValidator, updateTag);
router.delete("/:tagId", Authentication, checkAdmin, validTagId, deleteTag);

export default router;