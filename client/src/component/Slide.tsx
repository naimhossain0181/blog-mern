import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from "../reducer";
// icon
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import { Autoplay, Pagination, Navigation, Controller, FreeMode, Thumbs } from "swiper/modules";

// swiper
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';




const Slide = ({ Posts }: RootState) => {
    console.log(Posts)
    const [thumb, setThumb] = useState<SwiperClass | null>(null)

    const findTopMostViewedPosts = (N:number) => {
        if (Posts.data.length === 0) {
          return []; // Return an empty array if there are no posts
        }
    
        // Sort the posts based on views in descending order
        const sortedPosts = [...Posts.data].sort((a, b) => b.views - a.views);
    
        // Take the top N Nummber of posts
        const top5Posts = sortedPosts.slice(0, N);
    
        return top5Posts;
      };
    
      const top4PopulerPost = findTopMostViewedPosts(4);
    return (
        <section className=" shadow-lg mt-24 mb-24">
            <Swiper
                className="pl-10 pr-10 relative shadow-xl "
                loop={true}
                modules={[Navigation, Autoplay, Pagination, Controller, Thumbs, FreeMode]}
                spaceBetween={50}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,

                }}
                navigation={
                    {
                        nextEl: ".next-arrow-button",
                        prevEl: ".prev-arrow-button",

                    }
                }
                // controller={{control:thumb}}
                thumbs={thumb ? { swiper: thumb } : undefined}
            >
                {
                    top4PopulerPost?.map((post, index) => {
                        const postDate = new Date(post.createdAt)
                        const day = postDate.getDate()
                        const month = postDate.toLocaleString('default', { month: "short" })

                        const year = postDate.getFullYear()

                        if (index < 4)
                            return (
                                <SwiperSlide  className=" h-full w-[100%]  flex  flex-col-reverse  justify-between items-center  md:h-[500px] md:flex-row md:pr-12  " key={index}>
                                    <div className="w-full md:w-[50%] h-full gap-2 md:ml-10 flex flex-col md:gap-10">
                                        <div className="category w-[250px] h-24 flex justify-start items-center ">
                                            <div className="flex justify-between items-center w-full h-full">
                                                <button className="w-[100px] h-[36px] rounded-lg bg-purple-500">{post.category}</button>
                                                <p>{`${day} - ${month} -${year}`}</p>
                                            </div>
                                        </div>
                                        <div className="w-[100%] gap-2  flex flex-col md:gap-10" >
                                            <Link to={"/details"}> <h1 className=" text-3xl md:text-5xl">{post.title}</h1></Link>
                                            <p className="text-gray-600 "> {post.desc.slice(0, 200)}  <Link to={"/details"} className=" text-blue-400">..Raed more...</Link></p>
                                        </div>
                                        <div className=" flex justify-between w-full items-center pr-4">
                                            <div className=" flex items-center w-[200px]" >
                                                <img className=" outline-offset-8 outline-red-700 outline-8 w-[40px] h-[40px] block object-fill rounded-full" src={post.authorImage} alt="" />
                                                <Link to={"/details"}> <h1 className=" pl-2 text-lg  ">{post.authorName}</h1></Link>
                                            </div>
                                            <div>
                                                <p>Views <span>{post.views}</span></p>
                                            </div>
                                        </div>

                                    </div>


                                    <div className=" flex items-center justify-center w-full h-[220px] rounded-2xl md:w-[40%] md:h-[480px] shadow-lg">
                                        <img className=" rounded-2xl w-full h-full block object-cover" src={post.image} alt="" />
                                    </div>
                                </SwiperSlide>
                            )


                    }

                    )
                }

                <button className="prev-arrow-button absolute z-10 left-0 top-[45%]"><BsArrowLeftCircleFill fontSize={36} /></button>
                <button onClick={(e) => console.log(e.currentTarget)} className="next-arrow-button absolute z-10 right-0 top-[45%] "><BsArrowRightCircleFill fontSize={36} /></button>
            </Swiper>


            {/* Thumbnail */}

            <Swiper
                className=" mt-2 w-full h-[120px] flex justify-start  "
                modules={[Controller, Navigation, Autoplay, Pagination, Thumbs, FreeMode]}
                onSwiper={setThumb}
                spaceBetween={0}
                slidesPerView={3}
                loop={true}
                watchSlidesProgress={true}

                breakpoints={{
                    340: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 0,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 0,
                    },
                  }}

            >
                {
                    top4PopulerPost?.map((post, index) => {
                        const postDate = new Date(post.createdAt)
                        const day = postDate.getDate()
                        const month = postDate.toLocaleString('default', { month: "short" })

                        const year = postDate.getFullYear()
                            return (

                                <SwiperSlide className=" gap-2 p-2 h-full  border-2  flex    justify-between items-center " key={index}>
                                    <div className="h-[100px] w-[200px] flex justify-center items-center">
                                        <img className="w-[full] h-full object-cover" src={post.image} alt="" />
                                    </div>
                                    <div className="flex h-full w-full justify-around flex-col">
                                        <h1>{post.title.slice(0, 33)} <span>....</span></h1>
                                        <div className=" flex justify-between flex-row w-full">
                                            <p className=" font-serif">{`${day} - ${month} -${year}`}</p>
                                            <p className=" font-serif">{post.views} <span>views</span></p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                    }

                    )
                }

            </Swiper>

        </section>
    );
};

export default Slide;