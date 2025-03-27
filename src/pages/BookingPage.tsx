
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import BlurContainer from '@/components/ui/BlurContainer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Check, Car, MapPin, Calendar, Clock, CreditCard, ChevronRight, User, Mail, Phone, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface BookingFormData {
  service: string;
  address: string;
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  notes: string;
}

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    service: queryParams.get('service') || '',
    address: queryParams.get('address') || '',
    date: '',
    timeSlot: '',
    name: '',
    email: '',
    phone: '',
    vehicleType: 'sedan',
    notes: ''
  });
  
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  
  const services: ServiceType[] = [
    {
      id: 'basic',
      name: 'Basic Wash',
      description: 'Exterior wash and quick interior clean',
      price: 29.99,
      duration: '30-45 min'
    },
    {
      id: 'premium',
      name: 'Premium Wash',
      description: 'Detailed interior and exterior cleaning',
      price: 49.99,
      duration: '60-75 min'
    },
    {
      id: 'deluxe',
      name: 'Deluxe Detail',
      description: 'Comprehensive detailing service',
      price: 89.99,
      duration: '2-3 hours'
    }
  ];
  
  // Generate dates for the next 7 days
  useEffect(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const formattedDate = date.toISOString().split('T')[0];
      dates.push(formattedDate);
    }
    
    setAvailableDates(dates);
  }, []);
  
  // Generate time slots when date changes
  useEffect(() => {
    if (!formData.date) return;
    
    // In a real app, this would call an API to get available slots
    const generateTimeSlots = () => {
      const slots: TimeSlot[] = [];
      const startHour = 8; // 8 AM
      const endHour = 18; // 6 PM
      
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minutes of [0, 30]) {
          const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          const random = Math.random();
          
          slots.push({
            id: `${time}`,
            time: time,
            available: random > 0.3 // Randomly make some unavailable
          });
        }
      }
      
      return slots;
    };
    
    setAvailableTimeSlots(generateTimeSlots());
  }, [formData.date]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, service: serviceId }));
  };
  
  const handleDateSelect = (date: string) => {
    setFormData(prev => ({ ...prev, date, timeSlot: '' }));
  };
  
  const handleTimeSelect = (timeId: string) => {
    setFormData(prev => ({ ...prev, timeSlot: timeId }));
  };
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return !!formData.service;
      case 2:
        return !!formData.address;
      case 3:
        return !!formData.date && !!formData.timeSlot;
      case 4:
        return !!formData.name && !!formData.email && !!formData.phone;
      default:
        return true;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log('Booking submitted:', formData);
    
    // Navigate to success page
    navigate('/booking-success');
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const selectedService = services.find(s => s.id === formData.service);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Book Your Car Wash</h1>
              <p className="text-gray-600">Complete the steps below to schedule your mobile car washing service.</p>
            </div>
            
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div 
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2",
                        currentStep === step 
                          ? "bg-wash-600 text-white" 
                          : currentStep > step 
                            ? "bg-wash-500 text-white" 
                            : "bg-white border border-gray-300 text-gray-500"
                      )}
                    >
                      {currentStep > step ? <Check size={18} /> : step}
                    </div>
                    <span className="text-xs text-gray-500 hidden sm:block">
                      {step === 1 && "Service"}
                      {step === 2 && "Location"}
                      {step === 3 && "Schedule"}
                      {step === 4 && "Info"}
                      {step === 5 && "Payment"}
                    </span>
                  </div>
                ))}
                
                <div className="absolute left-0 right-0 flex -z-10">
                  <div className={cn(
                    "h-[2px] transition-all duration-300 bg-wash-500",
                    currentStep === 1 ? "w-0" : 
                    currentStep === 2 ? "w-1/4" : 
                    currentStep === 3 ? "w-1/2" : 
                    currentStep === 4 ? "w-3/4" : "w-full"
                  )}></div>
                  <div className={cn(
                    "h-[2px] transition-all duration-300 bg-gray-200",
                    currentStep === 1 ? "w-full" : 
                    currentStep === 2 ? "w-3/4" : 
                    currentStep === 3 ? "w-1/2" : 
                    currentStep === 4 ? "w-1/4" : "w-0"
                  )}></div>
                </div>
              </div>
            </div>
            
            {/* Step Content */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
              <div className="p-6 sm:p-8">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Service Selection */}
                  {currentStep === 1 && (
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-semibold mb-6 flex items-center">
                        <Car size={20} className="mr-2 text-wash-600" />
                        Select Your Service
                      </h2>
                      
                      <div className="space-y-4">
                        {services.map(service => (
                          <div 
                            key={service.id}
                            onClick={() => handleServiceSelect(service.id)}
                            className={cn(
                              "border rounded-xl p-4 cursor-pointer transition-all duration-200",
                              formData.service === service.id 
                                ? "border-wash-500 bg-wash-50 shadow-sm" 
                                : "border-gray-200 hover:border-wash-200"
                            )}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-semibold">{service.name}</h3>
                                  {formData.service === service.id && (
                                    <div className="ml-2 bg-wash-500 text-white rounded-full p-1">
                                      <Check size={12} />
                                    </div>
                                  )}
                                </div>
                                <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                                <div className="text-sm text-gray-500 mt-2">Duration: {service.duration}</div>
                              </div>
                              <div className="text-lg font-semibold">{formatCurrency(service.price)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Location */}
                  {currentStep === 2 && (
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-semibold mb-6 flex items-center">
                        <MapPin size={20} className="mr-2 text-wash-600" />
                        Enter Your Location
                      </h2>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Where should we come to wash your car?
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-wash-500 focus:border-wash-500"
                          placeholder="Enter your full address"
                          required
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Please provide the complete address, including apartment or building number if applicable.
                        </p>
                      </div>
                      
                      <div className="bg-wash-50 p-4 rounded-xl">
                        <h3 className="font-medium mb-2">Location Tips</h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li className="flex items-start">
                            <Check size={16} className="text-wash-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>Ensure there's access to your vehicle at the scheduled time</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-wash-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>For apartment buildings, let us know about parking or security restrictions</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="text-wash-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>Our technicians bring everything needed - no water or electricity required</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Schedule */}
                  {currentStep === 3 && (
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-semibold mb-6 flex items-center">
                        <Calendar size={20} className="mr-2 text-wash-600" />
                        Choose Your Date & Time
                      </h2>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select a Date
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                          {availableDates.map(date => {
                            const dateObj = new Date(date);
                            const day = dateObj.getDate();
                            const month = dateObj.toLocaleString('default', { month: 'short' });
                            const weekday = dateObj.toLocaleString('default', { weekday: 'short' });
                            
                            return (
                              <div
                                key={date}
                                onClick={() => handleDateSelect(date)}
                                className={cn(
                                  "border rounded-lg p-2 text-center cursor-pointer transition-all",
                                  formData.date === date
                                    ? "border-wash-500 bg-wash-50 shadow-sm"
                                    : "border-gray-200 hover:border-wash-200"
                                )}
                              >
                                <div className="text-xs text-gray-500">{weekday}</div>
                                <div className="font-semibold">{day}</div>
                                <div className="text-xs">{month}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {formData.date && (
                        <div className="animate-fade-in">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select a Time Slot
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {availableTimeSlots.map(slot => (
                              <div
                                key={slot.id}
                                onClick={() => slot.available && handleTimeSelect(slot.id)}
                                className={cn(
                                  "border rounded-lg p-2 text-center transition-all",
                                  !slot.available && "opacity-50 cursor-not-allowed bg-gray-50",
                                  slot.available && "cursor-pointer",
                                  formData.timeSlot === slot.id
                                    ? "border-wash-500 bg-wash-50 shadow-sm"
                                    : (slot.available ? "border-gray-200 hover:border-wash-200" : "border-gray-200")
                                )}
                              >
                                <div className="font-medium">
                                  {new Date(`2000-01-01T${slot.time}`).toLocaleTimeString('en-US', { 
                                    hour: 'numeric', 
                                    minute: '2-digit', 
                                    hour12: true 
                                  })}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {slot.available ? 'Available' : 'Unavailable'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Step 4: Contact Details */}
                  {currentStep === 4 && (
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-semibold mb-6 flex items-center">
                        <User size={20} className="mr-2 text-wash-600" />
                        Your Information
                      </h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-wash-500 focus:border-wash-500"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-wash-500 focus:border-wash-500"
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-wash-500 focus:border-wash-500"
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vehicle Type
                          </label>
                          <select
                            name="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-wash-500 focus:border-wash-500"
                            required
                          >
                            <option value="sedan">Sedan</option>
                            <option value="suv">SUV</option>
                            <option value="truck">Truck</option>
                            <option value="van">Van</option>
                            <option value="coupe">Coupe</option>
                            <option value="wagon">Station Wagon</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Notes (Optional)
                          </label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-wash-500 focus:border-wash-500"
                            placeholder="Any special requests or information we should know"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 5: Payment */}
                  {currentStep === 5 && (
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-semibold mb-6 flex items-center">
                        <CreditCard size={20} className="mr-2 text-wash-600" />
                        Booking Summary
                      </h2>
                      
                      <BlurContainer className="mb-6">
                        <div className="p-4 border-b">
                          <h3 className="font-semibold mb-1">Service Details</h3>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{selectedService?.name}</p>
                              <p className="text-sm text-gray-500">{selectedService?.description}</p>
                            </div>
                            <p className="font-semibold">{selectedService && formatCurrency(selectedService.price)}</p>
                          </div>
                        </div>
                        
                        <div className="p-4 space-y-3">
                          <div className="flex items-start">
                            <Calendar size={16} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Date & Time</p>
                              <p className="text-sm text-gray-600">
                                {formData.date && new Date(formData.date).toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                                {formData.timeSlot && `, ${formData.timeSlot}`}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <MapPin size={16} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Location</p>
                              <p className="text-sm text-gray-600">{formData.address}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Car size={16} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Vehicle</p>
                              <p className="text-sm text-gray-600">
                                {formData.vehicleType.charAt(0).toUpperCase() + formData.vehicleType.slice(1)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <User size={16} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Contact</p>
                              <p className="text-sm text-gray-600">{formData.name}</p>
                              <p className="text-sm text-gray-600">{formData.email}</p>
                              <p className="text-sm text-gray-600">{formData.phone}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border-t bg-gray-50">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm text-gray-600">Service Price</p>
                            <p className="text-sm">{selectedService && formatCurrency(selectedService.price)}</p>
                          </div>
                          
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm text-gray-600">Booking Fee</p>
                            <p className="text-sm">{formatCurrency(2.99)}</p>
                          </div>
                          
                          <div className="flex justify-between items-center font-semibold mt-3 pt-3 border-t border-gray-200">
                            <p>Total</p>
                            <p>{selectedService && formatCurrency(selectedService.price + 2.99)}</p>
                          </div>
                        </div>
                      </BlurContainer>
                      
                      <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
                        <div className="flex items-start">
                          <Info size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-green-800">Payment on Completion</p>
                            <p className="text-sm text-green-700">
                              You won't be charged until the service is completed to your satisfaction.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <AnimatedButton 
                          className="w-full"
                          type="submit"
                        >
                          Complete Booking
                        </AnimatedButton>
                        
                        <p className="text-xs text-center text-gray-500">
                          By completing this booking, you agree to our Terms of Service and Privacy Policy.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Navigation Buttons */}
                  <div className="mt-8 flex justify-between">
                    {currentStep > 1 && (
                      <AnimatedButton 
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                      >
                        Back
                      </AnimatedButton>
                    )}
                    
                    {currentStep < 5 && (
                      <AnimatedButton 
                        type="button"
                        onClick={handleNext}
                        className={currentStep === 1 ? "ml-auto" : ""}
                        disabled={!validateCurrentStep()}
                      >
                        Continue <ChevronRight size={16} className="ml-1" />
                      </AnimatedButton>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
