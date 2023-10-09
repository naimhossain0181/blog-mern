import { useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState } from "../../reducer";
import {  getPostByUserId } from "../../reducer/postSlice";
import { useEffect } from 'react';
import jwtDecode from "jwt-decode";
import { decodeJwt } from "../Login";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../component/Loading";
const DashHome = () => {
    const Dispatch = useDispatch<AppDispatch>()
    const navigate =useNavigate()
    const Posts = useSelector((store:RootState)=>store.Posts)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user:decodeJwt = jwtDecode(token)
            if (user._id) {
                Dispatch(getPostByUserId({authId:user._id,token}))
            }
            else {
                navigate('/')
            }
        }
        else {
            navigate('/')
        }
    }, [])
    if(Posts.isLoading)
    return(<div>
        <Loading></Loading>
    </div>)
    return (
        <section>
            <h1>Welcome To Your Controller</h1>

            <div className=" flex h-full w-full gap-4 justify-around flex-wrap">
                { Array.isArray(Posts?.data) && Posts.data.length>=0 ?  Posts.data.map((item,index)=>{
                    return(
                        <div key={index}>
                             <div className=" flex flex-col w-[140px] h-full md:gap-3 md:h-[200px] md:w-[220px] bg-white rounded-t-lg">
                            <img className=" h-[120px] w-full object-cover shadow-2xl " src={item.image} alt="" />
                            <Link to={`post/${item._id}`} className=" w-[120px] h-full overflow-hidden">{item.title}</Link>
                         </div>
                        </div>
                    )
                })
                    :  (<div className="mt-[200px] bg-green-400 w-96 h-96"> <h1>No post Create yet !</h1></div>)
            }
               
            </div>
        </section>
    );
};

export default DashHome;