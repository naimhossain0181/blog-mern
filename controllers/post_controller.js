import PostSchema from '../model/post_model.js'
import UserSchema from '../model/user__model.js'


export const CreatePost=async (req,res)=>{
    const {title,desc,image,category,author}=req.body
    try {
        const post = await new PostSchema({
            title,
            desc,
            image,
            category,
            author:req.user._id
        }).save()


    //   add post to user posts field

             await UserSchema.findByIdAndUpdate(req.user._id,
            {$addToSet:{posts:post._id}})

        return res.status(201).json({status:"Post create success",result:post})
    }
    catch (err) {
        return res.status(500).json({status:Error,message:err})
    }

}


//get post

export const GetPost=async (req,res)=>{
    //if user is blocked
    const Pipeline=[
        {
            $lookup:{
                from:'users',   //origin of author
                localField:"author", //which field we want to populate
                foreignField:"_id", //Type of filed
                as:"authorInfo"
            }
        },
        {
            $lookup:{
                from:'categories',   //origin of author
                localField:"category", //which field we want to populate
                foreignField:"_id", //Type of filed
                as:"categoryInfo"
            }
        },
        {
            $unwind:"$authorInfo",

        },
        {
            $unwind:"$categoryInfo",

        },
        {
            $match:{
                "authorInfo.block":false
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                desc: 1,
                image:1,
                author:1,
                views:1,
                likes:1,
                comments:1,
                createdAt:1,
                category:"$categoryInfo.name",
                block: '$authorInfo.block',
                authorName:'$authorInfo.name',
                authorImage:'$authorInfo.image',
            }
        }
    ]
    try{
        const posts = await PostSchema.aggregate(Pipeline)

        if (posts.length >=1){
            return res.status(200).json({status:"Success",result:posts})
        }
        else {
            return res.status(404).json({status:"Success",result:"Post Not Available"})

        }

    }
    catch (err) {
        return res.status(500).json({status:Error,message:err})
    }
}

//Get Post By ID
export const GetPostById=async (req,res)=>{
    const {id}=req.params
    try{
        const post = await PostSchema.findById(id)
        if (post){
            await PostSchema.findByIdAndUpdate(post._id,{views:post.views+1})
            return res.status(200).json({status:"Success",result:post})
        }
        else {
            return res.status(404).json({status:"Success",result:"Post Not Found"})

        }

    }
    catch (err) {
        return res.status(500).json({status:Error,message:err.message})
    }
}


//update post
export const UpdatePost =async (req,res)=>{
    const {id}=req.params
    try {
        const current_post = await PostSchema.findById(id)
        if (current_post.author.toString()===req.user._id.toString()){
            const data =await PostSchema.findOneAndUpdate(current_post._id,req.body,{new:true})
           return   res.status(201).json({status:"Post Updated Successfully",result:data})
        }
        else {
            return res.status(403).json({status:"Failed",message:"You are not Authorized for This action"})
        }
    }

    catch (err) {
        return res.status(500).json({status:Error,message:err})
    }
}

//Delete post
export const DeletePost =async (req,res)=>{
    const {id}=req.params
    try {
        const current_post = await PostSchema.findById(id)
        if (current_post.author.toString()===req.user._id.toString()){
            await PostSchema.findOneAndDelete(current_post._id)

           // Pull From the User Post List
           const result= await UserSchema.findByIdAndUpdate(req.user._id,{$pull:{posts:current_post._id}},{new:true})

            return   res.status(201).json({status:"Post DeleteSuccessfully",result:result})
        }
        else {
            return res.status(403).json({status:"Failed",message:"You are not Authorized for This action"})
        }
    }

    catch (err) {
        return res.status(500).json({status:Error,message:err})
    }
}