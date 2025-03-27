
import React from 'react';
import BlurContainer from '@/components/ui/BlurContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ExecutiveSummary = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-wash-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Executive Summary</h2>
          <p className="text-lg text-gray-600">
            A brief overview of FlexiWash and our mission
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-wash-700">About FlexiWash</CardTitle>
            <CardDescription>Mobile car wash & detailing services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              FlexiWash is a mobile car wash service that provides high-quality, convenient vehicle 
              cleaning directly at customers' locations, eliminating the need for them to visit 
              traditional car washes. The business caters to busy professionals, families, corporate 
              clients, and fleet owners who require flexible, on-demand services.
            </p>
            
            <p>
              We offer exterior and interior cleaning, detailing, and fleet maintenance, using 
              eco-friendly products and efficient mobile equipment. By leveraging strong marketing, 
              online booking systems, and excellent customer service, the business aims to establish 
              a loyal customer base and expand operations over time.
            </p>
            
            <p className="font-medium">
              Our goal is to become a leading provider of mobile car wash services, delivering 
              convenience, quality, and reliability.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ExecutiveSummary;
