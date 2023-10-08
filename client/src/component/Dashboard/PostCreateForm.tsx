import { category } from "../../pages/Dashboard/Create";
import { FaCloudUploadAlt } from 'react-icons/fa'

interface PostCreateFormProps {
    prevImage: string | null;
    FileInput: React.RefObject<HTMLInputElement>;
    categories: category[];
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

  
const PostCreateForm = ( props:PostCreateFormProps) => {
    const {prevImage,FileInput,handleImageChange,categories}=props
    return (
        <div className=" flex h-[100%] w-full justify-around items-start flex-col gap-2">
        <input className=" w-[500px] h-[60px] outline-none pl-2 rounded-md text-lg" type="text" name="title" id="" placeholder="Title" />
        <textarea className=" h-72 w-full shadow-2xl  outline-none rounded-md " name="desc" id="" >

        </textarea>
        <div className=" flex w-full h-[80px] justify-around items-center flex-wrap gap-4">
            <div className=" w-[30%] h-full flex justify-between items-center">
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

            <button className=" bg-blue-400 w-24 h-8" type="submit">Create </button>
            </div>
        </div>

    </div>
    );
};

export default PostCreateForm;