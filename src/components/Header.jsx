import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

const Header = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract active section from current path
  const getActiveSection = () => {
    const path = location.pathname;
    if (path === '/customer') return 'home';
    if (path.includes('/amenities')) return 'amenities';
    if (path.includes('/reservations')) return 'reservations';
    if (path.includes('/feedback')) return 'feedback';
    if (path.includes('/contact')) return 'contact';
    return 'home';
  };

  const activeSection = getActiveSection();

  const handleNavigation = (section) => {
    setIsMobileMenuOpen(false);
    
    const currentPath = location.pathname;
    const targetPaths = {
      home: ['/customer'],
      amenities: ['/amenities'],
      reservations: ['/reservations'],
      feedback: ['/feedback'],
      contact: ['/contact']
    };

    if (targetPaths[section]?.includes(currentPath)) {
      return;
    }
    
    switch(section) {
      case 'home':
        if (currentPath !== '/customer') {
          navigate('/customer');
        }
        break;
      case 'amenities':
        navigate('/amenities');
        break;
      case 'reservations':
        navigate('/reservations');
        break;
      case 'feedback':
        navigate('/feedback');
        break;
      case 'contact':
        navigate('/contact');
        break;
      default:
        if (currentPath !== '/customer') {
          navigate('/customer');
        }
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    setIsMobileMenuOpen(false);
    
    // Check if user has unsaved cart items
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (currentCart.length > 0 && user) {
      const userId = user.id || user._id || user.userId || user.user_id;
      if (userId) {
        const userCartKey = `cart_${userId}`;
        localStorage.setItem(userCartKey, JSON.stringify(currentCart));
      }
    }
    
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('cart');
      navigate('/');
    }
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const navItems = ['Home', 'Amenities', 'Reservations', 'Feedback', 'Contact'];

  return (
    <>
      <nav className="bg-white shadow-sm relative z-20 flex-shrink-0 w-full">
        <div className="mx-auto px-3 sm:px-4 lg:px-8 flex justify-between items-center w-full">
          
          {/* LEFT: Hamburger, Logo & Resort Name (Visible on all sizes) */}
          <div className="flex items-center gap-2">
            {/* Hamburger Menu Button (Left side, next to logo) */}
            <button 
              className="lg:hidden text-gray-600 hover:text-lp-orange transition-colors mr-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo - Visible on all sizes */}
            <div className="flex items-center justify-center">
              <img 
                src="/images/Lp.png" 
                alt="La Piscina IRMS Logo"
                className="w-17 h-17 md:w-25 md:h-20 object-contain"
              />
            </div>
            
            {/* Resort Name - Visible on all sizes, full text always */}
            <span className="text-base md:text-lg lg:text-xl text-lp-dark font-bold font-family-header tracking-tight">
              La Piscina De Conception Resort
            </span>
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item.toLowerCase())}
                className={`text-sm font-sm transition-colors ${
                  activeSection === item.toLowerCase() ? 'text-lp-orange border-b-2 border-lp-orange pb-1' : 'text-gray-600 hover:text-lp-orange'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* RIGHT: User Info, Notifications, and Desktop Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Name - Visible only on desktop (lg and up) */}
            {user && (
              <div className="hidden lg:block text-right mr-3">
                <p className="text-sm font-bold text-gray-800 truncate max-w-[100px]">
                  Hello, {user?.username || user?.name || 'User'}!
                </p>
              </div>
            )}

            {/* Desktop Logout Button (Hidden on Mobile) */}
            <button 
              onClick={handleLogoutClick} 
              className="hidden lg:flex items-center gap-2 px-3 py-2 bg-lp-orange text-white rounded-lg hover:bg-lp-orange-hover transition text-sm font-medium ml-2"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN - Shows only when hamburger is clicked */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg z-50">
            <div className="flex flex-col py-1">
              {/* User Info Section in Mobile Menu - Text only, no icon */}
              {user && (
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                  <p className="font-bold text-gray-800 text-sm">
                    Hello, {user?.username || user?.name || 'User'}!
                  </p>
                </div>
              )}

              {/* Navigation Items */}
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavigation(item.toLowerCase())}
                  className={`px-6 py-3 text-left w-full text-sm font-medium hover:bg-gray-50 transition-colors ${
                    activeSection === item.toLowerCase() ? 'text-lp-orange bg-orange-50 border-l-4 border-lp-orange' : 'text-gray-600'
                  }`}
                >
                  {item}
                </button>
              ))}
              
              {/* Logout in Mobile Menu */}
              <button
                onClick={handleLogoutClick}
                className="px-6 py-3 text-left w-full text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1 flex items-center gap-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Logout</h3>
              <p className="text-gray-600 text-sm mb-1">
                Are you sure you want to logout?
              </p>
              {user && (
                <p className="text-xs text-gray-500">
                  Your cart will be saved for next time.
                </p>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 py-2.5 px-4 bg-lp-orange text-white rounded-lg hover:bg-lp-orange-hover transition-colors font-medium"
              >
                Yes, Logout
              </button>
              
            </div>
          </div>
        </div>
      )}
      
    </>
  );
};

export default Header;