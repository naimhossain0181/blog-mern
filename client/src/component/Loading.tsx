import loader from '../assets/Vg1.gif';

const Loading = () => {
    return (
        <div className="w-full h-[80vh] flex justify-center items-center flex-col">
        <img src={loader} alt="abc" />
    </div>
    );
};

export default Loading;