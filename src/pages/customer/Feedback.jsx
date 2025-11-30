import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, X, MapPin, Phone, Mail } from 'lucide-react';

const Feedback = () => {
  const [activeSection, setActiveSection] = useState('feedback');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const backgroundImageUrl = "/images/bg.jpg";

  // Navigation functions
  const handleNavigation = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    
    switch(section) {
      case 'home':
        navigate('/dashboard');
        break;
      case 'amenities':
        navigate('/amenities');
        break;
      case 'reservations':
        navigate('/reservations');
        break;
      case 'feedback':
        // Already on feedback page
        break;
      case 'contact':
        navigate('/contact');
        break;
      default:
        break;
    }
  };

  // Logout Functions
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setMobileMenuOpen(false);
  };

  const handleConfirmLogout = () => {
    logout();
    navigate('/');
    setShowLogoutConfirm(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-4 transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleCancelLogout}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">LP</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 font-header">La Piscina IRMS</h1>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <button 
                onClick={() => handleNavigation('home')}
                className={`font-body font-medium pb-1 transition-colors ${
                  activeSection === 'home' 
                    ? 'text-orange-500 border-b-2 border-orange-500' 
                    : 'text-gray-800 hover:text-orange-500'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('amenities')}
                className={`font-body font-medium pb-1 transition-colors ${
                  activeSection === 'amenities' 
                    ? 'text-orange-500 border-b-2 border-orange-500' 
                    : 'text-gray-800 hover:text-orange-500'
                }`}
              >
                Amenities
              </button>
              <button 
                onClick={() => handleNavigation('reservations')}
                className={`font-body font-medium pb-1 transition-colors ${
                  activeSection === 'reservations' 
                    ? 'text-orange-500 border-b-2 border-orange-500' 
                    : 'text-gray-800 hover:text-orange-500'
                }`}
              >
                Reservations
              </button>
              <button 
                onClick={() => handleNavigation('feedback')}
                className={`font-body font-medium pb-1 transition-colors ${
                  activeSection === 'feedback' 
                    ? 'text-orange-500 border-b-2 border-orange-500' 
                    : 'text-gray-800 hover:text-orange-500'
                }`}
              >
                Feedback
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className={`font-body font-medium pb-1 transition-colors ${
                  activeSection === 'contact' 
                    ? 'text-orange-500 border-b-2 border-orange-500' 
                    : 'text-gray-800 hover:text-orange-500'
                }`}
              >
                Contact
              </button>
            </nav>
            
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {user && (
                <div className="flex items-center space-x-3 text-gray-800">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{user.username}</span>
                    <span className="text-xs text-gray-500">Welcome back!</span>
                  </div>
                </div>
              )}
              
              {/* Logout Button */}
              <button 
                onClick={handleLogoutClick}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <nav className="flex flex-col space-y-3">
                <button 
                  onClick={() => handleNavigation('home')}
                  className={`font-body font-medium py-2 px-4 rounded-lg transition-colors text-left ${
                    activeSection === 'home' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNavigation('amenities')}
                  className={`font-body font-medium py-2 px-4 rounded-lg transition-colors text-left ${
                    activeSection === 'amenities' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Amenities
                </button>
                <button 
                  onClick={() => handleNavigation('reservations')}
                  className={`font-body font-medium py-2 px-4 rounded-lg transition-colors text-left ${
                    activeSection === 'reservations' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Reservations
                </button>
                <button 
                  onClick={() => handleNavigation('feedback')}
                  className={`font-body font-medium py-2 px-4 rounded-lg transition-colors text-left ${
                    activeSection === 'feedback' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Feedback
                </button>
                <button 
                  onClick={() => handleNavigation('contact')}
                  className={`font-body font-medium py-2 px-4 rounded-lg transition-colors text-left ${
                    activeSection === 'contact' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Contact
                </button>
                {user && (
                  <div className="flex items-center space-x-3 text-gray-800 py-2 px-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{user.username}</span>
                      <span className="text-xs text-gray-500">Welcome back!</span>
                    </div>
                  </div>
                )}
                <button 
                  onClick={handleLogoutClick}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="bg-cover bg-center text-white py-16 sm:py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImageUrl})`
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-header font-bold mb-4">Guest Feedback</h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto opacity-90">
            Your feedback helps us improve our services and create better experiences for all our guests. 
            Share your thoughts and read what others have to say.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-header mb-4">
              Feedback Content Goes Here
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              This is where your feedback form and reviews would be displayed.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <p className="text-orange-800 font-medium">
                The main content area is ready for your feedback components!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-lp-dark text-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Location & Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-header mb-4 text-orange-500">Visit Us Today</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-300">Barangay Gumamela, Balayan</p>
                    <p className="text-gray-300">Batangas, Philippines</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">+63 (912) 345-6789</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">info@lapiscinaconception.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links & Navigation */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold font-header mb-4 text-orange-500">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <button 
                    onClick={() => handleNavigation('home')}
                    className="block text-gray-300 hover:text-orange-500 transition-colors text-left text-sm sm:text-base"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => handleNavigation('amenities')}
                    className="block text-gray-300 hover:text-orange-500 transition-colors text-left text-sm sm:text-base"
                  >
                    Amenities
                  </button>
                  <button 
                    onClick={() => handleNavigation('reservations')}
                    className="block text-gray-300 hover:text-orange-500 transition-colors text-left text-sm sm:text-base"
                  >
                    Reservation
                  </button>
                  <button 
                    onClick={() => handleNavigation('feedback')}
                    className="block text-gray-300 hover:text-orange-500 transition-colors text-left text-sm sm:text-base"
                  >
                    Feedback
                  </button>
                  <button 
                    onClick={() => handleNavigation('contact')}
                    className="block text-gray-300 hover:text-orange-500 transition-colors text-left text-sm sm:text-base"
                  >
                    Contact
                  </button>
                </div>
                <div className="space-y-2">
                  <button className="block text-gray-300 hover:text-orange-500 transition-colors text-left text-sm sm:text-base">
                    About Us
                  </button>
                  <button className="block text-gray-300 hover:text-orange-500 transition-colors text-left text-sm sm:text-base">
                    FAQ
                  </button>
                  <button className="block text-gray-300 hover:text-orange-500 transition-colors text-left text-sm sm:text-base">
                    Privacy Policy
                  </button>
                  <button className="block text-gray-300 hover:text-orange-500 transition-colors text-left text-sm sm:text-base">
                    Terms of Service
                  </button>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold font-header mb-4 text-orange-500">Resort Hours</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Thursday:</span>
                  <span>8:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday - Saturday:</span>
                  <span>8:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>8:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Copyright Bar */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} La Piscina De Conception Resort. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Feedback;