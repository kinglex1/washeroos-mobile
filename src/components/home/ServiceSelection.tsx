
import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import BlurContainer from '../ui/BlurContainer';
import AnimatedButton from '../ui/AnimatedButton';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const ServiceSelection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const services: ServiceType[] = [
    {
      id: 'basic',
      name: 'Basic Wash',
      description: 'Exterior wash and quick interior clean',
      price: '$29.99',
      features: [
        'Exterior hand wash',
        'Wheel cleaning',
        'Windows cleaning',
        'Tire dressing',
        'Interior vacuum'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Wash',
      description: 'Detailed interior and exterior cleaning',
      price: '$49.99',
      features: [
        'Everything in Basic Wash',
        'Interior wipe down',
        'Dashboard polishing',
        'Door jamb cleaning',
        'Air freshener'
      ],
      popular: true
    },
    {
      id: 'deluxe',
      name: 'Deluxe Detail',
      description: 'Comprehensive detailing service',
      price: '$89.99',
      features: [
        'Everything in Premium Wash',
        'Carpet shampooing',
        'Leather conditioning',
        'Wax protection',
        'Headlight restoration',
        'Engine bay cleaning'
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Service</h2>
          <p className="text-gray-600">
            Select the perfect package for your vehicle's needs. All services include our eco-friendly cleaning solutions and expert technicians.
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
                    Popular
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold">{service.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                </div>
                
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-2xl font-bold">{service.price}</span>
                  <span className="text-gray-500 text-sm">per wash</span>
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
                    Select
                    <ChevronRight size={16} className="ml-1" />
                  </AnimatedButton>
                </Link>
              </BlurContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSelection;
