import { Link, useNavigate, } from "react-router-dom";
import { AiFillGoogleSquare, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai'
import { ChangeEvent, useState,useEffect } from "react";
import axios from "axios";

// tostify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode";
import { base_URL } from "../utilitis/baseUrl";


// type declear
export type decodeJwt = {
    _id:string
    name:string
    email:string
    block: boolean
    role: string
    exp: number
    iat: number
}

type inputField = {
    email: string,
    password: string
}


const Login = ({handdlerLogin}:any) => {


    const InitialVaule: inputField = {
        email: '',
        password: ''
    }

    const navigate=useNavigate()

    const [inValue, setInValue] = useState<inputField>(InitialVaule)
    const [isCLickLogin,setIsclickLogin]=useState(false)

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInValue((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    };

    const submitHandller = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsclickLogin(true)
        try {
            const result = await axios.post(`${base_URL}/users/login`, inValue)
            setIsclickLogin(false)
            if (result.status === 200) {
                const token = result.data.token
                const decodeToken:decodeJwt = jwtDecode(token)
                if (decodeToken.block !==true && decodeToken.role==='user' ) {
                    navigate("/dashboard")
                    handdlerLogin()
                    localStorage.setItem('token', token)
                }
                if(decodeToken.role==='admin'){
                    navigate("/admin/dashboard")
                    handdlerLogin()
                    localStorage.setItem('token', token)
                }
                else{
                    toast("Your Account is Susbended")
                }
            }
        }
        catch (err: any) {
            setIsclickLogin(false)

            if (err.response) {
                toast(err.response.data.status)
            }
            else {
                console.error('An error occurred:', err.message);
            }
        }

    }

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) {
          // User is already authenticated, redirect to the dashboard
          navigate("/dashboard");
        }
    })

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, [location.pathname]);



    return (
        <div className="flex h-[87vh] w-full justify-center items-center bg-gradient-to-r from-purple-200 to-blue-300">
            <ToastContainer toastStyle={{ color: "red" }} />
            <div className=" relative shadow-lg p-8 bg-white rounded-md flex flex-col gap-10  items-center">
                <div className="w-full felx justify-start">
                    <h1 className="text-start font-bold text-lg text-purple-600">LOGIN</h1>
                    <p>Dont have an account yet? <span className=" text-blue-800"><Link to={"/signup"}>Sign up</Link></span> </p>
                </div>
                <form action="" className="  w-[200px] md:w-[300px] gap-5 h-[330px] flex flex-col items-center justify-center ">
                    <div className="">
                        <label htmlFor="email">Email</label><br />
                        <input className="p-2 text-sm md:text-base  outline-none border-b-2 w-[230px] md:w-[300px]" type="email" id="email" name="email" placeholder="you@exmaple.com" required value={inValue.email} onChange={inputHandler} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br />
                        <input className="p-2 text-sm md:text-base outline-none border-b-2 w-[230px] md:w-[300px]" type="password" id="password" name="password" placeholder="Minimum 6 Charecter password" required value={inValue.password} onChange={inputHandler} />
                    </div>
                    <div className=" flex items-center justify-center w-full">
                        {
                            isCLickLogin ?  <button type="submit" className=" w-[100px] h-[40px] bg-purple-600 rounded-md text-gray-400" >wait</button> : <button type="submit" className=" w-[100px] h-[40px] bg-purple-600 rounded-md" onClick={submitHandller} >Login</button>
                        }
                    </div>
                    <span className="flex justify-around items-center w-full"> Or login with </span>
                    <div className="flex justify-around items-center w-full">
                        <a href=""><AiFillGoogleSquare color={"Red"} fontSize={32} /></a>
                        <a href=""><AiFillFacebook color={"blue"} fontSize={32} /></a>
                        <a href=""><AiFillLinkedin color={"purple"} fontSize={32} /></a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;