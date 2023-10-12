import {  AiFillCaretDown } from "react-icons/ai"
import { useEffect, useState } from "react";
import axios from "axios";
import { base_URL } from "../../utilitis/baseUrl";
import { Link } from 'react-router-dom';


interface category {
    _id: string
    name: string
    icon: string
}
const Category = () => {
    const [isCategory, setIsCategory] = useState(false)
    const [Categories, setCategories] = useState<category[]>([])

    useEffect(() => {
        axios.get(`${base_URL}/categories/all`).then(({ data }) => setCategories(data.result))
    }, [])
    return (
        <div className=" relative">
        <button onClick={() => setIsCategory(!isCategory)}>Category</button>

        {
            isCategory ?
                <>
                    <div className=" absolute top-8  left-2 text-5xl">
                        <AiFillCaretDown />
                    </div>
                    <div className="  absolute -left-12 top-16 bg-black text-white  w-40 flex flex-col gap-2" >
                        {Categories.map((category, index) => {
                            return (
                                <Link to={`/search/${category._id}`}>
                                    <button key={index} className=" bg-slate-800 w-full h-[30px] hover:bg-slate-600" onClick={() => setIsCategory(false)}>{category.name}</button>
                                </Link>

                            )
                        })}

                    </div>
                </>

                : ""
        }

    </div>
    );
};

export default Category;