import express from 'express';
import multer from 'multer';

import { allPosts, createPost, deletePost, getPost } from '../controllers/posts.js';
import AuthGuard from '../middleware/auth.guard.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', allPosts);
router.get('/:id', getPost);
router.post('/', AuthGuard, upload.single('thumbnail'), createPost);
router.delete('/:id', AuthGuard, deletePost);

export default router;