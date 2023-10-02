import mongoose from 'mongoose'

 const CommentSchema =new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },

    auth:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type:String,
        require:true
    },

},{timestamps:true,versionKey:false})

const model = mongoose.model("Comment",CommentSchema)

export default model