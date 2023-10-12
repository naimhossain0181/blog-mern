import {BiLogoFacebookSquare,BiLogoLinkedinSquare,BiLogoInstagramAlt} from 'react-icons/bi'

const About = () => {
    return (
        <div  className="w-full h-[88vh] bg-[#687d88] flex items-center justify-center">
            <div className="flex w-[900px] h-[500px] bg-white shadow-lg rounded-sm">
                <div className="w-[55%] h-full bg-[#DCF0FC] flex  flex-col items-center justify-around p-4 gap-2">
                   <div className="w-full h-[100px] flex justify-center items-center">
                    <h1 className="text-[62px]  text-[#ED2249] leading-[1.2]">Focus On <span className="  text-[#F9C12C]">Your Work</span> </h1>
                   </div>
                   <div>
                    <p className=" text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur velit, tempora ipsum eligendi veniam doloremque inventore temporibus sunt accusantium in minima. Ad magnam cumque aliquid enim ipsa officia nam qui iure exercitationem nobis aspernatur labore distinctio sed placeat voluptatibus </p>
                   </div>
                   <div className=' flex'>
                    <a href="" className=' text-2xl text-blue-700'><BiLogoFacebookSquare/></a>
                    <a href="" className=' text-2xl text-blue-600'><BiLogoLinkedinSquare/></a>
                    <a href="" className=' text-2xl text-pink-600'><BiLogoInstagramAlt/></a>
                   </div>
                </div>
                <div className="w-[45%] h-full flex justify-center items-center">
                    <img src="https://static.vecteezy.com/system/resources/previews/003/296/457/original/employees-work-professional-focus-on-target-high-motivation-free-vector.jpg" alt="contact us vector" />

                </div>
            </div>
        </div>
    );
};

export default About;