import { RootState } from '../reducer';
import PostList from './PostList';

const AllPostComp = ({Posts}:RootState) => {
    return (
        <section>
        <div className='w-[100%] overflow-hidden p-1  lg:pl-24 lg:pr-24 mt-12'>
            <div className=' h-full w-full flex flex-col justify-around'>
                <div>
                <   h1 className='font-display text-4xl mb-10 '>All About Here </h1>
                </div>
                <PostList Posts={Posts}/>

            </div>

        </div>

    </section>
    );
};

export default AllPostComp;