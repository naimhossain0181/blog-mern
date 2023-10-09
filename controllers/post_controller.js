import PostSchema from '../model/post_model.js'
import UserSchema from '../model/user__model.js'
import cloudFileUploader from "../utilitis/cloudinarySetup.js";


export const CreatePost=async (req,res)=>{
    const {title,desc,image,category,author}=req.body
    try {
        if (!req.file || req.file.length<0 || req.file===""){
           return  res.status(501).json("Please Select A Post Image")
        }
        else {
            const result = await cloudFileUploader(req.file.path,req.user.email,`Post_${Date.now()*1000}`)
            console.log(result)
            const post = await new PostSchema({
                title,
                desc,
                image:result.secure_url,
                public_id:result.public_id,
                category,
                author:req.user._id
            }).save()


            //   add post to user posts field

            await UserSchema.findByIdAndUpdate(req.user._id,
                {$addToSet:{posts:post._id}})

            return res.status(201).json({status:"Post create success",result:post})
        }

    }
    catch (err) {
        return res.status(500).json({status:"error",message:err.message})
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

//Get Post By Post ID
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
            return res.status(200).json({status:"Success",result:[post]})
        }
        else {
            return res.status(404).json({status:"Success",result:"Post Not Found"})

        }

    }
    catch (err) {
        return res.status(500).json({status:Error,message:err.message})
    }
}


//Get Post By user ID
export const GetPostByUserId=async (req,res)=>{
    const {userId}=req.params

    try{

        const post = await  PostSchema
        .find({author:userId})
        if (post){
            return res.status(200).json({status:"Success",result:post})
        }
        else {
            return res.status(404).json({status:"Success",result:"Post Not Found"})

        }
    }
    catch(err){
        return res.status(500).json({status:err,message:err.message})
    }

}


//update post
export const UpdatePost =async (req,res)=>{
    const {id}=req.params
    const {title,desc,image,category,author}=req.body


    try {
        const current_post = await PostSchema.findById(id)
        if (current_post.author.toString()===req.user._id.toString()){

            if (req.file){
                const result = await cloudFileUploader(req.file.path,current_post.email,current_post.public_id)
                const data =await PostSchema.findOneAndUpdate(current_post._id, {
                    title:title,
                    image:result.secure_url,
                    public_id: result.public_id,
                    desc:desc,
                    category:category
                },{new:true})
                return   res.status(201).json({status:"Post Updated Successfully with Image",result:data})
            }

            if (!req.file){
                const data =await PostSchema.findOneAndUpdate(current_post._id, {
                    title:title,
                    desc:desc,
                    category:category
                },{new:true})
                return   res.status(201).json({status:"Post Updated Successfully without Image",result:data})
            }
        }

        else {
            return res.status(403).json({status:"Failed",message:"You are not Authorized for This action"})
        }
    }

    catch (err) {
        return res.status(500).json({status:Error,message:err.message})
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