import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../reducer";
import { getPostByUserId } from "../../reducer/postSlice";
import jwtDecode from "jwt-decode";
import { decodeJwt } from "../Login";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
const Edit = () => {
    const Dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const Posts = useSelector((store: RootState) => store.Posts.data)
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
    }, [])
    return (
        <section>
            <h1>Welcome To Your Controller</h1>
            <div className=" flex h-full w-full gap-4 justify-around flex-wrap">
                {Posts?.map((item, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/dashboard/post/update/${item._id}`} className=" flex flex-col gap-3 h-[200px] w-[220px] bg-white rounded-t-lg">
                                <img className=" h-[120px] w-full object-cover shadow-2xl " src={item.image} alt="" />
                                <h1 >{item.title}</h1>
                            </Link>
                        </div>
                    )
                })}

            </div>
        </section>
    );
};

export default Edit;