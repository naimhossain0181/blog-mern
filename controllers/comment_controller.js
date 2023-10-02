import PostSchema from '../model/post_model.js'
import CommentSchema from '../model/comment_model.js'

export const CreateComment =async (req,res)=>{
    const {postId}=req.params
    try{
        const post = await PostSchema.findById(postId)
        if (post){
            const comment = await new CommentSchema({
                post:post._id,
                auth:req.user._id,
                comment:req.body.comment
            }).save()

            //include comment in the post
            await PostSchema.findByIdAndUpdate(post._id,{$addToSet:{comments:comment._id}})

            return res.status(201).json({status:"Comment Done",result:comment})
        }
        else {
            return res.status(201).json({status:"Failed",result:"Post Not Found"})
        }

    }catch (err) {
        return res.status(500).json({status:"Error",message:err})
    }
}

//Get Comment By Id

export const GetAllComment =async (req,res)=>{
    console.log(" All")

    try{
        const comment = await CommentSchema.find({})
        if (comment){
            return res.status(201).json({status:"Comment Found",result:comment})
        }
        else {
            return res.status(201).json({status:"Failed",result:"Comment Not Found"})
        }

    }catch (err) {
        return res.status(500).json({status:"Error",message:err})
    }
}

//Get Comment By Id

export const GetSingleComment =async (req,res)=>{
    const {commentId}=req.params
    try{
        const comment = await CommentSchema.findById(commentId)
        if (comment){

            return res.status(201).json({status:"Comment Found",result:comment})
        }
        else {
            return res.status(201).json({status:"Failed",result:"Comment Not Found"})
        }

    }catch (err) {
        return res.status(500).json({status:"Error",message:err})
    }
}

//update comment
export const UpdateComment =async (req,res)=>{
    const {commentId}=req.params
    try {
        const currentComment = await CommentSchema.findById(commentId)

        if (currentComment.auth.toString()===req.user._id.toString() ){
            const doc = await CommentSchema.findOneAndUpdate(currentComment._id,{comment:req.body.comment},{new:true})
            return res.status(200).json({status: "Comment Updated successfully",result:doc})
        }
        else {
            return res.status(403).json({status:"Access Denied",result:"You are not authorized for this action"})
        }

    }catch (err) {
        return  res.status(404).json({status:"Error",result:"Comment Not Found",err:err.message})
    }
}

//delete comment
export const DeleteComment =async (req,res)=>{
    const {commentId}=req.params
    try {
        const currentComment = await CommentSchema.findById(commentId)
            const  postAuth=await  PostSchema.findById(currentComment.post)

        if (currentComment.auth.toString()===req.user._id.toString() || postAuth.author.toString()===req.user._id.toString()){
            await CommentSchema.findOneAndDelete(currentComment._id)
        //   comment pull from post
            const doc = await PostSchema.findOneAndUpdate(currentComment.post,{$pull:{comments:currentComment._id}},{new:true})
            return res.status(200).json({status: "Comment delete successfully",result:doc})
        }
        else {
            return res.status(403).json({status:"Access Denied",result:"You are not authorized for this action"})
        }

    }catch (err) {
        return  res.status(404).json({status:"Error",result:"Comment Not Found",err:err.message})
    }
}