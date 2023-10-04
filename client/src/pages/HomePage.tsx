import { useEffect } from "react";
import Slide from "../component/Slide";
import { getAllPost } from "../reducer/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducer";
import RecentArticle from "../component/RecentArticle";
import PostComp from "../component/PostComp";
import loader from '../assets/Vg1.gif'
import { useParams } from "react-router-dom";

const HomePage = () => {

    const dispatch = useDispatch<AppDispatch>()
    // data fetch from Api using RTK
    const Posts = useSelector((store: RootState) => store.Posts)

    const params=useParams()

    useEffect(()=>{
        dispatch(getAllPost())
    },[params])
    if(Posts.isLoading){
        return(
            <div className="w-full h-[80vh] flex justify-center items-center flex-col">
                <img  src={loader} alt="abc" />
            </div>
        )
    }
    
    return (
        <div>
            <Slide Posts={Posts}/>
            <RecentArticle Posts={Posts}/>
            <PostComp Posts={Posts}/>
        </div>
    );
};

export default HomePage;