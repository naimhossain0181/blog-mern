import  express from 'express'
import {CreateUser,LoginUser} from "../controllers/user__controller.js";

const router= express.Router()

//user
router.post("/signup",CreateUser)
router.post("/login",LoginUser)






export default  router