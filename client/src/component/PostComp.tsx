import { RootState } from '../reducer';

const PostComp = ({Posts}:RootState) => {
    return (
        <section>
        <div className='w-full pl-5 pr-5 lg:pl-24 lg:pr-24 mt-12'>
            <div className=' h-full w-full flex flex-col justify-around'>
                <div>
                <   h1 className='font-display text-4xl mb-10 '>All About Here </h1>
                </div>
                <div className=' w-full grid justify-center items-center  gap-5 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 '>

                {
                    Posts?.data?.map((post,index)=>{
                        const postDate = new Date(post.createdAt)
                        const day = postDate.getDate()
                        const month = postDate.toLocaleString('default', { month: "short" })

                        const year = postDate.getFullYear()
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
                                        <span className=' font-bebas font-bold'>{post.authorName}</span>
                                    </div>
                                    <span className=' font-bebas text-gray-700'>views {post.views} </span>
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

export default PostComp;