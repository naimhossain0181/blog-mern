import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../reducer";
import { useEffect } from 'react';
import { getAllPost } from "../reducer/postSlice";


const FilterPosts = () => {
    const dispatch = useDispatch<AppDispatch>()
            const Posts =useSelector((store:RootState)=>store.Posts)
            console.log(Posts.Search)

            useEffect(()=>{
                dispatch(getAllPost())
            },[])
    return (
        <div className=' p-6 w-full h-full flex flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-8  md:grid  md:grid-cols-3  '>

        {
           Array.isArray(Posts?.Search) && Posts.data.length > 0 ? 
            Posts.Search.map((post,index)=>{
                const postDate = new Date(post.createdAt)
                const day = postDate.getDate()
                const month = postDate.toLocaleString('default', { month: "short" })

                const year = postDate.getFullYear()
                return(
                    <Link to={`/posts/${post._id}`} key={index} className='h-[250px] w-[170px] md:h-[500px] md:w-[100%] shadow-lg hover:scale-[1.02] transition  ease-in'>
                    <div className=' relative'>
                        <button className=' absolute   left-5 top-5 w-10 h-5 text-sm md:h-12 md:w-24 rounded-lg bg-green-400'>{typeof post.category==="string"?post.category: post.category.name}</button>
                        <div className=' md:w-full h-[100px] md:h-[300px] '>
                            <img className=' rounded-t-xl w-full h-full object-cover' src={post.image} alt="image" />
                        </div>
                    </div>
                    <div className=' h-[120px] md:w-full md:h-[180px]  p-3 gap-1 md:gap-3 flex flex-col justify-between '>
                        <span className=' font-display md:font-bold text-gray-700'>{day}- {month} - {year}</span>
                        <h1 className=' font-serif font-extrabold text-lg lg:text-2xl text-gray-900 '>{post.title}</h1>
                        <div className=' hidden md:flex justify-between items-center'>
                            <div className='   flex flex-row justify-center items-center gap-2'>
                                <img className=' w-8 h-8 rounded-full object-cover' src={ post.author.image } alt="" />
                                <span className=' font-bebas font-bold'>{typeof post.author==="string"? post.author : post.author.name}</span>
                            </div>
                            <span className='  flex font-bebas text-gray-700'>views {post.views} </span>
                        </div>
                    </div>
                </Link>

                )
            }
            ):(
                <div className=" absolute w-[100%] h-[100vh] flex justify-center items-center">
                    <h1 className=" text-5xl">No Post Found</h1>
                </div>
            )
        }
          
        </div>
    );
};

export default FilterPosts;