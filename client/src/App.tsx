import { Route, Routes } from "react-router-dom";
import NavBar from "./component/NavBar";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import "./App.css"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import Footer from "./component/Footer";
import PostDetails from "./pages/PostDetails";

const App = () => {

useEffect(()=>{

},[])

  return (
    <>
        <NavBar/>

        {/* Routing Parts */}
        <div className="mt-[80px] mb-[80px]">

        <Routes >
          <Route  path="/*" element={<HomePage/>} />
          <Route  path="*" element={<HomePage/>} />
          <Route  path="/posts/:id" element={<PostDetails/>} />
          <Route path="/about/*" element={<About/>} />
          <Route path="/blog/*" element={<Blog/>} />
          <Route path="/contact/*" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
        </div>
        
        <Footer/>

    </>
  );
};

export default App;