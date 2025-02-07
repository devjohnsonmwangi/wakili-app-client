
import { Link } from 'react-router-dom'; // Ensure to import Link for routing

const Footer = () => {
  return (
    <footer className="bg-[#081f08] text-white py-10 px-6 md:px-20">
      <div className="flex flex-wrap justify-between gap-12">

        {/* Services Section */}
        <nav>
          <h6 className="text-xl font-bold mb-6">Our Services</h6>
          <ul className="space-y-3">
            <li><Link to="#legal-consultation" className="text-white hover:text-[#ffcc00] transition-colors duration-300">Legal Consultation</Link></li>
            <li><Link to="#case-representation" className="text-white hover:text-[#ffcc00] transition-colors duration-300">Case Representation</Link></li>
            <li><Link to="#document-review" className="text-white hover:text-[#ffcc00] transition-colors duration-300">Document Review</Link></li>
            <li><Link to="#contract-drafting" className="text-white hover:text-[#ffcc00] transition-colors duration-300">Contract Drafting</Link></li>
            <li><Link to="#legal-advice" className="text-white hover:text-[#ffcc00] transition-colors duration-300">Legal Advice</Link></li>
          </ul>
        </nav>

        {/* Company Section */}
        <nav>
          <h6 className="text-xl font-bold mb-6">Company</h6>
          <ul className="space-y-3">
            <li><a href="#about" className="text-white hover:text-[#ffcc00] transition-colors duration-300">About Us</a></li>
            <li><Link to="/dashboard/profile" className="text-white hover:text-[#ffcc00] transition-colors duration-300">Dashboard</Link></li>
            <li><a href="#services" className="text-white hover:text-[#ffcc00] transition-colors duration-300">Services</a></li>
            <li><Link to="/contactus" className="text-white hover:text-[#ffcc00] transition-colors duration-300">Contact Us</Link></li>
          </ul>
        </nav>

        {/* Legal Section */}
        <nav>
          <h6 className="text-xl font-bold mb-6">Legal</h6>
          <ul className="space-y-3">
            <li><Link to="/terms" className="text-white hover:text-[#ffcc00] transition-colors duration-300">Terms of Use</Link></li>
            <li><Link to="/privacy" className="text-white hover:text-[#ffcc00] transition-colors duration-300">Privacy Policy</Link></li>
            <li><Link to="/cookies" className="text-white hover:text-[#ffcc00] transition-colors duration-300">Cookie Policy</Link></li>
          </ul>
        </nav>

      </div>

      {/* Footer Bottom Section */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} <span className="text-white font-bold">Wakili</span>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
