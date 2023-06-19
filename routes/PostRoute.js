import express from "express";
import {createPost,getPost,updatePost,deletePost,disLikePost,likePost,getTimeline} from "../controller/postController.js"
const router = express.Router();

router.post('/',createPost)
router.get('/:id',getPost)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)
router.delete('/:id/like',likePost)
router.delete('/:id/dislike',disLikePost)
router.get('/:id/timeline',getTimeline)



export default router