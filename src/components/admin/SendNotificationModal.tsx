
import React, { useState } from 'react';
import { X } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import BlurContainer from '@/components/ui/BlurContainer';

interface SendNotificationModalProps {
  userId: string;
  userType: 'customer' | 'washer';
  userName: string;
  onSend: (userId: string, message: string) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const SendNotificationModal: React.FC<SendNotificationModalProps> = ({
  userId,
  userType,
  userName,
  onSend,
  onClose,
  isLoading = false
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(userId, message);
    }
  };

  const presetMessages = [
    userType === 'customer' 
      ? "Your car wash is scheduled to begin soon!" 
      : "New car wash assignment available for you.",
    userType === 'customer' 
      ? "Your washer is on the way." 
      : "Please update your location status.",
    "There has been a slight delay. We apologize for the inconvenience.",
    "Your feedback is important to us!"
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="animate-fade-in w-full max-w-md">
        <BlurContainer className="p-6" intensity="strong">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Send Notification to {userType === 'customer' ? 'Customer' : 'Washer'}
            </h3>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X size={18} />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Sending message to: <span className="font-medium">{userName}</span>
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quick Messages
              </label>
              <div className="grid grid-cols-1 gap-2">
                {presetMessages.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(preset)}
                    className="text-left text-sm p-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wash-500 focus:border-wash-500"
                rows={4}
                placeholder="Enter your message here..."
              />
            </div>
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
              onClick={handleSend}
              disabled={!message.trim() || isLoading}
              loading={isLoading}
            >
              Send Notification
            </AnimatedButton>
          </div>
        </BlurContainer>
      </div>
    </div>
  );
};

export default SendNotificationModal;
