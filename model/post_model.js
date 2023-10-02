import mongoose from 'mongoose'

 const PostSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true,
        trim: true,
        max:64
    },

    desc:{
        type: String,
        require: true,
        trim:true
    },

    image: {
        type: String,
        default:"https://www.onlygfx.com/wp-content/uploads/2020/07/blank-post-it-note-1.png"
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author must required"],
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "post category is required"],
    },

    views: {
        type:Number,
        default: 0
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],


},{timestamps:true,versionKey:false})

const model=mongoose.model("Post",PostSchema)

export default model