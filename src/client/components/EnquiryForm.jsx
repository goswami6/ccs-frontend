import React, { useState } from 'react';
import { Send, CheckCircle, Loader2, User, Mail, Phone, MessageSquare, Tag } from 'lucide-react';
import { submitEnquiry } from '../../utils/api';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitEnquiry(formData);
      setSent(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) return (
    <div className="p-12 text-center bg-white rounded-[2.5rem] shadow-xl border border-emerald-100 animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={40} />
      </div>
      <h3 className="text-3xl font-black text-slate-900 mb-2">Message Sent!</h3>
      <p className="text-slate-500 font-medium max-w-xs mx-auto">
        Thank you for reaching out. Our team will contact you shortly.
      </p>
      <button 
        onClick={() => setSent(false)} 
        className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all"
      >
        Send Another Message
      </button>
    </div>
  );

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 space-y-5">
        
        {/* Header inside Form */}
        <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900">Send an <span className="text-blue-600">Enquiry</span></h2>
            <p className="text-slate-400 text-sm font-medium mt-1">Fill out the form below and we'll get back to you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required 
              placeholder="Your Full Name" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700 transition-all"
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700 transition-all"
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Phone Field */}
            <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                required 
                placeholder="Phone Number" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700 transition-all"
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                />
            </div>

            {/* Subject Field */}
            <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                required 
                placeholder="Subject" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700 transition-all"
                value={formData.subject} 
                onChange={e => setFormData({...formData, subject: e.target.value})} 
                />
            </div>
        </div>

        {/* Message Field */}
        <div className="relative">
          <MessageSquare className="absolute left-4 top-6 text-slate-400" size={18} />
          <textarea 
            required 
            rows="4" 
            placeholder="How can we help you?" 
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700 transition-all resize-none"
            value={formData.message} 
            onChange={e => setFormData({...formData, message: e.target.value})} 
          />
        </div>
        
        <button 
          disabled={loading} 
          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 disabled:bg-slate-300"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              <Send size={20} /> SUBMIT MESSAGE
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;