import React, { useState } from 'react';
import { MapPin, Upload, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NeedPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    image: null
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your need has been submitted successfully! It will be reviewed and published shortly.');
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        image: null
      });
      setImagePreview(null);
    }, 2000);
  };

  const isFormValid = formData.title.trim() && formData.description.trim() && formData.location.trim();
  const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 font-['Inter',sans-serif]">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex justify-between items-center z-50 shadow-sm">
        <a href="/" className="text-xl md:text-2xl font-bold text-blue-500 no-underline" onClick={navigate('/')}>
          Dharma
        </a>
        
        <div className="flex gap-2 md:gap-3 items-center">
          <a 
            href="#" 
            className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition-colors no-underline"
          >
            Connect Wallet
          </a>
          <a 
            href="#" 
            className="px-4 py-2.5 bg-gray-200 text-gray-600 rounded-lg font-semibold text-sm no-underline flex items-center gap-2"
          >
            <span className="hidden xs:inline">Create Need</span>
            <span className="xs:hidden text-lg font-bold">+</span>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 md:pt-24 px-4 md:px-6 max-w-2xl mx-auto pb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          {/* Page Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Describe Your Need
            </h1>
            <p className="text-sm text-slate-600">
              Help us understand your situation so the community can support you
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Urgent Need for Blankets"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-slate-900 placeholder-slate-500"
                required
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the situation and what is needed. Include specific details about your circumstances and how the community can help."
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-slate-900 placeholder-slate-500 resize-none"
                required
              />
            </div>

            {/* Location Input */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State, Country"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-slate-900 placeholder-slate-500"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Upload Image
              </label>
              <div className="space-y-4">
                {/* Upload Button */}
                <label className="relative cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <div className="flex items-center justify-center w-full py-4 px-6 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors">
                    <div className="text-center">
                      <Camera className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <span className="text-sm font-medium text-slate-600">
                        Choose image to upload
                      </span>
                      <p className="text-xs text-slate-500 mt-1">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                </label>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Upload preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-base transition-all ${
                  isFormValid && !isSubmitting
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Post'
                )}
              </button>
            </div>

            {/* Help Text */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Your post will be reviewed and published within 24 hours
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NeedPage;