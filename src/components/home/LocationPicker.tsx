
import React, { useState } from 'react';
import BlurContainer from '../ui/BlurContainer';
import AnimatedButton from '../ui/AnimatedButton';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Search } from 'lucide-react';

const LocationPicker: React.FC = () => {
  const [address, setAddress] = useState('');

  const recentLocations = [
    "123 Main Street, San Francisco, CA",
    "Apple Park, Cupertino, CA",
    "Golden Gate Park, San Francisco, CA"
  ];

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute left-[5%] top-[20%] w-64 h-64 rounded-full border-8 border-wash-300"></div>
        <div className="absolute right-[15%] bottom-[10%] w-32 h-32 rounded-full border-4 border-wash-200"></div>
        <div className="absolute right-[35%] top-[10%] w-16 h-16 rounded-full bg-wash-100"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">We Come To You</h2>
            <p className="text-gray-600 mb-6">
              Our mobile washing service comes directly to your location. Whether you're at home, work, or anywhere else, we'll make your car shine without you having to move an inch.
            </p>
            <p className="text-gray-600 mb-6">
              Simply enter your address, and we'll show you available time slots in your area.
            </p>
            <Link to="/location">
              <AnimatedButton variant="primary">
                View Service Areas
              </AnimatedButton>
            </Link>
          </div>
          
          <div className="md:w-1/2 w-full max-w-md">
            <BlurContainer className="p-6">
              <h3 className="font-semibold mb-4 text-lg">Enter Your Location</h3>
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-wash-500 focus:border-wash-500 text-sm"
                  placeholder="Enter your address"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button 
                    type="button"
                    className="h-full px-4 text-wash-600 hover:text-wash-700 flex items-center"
                    onClick={() => {
                      /* Use Geolocation API */
                      navigator.geolocation?.getCurrentPosition(
                        (position) => {
                          // This would typically call a geocoding service
                          setAddress("Current location detected");
                        },
                        (error) => {
                          console.error(error);
                        }
                      );
                    }}
                  >
                    <Navigation size={18} />
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <Link to={`/booking?address=${encodeURIComponent(address)}`}>
                  <AnimatedButton 
                    className="w-full"
                    disabled={!address.trim()} 
                    icon={<Search size={18} />}
                  >
                    Check Availability
                  </AnimatedButton>
                </Link>
              </div>
              
              {recentLocations.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Recent Locations</div>
                  <div className="space-y-2">
                    {recentLocations.map((location, index) => (
                      <div 
                        key={index}
                        className="py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer text-sm text-gray-600 flex items-center"
                        onClick={() => setAddress(location)}
                      >
                        <MapPin size={14} className="mr-2 text-wash-500" />
                        {location}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </BlurContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationPicker;
