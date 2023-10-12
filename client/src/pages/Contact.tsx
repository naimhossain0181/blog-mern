
const Contact = () => {
    return (
        <div  className="w-full h-[88vh] bg-[#687d88] flex items-center justify-center">
            <div className="flex w-[900px] h-[500px] bg-white shadow-lg rounded-sm">
                <div className="w-[50%] h-full bg-green-200 flex  flex-col items-center justify-center gap-2">
                    <h1 className=" text-2xl bg-gray-700 rounded-md text-white h-8 w-48 flex items-center justify-center shadow-md">Contact with Us</h1>
                    <form className="flex flex-col gap-4" >
                        <input className="w-[200px] h-[30px] border-2 outline-none pl-2" type="text" placeholder="name" required />
                        <input className="w-[200px] h-[30px] border-2 outline-none pl-2" type="email" placeholder="email" required/>
                        <textarea className="h-[200px] w-[300px] outline-none resize-none border-2 pl-2 border-sky-100" name="" id="" required></textarea>
                        <button className="h-[40px] w-[120px] bg-gray-900 text-white rounded-sm">sent message</button>
                    </form>
                </div>
                <div className="w-[50%] h-full flex justify-center items-center">
                    <img src="https://unblast.com/wp-content/uploads/2020/09/Contact-Us-Vector-Illustration-Part-02-1-1536x1152.jpg" alt="contact us vector" />

                </div>
            </div>
        </div>
    );
};

export default Contact;