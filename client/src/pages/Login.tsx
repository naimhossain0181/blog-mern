import { Link } from "react-router-dom";
import {AiFillGoogleSquare ,AiFillLinkedin,AiFillFacebook} from 'react-icons/ai'

const Login = () => {
    return (
        <div className= "flex h-[87vh] w-full justify-center items-center bg-gradient-to-r from-purple-200 to-blue-300">
            <div className=" shadow-lg p-8 bg-white rounded-md flex flex-col gap-10  items-center">
                <div className="w-full felx justify-start">
                    <h1 className="text-start font-bold text-lg text-purple-600">LOGIN</h1>
                    <p>Dont have an account yet? <span className=" text-blue-800"><Link to={"/signup"}>Sign up</Link></span> </p>
                </div>

                <form action="" className="  w-[200px] md:w-[300px] gap-5 h-[330px] flex flex-col items-center justify-center ">
                    <div className="">
                        <label htmlFor="password">Email</label><br />
                        <input className="p-2 text-sm md:text-base  outline-none border-b-2 w-[230px] md:w-[300px]" type="email" id="email" placeholder="you@exmaple.com" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br />
                        <input className="p-2 text-sm md:text-base outline-none border-b-2 w-[230px] md:w-[300px]" type="password" id="password" placeholder="Minimum 6 Charecter password" required />
                    </div>
                    <div className=" flex items-center justify-center w-full">
                        <button className=" w-[100px] h-[40px] bg-purple-600 rounded-md" >Login</button>
                    </div>
                    <span className="flex justify-around items-center w-full"> Or login with </span>
                    <div className="flex justify-around items-center w-full">
                        <a href=""><AiFillGoogleSquare color={"Red"} fontSize={32}/></a>
                        <a href=""><AiFillFacebook color={"blue"} fontSize={32}/></a>
                        <a href=""><AiFillLinkedin color={"purple"} fontSize={32}/></a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;