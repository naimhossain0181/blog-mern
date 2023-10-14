import axios from "axios";
import { useState } from "react";
import { base_URL } from "../../utilitis/baseUrl";
import { ToastContainer, toast } from "react-toastify";

const Setting = () => {
    const [prevImage,setPrevImage]=useState<any>()
    const [file,setFile]=useState<any>()
    const  uploadHanddler =(e:any)=>{
        setFile(e.target.files[0])
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload=(e)=>{
                setPrevImage(e.target?.result)
            }
    }


    const submitHanddler =(e:any)=>{
        e.preventDefault()
        const token=localStorage.getItem('token')
        const formData= new FormData()
        formData.append('image',file)
        axios.post(`${base_URL}/users/changePic`, formData ,{ headers:{
            token:token,
            "Content-Type": "multipart/form-data"
        }}).
        then((response)=>toast(response.data.status)).
        catch((e)=>console.log(e))
    }

    return (
        <div>
            <ToastContainer/>
            <h1 className=" text-yellow-300">Change Your Profile Picture</h1>
            <form action="" onSubmit={submitHanddler}>
                <input type="file" onChange={uploadHanddler} />
                <button className=" w-[120px]  rounded-md shadow-md bg-green-600 text-white" type="submit" >Change Your Picture</button>
            </form>
           <img className=" w-[220px] h-[180px]" src={prevImage} alt="" />
        </div>
    );
};

export default Setting;