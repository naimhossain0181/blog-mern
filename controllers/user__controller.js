import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserSchema from '../model/user__model.js'

export const CreateUser = async (req,res)=>{
    const bodyData={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password}
    try {
        const isExist= await UserSchema.findOne({email:bodyData.email})
        if (!bodyData.name){
            return  res.status(404).json({error:"Name Is require"})
        }
        else if (!bodyData.email){
            return  res.status(404).json({error:"Email Is require"})
        }
        else if (!bodyData.password || bodyData.password.length<6){
            return  res.status(404).json({error:"Password min 6 require"})
        }

        else if (isExist){
            return  res.status(404).json({error:"Email Is Already Exist"})
        }
        else {
            const hashPassword=  await bcrypt.hash(req.body.password,10)
            const user = await  new UserSchema({...bodyData,password:hashPassword})
            const data = await user.save()
            return   res.status(201).json({status:"Success",result:data})
        }

    }

    catch (err) {
       return   res.status(500).json({status:"Failed",message:err})
    }
}

export const LoginUser = async (req,res)=>{
    try{
        const {email,password}=req.body

        const user = await UserSchema.findOne({email:email})

        if (user===null ){
            return res.status(404).json({status:"email or password incorrect"})
        }

        const userMatch= await bcrypt.compare(password,user.password)
        if (user && userMatch ){
            const {name,email,_id,role,block}= user
            let token= await jwt.sign({_id,name,email,role,block}, process.env.Secret,{ expiresIn: '24h' })
            return res.status(200).json({status:"User Authorized",token:token})
        }

        else {
            return res.status(500).json({status:"email or password incorrect"})
        }
    }
    catch (err) {
        return   res.status(500).json({status:"Server Error",message:err})
    }


}