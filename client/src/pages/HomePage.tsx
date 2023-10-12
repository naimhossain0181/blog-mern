import { useEffect } from "react";
import Slide from "../component/Slide";
import {  getAllPost } from "../reducer/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducer";
import RecentArticle from "../component/RecentArticle";
import AllPostComp from "../component/AllPostComp";
import Loading from "../component/Loading";
import { useLocation } from "react-router-dom";

const HomePage = () => {
    
    // data fetch from Api using RTK
    const dispatch = useDispatch<AppDispatch>();
    const Posts=useSelector((store:RootState)=>store.Posts)
    const location=useLocation()

    useEffect(() => {
        dispatch(getAllPost());
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, [location.pathname]);
   

    if (Posts.isLoading) {
        return (
            <Loading/>
        );
    }

    return (
        <div >
            <Slide Posts={Posts}/>
            <RecentArticle Posts={Posts} />
            <AllPostComp Posts={Posts} />
        </div>
    );
};

export default HomePage;
