import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs"
import { AiOutlineMenu } from "react-icons/ai"
import {  useState } from "react";
import Category from "./Category";
import Filter from "../Search/Filter";

interface propsData {
    isLogin: boolean,
    setIslogin: React.Dispatch<React.SetStateAction<boolean>>
}


const NavBar = ({ isLogin, setIslogin }: propsData) => {
    const navigate = useNavigate();
    const [isToogle, setIsToggle] = useState(false)
    const [isSearch, setSaerch] = useState<boolean>(false)
    // logout button handdler
    const logoutHanddler = () => {
        setIslogin(false)
        localStorage.clear()
        setIsToggle(false)
    }



    const handleHomeClick = () => {
        // Navigate to the home route
        setIsToggle(false)
        navigate('/');
        // Scroll to the top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const searchHanddler=()=>{
        setIsToggle(false)
        setSaerch(!isSearch)
    }

    return (
        <div className="  z-50 fixed left-0 top-0 pl-5 pr-5 bg-white flex justify-between h-[80px] w-full md:pl-[96px] md:pr-[96px] items-center border-b-[1px]">
            <div className=" flex justify-start h-full items-center w-[20%]">
                <h1> <Link to={"/"} onClick={handleHomeClick}>Logo</Link></h1>
            </div>
            <div  className={` ${isToogle ? ' flex' : 'hidden md:flex'} w-[90%] h-[60vh] flex-col items-center justify-around relative bg-slate-400  top-[245px] right-[20px] md:flex-row
            md:bg-inherit md:justify-between md:w-[80%] md:h-full md:items-center md:static`}>
                <Link to={"/"} onClick={handleHomeClick}>Home</Link>
                <Category/>
                <Link to={"/about"} onClick={() => setIsToggle(false)}>About</Link>
                <Link to={"/contact"} onClick={() => setIsToggle(false)}>Contact us</Link>
                <div className=" relative  bg-yellow-50 md:bg-inherit flex w-[100%]  pr-3 pl-3 md:w-[35%] md:p-0 justify-between  items-center">
                   
                   <button className=" text-[28px]" onClick={()=>searchHanddler()}><BsSearch />

                    </button>
                  
                    {
                        isLogin && <Link to={"/dashboard"} className="w-[100px] h-[40px] flex bg-black items-center text-center justify-center text-white rounded-md" onClick={() => setIsToggle(false)} >Dashboard</Link>

                    }
                    {
                        isLogin && <Link to={"/login"} className="w-[80px] h-[40px] flex bg-black items-center text-center justify-center text-white rounded-md" onClick={logoutHanddler}>Logout</Link>

                    }
                    {
                        !isLogin && <Link to={"/login"} className="  w-[80px] h-[40px] flex bg-black items-center text-center justify-center text-white rounded-md" onClick={() => setIsToggle(false)}>Login</Link>

                    }

                </div>
            </div>
            <div className="">
                <button onClick={() => setIsToggle(!isToogle)} className=" md:hidden text-2xl"><AiOutlineMenu /></button>
            </div>

                    {
                        isSearch? <Filter setSearch={setSaerch}/> : ""

                    }


        </div>
    );
};

export default NavBar;