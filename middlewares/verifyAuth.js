import jwt from 'jsonwebtoken'

export const authVerification =async (req,res,next)=>{
    const token=req.headers.token
    try{

    if (token){
       const user= jwt.verify(token,process.env.Secret)
        if (user.role==="user" && user.block===false ||user.role==="admin"){
            req.user=user
            next()
        }
        else {
            if (!user.block===false){
                return res.status(401).json("You are suspended");
            }
            else {
                return res.status(401).json("Token is Expired");
            }

        }
    }
    else {
        return res.status(404).json("You are Unauthorized");
    }
    }
    catch (err) {
        return res.status(401).json("You are not authenticated");
    }
}

export const isAdminVerification=async (req,res,next)=>{
    const token=req.headers.token

    try{

        if (token){
            const user= jwt.verify(token,process.env.Secret)
            if (user.role==="admin"){
                req.user=user
                next()
            }
            else {
                return res.status(401).json("Token is Expired ");
            }
        }
        else {
            return res.status(401).json("You are not authenticated");

        }
    }
    catch (err) {
        return res.status(401).json("You are not authenticated");
    }
}
