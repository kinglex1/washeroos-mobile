
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { BarChart, Calendar, MapPin, Clock, Car, CheckCircle, ChevronRight, Users, CircleDollarSign, ListCheck, Settings, Star, ChevronDown, Filter } from 'lucide-react';
import BlurContainer from '@/components/ui/BlurContainer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const AdminDashboardPage = () => {
  // Mock data for business metrics
  const metrics = {
    activeWashers: 5,
    pendingJobs: 7,
    completedToday: 12,
    revenue: '$642.50'
  };

  // State management
  const [timeFilter, setTimeFilter] = useState('today');
  const [locationFilter, setLocationFilter] = useState('all');
  const [showWasherDetails, setShowWasherDetails] = useState<string | null>(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

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

  // Handle washer assignment
  const handleAssignWasher = (jobId: string) => {
    // In a real app, this would open a modal to select a washer
    alert(`Assigning washer to job: ${jobId}`);
  };

  // Handle quick actions
  const handleQuickAction = (action: string) => {
    alert(`Navigating to ${action} section`);
    // In a real app, this would navigate to the relevant section
  };

  // Handle time filter change
  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value);
    // In a real app, this would filter the data based on the selected time
  };

  // Handle location filter change
  const handleLocationFilterChange = (value: string) => {
    setLocationFilter(value);
    // In a real app, this would filter the data based on the selected location
  };

  // Toggle washer details
  const toggleWasherDetails = (washerId: string) => {
    setShowWasherDetails(showWasherDetails === washerId ? null : washerId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <AnimatedButton variant="outline" size="sm">
                      <Filter size={16} className="mr-1" />
                      Filters
                      <ChevronDown size={16} className="ml-1" />
                    </AnimatedButton>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => handleTimeFilterChange('today')}>
                    Today
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleTimeFilterChange('week')}>
                    This Week
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleTimeFilterChange('month')}>
                    This Month
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <AnimatedButton variant="outline" size="sm" onClick={() => handleQuickAction('team')}>
                <Users size={16} className="mr-1" />
                Manage Team
              </AnimatedButton>
              <AnimatedButton variant="outline" size="sm" onClick={() => handleQuickAction('jobs')}>
                <ListCheck size={16} className="mr-1" />
                Job Queue
              </AnimatedButton>
              <AnimatedButton variant="outline" size="sm" onClick={() => handleQuickAction('settings')}>
                <Settings size={16} className="mr-1" />
                Settings
              </AnimatedButton>
              <AnimatedButton onClick={() => handleQuickAction('schedule')}>
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
          <Collapsible open={isMapExpanded} onOpenChange={setIsMapExpanded}>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Team Location Map</h2>
                <CollapsibleTrigger asChild>
                  <AnimatedButton variant="outline" size="sm">
                    {isMapExpanded ? 'Collapse' : 'Full View'}
                  </AnimatedButton>
                </CollapsibleTrigger>
              </div>
              <BlurContainer className={`p-4 bg-gray-100 transition-all duration-300 ${isMapExpanded ? 'h-[500px]' : 'h-[300px]'} flex items-center justify-center`}>
                <div className="text-center">
                  <MapPin className="h-10 w-10 text-wash-500 mx-auto mb-3" />
                  <p className="text-gray-500">Interactive map with live washer locations would be displayed here</p>
                  {isMapExpanded && (
                    <div className="mt-4">
                      <Select value={locationFilter} onValueChange={handleLocationFilterChange}>
                        <SelectTrigger className="w-[180px] mx-auto">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Areas</SelectItem>
                          <SelectItem value="downtown">Downtown</SelectItem>
                          <SelectItem value="westside">Westside</SelectItem>
                          <SelectItem value="northside">Northside</SelectItem>
                          <SelectItem value="eastside">Eastside</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="mt-4 text-gray-500">Currently showing {locationFilter === 'all' ? 'all locations' : locationFilter}</p>
                    </div>
                  )}
                </div>
              </BlurContainer>
            </div>
          </Collapsible>
          
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
                          <div className="flex items-center mt-1 cursor-pointer" onClick={() => toggleWasherDetails(washer.id)}>
                            <CheckCircle size={14} className="mr-1" />
                            <span>{washer.completedToday} jobs completed today</span>
                            <ChevronDown size={14} className={`ml-1 transition-transform ${showWasherDetails === washer.id ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                        
                        {showWasherDetails === washer.id && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
                            <div className="flex gap-2">
                              <AnimatedButton size="sm" variant="outline" onClick={() => alert(`Messaging ${washer.name}`)}>
                                Message
                              </AnimatedButton>
                              <AnimatedButton size="sm" variant="outline" onClick={() => alert(`Reassigning ${washer.name}`)}>
                                {washer.status === 'On job' ? 'Reassign' : 'Assign Job'}
                              </AnimatedButton>
                              <AnimatedButton size="sm" onClick={() => alert(`Viewing details for ${washer.name}`)}>
                                Details
                              </AnimatedButton>
                            </div>
                          </div>
                        )}
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
                <div className="flex items-center gap-2">
                  <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                  <Link to="/job-queue">
                    <AnimatedButton variant="outline" size="sm">
                      View All
                    </AnimatedButton>
                  </Link>
                </div>
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
                            <Users size={14} className="mr-1" />
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <div>
                                  <AnimatedButton size="sm">
                                    Assign Washer
                                    <ChevronDown size={16} className="ml-1" />
                                  </AnimatedButton>
                                </div>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {activeWashers.map(washer => (
                                  <DropdownMenuItem 
                                    key={washer.id}
                                    onSelect={() => alert(`Assigning ${washer.name} to job ${job.id}`)}
                                    disabled={washer.status === 'On job'}
                                  >
                                    {washer.name}
                                    {washer.status === 'On job' && <span className="ml-2 text-xs text-gray-400">(Busy)</span>}
                                  </DropdownMenuItem>
                                ))}
                                <DropdownMenuItem onSelect={() => alert(`Opening manual assignment for job ${job.id}`)}>
                                  Custom Assignment...
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
              <BlurContainer 
                className="p-5 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleQuickAction('analytics')}
              >
                <div className="w-12 h-12 rounded-full bg-wash-100 flex items-center justify-center mb-3">
                  <BarChart className="h-6 w-6 text-wash-600" />
                </div>
                <h3 className="font-semibold">Analytics</h3>
                <p className="text-sm text-gray-500 mt-1">View business performance</p>
              </BlurContainer>
              
              <BlurContainer 
                className="p-5 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleQuickAction('reviews')}
              >
                <div className="w-12 h-12 rounded-full bg-wash-100 flex items-center justify-center mb-3">
                  <Star className="h-6 w-6 text-wash-600" />
                </div>
                <h3 className="font-semibold">Reviews</h3>
                <p className="text-sm text-gray-500 mt-1">Manage customer feedback</p>
              </BlurContainer>
              
              <BlurContainer 
                className="p-5 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleQuickAction('financials')}
              >
                <div className="w-12 h-12 rounded-full bg-wash-100 flex items-center justify-center mb-3">
                  <CircleDollarSign className="h-6 w-6 text-wash-600" />
                </div>
                <h3 className="font-semibold">Financials</h3>
                <p className="text-sm text-gray-500 mt-1">View revenue reports</p>
              </BlurContainer>
              
              <BlurContainer 
                className="p-5 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleQuickAction('settings')}
              >
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
