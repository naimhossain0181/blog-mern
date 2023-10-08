import  express from 'express'
import {CreateUser,LoginUser,getUserByid,changeProfilePicture} from "../controllers/user__controller.js";
import {authVerification} from "../middlewares/verifyAuth.js";

const router= express.Router()

//user
router.get("/:id", getUserByid)
router.post("/signup",CreateUser)
router.post("/login",LoginUser)
router.post("/changePic",authVerification,changeProfilePicture)






export default  router