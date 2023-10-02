import { RootState } from '../reducer';
import { useEffect, useState } from 'react';
import { Data } from '../reducer/postSlice';

const RecentArticle = ({ Posts }: RootState) => {



    
    const [Recent,setRecent]=useState<Data[]>([])

    useEffect(()=>{
              const findTopMostViewedPosts = (N:number) => {
                  if (Posts?.data?.length === 0) {
                    return []; // Return an empty array if there are no posts
                  }
                  // Sort the posts based on views in descending order
                  const sortedPosts = [...Posts.data].sort((a, b) => b.views - a.views);
              
                  // Take the top N Nummber of posts
                  const top5Posts = sortedPosts.slice(0,N);
              
                  setRecent(top5Posts) ;
                };
                findTopMostViewedPosts(4)    
    },[Posts])
    return (
        <section>
            <div className='w-full pl-5 pr-5 lg:pl-24 lg:pr-24'>
                <div className=' h-full w-full flex flex-col justify-around'>
                    <div>
                    <   h1 className='font-display text-4xl mb-10 '>Recent </h1>
                    </div>
                    <div className=' w-full grid justify-center items-center  gap-5 grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-2 '>

                    {
                        Recent?.map((post,index)=>{
                            const postDate = new Date(post.createdAt)
                            const day = postDate.getDate()
                            const month = postDate.toLocaleString('default', { month: "short" })
    
                            const year = postDate.getFullYear()
                            if(index<4)
                            return(
                                <div key={index} className='h-[500px] w-[100%] shadow-lg hover:scale-[1.02] transition  ease-in'>
                                <div className=' relative'>
                                    <button className=' absolute   left-5 top-5 h-12 w-24 rounded-lg bg-green-400'>{post.category}</button>
                                    <div className='w-full h-[300px] '>
                                        <img className=' rounded-t-xl w-full h-full object-cover' src={post.image} alt="image" />
                                    </div>
                                </div>
                                <div className='w-full h-[180px]  p-3 gap-3 flex flex-col justify-between '>
                                    <span className=' font-display font-bold text-gray-700'>{day}- {month} - {year}</span>
                                    <h1 className=' font-serif font-extrabold text-lg lg:text-2xl text-gray-900 '>{post.title}</h1>
                                    <div className=' flex justify-between items-center'>
                                        <div className=' flex flex-row justify-center items-center gap-2'>
                                            <img className=' w-8 h-8 rounded-full object-cover' src={post.authorImage} alt="" />
                                            <span className=' font-display font-bold'>{post.authorName}</span>
                                        </div>
                                        <span className=' font-display font-bold'>views {post.views} </span>
                                    </div>
                                </div>
                            </div>
    
                            )
                        }
                        )
                    }
                      
                    </div>
                </div>

            </div>

        </section>
    );
};

export default RecentArticle;