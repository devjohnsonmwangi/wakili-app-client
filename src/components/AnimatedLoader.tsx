
//getting best loading experience with  the animated loader
import Lottie from 'react-lottie';
import animationData from '../utils/utils/Animation - 1721057973947.json';


const AnimatedLoader = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return <Lottie options={defaultOptions} height={150} width={150} />;
};

export default AnimatedLoader;