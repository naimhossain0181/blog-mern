import { useDispatch, useSelector } from 'react-redux';
import PostList from '../component/PostList';
import { AppDispatch, RootState } from '../reducer';
import { useEffect } from 'react';
import { getPostByCategory } from '../reducer/postSlice';
import { useParams } from 'react-router-dom';


const SearchByCategory = () => {
    const dispatch=useDispatch<AppDispatch>()
    const {id}=useParams()
    const Posts =useSelector((store:RootState)=>store.Posts)
    
    useEffect(()=>{
        dispatch(getPostByCategory(id))
    },[id])
    return (
        <div>
            <PostList Posts={Posts} />
        </div>
    );
};

export default SearchByCategory;