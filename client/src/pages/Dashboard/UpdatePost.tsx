import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { base_URL } from "../../utilitis/baseUrl";
import { toast, ToastContainer } from 'react-toastify';
import { FaCloudUploadAlt } from 'react-icons/fa'
import { useLocation, useParams } from "react-router-dom";

export type category = {
    _id: string
    name: string
    icon: string

}
type initialDataType={
    title:string |null
    desc:string  |null
    category:string |null
}
const UpdatePost = () => {
    const { id } = useParams()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    const InitialVaule= {
        title:searchParams.get('title'),
        desc:searchParams.get('desc'),
        category:searchParams.get('category')
    }

    const [inputValue,setInputValue]=useState<initialDataType >(InitialVaule)
    const [categories, setCategories] = useState<category[]>([])
    // const [loading, setLoading] = useState(false)
    const [percentage, setPercentage] = useState<number>(0)
    const [prevImage, setPrevImage] = useState<any>(searchParams.get('image'))

    const FileInput = useRef<any>(null)

    const handleValueOnchange=(e:any)=>{
        const { name, value } = e.target;
            setInputValue(
               (prev)=>{
                    return {
                        ...prev,
                        [name]:value
                    }       
               }
            )
            
    }
    const handleImageChange = (e: any) => {
        const selectedFile = (e.target.files[0])
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload = (e) => {
            setPrevImage(e.target?.result)
        }

    }
 


    const submit = (e: any) => {
        e.preventDefault()
        const title: string | null = inputValue.title || null;
        const file: File | null = e.target.image.files[0] || null;
        const category: string | null = inputValue.category || null;
        const desc: string | null = inputValue.desc || null;

        if (title === null || category === null || desc === null){
            return
        }
        const formData = new FormData()
        formData.append("title", title)
        formData.append("image", file || "")
        formData.append("category", category)
        formData.append("desc", desc)
        axios.put(`${base_URL}/posts/${id}`, formData, {
            headers: {
                token: localStorage.getItem("token"),
                "Content-Type": "multipart/form-data"
            },

            onUploadProgress: (pogressEvent) => {
                const onPercentage = pogressEvent.total && pogressEvent.loaded ? Math.round((pogressEvent.loaded / pogressEvent.total) * 100) : 0
                setPercentage(onPercentage)
            }
        })
            .then(() => {
                toast("Post Create SuccessFully")
                e.target.reset()
                setPercentage(0)
                setPrevImage(null)
            })
            .catch((e) => {
                console.log(e.response)
            })
    }

    console.log(percentage)
    useEffect(() => {
        axios.get(`${base_URL}/categories/all`)
            .then((response) => console.log(setCategories(response.data.result)))
            .catch((e) => console.log(e))
    }, [])
    return (
        <div className=" w-full h-full pt-5 pb-5">
            <div className=" justify-center flex flex-col items-center">
                <h1 className=" font-bebas text-4xl text-yellow-100">Update Your Post</h1>
                <ToastContainer />
                <form onSubmit={submit}  className=" w-[90%]  h-full">
                    <div className=" flex h-[100%] w-full justify-around items-start flex-col gap-2">
                        <input className=" w-[500px] h-[60px] outline-none pl-2 rounded-md text-lg" type="text" name="title" id="" placeholder="Title" value={inputValue.title ||""} onChange={handleValueOnchange} />
                        <textarea className=" h-72 w-full shadow-2xl  outline-none rounded-md " name="desc" id="" value={inputValue.desc || ""} onChange={handleValueOnchange}  >
                        </textarea>
                        <div className=" flex w-full h-[80px] justify-around items-center flex-wrap gap-4">
                            <div className=" w-[30%] h-full flex justify-between items-center">
                                <input className=" bg-yellow-200 hidden" type="file" name="image" id="" placeholder="image" ref={FileInput} onChange={handleImageChange} />
                                <div className=" text-4xl" onClick={() => FileInput.current?.click()}><FaCloudUploadAlt /></div>
                                {prevImage ? <img className=" w-[100px] h-[80px]"  src={prevImage} alt="none" /> : ""}

                            </div>

                            <div className="w-[40%] flex justify-around items-center">
                                <span>Chose Category</span>
                                <select name="category" id="" className=" w-[70%]  h-[40px]" value={inputValue.category || ""} onChange={handleValueOnchange} >
                                    {categories.map((item, index) => {
                                        return (
                                            <option key={index} value={item._id}>{item.name}</option>
                                        )
                                    })}

                                </select>
                            </div>
                            <div className=" w-[20%] flex justify-center items-center">

                                <button className=" bg-blue-400 w-24 h-8" type="submit">Update </button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    );
};

export default UpdatePost;