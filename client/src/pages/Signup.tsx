import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import axios from "axios";
import { base_URL } from "../utilitis/baseUrl";
import { toast } from 'react-toastify';


type userInputType ={
    name:string,
    email:string,
    password:string
}

const Signup = () => {
    const Navigate=useNavigate()

    const initialUserInput:userInputType ={
        name:"",
        email:"",
        password:""
    } 
    const [userInput,setUserInput] =useState<userInputType>(initialUserInput)

    const singupFormHandller=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setUserInput((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })

    }
    const submitHanddler =(e:any)=>{
          e.preventDefault()
          console.log(userInput)
          axios.post(`${base_URL}/users/signup`,userInput).then(()=>{
            toast("Resistation success fully")
            setUserInput({
                name:"",
                email:"",
                password:""
            })
            Navigate("/login")
          })
          .catch((err)=>{
            console.log(err)
          })

    }
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) {
          // User is already authenticated, redirect to the dashboard
          Navigate("/dashboard");
        }
    })



    return (
        <div className= "flex h-[87vh] w-full justify-center items-center bg-gradient-to-r from-purple-200 to-blue-300">
            <div className=" shadow-lg p-8 bg-white rounded-md flex flex-col gap-10  items-center">
                <div className="w-full felx justify-start">
                    <h1 className="text-start font-bold text-lg text-purple-600"> SIGN UP</h1>
                    <p>Have you an account? <span className=" text-blue-800"><Link to={"/LOGIN"}>Login</Link></span> </p>
                </div>

                <form onSubmit={submitHanddler} className="  w-[200px] md:w-[300px] gap-5 h-[330px] flex flex-col items-center justify-center ">
                    <div className="">
                        <label htmlFor="name">Full Name</label><br />
                        <input className="p-2 text-sm md:text-base  outline-none border-b-2 w-[230px] md:w-[300px]" type="text" id="name" name="name" placeholder="ie :Jone Weeke" value={userInput.name} required onChange={singupFormHandller} />
                    </div>
                    <div className="">
                        <label htmlFor="password">Email</label><br />
                        <input className="p-2 text-sm md:text-base  outline-none border-b-2 w-[230px] md:w-[300px]" type="email" id="email" name="email" placeholder="you@exmaple.com" value={userInput.email} required onChange={singupFormHandller} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br />
                        <input className="p-2 text-sm md:text-base outline-none border-b-2 w-[230px] md:w-[300px]" type="password" id="password" name="password" placeholder="Minimum 6 Charecter password" value={userInput.password} required onChange={singupFormHandller} />
                    </div>
                    
                    <div className=" flex items-center justify-center w-full">
                        <button type="submit" className=" w-[100px] h-[40px] bg-purple-600 rounded-md" >Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;