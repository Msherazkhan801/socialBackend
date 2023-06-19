import express from "express";
import { followers, getUser ,getUserDelete,getUserUpdate,unFollow} from "../controller/getUserController.js";

const router = express.Router();

router.get('/:id',getUser)
router.put('/:id',getUserUpdate)
router.delete('/:id',getUserDelete)
router.put('/:id/follow',followers)
router.put('/:id/unfollow',unFollow)


export default router