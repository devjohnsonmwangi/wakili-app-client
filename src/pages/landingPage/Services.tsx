import serviceimg from '../../assets/images/landingPage/coverimageone.webp';
import bgrides from '../../assets/images/landingPage/coverimage3.jpeg'; // Background image
import { ShieldCheck, Car, Truck, DollarSign, Wrench, Clipboard, FileText, Users } from 'lucide-react'; // Importing necessary icons

const Services = () => {
  return (
    <div 
      className="w-full bg-cover bg-center min-h-screen py-10"
      style={{
        backgroundImage: `url(${bgrides})`, // Background image
      }}
    >
      {/* Image and Header in the Same Column */}
      <div className="w-[90%] mx-auto py-10 bg-black bg-opacity-80 rounded-xl shadow-xl">
        <div className="flex flex-row items-center">
          <img 
            src={serviceimg} 
            alt="Wakili Services" 
            className="w-48 h-48 rounded-full shadow-xl border-4 border-white mb-6" 
          />
          <div className="flex flex-col items-center">
            <h2 className="font-extrabold text-center text-3xl md:text-4xl text-[#006400] mb-4">
              Our Premium Legal Services
            </h2>
            <p className="text-lg text-white text-center mb-8">
              At <strong className="font-semibold text-2xl text-[#006400]">Wakili</strong>, we are committed to providing top-notch legal services that cater to your personal, business, and legal needs. 
              Our legal services align with the rights and provisions outlined in the Constitution. Below are the services we offer:
            </p>
          </div>
        </div>

        {/* Services Content in Column */}
        <div className="flex flex-col space-y-10">
          <ul className="list-none space-y-8">

            {/* Legal Consultation Service */}
            <li className="flex gap-4">
              <Clipboard size={30} className="text-[#006400]" />
              <div>
                <h3 className="font-semibold text-2xl text-[#006400]">Legal Consultation</h3>
                <p className="text-lg text-white italic mt-2">
                  Our expert legal consultants provide tailored advice for individuals and businesses. We ensure clients receive the best possible outcomes in any legal situation. 
                  This service is supported by <strong className="font-semibold text-2xl text-[#006400]">Article 48</strong> of the Constitution, which guarantees the right of access to justice for all.
                </p>
              </div>
            </li>

            {/* Contract Drafting Service */}
            <li className="flex gap-4">
              <ShieldCheck size={30} className="text-[#006400]" />
              <div>
                <h3 className="font-semibold text-2xl text-[#006400]">Contract Drafting & Review</h3>
                <p className="text-lg text-white italic mt-2">
                  Our team ensures all contracts are legally sound, clear, and protect your interests. 
                  This service is guided by <strong className="font-semibold text-2xl text-[#006400]">Article 40</strong> of the Constitution, which protects property rights, including contractual rights.
                </p>
              </div>
            </li>

            {/* Corporate Law Service */}
            <li className="flex gap-4">
              <Car size={30} className="text-[#006400]" />
              <div>
                <h3 className="font-semibold text-2xl text-[#006400]">Corporate Law</h3>
                <p className="text-lg text-white italic mt-2">
                  We offer services like company formation, mergers, and shareholder agreements. 
                  This service is guided by <strong className="font-semibold text-2xl text-[#006400]">Article 46</strong> of the Constitution, which ensures the protection of consumer rights and fair business practices.
                </p>
              </div>
            </li>

            {/* Litigation & Dispute Resolution Service */}
            <li className="flex gap-4">
              <Wrench size={30} className="text-[#006400]" />
              <div>
                <h3 className="font-semibold text-2xl text-[#006400]">Litigation & Dispute Resolution</h3>
                <p className="text-lg text-white italic mt-2">
                  We handle mediation, arbitration, and court litigation to resolve disputes. 
                  Our litigation services align with <strong className="font-semibold text-2xl text-[#006400]">Article 50</strong> of the Constitution, which guarantees the right to a fair trial.
                </p>
              </div>
            </li>

            {/* Employment Law Service */}
            <li className="flex gap-4">
              <DollarSign size={30} className="text-[#006400]" />
              <div>
                <h3 className="font-semibold text-2xl text-[#006400]">Employment Law</h3>
                <p className="text-lg text-white italic mt-2">
                  We help resolve issues related to wrongful termination, workplace rights, and compliance. 
                  This service is grounded in <strong className="font-semibold text-2xl text-[#006400]">Article 41</strong> of the Constitution, which guarantees labor rights, including fair treatment at the workplace.
                </p>
              </div>
            </li>

            {/* Intellectual Property Service */}
            <li className="flex gap-4">
              <Truck size={30} className="text-[#006400]" />
              <div>
                <h3 className="font-semibold text-2xl text-[#006400]">Intellectual Property Protection</h3>
                <p className="text-lg text-white italic mt-2">
                  Protect your creative work, inventions, and innovations with our intellectual property services. 
                  This service aligns with <strong className="font-semibold text-2xl text-[#006400]">Article 40</strong> of the Constitution, which recognizes and protects intellectual property rights as part of the right to property.
                </p>
              </div>
            </li>

            {/* Oaths Commissioning Service */}
            <li className="flex gap-4">
              <FileText size={30} className="text-[#006400]" />
              <div>
                <h3 className="font-semibold text-2xl text-[#006400]">Oaths Commissioning</h3>
                <p className="text-lg text-white italic mt-2">
                  Our oaths commissioning service includes witnessing sworn affidavits, statutory declarations, and the signing of legal documents. 
                  This service is linked to <strong className="font-semibold text-2xl text-[#006400]">Article 19</strong> of the Constitution, which ensures access to human rights and legal obligations.
                </p>
              </div>
            </li>

            {/* Family Law & Divorce Service */}
            <li className="flex gap-4">
              <Users size={30} className="text-[#006400]" />
              <div>
                <h3 className="font-semibold text-2xl text-[#006400]">Family Law & Divorce</h3>
                <p className="text-lg text-white italic mt-2">
                  We offer support for issues such as divorce, child custody, and adoption. 
                  This service is guided by <strong className="font-semibold text-2xl text-[#006400]" >Article 45</strong> of the Constitution, which guarantees the right to family, marriage, and care for children.
                </p>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;
