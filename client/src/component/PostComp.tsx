import { Link } from 'react-router-dom';
import { RootState } from '../reducer';

const PostComp = ({Posts}:RootState) => {

    return (
        <section>
        <div className='w-[100%] overflow-hidden p-1  lg:pl-24 lg:pr-24 mt-12'>
            <div className=' h-full w-full flex flex-col justify-around'>
                <div>
                <   h1 className='font-display text-4xl mb-10 '>All About Here </h1>
                </div>
                <div className=' w-full h-full flex flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-8  md:grid  md:grid-cols-3  '>

                {
                   Array.isArray(Posts?.data) && Posts.data.length > 0 ? 
                    Posts.data.map((post,index)=>{
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
                                        <img className=' w-8 h-8 rounded-full object-cover' src={typeof post.author !=="string" ? post.author.image : post.author} alt="" />
                                        <span className=' font-bebas font-bold'>{typeof post.author==="string"? post.author : post.author.name}</span>
                                    </div>
                                    <span className='  flex font-bebas text-gray-700'>views {post.views} </span>
                                </div>
                            </div>
                        </Link>

                        )
                    }
                    ):(
                        <>No Post Found Yet</>
                    )
                }
                  
                </div>
            </div>

        </div>

    </section>
    );
};

export default PostComp;