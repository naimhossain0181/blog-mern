import  express from 'express'

import {authVerification} from "../middlewares/verifyAuth.js";
import {CreateComment,GetAllComment,GetSingleComment,DeleteComment,UpdateComment} from "../controllers/comment_controller.js";

const router= express.Router()


//comment
router.get("/all",GetAllComment)
router.get("/:commentId",GetSingleComment)
router.post("/:postId",authVerification,CreateComment)
router.delete("/:commentId",authVerification,DeleteComment)
router.put("/:commentId",authVerification,UpdateComment)




export default  router