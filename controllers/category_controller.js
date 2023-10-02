import CategorySchema from '../model/category_model.js'
export const createNewCategory=async (req,res)=>{
    const {name,icon}=req.body
    try{
        if (!name){
           return  res.status(500).json({status:"name is require"})
        }
        else {
            const category=await new CategorySchema({name,icon})
            const data=await category.save()
            return res.status(201).json({status:"success",data:data})
        }
    }
    catch (err) {
        return res.status(500).json({status:"Failed",err})
    }

}

//get all category
export const GetAllCategory =async (req,res)=>{
    try {
        const categories= await CategorySchema.find()
        return res.json({status:"Success",result : categories})
    }catch (err) {
        return res.status(500).json({status:"Failed",message:err.message})

    }
}

//update category
export const UpdateCategory =async (req,res)=>{
    const {id}=req.params
    const {name,icon}=req.body
    const currentComment=await CategorySchema.findById(id)
    try {
        const doc = await CategorySchema.findOneAndUpdate(currentComment._id,{name,icon},{new:true})
        console.log(doc)
        return res.status(201).json({status:"Category Update Successfully",result:doc})
    }catch (e) {
        return res.status(201).json({status:"Category Update Failed",result:e.message})

    }
}