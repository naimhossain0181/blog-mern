import React from 'react'
import { useDispatch } from "react-redux";
import { filter } from "../../reducer/postSlice";
import { useNavigate } from "react-router-dom";




interface propsData {
    setSearch: React.Dispatch<React.SetStateAction<boolean>>
}

const Filter = ({setSearch}:propsData) => {
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const searchValueHanddler = (e: any) => {
        navigate("/filter")
        
        dispatch(filter(e.target.value))
    }

    const cancleSearchHanddler=()=>{
        setSearch(false)
    }


    return (
        <div className=" absolute top-[0px] left-0 w-[100%] h-20  bg-gray-700 flex  items-center justify-center ">
            <input className="z-50 w-[80%] h-16" onChange={searchValueHanddler} type="text" placeholder="search your topic" />
            <button className=' w-12 h-12 bg-red-500 ' onClick={cancleSearchHanddler}>X</button>
        </div>

    );
};

export default Filter;