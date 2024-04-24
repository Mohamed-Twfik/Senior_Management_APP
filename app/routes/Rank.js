import express from 'express';
import { rankTags, rankPosts } from '../controllers/Rank.js';

const router = express.Router();

router.get("/tags", rankTags);
router.get("/posts", rankPosts)

export default router;