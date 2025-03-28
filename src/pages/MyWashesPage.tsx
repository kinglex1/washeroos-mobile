
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Calendar, Check, Clock, MapPin, Car, ChevronRight, Star, FileText } from 'lucide-react';
import BlurContainer from '@/components/ui/BlurContainer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Link } from 'react-router-dom';

const MyWashesPage = () => {
  // Mock data for upcoming and past washes
  const upcomingWashes = [
    {
      id: 'wash-123',
      date: 'Today, 2:30 PM',
      service: 'Premium Wash',
      location: 'Home - 123 Main St',
      status: 'scheduled',
      washer: 'Michael R.',
      eta: '30 min'
    }
  ];

  const pastWashes = [
    {
      id: 'wash-122',
      date: 'May 15, 2023',
      service: 'Deluxe Detail',
      location: 'Office - 456 Business Ave',
      status: 'completed',
      washer: 'Sarah T.',
      rating: 5
    },
    {
      id: 'wash-121',
      date: 'Apr 28, 2023',
      service: 'Express Wash',
      location: 'Home - 123 Main St',
      status: 'completed',
      washer: 'David K.',
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 mt-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Washes</h1>
            <Link to="/booking">
              <AnimatedButton>
                Book New Wash
              </AnimatedButton>
            </Link>
          </div>
          
          {/* Upcoming Washes */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Upcoming</h2>
            {upcomingWashes.length > 0 ? (
              <div className="grid gap-4">
                {upcomingWashes.map(wash => (
                  <BlurContainer key={wash.id} className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-wash-100 flex items-center justify-center mr-3">
                            <Calendar className="h-5 w-5 text-wash-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{wash.service}</h3>
                            <p className="text-sm text-gray-600">{wash.date}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mt-3 gap-2 sm:gap-4">
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            <span>{wash.location}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Car size={16} className="mr-1" />
                            <span>Honda Civic</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                        <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center mb-2">
                          <Clock size={12} className="mr-1" />
                          <span>ETA: {wash.eta}</span>
                        </div>
                        
                        <div className="flex gap-2 mt-1">
                          <AnimatedButton variant="outline" size="sm">
                            Track
                          </AnimatedButton>
                          <AnimatedButton variant="outline" size="sm">
                            Reschedule
                          </AnimatedButton>
                        </div>
                      </div>
                    </div>
                  </BlurContainer>
                ))}
              </div>
            ) : (
              <BlurContainer className="p-6 text-center">
                <p className="text-gray-500">No upcoming washes scheduled.</p>
                <Link to="/booking" className="mt-4 inline-block">
                  <AnimatedButton>
                    Book Now
                  </AnimatedButton>
                </Link>
              </BlurContainer>
            )}
          </div>
          
          {/* Past Washes */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Wash History</h2>
            {pastWashes.length > 0 ? (
              <div className="grid gap-4">
                {pastWashes.map(wash => (
                  <BlurContainer key={wash.id} className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <Check className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{wash.service}</h3>
                            <p className="text-sm text-gray-600">{wash.date}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mt-3 gap-2 sm:gap-4">
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            <span>{wash.location}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Star size={16} className="mr-1 text-yellow-500" />
                            <span>
                              {Array(wash.rating).fill(0).map((_, i) => '★').join('')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex gap-2">
                        <Link to={`/wash-details/${wash.id}`}>
                          <AnimatedButton variant="outline" size="sm">
                            <FileText size={14} className="mr-1" />
                            Details
                          </AnimatedButton>
                        </Link>
                        <Link to={`/booking?rebook=${wash.id}`}>
                          <AnimatedButton variant="outline" size="sm">
                            Book Again
                          </AnimatedButton>
                        </Link>
                      </div>
                    </div>
                  </BlurContainer>
                ))}
              </div>
            ) : (
              <BlurContainer className="p-6 text-center">
                <p className="text-gray-500">No wash history available.</p>
              </BlurContainer>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyWashesPage;
