import express from 'express';
import { signIn, verifyToken } from '../controllers/auth.js';

const router = express.Router();

router.post('/signin', signIn);
router.get('/verify', verifyToken)

export default router;