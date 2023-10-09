import { Route, Routes } from "react-router-dom";
import NavBar from "./component/NavBar";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import "./App.css"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./component/Footer";
import PostDetails from "./pages/PostDetails";
import Dashboard from "./pages/Dashboard";
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {

  const [isLogin,setIslogin]=useState(false)

  const loginHanddlerByNav=()=>{
    setIslogin(true)
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
        setIslogin(true)
    }
  },[])




  return (
    <>
        <NavBar isLogin={isLogin} setIslogin={setIslogin}/>
        {/* Routing Parts */}
        <div className="mt-[80px] pb-[80px]">

        <Routes >
          <Route path="/*"  element={<HomePage/>} />
          <Route path="/posts/:id" element={<PostDetails/>} />
          <Route path="/about/*" element={<About/>} />
          <Route path="/blog/*" element={<Blog/>} />
          <Route path="/contact/*" element={<Contact/>} />
          <Route path="/login"  element={<Login handdlerLogin={loginHanddlerByNav}/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard/*" element={<Dashboard/>} />
        </Routes>
        </div>
        
        <Footer/>

    </>
  );
};

export default App;