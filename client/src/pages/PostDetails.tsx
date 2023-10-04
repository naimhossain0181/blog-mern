import { useEffect } from 'react';
import { getSinglePost } from '../reducer/postSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../reducer';

const PostDetails = () => {
    const dispatch=useDispatch<AppDispatch>()

    useEffect(()=>{
        dispatch(getSinglePost("6515c12f41936a91dfe368dd"))
    })
    return (
        <div>
            Product
        </div>
    );
};

export default PostDetails;