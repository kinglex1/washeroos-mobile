
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Calendar, MapPin, Clock, Car, CheckCircle, ChevronRight, Droplets, CircleUser, CircleDollarSign } from 'lucide-react';
import BlurContainer from '@/components/ui/BlurContainer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Link } from 'react-router-dom';

const WasherPortalPage = () => {
  // Mock data for today's jobs
  const todaysJobs = [
    {
      id: 'job-234',
      time: '2:30 PM',
      customer: 'Emily Johnson',
      service: 'Premium Wash',
      location: '123 Main St',
      status: 'upcoming',
      eta: '30 min'
    },
    {
      id: 'job-233',
      time: '12:00 PM',
      customer: 'Mark Wilson',
      service: 'Express Wash',
      location: '789 Oak Drive',
      status: 'completed'
    }
  ];

  // Mock performance data
  const performance = {
    completedToday: 2,
    earnings: '$78.50',
    rating: '4.9',
    nextJob: '2:30 PM'
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 mt-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Washer Portal</h1>
            <div className="flex items-center">
              <div className="bg-green-100 text-green-800 text-sm font-medium rounded-full px-3 py-1 mr-3">
                Active
              </div>
              <AnimatedButton variant="outline" size="sm">
                End Shift
              </AnimatedButton>
            </div>
          </div>
          
          {/* Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <BlurContainer className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-wash-100 flex items-center justify-center mr-3">
                  <CheckCircle className="h-5 w-5 text-wash-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Jobs Completed Today</p>
                  <h3 className="text-2xl font-bold">{performance.completedToday}</h3>
                </div>
              </div>
            </BlurContainer>
            
            <BlurContainer className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-wash-100 flex items-center justify-center mr-3">
                  <CircleDollarSign className="h-5 w-5 text-wash-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Today's Earnings</p>
                  <h3 className="text-2xl font-bold">{performance.earnings}</h3>
                </div>
              </div>
            </BlurContainer>
            
            <BlurContainer className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-wash-100 flex items-center justify-center mr-3">
                  <CircleUser className="h-5 w-5 text-wash-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer Rating</p>
                  <h3 className="text-2xl font-bold">{performance.rating} ★</h3>
                </div>
              </div>
            </BlurContainer>
            
            <BlurContainer className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-wash-100 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-wash-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Job</p>
                  <h3 className="text-2xl font-bold">{performance.nextJob}</h3>
                </div>
              </div>
            </BlurContainer>
          </div>
          
          {/* Today's Jobs */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Today's Jobs</h2>
            <div className="grid gap-4">
              {todaysJobs.map(job => (
                <BlurContainer key={job.id} className={`p-5 ${job.status === 'upcoming' ? 'border-l-4 border-wash-500' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 
                          ${job.status === 'upcoming' ? 'bg-wash-100' : 'bg-gray-100'}`}>
                          <Clock className={`h-5 w-5 ${job.status === 'upcoming' ? 'text-wash-600' : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{job.service}</h3>
                          <p className="text-sm text-gray-600">{job.time} - {job.customer}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mt-3 gap-2 sm:gap-4">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-1" />
                          <span>{job.location}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Car size={16} className="mr-1" />
                          <span>Honda Civic (Black)</span>
                        </div>
                        
                        {job.status === 'upcoming' && (
                          <div className="flex items-center">
                            <Droplets size={16} className="mr-1" />
                            <span>Premium Wash Kit</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      {job.status === 'upcoming' ? (
                        <div className="flex flex-col items-start md:items-end">
                          <div className="bg-wash-100 text-wash-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center mb-2">
                            <Clock size={12} className="mr-1" />
                            <span>Starts in {job.eta}</span>
                          </div>
                          
                          <div className="flex gap-2 mt-1">
                            <Link to={`/job-details/${job.id}`}>
                              <AnimatedButton>
                                Start Job
                              </AnimatedButton>
                            </Link>
                            <AnimatedButton variant="outline" size="sm">
                              Navigate
                            </AnimatedButton>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center mr-2">
                            <CheckCircle size={12} className="mr-1" />
                            <span>Completed</span>
                          </div>
                          <Link to={`/job-details/${job.id}`}>
                            <AnimatedButton variant="outline" size="sm">
                              View Details
                            </AnimatedButton>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </BlurContainer>
              ))}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <BlurContainer className="p-5 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-wash-100 flex items-center justify-center mb-3">
                  <MapPin className="h-6 w-6 text-wash-600" />
                </div>
                <h3 className="font-semibold">Update Location</h3>
                <p className="text-sm text-gray-500 mt-1">Update your current position</p>
              </BlurContainer>
              
              <BlurContainer className="p-5 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-wash-100 flex items-center justify-center mb-3">
                  <Droplets className="h-6 w-6 text-wash-600" />
                </div>
                <h3 className="font-semibold">Inventory Check</h3>
                <p className="text-sm text-gray-500 mt-1">Check your supplies</p>
              </BlurContainer>
              
              <BlurContainer className="p-5 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-wash-100 flex items-center justify-center mb-3">
                  <CircleDollarSign className="h-6 w-6 text-wash-600" />
                </div>
                <h3 className="font-semibold">Earnings Report</h3>
                <p className="text-sm text-gray-500 mt-1">View detailed earnings</p>
              </BlurContainer>
              
              <BlurContainer className="p-5 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-wash-100 flex items-center justify-center mb-3">
                  <Clock className="h-6 w-6 text-wash-600" />
                </div>
                <h3 className="font-semibold">Schedule</h3>
                <p className="text-sm text-gray-500 mt-1">View upcoming shifts</p>
              </BlurContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WasherPortalPage;
