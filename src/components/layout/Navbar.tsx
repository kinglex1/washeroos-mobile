
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Calendar, Car, Map, Users, BarChart, ListCheck, Settings } from 'lucide-react';
import BlurContainer from '../ui/BlurContainer';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Car size={18} /> },
    { name: 'Book Now', path: '/booking', icon: <Calendar size={18} /> },
    { name: 'My Washes', path: '/my-washes', icon: <ListCheck size={18} /> },
    { name: 'Locations', path: '/location', icon: <Map size={18} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 h-16',
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-wash-600 font-bold text-2xl">FlexiWash</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  isActive(link.path)
                    ? 'bg-wash-100 text-wash-700'
                    : 'text-gray-600 hover:bg-wash-50'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-1 ml-2">
              <Link to="/washer-portal" className="px-3 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-wash-50 transition-all duration-300 flex items-center">
                <Users size={18} className="mr-1" /> Washer Portal
              </Link>
              <Link to="/admin-dashboard" className="px-3 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-wash-50 transition-all duration-300 flex items-center">
                <BarChart size={18} className="mr-1" /> Admin
              </Link>
              <Link to="/profile" className="ml-1">
                <div className="w-9 h-9 rounded-full bg-wash-100 flex items-center justify-center text-wash-600 hover:bg-wash-200 transition-colors">
                  <User size={18} />
                </div>
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-50"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      >
        <BlurContainer
          className={cn(
            'fixed right-0 top-0 bottom-0 w-[70%] max-w-[300px] p-6 shadow-xl transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
          intensity="strong"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="mb-8 pt-8">
              <span className="text-wash-600 font-bold text-2xl">FlexiWash</span>
            </div>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'px-4 py-3 rounded-xl flex items-center space-x-3 transition-all duration-200',
                    isActive(link.path)
                      ? 'bg-wash-100 text-wash-700'
                      : 'text-gray-600 hover:bg-gray-100/50'
                  )}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Link
                  to="/washer-portal"
                  className="px-4 py-3 rounded-xl flex items-center space-x-3 text-gray-600 hover:bg-gray-100/50 transition-all duration-200"
                >
                  <Users size={18} />
                  <span>Washer Portal</span>
                </Link>
                <Link
                  to="/admin-dashboard"
                  className="px-4 py-3 rounded-xl flex items-center space-x-3 text-gray-600 hover:bg-gray-100/50 transition-all duration-200"
                >
                  <BarChart size={18} />
                  <span>Admin Dashboard</span>
                </Link>
              </div>
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-200 flex flex-col space-y-4">
              <Link
                to="/profile"
                className="px-4 py-3 rounded-xl flex items-center space-x-3 text-gray-600 hover:bg-gray-100/50 transition-all duration-200"
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
              <Link
                to="/settings"
                className="px-4 py-3 rounded-xl flex items-center space-x-3 text-gray-600 hover:bg-gray-100/50 transition-all duration-200"
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </BlurContainer>
      </div>
    </>
  );
};

export default Navbar;
