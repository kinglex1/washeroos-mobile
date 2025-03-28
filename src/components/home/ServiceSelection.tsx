
import React, { useState } from 'react';
import { Check, ChevronRight, Clock, Shield, Droplets } from 'lucide-react';
import BlurContainer from '../ui/BlurContainer';
import AnimatedButton from '../ui/AnimatedButton';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
}

const ServiceSelection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const services: ServiceType[] = [
    {
      id: 'express',
      name: 'Express Wash',
      description: 'Quick exterior wash in just 30 minutes',
      price: '$29.99',
      duration: '30 min',
      features: [
        'Exterior hand wash',
        'Wheel cleaning',
        'Windows cleaning',
        'Tire dressing',
        'Eco-friendly products'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Wash',
      description: 'Comprehensive interior & exterior cleaning',
      price: '$49.99',
      duration: '60 min',
      features: [
        'Everything in Express Wash',
        'Interior vacuum',
        'Dashboard & console cleaning',
        'Door jamb cleaning',
        'Air freshener',
        'Before & after photos'
      ],
      popular: true
    },
    {
      id: 'deluxe',
      name: 'Deluxe Detail',
      description: 'The ultimate car care experience',
      price: '$89.99',
      duration: '90 min',
      features: [
        'Everything in Premium Wash',
        'Carpet shampooing',
        'Leather conditioning',
        'Wax protection',
        'Headlight restoration',
        'Premium finishing touches'
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Car Wash Packages</h2>
          <p className="text-gray-600">
            Choose from our carefully designed service packages. All services include professional staff, eco-friendly products, and our quality guarantee.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className="relative"
            >
              <BlurContainer 
                className={cn(
                  'p-6 h-full transition-all duration-300 cursor-pointer',
                  selectedService === service.id ? 'ring-2 ring-wash-500 transform scale-[1.02]' : 'hover:translate-y-[-4px]',
                  service.popular ? 'shadow-md' : ''
                )}
              >
                {service.popular && (
                  <div className="absolute top-0 right-0 bg-wash-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold">{service.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                </div>
                
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-2xl font-bold">{service.price}</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={14} className="mr-1" />
                    <span>{service.duration}</span>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={16} className="text-wash-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to={`/booking?service=${service.id}`} className="block mt-auto">
                  <AnimatedButton 
                    variant={service.popular ? 'primary' : 'outline'} 
                    className="w-full"
                  >
                    Select Package
                    <ChevronRight size={16} className="ml-1" />
                  </AnimatedButton>
                </Link>
              </BlurContainer>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-12 max-w-4xl mx-auto">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-wash-100 flex items-center justify-center mr-3">
              <Clock className="h-5 w-5 text-wash-600" />
            </div>
            <div>
              <h4 className="font-medium">On-Demand Service</h4>
              <p className="text-sm text-gray-500">Book as soon as today</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-wash-100 flex items-center justify-center mr-3">
              <Shield className="h-5 w-5 text-wash-600" />
            </div>
            <div>
              <h4 className="font-medium">Quality Guaranteed</h4>
              <p className="text-sm text-gray-500">Trained professional staff</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-wash-100 flex items-center justify-center mr-3">
              <Droplets className="h-5 w-5 text-wash-600" />
            </div>
            <div>
              <h4 className="font-medium">Eco-Friendly</h4>
              <p className="text-sm text-gray-500">Water-saving techniques</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/business-fleet">
            <AnimatedButton variant="outline" size="sm">
              Business & Fleet Solutions
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceSelection;
