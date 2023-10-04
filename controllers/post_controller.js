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
                as:"author"
            }
        },
        {
            $lookup:{
                from:'categories',   //origin of category
                localField:"category", //which field we want to populate
                foreignField:"_id", //Type of filed
                as:"category"
            }
        },

        {
            $unwind:"$author",

        },
        {
            $unwind:"$category",

        },
        {
            $lookup:{
                from:'posts',   //origin of author
                localField:"author.posts", //which field we want to populate
                foreignField:"_id", //Type of filed
                as:"author.posts"
            }
        },
        {
            $match:{
                "author.block":false
            }
        },
        // Exclude the  field from 'author'
        {
            $project: {
                'author.password': 0 ,
                'author.email': 0 ,
                'author.role': 0 ,
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

    const post = await  PostSchema
  .findById(id)
  .populate({
    path: 'author',
    model: UserSchema, // Replace with the actual model name if it's different
    select:'-password -email -role ',
    populate: {
      path: 'posts',
      model: PostSchema, // Replace with the actual model name if it's different
    },
  }).populate({path:'category'})
  .exec();

    try{
        // const post = await PostSchema.findById(id).populate('author','-email -password -role').exec().populate('category')
        if (post.author.block !==true){
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