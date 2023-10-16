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

    const date= new Date (Post?.data[0]?.createdAt)
    const Day =date.getDate()
    const Month =date.toLocaleString("default",{month:"short"})
    const Year =date.getFullYear()

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
        <div className=' h-full w-full flex flex-col justify-center items-center gap-4 p-8'>

            <div className="w-[600px] h-[400px] bg-black rounded-lg shadow-xl">
                <img className='h-full w-full object-cover ' src={Post?.data[0]?.image} alt="" />
            </div>
            <div className=' w-full h-full flex justify-between'>
                <div className=' flex flex-col  justify-center items-center '>
                    <span>Category</span>
                    <span className=' w-[200px] h-[40px] bg-green-500 flex justify-center items-center'>{Post.data[0]?.category.name}</span>
                </div>
                <div className=' flex flex-col  justify-center items-center ' >
                    <span>Published</span>
                    <span className=' w-[200px] h-[40px] bg-green-500 flex justify-center items-center'>{Day}-{Month}-{Year}</span>
                </div>
            </div>
            <h1 className=' text-5xl'>{Post?.data[0]?.title}</h1>
            <div className='  text-justify' dangerouslySetInnerHTML={{__html:Post?.data[0]?.desc}}>
                
            </div>


            <div className='comment flex h-full justify-between items-center w-[320px]'>
                <span>views - {Post.data[0]?.views}</span>
                <span>Likes -[{Post.data[0]?.likes.length}]</span>
            </div>

            <div className='comment h-full w-full justify-start'>
                <h1>All Comments</h1>
                <span>comments -[{Post.data[0]?.comments.length}]</span>
                <div className=' flex flex-col w-[200px]'>
                    <input className=' h-11 border-2 border-fuchsia-200'  type="text" placeholder='write comment' />
                    <button className=' w-[200px] bg-green-700 text-white'>Comment</button>
                </div>
            </div>
        </div>
    </section>
    );
};

export default PostDetails;