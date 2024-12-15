
import { useGetTeamByRolesQuery } from '../../features/team/teamApi';
import { 
   Mail, Phone, Loader2, Eye, Target, ShieldCheck, Users, TrendingUp, Lightbulb, Handshake 
} from 'lucide-react'; // Importing Lucide Icons
import backgroundImage from '../../assets/images/landingPage/coverimage3.jpeg'; // Importing the background image

const About = () => {
  const { data: team, isLoading, isError } = useGetTeamByRolesQuery('all');
    // Log the team data for debugging
    console.log('Team data:', team);

    // If the API response contains a `users` array, extract it
    const members = Array.isArray(team) ? team : team?.users || [];

  return (
    <div className="relative mt-10 mb-10 px-6 ">
      {/* Background Image with black background and 70% opacity */}
      <div 
        className="absolute inset-0 bg-black opacity-70 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="relative z-10 w-[90%] mx-auto bg-black bg-opacity-80 p-8 rounded-xl shadow-lg">
        
        {/* Title Section with Dark Green header */}
        <h1 className="text-[#006400] text-5xl font-extrabold text-center py-6 italic drop-shadow-md">
          About Wakili App
        </h1>

        {/* Company Introduction with White text */}
        <p className="text-center text-lg mb-8 italic text-white">
          At <strong className="w-10 h-10 text-[#006400]">Wakili</strong>, we believe in empowering individuals, businesses, and communities with world-class legal support and advisory services. 
          Our journey began with a simple idea — to make legal services accessible, transparent, and client-focused.
        </p>

        {/* Mission & Vision Section */}
        <div className="mt-8">
          <h2 className="text-[#006400] text-3xl font-bold text-center py-4">Our Mission & Vision</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            <div className="flex items-center gap-4">
              <Target className="w-10 h-10 text-[#006400]" />
              <p className="text-lg text-white">
                <strong className="w-10 h-10 text-[#006400]" >Our Mission:</strong> To provide high-quality, accessible legal services to clients of all backgrounds.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Eye className="w-10 h-10 text-[#006400]" />
              <p className="text-lg text-white">
                <strong className="w-10 h-10 text-[#006400]" >Our Vision:</strong> We envision a future where legal services are simple, accessible, and client-driven.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-8">
          <h2 className="text-[#006400] text-3xl font-bold text-center py-4">Our Core Values</h2>
          <ul className="list-none space-y-6">
            <li className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-[#006400]" />
              <p className="text-lg text-white"><strong className="w-10 h-10 text-[#006400]" >Integrity:</strong> We uphold the highest ethical standards and act with honesty and fairness.</p>
            </li>
            <li className="flex items-center gap-4">
              <Users className="w-8 h-8 text-[#006400]" />
              <p className="text-lg text-white"><strong className="w-10 h-10 text-[#006400]" >Client-Centered Approach:</strong> We tailor our services to meet unique client needs.</p>
            </li>
            <li className="flex items-center gap-4">
              <TrendingUp className="w-8 h-8 text-[#006400]" />
              <p className="text-lg text-white"><strong className="w-10 h-10 text-[#006400]" >Excellence:</strong> We strive for excellence, continuously improving to exceed client expectations.</p>
            </li>
            <li className="flex items-center gap-4">
              <Lightbulb className="w-8 h-8 text-[#006400]" />
              <p className="text-lg text-white"><strong className="w-10 h-10 text-[#006400]" >Innovation:</strong> We embrace technology and innovation to deliver modern legal solutions.</p>
            </li>
            <li className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-[#006400]" />
              <p className="text-lg text-white"><strong className="w-10 h-10 text-[#006400]" >Accountability:</strong> We take responsibility for our actions and ensure transparency.</p>
            </li>
          </ul>
        </div>

         {/* Meet Our Team Section */}
         <div className="mt-8">
          <h2 className="text-[#006400] text-3xl font-bold text-center py-4">Meet Our Team</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-40 w-full">
              <Loader2 className="w-10 h-10 animate-spin text-[#006400]" />
              <p className="text-white ml-4">Loading team members...</p>
            </div>
          ) : isError ? (
            <p className="text-center text-red-500">Failed to load team members. Please try again later.</p>
          ) : members.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {members.map((member:any) => (
                <div 
                  key={member.id} 
                  className="w-56 bg-[#f7f7f7] rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="flex justify-center mt-4">
                    <img 
                      src={member.profile_picture || '/default-image.jpg'} 
                      alt={member.full_name} 
                      className="w-24 h-24 object-cover rounded-full border-4 border-[#006400]" 
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-center text-[#006400]">{member.full_name}</h3>
                    <p className="text-center text-sm text-[#006400]">{member.role}</p>

                    <div className="flex items-center mt-2 gap-2">
                      <Mail className="w-5 h-5 text-[#006400]" />
                      <a 
                        href={`mailto:${member.email}`} 
                        className="text-sm text-[#006400] hover:text-red-600 hover:underline break-all"
                      >
                        {member.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center mt-2 gap-2">
                      <Phone className="w-5 h-5 text-[#006400]" />
                      <a 
                        href={`tel:${member.phone_number}`} 
                        className="text-sm text-[#006400] hover:text-red-600 hover:underline"
                      >
                        {member.phone_number}
                      </a>
                    </div>

                    <p className="mt-4 text-sm text-[#333]">
                      <span className="font-extrabold text-[#006400]">{member.full_name}</span> 
                      <span className="font-bold text-[#8B4513]"> {member.role} </span>
                      <span className="italic text-[#006400]">
                        {`We highly recommend ${member.full_name} for their exceptional work in ${member.role}. 
                        Their experience and dedication to excellence make them an invaluable part of our team.`}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white">No team members found.</p>
          )}
        </div>

        {/* Partner With Us Section */}
        <div className="mt-8">
          <h2 className="text-[#006400] text-3xl font-bold text-center py-4">Partner With Us</h2>
          <div className="flex items-center justify-center gap-4">
            <Handshake className="w-10 h-10 text-[#006400]" />
            <p className="text-lg text-center text-white">
              Contact us today and let us be your trusted legal partner in navigating the complexities of the legal landscape.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;