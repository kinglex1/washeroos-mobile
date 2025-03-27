
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import BlurContainer from '@/components/ui/BlurContainer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AreaType {
  id: string;
  name: string;
  zipcodes: string[];
  coverage: string;
  available: boolean;
}

const LocationPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<AreaType[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const serviceAreas: AreaType[] = [
    {
      id: 'sf',
      name: 'San Francisco',
      zipcodes: ['94102', '94103', '94104', '94105', '94107', '94108', '94109', '94110', '94111', '94112', '94114', '94115', '94116', '94117', '94118', '94121', '94122', '94123', '94124', '94127', '94129', '94130', '94131', '94132', '94133', '94134', '94158'],
      coverage: 'Full coverage in all neighborhoods',
      available: true
    },
    {
      id: 'oakland',
      name: 'Oakland',
      zipcodes: ['94601', '94602', '94603', '94604', '94605', '94606', '94607', '94608', '94609', '94610', '94611', '94612', '94613', '94618', '94619', '94621'],
      coverage: 'Most neighborhoods with some exceptions',
      available: true
    },
    {
      id: 'sanjose',
      name: 'San Jose',
      zipcodes: ['95110', '95111', '95112', '95113', '95116', '95117', '95118', '95119', '95120', '95121', '95122', '95123', '95124', '95125', '95126', '95127', '95128', '95129', '95130', '95131', '95132', '95133', '95134', '95135', '95136', '95138', '95139', '95141', '95148'],
      coverage: 'Full coverage in all neighborhoods',
      available: true
    },
    {
      id: 'berkeley',
      name: 'Berkeley',
      zipcodes: ['94701', '94702', '94703', '94704', '94705', '94707', '94708', '94709', '94710', '94712', '94720'],
      coverage: 'Full coverage in all neighborhoods',
      available: true
    },
    {
      id: 'paloalto',
      name: 'Palo Alto',
      zipcodes: ['94301', '94302', '94303', '94304', '94305', '94306'],
      coverage: 'Full coverage in all neighborhoods',
      available: true
    },
    {
      id: 'marin',
      name: 'Marin County',
      zipcodes: ['94901', '94903', '94904', '94920', '94925', '94930', '94939', '94941', '94945', '94949', '94965'],
      coverage: 'Select areas only',
      available: false
    }
  ];

  const handleSearch = () => {
    const input = searchInput.trim().toLowerCase();
    setHasSearched(true);
    
    if (!input) {
      setSearchResults([]);
      return;
    }
    
    // Search by city name or zipcode
    const results = serviceAreas.filter(area => 
      area.name.toLowerCase().includes(input) || 
      area.zipcodes.some(zip => zip.includes(input))
    );
    
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-wash-50 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute left-[10%] top-[30%] w-64 h-64 rounded-full border-8 border-wash-200"></div>
            <div className="absolute right-[5%] bottom-[20%] w-48 h-48 rounded-full border-4 border-wash-100"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Service Areas</h1>
              <p className="text-lg text-gray-600 mb-8">
                We bring professional car washing services to multiple cities across the Bay Area. Check if we serve your location.
              </p>
              
              <BlurContainer className="p-6 max-w-lg mx-auto">
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-wash-500 focus:border-wash-500"
                    placeholder="Enter your city or zip code"
                  />
                </div>
                
                <AnimatedButton
                  className="w-full"
                  onClick={handleSearch}
                  icon={<Search size={18} />}
                >
                  Check Availability
                </AnimatedButton>
              </BlurContainer>
              
              {hasSearched && (
                <div className="mt-8 animation-fade-in">
                  {searchResults.length > 0 ? (
                    <div className="text-left">
                      <h3 className="text-xl font-semibold mb-4">Search Results:</h3>
                      <div className="space-y-4">
                        {searchResults.map(area => (
                          <BlurContainer key={area.id} className="p-4">
                            <div className="flex items-start">
                              <div className={cn(
                                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3",
                                area.available ? "bg-green-100" : "bg-yellow-100"
                              )}>
                                {area.available ? (
                                  <CheckCircle size={18} className="text-green-600" />
                                ) : (
                                  <MapPin size={18} className="text-yellow-600" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-semibold">{area.name}</h4>
                                <p className="text-sm text-gray-600">{area.coverage}</p>
                                {area.available ? (
                                  <Link to="/booking" className="text-wash-600 text-sm font-medium mt-2 inline-block hover:underline">
                                    Book a service in this area →
                                  </Link>
                                ) : (
                                  <p className="text-yellow-600 text-sm font-medium mt-2">
                                    Limited availability - Contact us
                                  </p>
                                )}
                              </div>
                            </div>
                          </BlurContainer>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-xl font-semibold mb-2">No results found</h3>
                      <p className="text-gray-600 mb-4">
                        We couldn't find the location you entered in our service areas.
                      </p>
                      <p className="text-sm text-gray-500">
                        Please try another location or contact us for more information about our service area expansion.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Area List Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Locations We Serve</h2>
              <p className="text-gray-600">
                Our service is currently available in these areas, with new locations added regularly.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {serviceAreas.map(area => (
                <BlurContainer key={area.id} className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3",
                      area.available ? "bg-green-100" : "bg-yellow-100"
                    )}>
                      {area.available ? (
                        <CheckCircle size={20} className="text-green-600" />
                      ) : (
                        <MapPin size={20} className="text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{area.name}</h3>
                      <p className="text-sm text-gray-500">
                        {area.available ? 'Currently Available' : 'Coming Soon'}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{area.coverage}</p>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-500 mb-2">Zip Codes Served:</div>
                    <div className="flex flex-wrap gap-2">
                      {area.zipcodes.slice(0, 5).map(zip => (
                        <span key={zip} className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
                          {zip}
                        </span>
                      ))}
                      {area.zipcodes.length > 5 && (
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
                          +{area.zipcodes.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {area.available && (
                    <Link to={`/booking?location=${area.id}`}>
                      <AnimatedButton variant="outline" className="w-full text-sm">
                        Book in {area.name}
                      </AnimatedButton>
                    </Link>
                  )}
                </BlurContainer>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-wash-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't see your area?</h2>
            <p className="max-w-2xl mx-auto mb-8 opacity-90">
              We're constantly expanding! Let us know where you'd like us to offer our services next.
            </p>
            <AnimatedButton 
              variant="secondary" 
              className="bg-white text-wash-600 hover:bg-gray-100"
            >
              Request Your Area
            </AnimatedButton>
          </div>
        </section>
      </main>
      
      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2023 Washeroo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LocationPage;
