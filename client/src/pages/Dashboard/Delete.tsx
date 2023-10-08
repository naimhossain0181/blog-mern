import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../reducer";
import { getPostByUserId } from "../../reducer/postSlice";
import jwtDecode from "jwt-decode";
import { decodeJwt } from "../Login";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios";
import { base_URL } from "../../utilitis/baseUrl";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const Delete = () => {
    const Dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const Posts = useSelector((store: RootState) => store.Posts.data)


    const handleOnclickDelete = (id:string)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            customClass:' w-[300px] '
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${base_URL}/posts/${id}`,{
                    headers:{
                        token:localStorage.getItem('token')
                    }
                }).then(()=>{
                    Swal.fire(
                        {
                            customClass:' w-[300px] ',
                            title: 'Deleted',
                            text: "Your file has been deleted",
                            icon: 'success',
                        }
                        
                      )
                })
          
            }
          })
        

    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user: decodeJwt = jwtDecode(token)
            if (user._id) {
                Dispatch(getPostByUserId({ authId: user._id, token }))
            }
            else {
                navigate('/')
            }
        }
        else {
            navigate('/')
        }
    }, [Posts])
    return (
        <section>
            <h1>Welcome To Your Controller</h1>
            <div className=" flex h-full w-full gap-4 justify-around flex-wrap">
                {Posts?.map((item, index) => {
                    return (
                        <div key={index}>
                            <div  className=" flex flex-col gap-3 h-[200px] w-[220px] bg-white rounded-t-lg">
                                <img className=" h-[120px] w-full object-cover shadow-2xl " src={item.image} alt="" />
                                <h1 >{item.title}</h1>
                            </div>

                            <div className=" flex justify-center items-center w-[200px]">
                                <button className=" w-[120px] h-[60px] bg-red-800 text-white rounded-b-md" onClick={()=>handleOnclickDelete(item._id)}>Delete</button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </section>
    );
};

export default Delete;