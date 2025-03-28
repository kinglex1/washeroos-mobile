
import { toast } from "sonner";

export interface Washer {
  id: string;
  name: string;
  photo: string;
  rating: number;
  completedWashes: number;
  status: 'active' | 'busy' | 'offline';
  location: string;
  earnings: number;
}

export interface Booking {
  id: string;
  customerName: string;
  serviceType: string;
  date: string;
  time: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  amount: number;
  location: string;
  assignedWasher?: string;
}

export interface MetricData {
  totalBookings: number;
  activeWashers: number;
  completionRate: number;
  revenue: number;
  customerSatisfaction: number;
}

// Mock data for admin dashboard
let mockWashers: Washer[] = [
  {
    id: 'w1',
    name: 'Michael Johnson',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
    completedWashes: 142,
    status: 'active',
    location: 'Downtown',
    earnings: 2840
  },
  {
    id: 'w2',
    name: 'Sarah Wilson',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.9,
    completedWashes: 213,
    status: 'busy',
    location: 'Westside',
    earnings: 4260
  },
  {
    id: 'w3',
    name: 'David Chen',
    photo: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 4.6,
    completedWashes: 98,
    status: 'active',
    location: 'Northside',
    earnings: 1960
  },
  {
    id: 'w4',
    name: 'Jessica Miller',
    photo: 'https://randomuser.me/api/portraits/women/25.jpg',
    rating: 4.7,
    completedWashes: 156,
    status: 'offline',
    location: 'Eastside',
    earnings: 3120
  },
  {
    id: 'w5',
    name: 'Robert Taylor',
    photo: 'https://randomuser.me/api/portraits/men/15.jpg',
    rating: 4.5,
    completedWashes: 87,
    status: 'active',
    location: 'Southside',
    earnings: 1740
  }
];

let mockBookings: Booking[] = [
  {
    id: 'b1',
    customerName: 'Alex Thompson',
    serviceType: 'Premium Wash',
    date: '2023-06-15',
    time: '10:30 AM',
    status: 'completed',
    amount: 49.99,
    location: '123 Main St',
    assignedWasher: 'Michael Johnson'
  },
  {
    id: 'b2',
    customerName: 'Emma Davis',
    serviceType: 'Deluxe Detail',
    date: '2023-06-15',
    time: '01:15 PM',
    status: 'in-progress',
    amount: 89.99,
    location: '456 Oak Ave',
    assignedWasher: 'Sarah Wilson'
  },
  {
    id: 'b3',
    customerName: 'James Wilson',
    serviceType: 'Express Wash',
    date: '2023-06-15',
    time: '03:00 PM',
    status: 'pending',
    amount: 29.99,
    location: '789 Pine Rd'
  },
  {
    id: 'b4',
    customerName: 'Olivia Martinez',
    serviceType: 'Premium Wash',
    date: '2023-06-16',
    time: '11:45 AM',
    status: 'pending',
    amount: 49.99,
    location: '234 Elm St'
  },
  {
    id: 'b5',
    customerName: 'Noah Johnson',
    serviceType: 'Express Wash',
    date: '2023-06-16',
    time: '02:30 PM',
    status: 'cancelled',
    amount: 29.99,
    location: '567 Maple Dr'
  },
  {
    id: 'b6',
    customerName: 'Sophia Garcia',
    serviceType: 'Deluxe Detail',
    date: '2023-06-17',
    time: '09:15 AM',
    status: 'pending',
    amount: 89.99,
    location: '890 Cedar Ln'
  }
];

const mockMetrics: MetricData = {
  totalBookings: 68,
  activeWashers: 12,
  completionRate: 94,
  revenue: 3245.87,
  customerSatisfaction: 4.8
};

// Service functions
export const getWashers = (): Promise<Washer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockWashers]);
    }, 500);
  });
};

export const getBookings = (): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockBookings]);
    }, 500);
  });
};

export const getMetrics = (): Promise<MetricData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Update active washers count based on actual data
      const updatedMetrics = {
        ...mockMetrics,
        activeWashers: mockWashers.filter(w => w.status === 'active').length
      };
      resolve(updatedMetrics);
    }, 500);
  });
};

export const assignWasher = (bookingId: string, washerId: string): Promise<Booking> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const bookingIndex = mockBookings.findIndex(b => b.id === bookingId);
      const washer = mockWashers.find(w => w.id === washerId);
      
      if (bookingIndex !== -1 && washer) {
        // Update the booking with the washer's name
        mockBookings[bookingIndex] = {
          ...mockBookings[bookingIndex],
          assignedWasher: washer.name
        };
        
        // Update the washer's status to busy
        const washerIndex = mockWashers.findIndex(w => w.id === washerId);
        if (washerIndex !== -1) {
          mockWashers[washerIndex] = {
            ...mockWashers[washerIndex],
            status: 'busy'
          };
        }
        
        toast.success(`Washer ${washer.name} assigned to booking #${bookingId}`);
        resolve(mockBookings[bookingIndex]);
      } else {
        toast.error("Failed to assign washer to booking");
        reject(new Error("Booking or washer not found"));
      }
    }, 800);
  });
};

export const updateBookingStatus = (bookingId: string, status: Booking['status']): Promise<Booking> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const bookingIndex = mockBookings.findIndex(b => b.id === bookingId);
      
      if (bookingIndex !== -1) {
        // Update the booking status
        mockBookings[bookingIndex] = {
          ...mockBookings[bookingIndex],
          status
        };
        
        // If completed, potentially update washer stats
        if (status === 'completed' && mockBookings[bookingIndex].assignedWasher) {
          const washerName = mockBookings[bookingIndex].assignedWasher;
          const washerIndex = mockWashers.findIndex(w => w.name === washerName);
          
          if (washerIndex !== -1) {
            mockWashers[washerIndex] = {
              ...mockWashers[washerIndex],
              status: 'active',
              completedWashes: mockWashers[washerIndex].completedWashes + 1,
              earnings: mockWashers[washerIndex].earnings + mockBookings[bookingIndex].amount
            };
          }
        }
        
        toast.success(`Booking #${bookingId} status updated to ${status}`);
        resolve(mockBookings[bookingIndex]);
      } else {
        toast.error("Failed to update booking status");
        reject(new Error("Booking not found"));
      }
    }, 800);
  });
};

export const updateWasherStatus = (washerId: string, status: Washer['status']): Promise<Washer> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const washerIndex = mockWashers.findIndex(w => w.id === washerId);
      
      if (washerIndex !== -1) {
        // Update the washer status
        mockWashers[washerIndex] = {
          ...mockWashers[washerIndex],
          status
        };
        
        toast.success(`Washer ${mockWashers[washerIndex].name} status updated to ${status}`);
        resolve(mockWashers[washerIndex]);
      } else {
        toast.error("Failed to update washer status");
        reject(new Error("Washer not found"));
      }
    }, 800);
  });
};

export const sendNotification = (userId: string, message: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      toast.success(`Notification sent: "${message}"`);
      resolve();
    }, 800);
  });
};
