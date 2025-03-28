
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { BarChart, Calendar, MapPin, Clock, Car, CheckCircle, ChevronRight, Users, CircleDollarSign, ListCheck, Settings, Star } from 'lucide-react';
import BlurContainer from '@/components/ui/BlurContainer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  // Mock data for business metrics
  const metrics = {
    activeWashers: 5,
    pendingJobs: 7,
    completedToday: 12,
    revenue: '$642.50'
  };

  // Mock data for active washers
  const activeWashers = [
    {
      id: 'washer-1',
      name: 'Michael Rodriguez',
      status: 'On job',
      location: 'Downtown',
      currentJob: 'Premium Wash - 123 Main St',
      completedToday: 3
    },
    {
      id: 'washer-2',
      name: 'Sarah Thomas',
      status: 'Available',
      location: 'Westside',
      currentJob: null,
      completedToday: 4
    },
    {
      id: 'washer-3',
      name: 'David Kim',
      status: 'On job',
      location: 'Northside',
      currentJob: 'Express Wash - 456 Oak Ave',
      completedToday: 2
    }
  ];

  // Mock data for upcoming jobs
  const upcomingJobs = [
    {
      id: 'job-301',
      time: '2:30 PM',
      customer: 'Emily Johnson',
      service: 'Premium Wash',
      location: '123 Main St',
      assignedTo: 'Michael Rodriguez'
    },
    {
      id: 'job-302',
      time: '3:45 PM',
      customer: 'James Wilson',
      service: 'Deluxe Detail',
      location: '789 Pine Blvd',
      assignedTo: 'Sarah Thomas'
    },
    {
      id: 'job-303',
      time: '5:00 PM',
      customer: 'Lisa Martinez',
      service: 'Express Wash',
      location: '567 Elm St',
      assignedTo: 'Pending'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex flex-wrap gap-2">
              <AnimatedButton variant="outline" size="sm">
                <Users size={16} className="mr-1" />
                Manage Team
              </AnimatedButton>
              <AnimatedButton variant="outline" size="sm">
                <ListCheck size={16} className="mr-1" />
                Job Queue
              </AnimatedButton>
              <AnimatedButton variant="outline" size="sm">
                <Settings size={16} className="mr-1" />
                Settings
              </AnimatedButton>
              <AnimatedButton>
                <Calendar size={16} className="mr-1" />
                Schedule
              </AnimatedButton>
            </div>
          </div>
          
          {/* Business Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <BlurContainer className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Washers</p>
                  <h3 className="text-2xl font-bold">{metrics.activeWashers}</h3>
                </div>
              </div>
            </BlurContainer>
            
            <BlurContainer className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Jobs</p>
                  <h3 className="text-2xl font-bold">{metrics.pendingJobs}</h3>
                </div>
              </div>
            </BlurContainer>
            
            <BlurContainer className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed Today</p>
                  <h3 className="text-2xl font-bold">{metrics.completedToday}</h3>
                </div>
              </div>
            </BlurContainer>
            
            <BlurContainer className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <CircleDollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Today's Revenue</p>
                  <h3 className="text-2xl font-bold">{metrics.revenue}</h3>
                </div>
              </div>
            </BlurContainer>
          </div>
          
          {/* Active Washers Map */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Team Location Map</h2>
              <AnimatedButton variant="outline" size="sm">
                Full View
              </AnimatedButton>
            </div>
            <BlurContainer className="p-4 h-[300px] flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <MapPin className="h-10 w-10 text-wash-500 mx-auto mb-3" />
                <p className="text-gray-500">Interactive map with live washer locations would be displayed here</p>
              </div>
            </BlurContainer>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Washers */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Active Washers</h2>
                <Link to="/team">
                  <AnimatedButton variant="outline" size="sm">
                    View All
                  </AnimatedButton>
                </Link>
              </div>
              <div className="grid gap-4">
                {activeWashers.map(washer => (
                  <BlurContainer key={washer.id} className="p-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-wash-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Users className="h-5 w-5 text-wash-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{washer.name}</h3>
                          <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                            washer.status === 'On job' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {washer.status}
                          </div>
                        </div>
                        <div className="flex flex-col text-sm text-gray-600 mt-1">
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-1" />
                            <span>{washer.location}</span>
                          </div>
                          {washer.currentJob && (
                            <div className="flex items-center mt-1">
                              <Car size={14} className="mr-1" />
                              <span>{washer.currentJob}</span>
                            </div>
                          )}
                          <div className="flex items-center mt-1">
                            <CheckCircle size={14} className="mr-1" />
                            <span>{washer.completedToday} jobs completed today</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BlurContainer>
                ))}
              </div>
            </div>
            
            {/* Upcoming Jobs */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upcoming Jobs</h2>
                <Link to="/job-queue">
                  <AnimatedButton variant="outline" size="sm">
                    View All
                  </AnimatedButton>
                </Link>
              </div>
              <div className="grid gap-4">
                {upcomingJobs.map(job => (
                  <BlurContainer key={job.id} className="p-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-wash-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Calendar className="h-5 w-5 text-wash-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{job.service}</h3>
                          <div className="text-xs text-gray-500">
                            {job.time}
                          </div>
                        </div>
                        <div className="flex flex-col text-sm text-gray-600 mt-1">
                          <div className="flex items-center">
                            <User size={14} className="mr-1" />
                            <span>{job.customer}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Users size={14} className="mr-1" />
                            <span className={job.assignedTo === 'Pending' ? 'text-orange-500 font-medium' : ''}>
                              {job.assignedTo === 'Pending' ? 'Needs Assignment' : `Assigned to: ${job.assignedTo}`}
                            </span>
                          </div>
                        </div>
                        {job.assignedTo === 'Pending' && (
                          <div className="mt-3">
                            <AnimatedButton size="sm">
                              Assign Washer
                            </AnimatedButton>
                          </div>
                        )}
                      </div>
                    </div>
                  </BlurContainer>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <BlurContainer className="p-5 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-wash-100 flex items-center justify-center mb-3">
                  <BarChart className="h-6 w-6 text-wash-600" />
                </div>
                <h3 className="font-semibold">Analytics</h3>
                <p className="text-sm text-gray-500 mt-1">View business performance</p>
              </BlurContainer>
              
              <BlurContainer className="p-5 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-wash-100 flex items-center justify-center mb-3">
                  <Star className="h-6 w-6 text-wash-600" />
                </div>
                <h3 className="font-semibold">Reviews</h3>
                <p className="text-sm text-gray-500 mt-1">Manage customer feedback</p>
              </BlurContainer>
              
              <BlurContainer className="p-5 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-wash-100 flex items-center justify-center mb-3">
                  <CircleDollarSign className="h-6 w-6 text-wash-600" />
                </div>
                <h3 className="font-semibold">Financials</h3>
                <p className="text-sm text-gray-500 mt-1">View revenue reports</p>
              </BlurContainer>
              
              <BlurContainer className="p-5 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-wash-100 flex items-center justify-center mb-3">
                  <Settings className="h-6 w-6 text-wash-600" />
                </div>
                <h3 className="font-semibold">Settings</h3>
                <p className="text-sm text-gray-500 mt-1">Configure your business</p>
              </BlurContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
