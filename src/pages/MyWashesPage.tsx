
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Calendar, Check, Clock, MapPin, Car, ChevronRight, Star, FileText, CreditCard, Plus, Edit, AlertCircle } from 'lucide-react';
import BlurContainer from '@/components/ui/BlurContainer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const MyWashesPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { toast } = useToast();
  
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

  // Mock subscription plans data
  const subscriptionPlans = [
    { 
      id: 'basic',
      name: 'Basic Plan', 
      status: 'active',
      price: '$29.99/month',
      features: [
        '2 Express Washes per month',
        'Schedule up to 2 weeks in advance',
        '10% off additional washes'
      ],
      nextBilling: 'June 15, 2023',
      paymentMethod: '**** 4242'
    }
  ];

  // Mock scheduled recurring washes
  const recurringWashes = [
    {
      id: 'rec-1',
      frequency: 'Every 2 weeks',
      day: 'Friday',
      time: '3:00 PM',
      service: 'Express Wash',
      location: 'Home - 123 Main St',
      active: true
    }
  ];

  const handleReschedule = (washId: string) => {
    toast({
      title: "Reschedule requested",
      description: "You'll be redirected to reschedule this wash.",
    });
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Subscription Updated",
      description: "Your subscription changes have been saved.",
    });
  };

  const handleToggleRecurring = (id: string, active: boolean) => {
    toast({
      title: active ? "Recurring wash paused" : "Recurring wash activated",
      description: active ? "Your recurring wash has been paused." : "Your recurring wash is now active.",
    });
  };

  const handleAddRecurring = () => {
    toast({
      title: "New recurring wash added",
      description: "Your new recurring wash schedule has been created.",
    });
  };

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
          
          <Tabs defaultValue="upcoming" className="mb-10" onValueChange={setActiveTab}>
            <TabsList className="mb-6 bg-white shadow-sm">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="recurring">Recurring Washes</TabsTrigger>
            </TabsList>
            
            {/* Upcoming Washes Tab */}
            <TabsContent value="upcoming">
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
                            <AnimatedButton 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReschedule(wash.id)}
                            >
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
            </TabsContent>
            
            {/* Past Washes Tab */}
            <TabsContent value="history">
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
            </TabsContent>
            
            {/* Subscriptions Tab */}
            <TabsContent value="subscriptions">
              {subscriptionPlans.length > 0 ? (
                <div className="grid gap-6">
                  {subscriptionPlans.map(plan => (
                    <Card key={plan.id} className="overflow-hidden">
                      <CardHeader className="bg-wash-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription className="mt-1">{plan.price}</CardDescription>
                          </div>
                          <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                            Active
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <h4 className="text-sm font-medium mb-2">Plan Benefits:</h4>
                        <ul className="space-y-2 mb-4">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start text-sm">
                              <Check size={16} className="text-wash-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Next billing date:</span>
                            <span className="font-medium">{plan.nextBilling}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Payment method:</span>
                            <span className="font-medium flex items-center">
                              <CreditCard size={14} className="mr-1" />
                              {plan.paymentMethod}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <AnimatedButton variant="outline" size="sm">
                              <Edit size={14} className="mr-1" />
                              Change Plan
                            </AnimatedButton>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Change Subscription Plan</DialogTitle>
                              <DialogDescription>
                                Select a new plan or modify your current subscription.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="flex items-start space-x-3">
                                <Checkbox id="premium-plan" />
                                <div>
                                  <label 
                                    htmlFor="premium-plan" 
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    Premium Plan - $49.99/month
                                  </label>
                                  <p className="text-sm text-gray-500 mt-1">
                                    4 Premium Washes per month, 15% off additional services
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <Checkbox id="deluxe-plan" />
                                <div>
                                  <label 
                                    htmlFor="deluxe-plan" 
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    Deluxe Plan - $89.99/month
                                  </label>
                                  <p className="text-sm text-gray-500 mt-1">
                                    2 Deluxe Details per month, priority scheduling, 20% off additional services
                                  </p>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <AnimatedButton onClick={handleCancelSubscription}>
                                Save Changes
                              </AnimatedButton>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <AnimatedButton variant="outline" size="sm">
                              <AlertCircle size={14} className="mr-1" />
                              Cancel Plan
                            </AnimatedButton>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Cancel Subscription</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to cancel your subscription? You'll lose all your benefits.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700">
                              <p>Your subscription will remain active until the end of your current billing period ({plan.nextBilling}).</p>
                            </div>
                            <DialogFooter className="mt-4">
                              <AnimatedButton variant="outline">
                                Keep Subscription
                              </AnimatedButton>
                              <AnimatedButton variant="destructive" onClick={handleCancelSubscription}>
                                Cancel Subscription
                              </AnimatedButton>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  ))}
                  
                  <BlurContainer className="p-6 border border-dashed border-gray-300 text-center">
                    <h3 className="font-medium text-lg mb-2">Explore More Plans</h3>
                    <p className="text-gray-500 mb-4">Find the perfect wash plan for your needs and budget.</p>
                    <Link to="/plans">
                      <AnimatedButton>
                        View All Plans
                      </AnimatedButton>
                    </Link>
                  </BlurContainer>
                </div>
              ) : (
                <BlurContainer className="p-6 text-center">
                  <h3 className="text-xl font-medium mb-2">No Active Subscriptions</h3>
                  <p className="text-gray-500 mb-4">Save time and money with our flexible wash plans.</p>
                  <Link to="/plans" className="mt-2 inline-block">
                    <AnimatedButton>
                      Browse Plans
                    </AnimatedButton>
                  </Link>
                </BlurContainer>
              )}
            </TabsContent>
            
            {/* Recurring Washes Tab */}
            <TabsContent value="recurring">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-lg font-medium">Your Recurring Wash Schedules</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <AnimatedButton size="sm">
                      <Plus size={14} className="mr-1" />
                      Add Schedule
                    </AnimatedButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Recurring Wash Schedule</DialogTitle>
                      <DialogDescription>
                        Set up a regular wash schedule that fits your routine.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 gap-2">
                        <label className="text-sm font-medium">Service Type</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Express Wash</option>
                          <option>Premium Wash</option>
                          <option>Deluxe Detail</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <label className="text-sm font-medium">Frequency</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Weekly</option>
                          <option>Every 2 weeks</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-1 gap-2">
                          <label className="text-sm font-medium">Preferred Day</label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <label className="text-sm font-medium">Preferred Time</label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Morning (8-11AM)</option>
                            <option>Afternoon (12-4PM)</option>
                            <option>Evening (5-8PM)</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <label className="text-sm font-medium">Location</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Home - 123 Main St</option>
                          <option>Office - 456 Business Ave</option>
                          <option>Add New Location...</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <AnimatedButton onClick={handleAddRecurring}>
                        Create Schedule
                      </AnimatedButton>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {recurringWashes.length > 0 ? (
                <div className="grid gap-4">
                  {recurringWashes.map(schedule => (
                    <BlurContainer key={schedule.id} className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-wash-100 flex items-center justify-center mr-3">
                              <Calendar className="h-5 w-5 text-wash-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{schedule.service}</h3>
                              <p className="text-sm text-gray-600">{schedule.frequency} on {schedule.day} at {schedule.time}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mt-3 gap-2 sm:gap-4">
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-1" />
                              <span>{schedule.location}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Clock size={16} className="mr-1" />
                              <span>Next: June 17, 2023</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                          <div className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center mb-2 ${schedule.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            <span>{schedule.active ? 'Active' : 'Paused'}</span>
                          </div>
                          
                          <div className="flex gap-2 mt-1">
                            <AnimatedButton 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleToggleRecurring(schedule.id, schedule.active)}
                            >
                              {schedule.active ? 'Pause' : 'Activate'}
                            </AnimatedButton>
                            <Dialog>
                              <DialogTrigger asChild>
                                <AnimatedButton variant="outline" size="sm">
                                  <Edit size={14} className="mr-1" />
                                  Edit
                                </AnimatedButton>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Recurring Schedule</DialogTitle>
                                  <DialogDescription>
                                    Modify your recurring wash schedule details.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  {/* Similar fields as Add Schedule dialog with pre-filled values */}
                                  <div className="grid grid-cols-1 gap-2">
                                    <label className="text-sm font-medium">Frequency</label>
                                    <select className="w-full p-2 border rounded-md" defaultValue={schedule.frequency}>
                                      <option>Weekly</option>
                                      <option>Every 2 weeks</option>
                                      <option>Monthly</option>
                                    </select>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid grid-cols-1 gap-2">
                                      <label className="text-sm font-medium">Preferred Day</label>
                                      <select className="w-full p-2 border rounded-md" defaultValue={schedule.day}>
                                        <option>Monday</option>
                                        <option>Tuesday</option>
                                        <option>Wednesday</option>
                                        <option>Thursday</option>
                                        <option>Friday</option>
                                        <option>Saturday</option>
                                        <option>Sunday</option>
                                      </select>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                      <label className="text-sm font-medium">Preferred Time</label>
                                      <select className="w-full p-2 border rounded-md">
                                        <option>Morning (8-11AM)</option>
                                        <option>Afternoon (12-4PM)</option>
                                        <option>Evening (5-8PM)</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <AnimatedButton onClick={handleAddRecurring}>
                                    Save Changes
                                  </AnimatedButton>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </BlurContainer>
                  ))}
                </div>
              ) : (
                <BlurContainer className="p-6 text-center">
                  <h3 className="text-xl font-medium mb-2">No Recurring Washes</h3>
                  <p className="text-gray-500 mb-4">Set up a recurring schedule to get your car washed regularly without having to book each time.</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <AnimatedButton>
                        <Plus size={14} className="mr-1" />
                        Set Up Recurring Wash
                      </AnimatedButton>
                    </DialogTrigger>
                    <DialogContent>
                      {/* Dialog content same as above */}
                    </DialogContent>
                  </Dialog>
                </BlurContainer>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MyWashesPage;
