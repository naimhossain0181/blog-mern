import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className= "flex h-[87vh] w-full justify-center items-center bg-gradient-to-r from-purple-200 to-blue-300">
            <div className=" shadow-lg p-8 bg-white rounded-md flex flex-col gap-10  items-center">
                <div className="w-full felx justify-start">
                    <h1 className="text-start font-bold text-lg text-purple-600"> SIGN UP</h1>
                    <p>Have you an account? <span className=" text-blue-800"><Link to={"/LOGIN"}>Login</Link></span> </p>
                </div>

                <form action="" className="  w-[200px] md:w-[300px] gap-5 h-[330px] flex flex-col items-center justify-center ">
                    <div className="">
                        <label htmlFor="name">Full Name</label><br />
                        <input className="p-2 text-sm md:text-base  outline-none border-b-2 w-[230px] md:w-[300px]" type="text" id="name" placeholder="ie :Jone Weeke" required />
                    </div>
                    <div className="">
                        <label htmlFor="password">Email</label><br />
                        <input className="p-2 text-sm md:text-base  outline-none border-b-2 w-[230px] md:w-[300px]" type="email" id="email" placeholder="you@exmaple.com" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br />
                        <input className="p-2 text-sm md:text-base outline-none border-b-2 w-[230px] md:w-[300px]" type="password" id="password" placeholder="Minimum 6 Charecter password" required />
                    </div>
                    
                    <div className=" flex items-center justify-center w-full">
                        <button className=" w-[100px] h-[40px] bg-purple-600 rounded-md" >Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;