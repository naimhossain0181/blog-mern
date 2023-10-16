import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { base_URL } from "../../utilitis/baseUrl";
import { toast, ToastContainer } from 'react-toastify';
import { FaCloudUploadAlt } from 'react-icons/fa'
import {  useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";

export type category = {
    _id: string
    name: string
    icon: string

}


const UpdatePost = () => {


    const navigate =useNavigate()
    const { id } = useParams()


const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "link",'code-block'],
    [{
        'color': ['#F00', '#0F0', '#00F', '#000', '#FFF', 'color-picker'],
      },
      {
        'background':['#F00', '#0F0', '#00F', '#000', '#FFF', 'color-picker']
      }
    ],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"]
  ];

    const [Title,setTitle] = useState<any>("")
    const [dec,setDesc] = useState<any>("")
    const [category,setCategory] = useState<any>("")
    const [categories, setCategories] = useState<category[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [percentage, setPercentage] = useState<number>(0)
    const [prevImage, setPrevImage] = useState<any>()
    const FileInput = useRef<any>(null)


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
        setIsLoading(true)
        const file: File | null = e.target.image.files[0] || null;
 
        const formData = new FormData()
        formData.append("title", Title)
        formData.append("image", file || "")
        formData.append("category", category)
        formData.append("desc", dec)

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
                e.target.reset()
                setIsLoading(false)
                toast('Update Successfully')
                setPercentage(0)
                setPrevImage(null)
                navigate(`/dashboard/post/${id}`)
                console.log(percentage)
                
            })
            .catch((e) => {
                console.log(e.response)
                setIsLoading(false)
                toast(e.response.data)
            })
    }


    useEffect(()=>{
       axios.get(`${base_URL}/posts/${id}`).then((result)=>{

        setTitle(result.data.result[0].title)
        setDesc(result.data.result[0].desc)
        setCategory(result.data.result[0].category._id)
        setPrevImage(result.data.result[0].image)
       })
   

    },[])
    useEffect(() => {
        axios.get(`${base_URL}/categories/all`)
            .then((response) => setCategories(response.data.result))
            .catch((e) => console.log(e))
    }, [])
    return (
        <div className=" w-full h-full pt-5 pb-5">
                <ToastContainer />
            <div className=" justify-center flex flex-col items-center">
                <h1 className=" font-bebas text-4xl text-yellow-100">Update Your Post</h1>
                <form onSubmit={submit}  className=" w-[90%]  h-full">
                    <div className=" flex h-[100%] w-full justify-around items-start flex-col gap-2">
                        <input className=" w-[280px] md:w-[500px] h-[60px] outline-none pl-2 rounded-md text-lg" type="text" name="title" id="" placeholder="Title" value={Title} onChange={(e)=>setTitle(e.target.value)} />
                        
                        <ReactQuill className="w-full h-96 pb-16 bg-white" modules={{toolbar:TOOLBAR_OPTIONS}} value={dec} onChange={setDesc}/>

                        <div className=" flex w-full h-[80px] justify-around items-center flex-wrap gap-4">
                            <div className=" w-[30%] h-full flex justify-between items-center">
                                <input className=" bg-yellow-200 hidden" type="file" name="image" id="" placeholder="image" ref={FileInput} onChange={handleImageChange} />
                                <div className=" text-4xl" onClick={() => FileInput.current?.click()}><FaCloudUploadAlt /></div>
                                {prevImage ? <img className=" w-[100px] h-[80px]"  src={prevImage} alt="none" /> : ""}

                            </div>

                            <div className="w-[40%] flex justify-around items-center">
                                <span>Chose Category</span>
                                <select name="category" id="" className=" w-[70%]  h-[40px]" value={category} onChange={(e)=>setCategory(e.target.value)} >
                                    {categories.map((item, index) => {
                                        return (
                                            <option key={index} value={item._id}>{item.name}</option>
                                        )
                                    })}

                                </select>
                            </div>
                            <div className=" w-[20%] flex justify-center items-center">
                                    {!isLoading?  <button className=" bg-blue-400 w-24 h-8" type="submit">Update </button>: <button disabled className=" bg-blue-400 w-24 h-8" type="submit">Updating... </button> }
                                
                            </div>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    );
};

export default UpdatePost;