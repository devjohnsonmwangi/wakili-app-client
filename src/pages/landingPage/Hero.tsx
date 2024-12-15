import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import bgrides from '../../assets/images/auth/logo.jpeg'; // Background image
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// Import Lucide icons directly
import {  Lightbulb, Shield } from 'lucide-react'; // Lucide icons

const Hero = () => {
  const user = useSelector((state: RootState) => state.user);
  const name = user.user?.full_name;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className="relative hero min-h-screen lg:h-screen w-full flex flex-col justify-center items-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgrides})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div 
        className={`relative hero-content text-neutral-content text-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'} 
          w-full sm:w-11/12 md:w-10/12 lg:w-9/12`}
      >
        <div 
          className={`transform transition-transform duration-1000 ${loaded ? 'translate-y-0' : '-translate-y-10'}`}
        >

          {/* Heading with marquee animation */}
          <h1 className="mb-8 mt-16 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-green max-w-full">
            <div className="inline-block whitespace-nowrap animate-marquee">
              Welcome to Wakili Legal Services<span>{name ? `, ${name}` : ''}</span>
            </div>
          </h1>

          {/* Call-to-action Subtext */}
          <p className="mb-6 text-sm sm:text-base md:text-lg font-medium text-soft-yellow animate-twinkle max-w-full">
            <Lightbulb className="inline-block mr-2 text-2xl text-yellow-500" />
            "Access expert legal advice, from contract reviews to legal representation, we provide trusted solutions for your legal needs."
          </p>

          <p className="mb-6 text-sm sm:text-base md:text-lg font-medium text-soft-yellow animate-twinkle max-w-full">
            < Lightbulb className="inline-block mr-2 text-2xl text-soft-yellow" />
            "Whether you're dealing with personal matters, business contracts, or legal disputes, our team is here to ensure your rights are protected."
          </p>

          <p className="mb-6 text-sm sm:text-base md:text-lg font-medium text-soft-yellow animate-twinkle max-w-full">
            <Shield className="inline-block mr-2 text-2xl text-green-500" />
            "Join us at Wakili for legal services that give you peace of mind and a clear path forward."
          </p>

          {/* Articles of the Constitution */}
          <div className="bg-black bg-opacity-60 p-4 sm:p-6 md:p-8 rounded-lg w-full sm:w-11/12 md:w-10/12 lg:w-9/12 mt-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">Articles of the Constitution</h2>

            <div className="space-y-4">
              <div className="text-sm sm:text-base">
                <h3 className="font-semibold text-white">< Lightbulb className="inline-block mr-2 text-lg" />Article 1: Right to Legal Representation</h3>
                <p className="text-gray-300">"Every individual has the right to competent legal representation, ensuring fair treatment under the law."</p>
              </div>

              <div className="text-sm sm:text-base">
                <h3 className="font-semibold text-white">< Lightbulb className="inline-block mr-2 text-lg" />Article 2: Right to a Fair Trial</h3>
                <p className="text-gray-300">"All individuals are entitled to a fair and public trial without undue delay, by an independent and impartial tribunal."</p>
              </div>

              <div className="text-sm sm:text-base">
                <h3 className="font-semibold text-white"><Shield className="inline-block mr-2 text-lg" />Article 3: Protection from Unlawful Detention</h3>
                <p className="text-gray-300">"No person shall be subject to arbitrary arrest or detention. Every individual has the right to liberty and security of person."</p>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6 md:p-6 rounded-lg w-full sm:w-11/12 md:w-10/12 lg:w-9/12 mt-3">
                     {/* Call-to-Action Button */}
          <Link 
            to="/register" 
            className="mt-10 px-6 py-3 bg-gradient-to-r from-button-gradient-start to-button-gradient-end text-white rounded-lg text-sm sm:text-lg font-bold hover:scale-105 transition-transform"
          >
            Register To Explore Our Legal Services
          </Link>
          </div>
       
         

        </div>
     
    
      </div>
    </div>
  );
};

export default Hero;
