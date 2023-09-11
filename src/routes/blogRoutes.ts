import { Router } from 'express';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/BlogController';
import { verifyToken } from '../middleware/authMiddleware';
import { loginUser, registerUser } from '../controllers/UserController';
import upload from '../middleware/upload';



const router = Router();


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/',verifyToken, getBlogs);
router.get('/:id', getBlog);
router.post('/',verifyToken, upload.single('image'), createBlog);
router.put('/:id',verifyToken, upload.single('image'), updateBlog);
router.delete('/:id', deleteBlog);




export default router;
