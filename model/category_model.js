import mongoose from 'mongoose'

 const CategorySchema =new mongoose.Schema({
    name:{
        type: String,
        require: [true , "category name must require"]
    },

    icon:{
        type:String,
        default:"https://icon-library.com/images/category-icon-png/category-icon-png-8.jpg"
    },

},{timestamps:true,versionKey:false})
    const model=mongoose.model("Category",CategorySchema)
export default model