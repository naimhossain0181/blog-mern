import { useEffect } from 'react';
import { getSinglePost } from '../reducer/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../reducer';
import {  useLocation, useParams } from 'react-router-dom';
import Loading from '../component/Loading';

const PostDetails = () => {
    const dispatch=useDispatch<AppDispatch>()
    const Post= useSelector((state:RootState)=>state.Posts)
    const {id} =useParams()
    const location=useLocation()

    useEffect(()=>{
        dispatch(getSinglePost(id))
    },[id])


    useEffect(() => {
        // Scroll to the top of the page whenever the route changes
        window.scrollTo(0, 0);
      }, [location.pathname]);
    
    
    



    if(Post.isLoading)
    return(<Loading/>)
    return (
        <section>
        <div className=' h-full w-full flex flex-col justify-center items-center'>
            <h1>{Post?.data[0]?.title}</h1>
            <div className="w-[600px] h-[400px] bg-black rounded-lg">
                <img className='h-full w-full object-cover' src={Post?.data[0]?.image} alt="" />
            </div>
            <div>
                <span>{Post?.data[0]?.desc}</span>
            </div>

            <div className='comment'>
        
            </div>
        </div>
    </section>
    );
};

export default PostDetails;