
import React from 'react';
import { ArrowRight, Droplets, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedButton from '../ui/AnimatedButton';
import BlurContainer from '../ui/BlurContainer';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-wash-50 to-transparent -z-10"></div>
      
      {/* Blur circles */}
      <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full bg-wash-200/30 blur-[120px] -z-10"></div>
      <div className="absolute top-[5%] right-[10%] w-[250px] h-[250px] rounded-full bg-blue-100/40 blur-[90px] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <BlurContainer className="px-4 py-2 mb-6 inline-flex items-center space-x-2">
              <span className="bg-wash-500 rounded-full w-4 h-4 flex-shrink-0"></span>
              <span className="text-sm font-medium text-gray-600">Premium Mobile Car Washing</span>
            </BlurContainer>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Spotless Cars, <br className="hidden sm:block" />
            <span className="text-wash-600">Zero Hassle</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '200ms' }}>
            Professional car washing services that come to you. Book in seconds and get your vehicle cleaned while you focus on what matters.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Link to="/booking">
              <AnimatedButton size="lg" className="w-full sm:w-auto">
                Book Now <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </Link>
            <Link to="/services">
              <AnimatedButton size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Services
              </AnimatedButton>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl animate-fade-in" style={{ animationDelay: '400ms' }}>
            <BlurContainer className="p-6 text-center">
              <div className="bg-wash-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-6 w-6 text-wash-600" />
              </div>
              <h3 className="font-semibold mb-2">Eco-Friendly Products</h3>
              <p className="text-gray-600 text-sm">Safe for your car and the environment</p>
            </BlurContainer>
            
            <BlurContainer className="p-6 text-center">
              <div className="bg-wash-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-wash-600" />
              </div>
              <h3 className="font-semibold mb-2">Insured Professionals</h3>
              <p className="text-gray-600 text-sm">Trained experts who care for your vehicle</p>
            </BlurContainer>
            
            <BlurContainer className="p-6 text-center">
              <div className="bg-wash-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-wash-600" />
              </div>
              <h3 className="font-semibold mb-2">On-Demand Service</h3>
              <p className="text-gray-600 text-sm">Book, track, and pay in minutes</p>
            </BlurContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
