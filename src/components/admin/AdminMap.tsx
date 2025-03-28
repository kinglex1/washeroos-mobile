
import React from 'react';
import { MapPin, Navigation, User } from 'lucide-react';
import BlurContainer from '@/components/ui/BlurContainer';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: 'washer' | 'customer';
  name: string;
  status?: 'active' | 'busy' | 'offline' | 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

interface AdminMapProps {
  markers: MapMarker[];
  onMarkerClick?: (id: string, type: 'washer' | 'customer') => void;
}

const AdminMap: React.FC<AdminMapProps> = ({ markers, onMarkerClick }) => {
  // This is a simplified map representation
  return (
    <BlurContainer className="p-4 h-[300px] relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-100 rounded-lg">
        {/* Simplified map background with grid */}
        <div className="h-full w-full grid grid-cols-10 grid-rows-10">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border border-gray-200"></div>
          ))}
        </div>

        {/* Map markers */}
        {markers.map((marker) => (
          <div
            key={marker.id}
            style={{
              position: 'absolute',
              left: `${(marker.lng + 180) * (100 / 360)}%`,
              top: `${(90 - marker.lat) * (100 / 180)}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="cursor-pointer"
            onClick={() => onMarkerClick && onMarkerClick(marker.id, marker.type)}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${marker.type === 'washer' 
                ? marker.status === 'active' 
                  ? 'bg-green-500' 
                  : marker.status === 'busy' 
                    ? 'bg-yellow-500' 
                    : 'bg-gray-400'
                : marker.status === 'pending'
                  ? 'bg-blue-500'
                  : marker.status === 'in-progress'
                    ? 'bg-yellow-500'
                    : marker.status === 'completed'
                      ? 'bg-green-500'
                      : 'bg-red-500'
              }
              shadow-md
            `}>
              {marker.type === 'washer' 
                ? <User className="h-4 w-4 text-white" /> 
                : <MapPin className="h-4 w-4 text-white" />
              }
            </div>
            <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs font-medium bg-white px-1 py-0.5 rounded shadow-sm">
                {marker.name}
              </span>
            </div>
          </div>
        ))}

        {/* Navigation button */}
        <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <Navigation className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </BlurContainer>
  );
};

export default AdminMap;
