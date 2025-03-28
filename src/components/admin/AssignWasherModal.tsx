
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Washer } from '@/services/adminService';
import AnimatedButton from '@/components/ui/AnimatedButton';
import BlurContainer from '@/components/ui/BlurContainer';

interface AssignWasherModalProps {
  washers: Washer[];
  bookingId: string;
  onAssign: (bookingId: string, washerId: string) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const AssignWasherModal: React.FC<AssignWasherModalProps> = ({
  washers,
  bookingId,
  onAssign,
  onClose,
  isLoading = false
}) => {
  const [selectedWasherId, setSelectedWasherId] = useState<string | null>(null);

  const handleAssign = () => {
    if (selectedWasherId) {
      onAssign(bookingId, selectedWasherId);
    }
  };

  const activeWashers = washers.filter(w => w.status === 'active');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="animate-fade-in w-full max-w-md">
        <BlurContainer className="p-6" intensity="strong">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Assign Washer to Booking #{bookingId}</h3>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X size={18} />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">
              Select an available washer to assign to this booking:
            </p>
            
            {activeWashers.length === 0 ? (
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-500">No active washers available</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {activeWashers.map(washer => (
                  <div
                    key={washer.id}
                    onClick={() => setSelectedWasherId(washer.id)}
                    className={`
                      p-3 border rounded-lg flex items-center cursor-pointer
                      ${selectedWasherId === washer.id ? 'border-wash-500 bg-wash-50' : 'border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <div className="flex-shrink-0 mr-3">
                      <img
                        src={washer.photo}
                        alt={washer.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{washer.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">{washer.completedWashes} washes</span>
                        <span>★ {washer.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    {selectedWasherId === washer.id && (
                      <div className="flex-shrink-0 ml-2 bg-wash-500 text-white rounded-full p-1">
                        <Check size={14} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <AnimatedButton
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              onClick={handleAssign}
              disabled={!selectedWasherId || isLoading}
              loading={isLoading}
            >
              Assign Washer
            </AnimatedButton>
          </div>
        </BlurContainer>
      </div>
    </div>
  );
};

export default AssignWasherModal;
