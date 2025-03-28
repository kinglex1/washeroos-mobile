
import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, CheckCircle, XCircle, Send, UserPlus, RefreshCw } from "lucide-react";
import { Booking, Washer } from "@/services/adminService";

interface ActionItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
}

interface AdminActionDropdownProps {
  bookingId?: string;
  washerId?: string;
  itemType: 'booking' | 'washer';
  status?: Booking['status'] | Washer['status'];
  onAssignWasher?: (bookingId: string) => void;
  onStatusChange?: (id: string, status: any) => void;
  onSendNotification?: (id: string) => void;
}

const AdminActionDropdown: React.FC<AdminActionDropdownProps> = ({
  bookingId,
  washerId,
  itemType,
  status,
  onAssignWasher,
  onStatusChange,
  onSendNotification
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const id = bookingId || washerId;

  const getActions = (): ActionItem[] => {
    if (itemType === 'booking') {
      const actions: ActionItem[] = [];
      
      if (status === 'pending') {
        actions.push({
          label: 'Start Service',
          icon: <RefreshCw size={14} />,
          onClick: () => {
            onStatusChange && id && onStatusChange(id, 'in-progress');
            setIsOpen(false);
          },
          color: 'text-blue-600'
        });
        
        actions.push({
          label: 'Assign Washer',
          icon: <UserPlus size={14} />,
          onClick: () => {
            onAssignWasher && id && onAssignWasher(id);
            setIsOpen(false);
          },
          color: 'text-purple-600'
        });
      }
      
      if (status === 'in-progress') {
        actions.push({
          label: 'Complete',
          icon: <CheckCircle size={14} />,
          onClick: () => {
            onStatusChange && id && onStatusChange(id, 'completed');
            setIsOpen(false);
          },
          color: 'text-green-600'
        });
      }
      
      if (status !== 'cancelled' && status !== 'completed') {
        actions.push({
          label: 'Cancel',
          icon: <XCircle size={14} />,
          onClick: () => {
            onStatusChange && id && onStatusChange(id, 'cancelled');
            setIsOpen(false);
          },
          color: 'text-red-600'
        });
      }
      
      actions.push({
        label: 'Notify Customer',
        icon: <Send size={14} />,
        onClick: () => {
          onSendNotification && id && onSendNotification(id);
          setIsOpen(false);
        },
        color: 'text-gray-600'
      });
      
      return actions;
    } else if (itemType === 'washer') {
      const actions: ActionItem[] = [];
      
      if (status !== 'active') {
        actions.push({
          label: 'Set Active',
          icon: <CheckCircle size={14} />,
          onClick: () => {
            onStatusChange && id && onStatusChange(id, 'active');
            setIsOpen(false);
          },
          color: 'text-green-600'
        });
      }
      
      if (status !== 'busy') {
        actions.push({
          label: 'Set Busy',
          icon: <RefreshCw size={14} />,
          onClick: () => {
            onStatusChange && id && onStatusChange(id, 'busy');
            setIsOpen(false);
          },
          color: 'text-yellow-600'
        });
      }
      
      if (status !== 'offline') {
        actions.push({
          label: 'Set Offline',
          icon: <XCircle size={14} />,
          onClick: () => {
            onStatusChange && id && onStatusChange(id, 'offline');
            setIsOpen(false);
          },
          color: 'text-gray-600'
        });
      }
      
      actions.push({
        label: 'Send Message',
        icon: <Send size={14} />,
        onClick: () => {
          onSendNotification && id && onSendNotification(id);
          setIsOpen(false);
        },
        color: 'text-blue-600'
      });
      
      return actions;
    }
    
    return [];
  };

  const actions = getActions();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <MoreHorizontal size={16} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[160px]">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`flex w-full items-center px-3 py-2 text-sm hover:bg-gray-50 ${action.color}`}
            >
              <span className="mr-2">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminActionDropdown;
