
import React from 'react';
import { Star, CheckCircle, Calendar, Clock, MapPin, CreditCard } from 'lucide-react';
import BlurContainer from '../ui/BlurContainer';
import AnimatedButton from '../ui/AnimatedButton';
import { Link } from 'react-router-dom';

const BookingSummary = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Alex Thompson',
      rating: 5,
      text: 'Great service! They came to my office and detailed my car while I was in meetings. Couldn\'t be happier with the results.',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      rating: 5,
      text: 'Impressively thorough and professional. My car hasn\'t looked this good since I drove it off the lot.',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'David Chen',
      rating: 4,
      text: 'Convenient booking process and excellent service. Will definitely use again for my SUV.',
      date: '2 weeks ago'
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">
            Professional car washing has never been easier. Book, track, and pay—all from your phone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          <div className="text-center">
            <div className="bg-wash-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-wash-600" />
            </div>
            <h3 className="font-semibold mb-2">Book a Service</h3>
            <p className="text-gray-600 text-sm">Select your service type and preferred time slot</p>
          </div>
          
          <div className="text-center">
            <div className="bg-wash-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-wash-600" />
            </div>
            <h3 className="font-semibold mb-2">Set Location</h3>
            <p className="text-gray-600 text-sm">Tell us where your vehicle is parked</p>
          </div>
          
          <div className="text-center">
            <div className="bg-wash-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-wash-600" />
            </div>
            <h3 className="font-semibold mb-2">Wait for Service</h3>
            <p className="text-gray-600 text-sm">Our professional arrives at the scheduled time</p>
          </div>
          
          <div className="text-center">
            <div className="bg-wash-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-wash-600" />
            </div>
            <h3 className="font-semibold mb-2">Enjoy Your Clean Car</h3>
            <p className="text-gray-600 text-sm">Pay through the app and rate your experience</p>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <BlurContainer key={testimonial.id} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-wash-100 flex items-center justify-center text-wash-600">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">{testimonial.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{testimonial.text}</p>
              </BlurContainer>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/booking">
              <AnimatedButton size="lg">
                Book Your Wash Now
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSummary;
