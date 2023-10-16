import { category } from "../../pages/Dashboard/Create";
import { FaCloudUploadAlt } from 'react-icons/fa'
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


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

interface PostCreateFormProps {
    content:ReactQuill.Value,
    setContent:React.Dispatch<React.SetStateAction<ReactQuill.Value>>
    prevImage: string | null;
    FileInput: React.RefObject<HTMLInputElement>;
    categories: category[];
    isLoading:boolean
    setIsloading: React.Dispatch<React.SetStateAction<boolean>>
    
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

  
const PostCreateForm = ( props:PostCreateFormProps) => {
    const {prevImage,FileInput,handleImageChange,categories,isLoading,content,setContent}=props


    return (
        <div className=" flex h-[100%] w-full justify-around items-start flex-col gap-2">
        <input className=" w-[300px] md:w-[500px] h-[60px] outline-none pl-2 rounded-md text-lg" type="text" name="title" id="" placeholder="Title" />
        <ReactQuill className="w-full h-96 pb-16 bg-white" modules={{
            toolbar:TOOLBAR_OPTIONS
        }}  placeholder="compose your post" theme="snow" value={content} onChange={setContent} />
        <div className=" flex w-full h-[80px] justify-around items-center flex-wrap gap-4">
            <div className=" w-[20%] md:w-[30%] h-full flex justify-between items-center">
                <input className=" bg-yellow-200 hidden" type="file" name="image" id="" placeholder="image" ref={FileInput} onChange={handleImageChange} />
                <div className=" text-4xl" onClick={() => FileInput.current?.click()}><FaCloudUploadAlt /></div>
                {prevImage ? <img className=" w-[100px] h-[80px]" src={prevImage} alt="none" /> : ""}

            </div>

            <div className="w-[40%] flex justify-around items-center">
                <span>Chose Category</span>
                <select name="category" id="" className=" w-[70%]  h-[40px]" >
                    {categories.map((item, index) => {
                        return (
                            <option key={index} value={item._id}>{item.name}</option>
                        )
                    })}

                </select>
            </div>
            <div className=" w-[20%] flex justify-center items-center">

                    {
                        !isLoading?  <button className=" bg-blue-400 w-24 h-8" type="submit">Create </button>:  <button disabled className=" bg-blue-400 w-24 h-8" type="submit">Creating... </button>
                    }
          
            
            </div>
        </div>

    </div>
    );
};

export default PostCreateForm;