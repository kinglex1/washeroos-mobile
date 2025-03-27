import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import BlurContainer from '@/components/ui/BlurContainer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  details: string;
  image: string;
}

interface FAQType {
  question: string;
  answer: string;
}

const ServicePage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const services: ServiceType[] = [
    {
      id: 'basic',
      name: 'Basic Wash',
      description: 'Essential exterior washing with a quick interior clean',
      price: '$29.99',
      features: [
        'Exterior hand wash',
        'Wheel cleaning',
        'Windows cleaning',
        'Tire dressing',
        'Interior vacuum'
      ],
      details: "Our Basic Wash focuses on getting your car's exterior looking clean and fresh. We hand wash the exterior, clean wheels and tires, apply tire dressing, clean exterior windows, and vacuum the interior to remove debris. Perfect for regular maintenance cleaning.",
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'premium',
      name: 'Premium Wash',
      description: 'Detailed interior and exterior cleaning for a comprehensive refresh',
      price: '$49.99',
      features: [
        'Everything in Basic Wash',
        'Interior wipe down',
        'Dashboard polishing',
        'Door jamb cleaning',
        'Air freshener'
      ],
      details: "The Premium Wash includes all Basic Wash services plus a thorough interior cleaning. We wipe down all interior surfaces, polish your dashboard and console, clean door jambs, and finish with a premium air freshener of your choice. Ideal for a more thorough refresh.",
      image: 'https://images.unsplash.com/photo-1605618825105-2aee42639ea9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'deluxe',
      name: 'Deluxe Detail',
      description: 'Comprehensive detailing service for the ultimate clean and protection',
      price: '$89.99',
      features: [
        'Everything in Premium Wash',
        'Carpet shampooing',
        'Leather conditioning',
        'Wax protection',
        'Headlight restoration',
        'Engine bay cleaning'
      ],
      details: "Our Deluxe Detail is a complete car care package. In addition to all Premium services, we deep clean carpets and upholstery, condition leather surfaces, apply protective wax coating, restore headlight clarity, and even clean your engine bay. Perfect for seasonal maintenance or preparing your vehicle for sale.",
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const faqs: FAQType[] = [
    {
      question: 'How long does each service take?',
      answer: 'The Basic Wash typically takes 30-45 minutes, the Premium Wash 60-75 minutes, and the Deluxe Detail 2-3 hours, depending on the size and condition of your vehicle.'
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "Your satisfaction is guaranteed. If you're not completely happy with the results, contact us within 24 hours and we'll return to address any issues at no additional cost."
    },
    {
      question: 'Do I need to provide water or electricity?',
      answer: 'No, our mobile units are completely self-contained with water tanks and generators. We bring everything needed to provide a complete service.'
    },
    {
      question: 'Is the service environmentally friendly?',
      answer: 'Yes, we use environmentally safe, biodegradable cleaning products and our equipment is designed to minimize water usage while maximizing cleaning effectiveness.'
    },
    {
      question: 'Can you wash any type of vehicle?',
      answer: 'We service most passenger vehicles including sedans, SUVs, trucks, and vans. For specialty vehicles like RVs, boats, or motorcycles, please contact us for custom pricing.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <section className="py-12 md:py-24 bg-gradient-to-b from-wash-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
              <p className="text-lg text-gray-600">
                Choose from our range of professional car washing services, all delivered directly to your location.
              </p>
            </div>
            
            <div className="space-y-16 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <div key={service.id} className={cn(
                  "flex flex-col md:flex-row gap-8 items-center",
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                )}>
                  <div className="md:w-1/2 w-full">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-[300px] object-cover object-center"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 w-full">
                    <span className="inline-block px-3 py-1 bg-wash-100 text-wash-700 rounded-full text-sm font-medium mb-4">
                      {service.price}
                    </span>
                    <h2 className="text-3xl font-bold mb-3">{service.name}</h2>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <p className="text-gray-600 mb-6">{service.details}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check size={18} className="text-wash-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link to={`/booking?service=${service.id}`}>
                      <AnimatedButton>Book This Service</AnimatedButton>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Have questions about our services? Find answers to common inquiries below.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <BlurContainer className="divide-y">
                {faqs.map((faq, index) => (
                  <div key={index} className="py-4">
                    <button
                      className="flex justify-between items-center w-full py-2 text-left font-medium"
                      onClick={() => toggleFAQ(index)}
                    >
                      {faq.question}
                      {openFAQ === index ? (
                        <ChevronUp size={18} className="flex-shrink-0 text-wash-500" />
                      ) : (
                        <ChevronDown size={18} className="flex-shrink-0 text-gray-400" />
                      )}
                    </button>
                    <div
                      className={cn(
                        "mt-2 text-gray-600 text-sm transition-all duration-300 overflow-hidden",
                        openFAQ === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </BlurContainer>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Don't see your question here?</p>
              <AnimatedButton variant="outline">
                <Plus size={16} className="mr-2" /> Ask a Question
              </AnimatedButton>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2023 Washeroo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ServicePage;
