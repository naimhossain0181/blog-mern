import  express from 'express'
import {authVerification,isAdminVerification} from "../middlewares/verifyAuth.js";
import {CreatePost,UpdatePost,DeletePost,GetPost,GetPostById} from "../controllers/post_controller.js";

const router= express.Router()



//post
router.post("/createPost",authVerification,CreatePost)
router.get("/",GetPost)
router.get("/:id",GetPostById)
router.put("/:id",authVerification,UpdatePost)
router.delete("/:id",authVerification,DeletePost)





export default  router