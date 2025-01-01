import express from 'express';
import { auth } from '../middleware/auth';
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  commentOnPost
} from '../controllers/postController';

const router = express.Router();
router.use(auth as any);
router.post('/', createPost as any);
router.get('/', getPosts as any);
router.put('/:id', updatePost as any);
router.delete('/:id', deletePost as any);
router.post('/:id/like', likePost as any);
router.post('/:id/comment', commentOnPost as any);

export default router;