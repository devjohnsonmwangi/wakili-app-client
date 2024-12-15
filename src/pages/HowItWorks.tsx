import Footer from "../pages/landingPage/Footer";
import Navbar from "../components/navbar/Navbar";
import Lottie, { Options } from "react-lottie"; // Use Options type from react-lottie
import { 
    FaUserCheck, 
    FaListAlt, 
    FaFileSignature, 
    FaCalendarAlt, 
    FaFileContract, 
    FaComments, 
    FaSmile 
} from "react-icons/fa";

import animationData1 from "../utils/utils/search.json";
import animationData2 from "../utils/utils/choose.json";
import animationData3 from "../utils/utils/book.json";
import animationData4 from "../utils/utils/search.json";
import animationData5 from "../utils/utils/search.json";
import animationData6 from "../utils/utils/search.json";
import animationData7 from "../utils/utils/search.json";

// Type for Lottie Options
const defaultOptions = (animationData: object): Options => ({
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
});

function HowItWorks() {
    return (
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow py-16 px-6">
                <h1 className="text-5xl text-center text-green-500 font-extrabold mb-12 tracking-wide animate-fade-in">
                    How <span className="text-blue-500">Wakili</span> Works
                </h1>
                <div className="max-w-6xl mx-auto space-y-16">
                    {/** Step 1 **/}
                    <Step 
                        animation={animationData1} 
                        title="Step 1: Sign Up & Create Your Profile" 
                        icon={<FaUserCheck />} 
                        reverse 
                        description="Start your journey by signing up on Wakili. Create your profile and provide essential information about your legal needs and preferences. This helps us tailor your experience." 
                    />
                    
                    {/** Step 2 **/}
                    <Step 
                        animation={animationData2} 
                        title="Step 2: Select Your Legal Service" 
                        icon={<FaListAlt />} 
                        reverse 
                        description="Browse through a list of legal services such as property agreements, contracts, legal advice, and more. Choose the service that fits your needs. Our platform supports diverse legal requirements." 
                    />
                    
                    {/** Step 3 **/}
                    <Step 
                        animation={animationData3} 
                        title="Step 3: Book a Consultation" 
                        icon={<FaFileSignature />} 
                        reverse 
                        description="Once you select a service, book a consultation with a legal expert. Choose a suitable date and time for the meeting. You’ll receive a confirmation for your booking." 
                    />
                    
                    {/** Step 4 **/}
                    <Step 
                        animation={animationData4} 
                        title="Step 4: Attend Your Consultation" 
                        icon={<FaCalendarAlt />} 
                        reverse 
                        description="Meet with a lawyer or legal expert at the scheduled time. You can ask questions, seek guidance, and discuss your specific legal needs. Your privacy and confidentiality are guaranteed." 
                    />
                    
                    {/** Step 5 **/}
                    <Step 
                        animation={animationData5} 
                        title="Step 5: Get Legal Documents Prepared" 
                        icon={<FaFileContract />} 
                        reverse 
                        description="Based on your needs, our legal experts will prepare all necessary documents, contracts, and agreements. We ensure everything is reviewed and ready for your signature." 
                    />
                    
                    {/** Step 6 **/}
                    <Step 
                        animation={animationData6} 
                        title="Step 6: Ongoing Support & Guidance" 
                        icon={<FaComments />} 
                        reverse 
                        description="Our team is here to support you throughout the process. If you need clarification, revisions, or additional support, we’re just a message away. We ensure seamless service." 
                    />
                    
                    {/** Step 7 **/}
                    <Step 
                        animation={animationData7} 
                        title="Step 7: Complete Your Legal Service" 
                        icon={<FaSmile />} 
                        reverse 
                        description="Once everything is finalized, you’ll receive your legal documents. We aim to ensure you leave satisfied with a complete understanding of your legal situation." 
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

// Props interface for the Step component
interface StepProps {
    animation: object; 
    title: string; 
    icon: React.ReactNode; 
    description: string; 
    reverse: boolean; 
}

const Step: React.FC<StepProps> = ({ animation, title, icon, description, reverse }) => (
    <div className={`flex flex-col md:flex-row items-center md:space-x-8 ${reverse ? "md:flex-row-reverse" : ""} animate-slide-up`}>
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <div className="p-4 rounded-lg shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
                <Lottie options={defaultOptions(animation)} height={300} width={300} />
            </div>
        </div>
        <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-extrabold text-green-400 flex items-center space-x-3">
                <span className="p-2 bg-green-600 text-white rounded-full hover:rotate-12 transition-all duration-300">
                    {icon}
                </span>
                <span className="hover:text-green-500 transition-all duration-300">
                    {title}
                </span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
                {description}
            </p>
        </div>
    </div>
);

export default HowItWorks;
