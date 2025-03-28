
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import AnimatedButton from '@/components/ui/AnimatedButton';
import BlurContainer from '@/components/ui/BlurContainer';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Clock,
  Download,
  Filter,
  MapPin,
  PlusCircle,
  RefreshCw,
  Search,
  Settings,
  User,
  DollarSign,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  Users,
  Star,
  ChevronRight,
  XCircle,
  Car,
  PanelRightClose
} from 'lucide-react';
import { useAdminData } from '@/hooks/useAdminData';
import AdminMap from '@/components/admin/AdminMap';
import AdminActionDropdown from '@/components/admin/AdminActionDropdown';
import AssignWasherModal from '@/components/admin/AssignWasherModal';
import SendNotificationModal from '@/components/admin/SendNotificationModal';
import { Booking, Washer } from '@/services/adminService';
import { toast } from 'sonner';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminDashboardPage = () => {
  const [dateRange, setDateRange] = useState('today');
  const [view, setView] = useState('dashboard');
  const [showMapView, setShowMapView] = useState(true);
  const [openWasherDetails, setOpenWasherDetails] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<{ id: string, name: string, type: 'customer' | 'washer' } | null>(null);

  const {
    washers,
    bookings,
    metrics,
    actions
  } = useAdminData();

  // Handle status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'bg-green-500';
      case 'busy':
      case 'in-progress':
        return 'bg-yellow-500';
      case 'pending':
        return 'bg-blue-500';
      case 'offline':
      case 'cancelled':
        return 'bg-gray-400';
      default:
        return 'bg-gray-300';
    }
  };

  // Handle status text
  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Handle assign washer
  const handleAssignWasher = (bookingId: string) => {
    setSelectedBookingId(bookingId);
  };

  // Handle update booking status
  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    actions.updateBookingStatus({ bookingId, status });
  };

  // Handle update washer status
  const handleUpdateWasherStatus = (washerId: string, status: Washer['status']) => {
    actions.updateWasherStatus({ washerId, status });
  };

  // Handle send notification
  const handleOpenSendNotification = (id: string, type: 'customer' | 'washer') => {
    const user = type === 'customer' 
      ? bookings.data.find(b => b.id === id)
      : washers.data.find(w => w.id === id);
      
    if (user) {
      setSelectedUser({
        id,
        name: type === 'customer' ? (user as Booking).customerName : (user as Washer).name,
        type
      });
    }
  };

  // Handle send notification submit
  const handleSendNotification = (userId: string, message: string) => {
    actions.sendNotification({ userId, message });
    setSelectedUser(null);
  };

  // Map markers
  const mapMarkers = [
    // Add washer markers
    ...washers.data.map(washer => ({
      id: washer.id,
      lat: 37.7749 + (Math.random() * 0.05 - 0.025), // Random SF area
      lng: -122.4194 + (Math.random() * 0.05 - 0.025), // Random SF area
      type: 'washer' as const,
      name: washer.name,
      status: washer.status
    })),
    // Add customer/booking markers
    ...bookings.data
      .filter(booking => booking.status === 'pending' || booking.status === 'in-progress')
      .map(booking => ({
        id: booking.id,
        lat: 37.7749 + (Math.random() * 0.05 - 0.025), // Random SF area
        lng: -122.4194 + (Math.random() * 0.05 - 0.025), // Random SF area
        type: 'customer' as const,
        name: booking.customerName,
        status: booking.status
      }))
  ];

  // Handle map marker click
  const handleMapMarkerClick = (id: string, type: 'washer' | 'customer') => {
    toast.info(`${type === 'washer' ? 'Washer' : 'Customer'} #${id} selected`);
    if (type === 'washer') {
      setOpenWasherDetails(id);
    } else {
      const booking = bookings.data.find(b => b.id === id);
      if (booking) {
        toast(`Booking for ${booking.customerName}`, {
          description: `${booking.serviceType} - ${booking.date} ${booking.time}`
        });
      }
    }
  };

  // Handle download report
  const handleDownloadReport = () => {
    toast.success("Report download started");
    // In a real app, this would trigger a download
    setTimeout(() => {
      toast.success("Report downloaded successfully");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-500">Manage bookings, washers, and system operations</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[140px] h-9 text-sm bg-white">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>
                
                <AnimatedButton
                  variant="outline"
                  size="sm"
                  className="ml-2"
                  icon={<Download size={14} />}
                  onClick={handleDownloadReport}
                >
                  Export
                </AnimatedButton>
              </div>
              
              <AnimatedButton
                size="sm"
                onClick={() => {
                  toast.success("Refreshing dashboard data");
                  // In a real app this would trigger a refresh
                }}
                icon={<RefreshCw size={14} />}
              >
                Refresh
              </AnimatedButton>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-1 overflow-x-auto pb-1">
              <button
                onClick={() => setView('dashboard')}
                className={cn(
                  "px-4 py-2 text-sm font-medium whitespace-nowrap",
                  view === 'dashboard'
                    ? "border-b-2 border-wash-500 text-wash-600"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Dashboard
              </button>
              <button
                onClick={() => setView('bookings')}
                className={cn(
                  "px-4 py-2 text-sm font-medium whitespace-nowrap",
                  view === 'bookings'
                    ? "border-b-2 border-wash-500 text-wash-600"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Bookings
              </button>
              <button
                onClick={() => setView('washers')}
                className={cn(
                  "px-4 py-2 text-sm font-medium whitespace-nowrap",
                  view === 'washers'
                    ? "border-b-2 border-wash-500 text-wash-600"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Washers
              </button>
              <button
                onClick={() => setView('customers')}
                className={cn(
                  "px-4 py-2 text-sm font-medium whitespace-nowrap",
                  view === 'customers'
                    ? "border-b-2 border-wash-500 text-wash-600"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Customers
              </button>
              <button
                onClick={() => setView('settings')}
                className={cn(
                  "px-4 py-2 text-sm font-medium whitespace-nowrap",
                  view === 'settings'
                    ? "border-b-2 border-wash-500 text-wash-600"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Settings
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          {view === 'dashboard' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <BlurContainer className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Bookings</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {metrics.isLoading ? '...' : metrics.data?.totalBookings}
                      </h3>
                      <p className="text-green-600 text-xs mt-1 flex items-center">
                        <ArrowUpRight size={12} className="mr-1" />
                        +8% from last period
                      </p>
                    </div>
                    <div className="bg-wash-100 rounded-full p-2">
                      <Calendar size={20} className="text-wash-600" />
                    </div>
                  </div>
                </BlurContainer>
                
                <BlurContainer className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Active Washers</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {metrics.isLoading ? '...' : metrics.data?.activeWashers}
                      </h3>
                      <p className="text-green-600 text-xs mt-1 flex items-center">
                        <ArrowUpRight size={12} className="mr-1" />
                        +2 since yesterday
                      </p>
                    </div>
                    <div className="bg-wash-100 rounded-full p-2">
                      <Users size={20} className="text-wash-600" />
                    </div>
                  </div>
                </BlurContainer>
                
                <BlurContainer className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Revenue</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {metrics.isLoading ? '...' : `$${metrics.data?.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </h3>
                      <p className="text-green-600 text-xs mt-1 flex items-center">
                        <ArrowUpRight size={12} className="mr-1" />
                        +12% from last period
                      </p>
                    </div>
                    <div className="bg-wash-100 rounded-full p-2">
                      <DollarSign size={20} className="text-wash-600" />
                    </div>
                  </div>
                </BlurContainer>
                
                <BlurContainer className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Customer Satisfaction</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {metrics.isLoading ? '...' : metrics.data?.customerSatisfaction}
                      </h3>
                      <p className="text-yellow-600 text-xs mt-1 flex items-center">
                        <Star size={12} className="mr-1 fill-yellow-500" />
                        Average rating
                      </p>
                    </div>
                    <div className="bg-wash-100 rounded-full p-2">
                      <Star size={20} className="text-wash-600" />
                    </div>
                  </div>
                </BlurContainer>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <BlurContainer className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setView('bookings')}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">New Bookings</h3>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-wash-600">{bookings.data.filter(b => b.status === 'pending').length}</p>
                  <p className="text-sm text-gray-500 mt-1">Awaiting assignment</p>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <Link to="/booking" className="text-wash-600 text-sm flex items-center">
                      <PlusCircle size={14} className="mr-1" />
                      Create New Booking
                    </Link>
                  </div>
                </BlurContainer>
                
                <BlurContainer className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setView('bookings')}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">In Progress</h3>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-yellow-500">{bookings.data.filter(b => b.status === 'in-progress').length}</p>
                  <p className="text-sm text-gray-500 mt-1">Currently active</p>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <button className="text-yellow-600 text-sm flex items-center" onClick={() => toast.info("Viewing active washes")}>
                      <RefreshCw size={14} className="mr-1" />
                      View Active Washes
                    </button>
                  </div>
                </BlurContainer>
                
                <BlurContainer className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setView('washers')}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Washer Status</h3>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                      <span className="text-sm">{washers.data.filter(w => w.status === 'active').length}</span>
                    </div>
                    <div>
                      <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
                      <span className="text-sm">{washers.data.filter(w => w.status === 'busy').length}</span>
                    </div>
                    <div>
                      <span className="inline-block w-3 h-3 rounded-full bg-gray-400 mr-1"></span>
                      <span className="text-sm">{washers.data.filter(w => w.status === 'offline').length}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Active / Busy / Offline</p>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <button className="text-wash-600 text-sm flex items-center" onClick={() => setView('washers')}>
                      <User size={14} className="mr-1" />
                      Manage Washers
                    </button>
                  </div>
                </BlurContainer>
                
                <BlurContainer className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast.info("Generating a report...")}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Revenue Tracking</h3>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">${(metrics.data?.revenue || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                  <p className="text-sm text-gray-500 mt-1">This {dateRange}</p>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <button className="text-wash-600 text-sm flex items-center" onClick={handleDownloadReport}>
                      <Download size={14} className="mr-1" />
                      Download Report
                    </button>
                  </div>
                </BlurContainer>
              </div>
              
              {/* Map and Bookings Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map */}
                <div className="lg:col-span-2">
                  <BlurContainer className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">Live Map View</h3>
                      <div className="flex items-center">
                        <div className="flex items-center mr-4 text-xs">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                          <span>Washers</span>
                        </div>
                        <div className="flex items-center mr-4 text-xs">
                          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                          <span>Bookings</span>
                        </div>
                        <button 
                          className="p-1 rounded hover:bg-gray-100"
                          onClick={() => setShowMapView(!showMapView)}
                        >
                          <PanelRightClose size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {showMapView ? (
                      <AdminMap 
                        markers={mapMarkers} 
                        onMarkerClick={handleMapMarkerClick}
                      />
                    ) : (
                      <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-lg">
                        <button 
                          className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm"
                          onClick={() => setShowMapView(true)}
                        >
                          <MapPin size={18} />
                          <span>Show Map View</span>
                        </button>
                      </div>
                    )}
                  </BlurContainer>
                </div>
                
                {/* Recent Activity */}
                <div>
                  <BlurContainer className="p-4">
                    <h3 className="font-semibold mb-4">Recent Activity</h3>
                    
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      <div className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                          <CheckCircle size={14} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Booking #B-1234 completed</p>
                          <p className="text-xs text-gray-500">Premium Wash • 2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                          <User size={14} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Sarah Wilson started a new wash</p>
                          <p className="text-xs text-gray-500">Deluxe Detail • 3 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-yellow-100 rounded-full p-1 mr-3 mt-0.5">
                          <AlertCircle size={14} className="text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Washer reported delay</p>
                          <p className="text-xs text-gray-500">Booking #B-1242 • 4 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                          <CheckCircle size={14} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Booking #B-1229 completed</p>
                          <p className="text-xs text-gray-500">Express Wash • 5 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                          <Calendar size={14} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New booking created</p>
                          <p className="text-xs text-gray-500">Booking #B-1245 • 6 hours ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <button className="text-wash-600 text-sm flex items-center justify-center w-full" onClick={() => toast.info("Viewing all activity")}>
                        View All Activity
                      </button>
                    </div>
                  </BlurContainer>
                </div>
              </div>
              
              {/* Today's Bookings */}
              <div>
                <BlurContainer className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Today's Bookings</h3>
                    <button 
                      className="text-sm text-wash-600 flex items-center"
                      onClick={() => setView('bookings')}
                    >
                      View All <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Washer</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {bookings.isLoading ? (
                          <tr>
                            <td colSpan={8} className="px-3 py-4 text-center text-sm text-gray-500">Loading bookings...</td>
                          </tr>
                        ) : bookings.data.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="px-3 py-4 text-center text-sm text-gray-500">No bookings found</td>
                          </tr>
                        ) : (
                          bookings.data.slice(0, 5).map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                              <td className="px-3 py-2 text-sm text-gray-500">{booking.id}</td>
                              <td className="px-3 py-2 text-sm">{booking.customerName}</td>
                              <td className="px-3 py-2 text-sm">{booking.serviceType}</td>
                              <td className="px-3 py-2 text-sm">{booking.time}</td>
                              <td className="px-3 py-2 text-sm truncate max-w-[120px]">{booking.location}</td>
                              <td className="px-3 py-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)} text-white`}>
                                  {getStatusText(booking.status)}
                                </span>
                              </td>
                              <td className="px-3 py-2 text-sm">
                                {booking.assignedWasher || (
                                  <button 
                                    className="text-xs text-wash-600 underline"
                                    onClick={() => handleAssignWasher(booking.id)}
                                  >
                                    Assign
                                  </button>
                                )}
                              </td>
                              <td className="px-3 py-2">
                                <AdminActionDropdown
                                  bookingId={booking.id}
                                  itemType="booking"
                                  status={booking.status}
                                  onAssignWasher={handleAssignWasher}
                                  onStatusChange={handleUpdateBookingStatus}
                                  onSendNotification={() => handleOpenSendNotification(booking.id, 'customer')}
                                />
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </BlurContainer>
              </div>
            </div>
          )}
          
          {view === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold">All Bookings</h2>
                
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-wash-500 focus:border-wash-500 text-sm w-full sm:w-60"
                    />
                  </div>
                  
                  <button className="inline-flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
                    <Filter size={16} />
                    Filters
                  </button>
                  
                  <Select defaultValue="all">
                    <SelectTrigger className="h-10 text-sm bg-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Link to="/booking">
                    <AnimatedButton
                      size="sm"
                      icon={<PlusCircle size={16} />}
                    >
                      Add Booking
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
              
              <BlurContainer className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Washer</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bookings.isLoading ? (
                        <tr>
                          <td colSpan={10} className="px-4 py-4 text-center text-sm text-gray-500">Loading bookings...</td>
                        </tr>
                      ) : bookings.data.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="px-4 py-4 text-center text-sm text-gray-500">No bookings found</td>
                        </tr>
                      ) : (
                        bookings.data.map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-500">{booking.id}</td>
                            <td className="px-4 py-3 text-sm font-medium">{booking.customerName}</td>
                            <td className="px-4 py-3 text-sm">{booking.serviceType}</td>
                            <td className="px-4 py-3 text-sm">{booking.date}</td>
                            <td className="px-4 py-3 text-sm">{booking.time}</td>
                            <td className="px-4 py-3 text-sm truncate max-w-[120px]">{booking.location}</td>
                            <td className="px-4 py-3 text-sm">${booking.amount.toFixed(2)}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)} text-white`}>
                                {getStatusText(booking.status)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {booking.assignedWasher || (
                                <button 
                                  className="text-xs text-wash-600 underline"
                                  onClick={() => handleAssignWasher(booking.id)}
                                >
                                  Assign
                                </button>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <AdminActionDropdown
                                bookingId={booking.id}
                                itemType="booking"
                                status={booking.status}
                                onAssignWasher={handleAssignWasher}
                                onStatusChange={handleUpdateBookingStatus}
                                onSendNotification={() => handleOpenSendNotification(booking.id, 'customer')}
                              />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </BlurContainer>
            </div>
          )}
          
          {view === 'washers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold">Washers</h2>
                
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search washers..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-wash-500 focus:border-wash-500 text-sm w-full sm:w-60"
                    />
                  </div>
                  
                  <Select defaultValue="all">
                    <SelectTrigger className="h-10 text-sm bg-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <AnimatedButton
                    size="sm"
                    icon={<PlusCircle size={16} />}
                    onClick={() => toast.info("Add washer functionality")}
                  >
                    Add Washer
                  </AnimatedButton>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {washers.isLoading ? (
                  <div className="col-span-full p-8 text-center text-gray-500">Loading washers...</div>
                ) : washers.data.length === 0 ? (
                  <div className="col-span-full p-8 text-center text-gray-500">No washers found</div>
                ) : (
                  washers.data.map((washer) => (
                    <BlurContainer 
                      key={washer.id} 
                      className="p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between">
                        <div className="flex">
                          <img
                            src={washer.photo}
                            alt={washer.name}
                            className="h-12 w-12 rounded-full object-cover mr-3"
                          />
                          <div>
                            <h3 className="font-medium">{washer.name}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                              <span>{washer.rating.toFixed(1)}</span>
                              <span className="mx-2">•</span>
                              <span>{washer.completedWashes} washes</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(washer.status)} text-white`}>
                            {getStatusText(washer.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs text-gray-500">Location</div>
                            <div className="text-sm">{washer.location}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Earnings</div>
                            <div className="text-sm font-medium">${washer.earnings}</div>
                          </div>
                          <AdminActionDropdown
                            washerId={washer.id}
                            itemType="washer"
                            status={washer.status}
                            onStatusChange={handleUpdateWasherStatus}
                            onSendNotification={() => handleOpenSendNotification(washer.id, 'washer')}
                          />
                        </div>
                      </div>
                      
                      {openWasherDetails === washer.id && (
                        <div className="mt-4 pt-3 border-t border-gray-100 animate-fade-in">
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <div className="text-xs text-gray-500">Total Earnings</div>
                                <div className="text-sm font-medium">${washer.earnings}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">Completed Jobs</div>
                                <div className="text-sm font-medium">{washer.completedWashes}</div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-xs text-gray-500">Current Assignment</div>
                              <div className="text-sm">
                                {washer.status === 'busy' 
                                  ? bookings.data.find(b => b.assignedWasher === washer.name && b.status === 'in-progress')?.serviceType || 'No active assignment'
                                  : 'Not currently assigned'
                                }
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex justify-end">
                            <button 
                              className="text-xs text-gray-500"
                              onClick={() => setOpenWasherDetails(null)}
                            >
                              Hide Details
                            </button>
                          </div>
                        </div>
                      )}
                    </BlurContainer>
                  ))
                )}
              </div>
            </div>
          )}
          
          {view === 'customers' && (
            <div className="p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Customer Management</h2>
              <p className="text-gray-600 mb-4">View and manage customer accounts, order history, and preferences.</p>
              <AnimatedButton 
                onClick={() => toast.info("Customer management functionality will be available soon!")}
              >
                Explore Customer Data
              </AnimatedButton>
            </div>
          )}
          
          {view === 'settings' && (
            <div className="p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">System Settings</h2>
              <p className="text-gray-600 mb-4">Configure application settings, pricing, service areas, and notifications.</p>
              <AnimatedButton 
                onClick={() => toast.info("Settings functionality will be available soon!")}
                icon={<Settings size={18} />}
              >
                Manage Settings
              </AnimatedButton>
            </div>
          )}
        </div>
      </main>
      
      {/* Assign Washer Modal */}
      {selectedBookingId && (
        <AssignWasherModal
          washers={washers.data}
          bookingId={selectedBookingId}
          onAssign={(bookingId, washerId) => {
            actions.assignWasher({ bookingId, washerId });
            setSelectedBookingId(null);
          }}
          onClose={() => setSelectedBookingId(null)}
          isLoading={actions.isAssigning}
        />
      )}
      
      {/* Send Notification Modal */}
      {selectedUser && (
        <SendNotificationModal
          userId={selectedUser.id}
          userType={selectedUser.type}
          userName={selectedUser.name}
          onSend={handleSendNotification}
          onClose={() => setSelectedUser(null)}
          isLoading={actions.isSendingNotification}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;
