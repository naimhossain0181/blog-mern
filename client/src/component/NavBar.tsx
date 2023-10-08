import { Link, useNavigate } from "react-router-dom";
import {BsSearch} from "react-icons/bs"



interface propsData{
    isLogin:boolean,
    setIslogin:React.Dispatch<React.SetStateAction<boolean>>
}


const NavBar = ({isLogin,setIslogin}:propsData) => {

    // logout button handdler
        const logoutHanddler =()=>{
        setIslogin(false)
        localStorage.clear()
    }

    const navigate = useNavigate();

    const handleHomeClick = () => {
      // Navigate to the home route
      navigate('/');
      // Scroll to the top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    

    return (
        <div className=" z-50 fixed left-0 top-0 bg-white flex justify-between h-[80px] w-full pl-[96px] pr-[96px] items-center border-b-[1px]">
            <div className=" flex justify-start w-[20%]">Logo</div>
            <div className=" flex justify-between w-[50%] items-center">
                <Link to={"/"} onClick={handleHomeClick}>Home</Link>
                <Link to={"/contact"}>Contact</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/blog"}>Blog</Link>
            </div>
            <div className=" flex justify-between w-[20%] items-center">
                <button className=" text-[28px] pl-10"><BsSearch/></button>
                {
                    isLogin &&  <Link to={"/login"} className="w-[80px] h-[40px] flex bg-black items-center text-center justify-center text-white rounded-md" onClick={logoutHanddler}>Logout</Link>

                } 
                {
                    !isLogin &&  <Link to={"/login"} className="w-[80px] h-[40px] flex bg-black items-center text-center justify-center text-white rounded-md">Login</Link>

                }
              
            </div>
        </div>
    );
};

export default NavBar;