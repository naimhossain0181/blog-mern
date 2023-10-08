import {v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name:process.env.cloudName,
    api_key:process.env.apiKey,
    api_secret:process.env.apiSecret
})


const cloudFileUploader = (file)=>{
    return (
        cloudinary.uploader.upload(file,{
            folder:"blog"
        })
    )
}
export default cloudFileUploader