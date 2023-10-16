import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { base_URL } from "../../utilitis/baseUrl";
import { toast, ToastContainer } from 'react-toastify';
import PostCreateForm from "../../component/Dashboard/PostCreateForm";

export type category = {
    _id: string
    name: string
    icon: string

}


const Create = () => {


    const [categories, setCategories] = useState<category[]>([])
    const [isLoading,setIsloading]=useState(false)
    const [percentage, setPercentage] = useState<number>(0)
    const [prevImage, setPrevImage] = useState<any>(null)
    const [content, setContent] = useState<any>(null)

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
        setIsloading(true)
        let title = e.target.title.value
        let file = e.target.image.files[0]
        let category = e.target.category.value
        // let desc = e.target.desc.value

        const formData = new FormData()
        formData.append("title", title)
        formData.append("image", file)
        formData.append("category", category)
        formData.append("desc", content)
        axios.post(`${base_URL}/posts/createpost`, formData, {
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
                setContent("")
                setIsloading(false)
                setPercentage(0)
                setPrevImage(null)
            })
            .catch((e) => {
                toast(e.response.data)
                setIsloading(false)
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
                <h1 className=" font-bebas text-4xl text-yellow-100">Create Your New Post</h1>
                <ToastContainer />
                <form onSubmit={submit} className=" w-[90%]  h-full">
                    <PostCreateForm  prevImage={prevImage} FileInput={FileInput} categories={categories} handleImageChange={handleImageChange} isLoading={isLoading} setIsloading={setIsloading} content={content} setContent={setContent} />
                </form>
            </div>

        </div>
    );
};

export default Create;