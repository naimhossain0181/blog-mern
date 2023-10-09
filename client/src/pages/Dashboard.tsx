import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { decodeJwt } from './Login';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { getUserById } from '../reducer/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../reducer';
import {  ToastContainer} from 'react-toastify';


// react icon
import { BiSolidDashboard } from 'react-icons/bi'
import { RiMenuAddFill } from 'react-icons/ri'

// route
import DashHome from './Dashboard/DashHome';
import PostDetails from './PostDetails';
import Create from './Dashboard/Create';
import Edit from './Dashboard/Edit';
import Delete from './Dashboard/Delete';
import Setting from './Dashboard/Setting';
import UpdatePost from './Dashboard/UpdatePost';

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((store: RootState) => store.User?.data)
    const [isToogle,setIstoogle]= useState(false)
    const [isActive ,setIsactive]=useState('dashboard')
    const buttonHanddler =(btn:string)=>{
        setIsactive(btn)
    }
    useEffect(() => {


        const token = localStorage.getItem('token')

        if (token) {
            const user: decodeJwt = jwtDecode(token)
            const expireDate= user.exp * 1000
            if(expireDate<Date.now()){
                console.log("Date is Big")
                localStorage.clear()
                navigate('/')
            }
            else{
                if (user._id) {
                    dispatch(getUserById(user._id))
                }
                else {
                    navigate('/')
                }
            }

        }
        else {
            navigate('/')
        }

    }, [])

    return (
        <section>
                            <ToastContainer />

            <div className=' lg:flex gap-2 w-full lg:h-[87vh] justify-between '>
                
                <div className='nav lg:w-[20%] lg:h-[87vh]  bg-slate-400 overflow-scroll scrollbar-hide'>
                    <div className='profile h-[160px] w-full bg-black flex flex-col justify-center items-center'>
                        <div className='h-[100px] w-[100px] rounded-full'>
                            <img className='h-full w-full object-center rounded-full' src={user?.image} alt="profile of user" />
                        </div>
                        <span className=' text-white'>{user?.email}</span>
                    </div>
                    <div className=' flex h-12 items-center justify-around lg:hidden'>
                        <h1>Dashboard</h1>
                        <button className=' text-2xl' onClick={()=>setIstoogle(!isToogle)}><RiMenuAddFill/></button>
                    </div>
                    <div onClick={()=>setIstoogle(false)} className={`option ${isToogle? '':'hidden'}   lg:flex flex-col justify-between items-center gap-4 bg-slate-400`}>
                        <Link to={'/dashboard'} className= {`dashboard-button ${isActive=='dashboard'?' bg-slate-600':''}`} onClick={()=>buttonHanddler("dashboard")}>
                            <div className=' w-[200px] h-[60px] flex items-center gap-4'>
                                <span className=' text-green-500 text-2xl'><BiSolidDashboard /></span>
                                <span className=' text-2xl font-Oswald text-white'>Dashboard</span>
                            </div>
                        </Link>

                        <Link to={'/dashboard/create'} className={`dashboard-button ${isActive=='create'?' bg-slate-600':''}`} onClick={()=>buttonHanddler("create")}>
                            <div className=' w-[200px] h-[60px] flex items-center gap-4'>
                                <span className=' text-green-500 text-2xl'><BiSolidDashboard /></span>
                                <span className=' text-2xl font-Oswald text-white'>Create Post</span>
                            </div>
                        </Link>

                        <Link to={'/dashboard/edit'} className={`dashboard-button ${isActive=='edit'?' bg-slate-600':''}`} onClick={()=>buttonHanddler("edit")}>
                            <div className=' w-[200px] h-[60px] flex items-center gap-4'>
                                <span className=' text-green-500 text-2xl'><BiSolidDashboard /></span>
                                <span className=' text-2xl font-Oswald text-white'>Edit Post</span>
                            </div>
                        </Link>

                        <Link to={'/dashboard/delete'} className={`dashboard-button ${isActive=='delete'?' bg-slate-600':''}`} onClick={()=>buttonHanddler("delete")}>
                            <div className=' w-[200px] h-[60px] flex items-center gap-4'>
                                <span className=' text-green-500 text-2xl'><BiSolidDashboard /></span>
                                <span className=' text-2xl font-Oswald text-white'>Delete Post</span>
                            </div>
                        </Link>

                        <Link to={'/dashboard/setting'} className={`dashboard-button  ${isActive=='setting'?' bg-slate-600':''}`} onClick={()=>buttonHanddler("setting")}>
                            <div className=' w-[200px] h-[60px] flex items-center gap-4  '>
                                <span className=' text-green-500 text-2xl'><BiSolidDashboard /></span>
                                <span className=' text-2xl font-Oswald text-white'>Setting</span>
                            </div>
                        </Link>


                    </div>
                </div>
                <div className=' bg-gray-600 lg:w-[80%] lg:h-[87vh] p-4 overflow-scroll scrollbar-hide'>
                    <Routes>
                        <Route path='/'  element={<DashHome/>}  />
                        <Route path='/:id'  element={<Create></Create>}/>
                        <Route path='/edit'  element={<Edit/>}/>
                        <Route path='/delete'  element={<Delete/>}/>
                        <Route path='/setting'  element={<Setting/>}/>
                        <Route path='/post/:id'  element={<PostDetails/>}/>
                        <Route path='/post/update/:id'  element={<UpdatePost/>}/>
                    </Routes>
                </div>

            </div>

        </section>
    );
};

export default Dashboard;