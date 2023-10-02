import { useEffect } from "react";
import Slide from "../component/Slide";
import { getAllPost } from "../reducer/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducer";
import RecentArticle from "../component/RecentArticle";
import PostComp from "../component/PostComp";

const HomePage = () => {

    const dispatch = useDispatch<AppDispatch>()
    // data fetch from Api using RTK
    const Posts = useSelector((store: RootState) => store.Posts)

    useEffect(()=>{
        dispatch(getAllPost())

    },[])
    if(Posts.isLoading){
        return(
            <div>
                <h1>Data Loading....</h1>
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