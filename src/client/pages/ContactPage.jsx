import React from 'react';
import EnquiryForm from '../components/EnquiryForm';

const ContactPage = () => {
  const contactDetails = [
    {
      title: "School Address",
      info: "Badagaon Budhanpur, Azamgarh, Uttar Pradesh, India",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "bg-blue-50 text-[#1E88E5]"
    },
    {
      title: "Call Us",
      info: "+91 9569812336 \n +91 7309045674 \n +91 8795284282",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      color: "bg-green-50 text-[#2E7D32]"
    },
    {
      title: "Working Hours",
      info: "Mon – Sat: 8:00 AM – 4:00 PM \n Sunday: Closed",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-red-50 text-[#C62828]"
    }
  ];

  return (
    <div className="bg-white">
      {/* 1. HEADER SECTION */}
      <div className="bg-[#1E88E5] py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Get In Touch</h1>
        <p className="mt-4 text-blue-100 max-w-xl mx-auto px-4">
          Have questions? We are here to help. Reach out to us for admissions, 
          inquiries, or to schedule a campus visit.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-12">
        {/* 2. QUICK CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactDetails.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
              <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 whitespace-pre-line text-sm leading-relaxed">
                {item.info}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* 3. CONTACT FORM */}
          <EnquiryForm />

          {/* 4. GOOGLE MAP */}
          <div className="w-full lg:w-1/2 h-[450px] lg:h-auto rounded-3xl overflow-hidden shadow-inner border border-gray-100 bg-gray-200">
            {/* Replace the src with your actual Google Maps Embed link for Budhanpur Azamgarh */}
            <iframe 
              title="School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14333.123456789!2d83.012345!3d26.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399123456789!2sBudhanpur%2C%20Azamgarh%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;