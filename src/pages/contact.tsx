import Navbar from "../components/navbar/Navbar"; // Import Navbar component
import Footer from "../pages/landingPage/Footer"; // Import Footer component

const ContactPage = () => {
  return (
    <div className="bg-[#f4f4f9] font-sans transition-all">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Section */}
      <div className="py-16">
        <div className="max-w-screen-lg mx-auto px-6 lg:px-16">
          {/* Contact Section Header */}
          <div className="text-center mb-16 animate__animated animate__fadeIn animate__delay-1s">
            <h2 className="text-4xl font-bold text-[#081f08] mb-4 transition duration-500 ease-in-out transform hover:scale-105">
              Contact Us
            </h2>
            <p className="text-lg  font-semibold text-[#081f08]">
              We’d love to hear from you! Whether you have questions or need assistance, we’re here to help.
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-[#081f08] mb-6">
              Get in Touch
            </h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name and Email Inputs */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] transition-all duration-300 ease-in-out transform hover:scale-105"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-700 mb-2">Your Email</label>
                  <input
                    type="email"
                    className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] transition-all duration-300 ease-in-out transform hover:scale-105"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Message Textarea with Floating Label */}
              <div className="relative flex flex-col mt-6">
                <textarea
                  id="message"
                  className="peer h-32 resize-none border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] transition-all duration-300 ease-in-out transform hover:scale-105"
                  placeholder=" "
                  rows={6}
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-4 top-4 text-sm text-gray-700 transform scale-75 origin-top-left transition-all duration-200 ease-in-out peer-placeholder-shown:scale-100 peer-placeholder-shown:top-6 peer-focus:top-4 peer-focus:scale-75"
                >
                  Your Message
                </label>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-[#081f08] text-white text-lg px-8 py-4 rounded-lg hover:bg-[#ffcc00] transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-[#081f08] mb-4">
              Our Contact Info
            </h3>
            <p className="text-lg text-gray-600 mb-4">You can also reach us at:</p>
            <div className="flex justify-center gap-12">
              <div className="text-center transition-transform duration-300 ease-in-out hover:scale-105">
                <h4 className="font-semibold text-lg text-[#081f08]">Address</h4>
                <p className="text-gray-600">123 Wakili Street, Nairobi, Kenya</p>
              </div>
              <div className="text-center transition-transform duration-300 ease-in-out hover:scale-105">
                <h4 className="font-semibold text-lg text-[#081f08]">Phone</h4>
                <p className="text-gray-600">+254 112810203</p>
              </div>
              <div className="text-center transition-transform duration-300 ease-in-out hover:scale-105">
                <h4 className="font-semibold text-lg text-[#081f08]">Email</h4>
                <p className="text-gray-600">info@wakili.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
