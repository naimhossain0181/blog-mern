import mongoose from 'mongoose'

 const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim: true,
    },
    email:{
        type: String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require: true,
    },
    image:{
        type:String,
        default:"https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png"
    },
     public_id: {
         type:String,
         default:""
     },
    posts:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
        }
    ],

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    block:{
        type:Boolean,
        default:false
    }
},{timestamps:true,versionKey:false})

const model= mongoose.model("User",UserSchema)

export default model