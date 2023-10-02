import  express from 'express'
import {isAdminVerification} from "../middlewares/verifyAuth.js";
import {createNewCategory,GetAllCategory,UpdateCategory} from "../controllers/category_controller.js";

const router= express.Router()


router.post("/createNewCategory",isAdminVerification,createNewCategory)
router.post("/:id",isAdminVerification,UpdateCategory)
router.get("/all",GetAllCategory)




export default  router