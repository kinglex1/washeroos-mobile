
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getWashers, 
  getBookings, 
  getMetrics, 
  assignWasher, 
  updateBookingStatus, 
  updateWasherStatus,
  sendNotification,
  Washer, 
  Booking 
} from "@/services/adminService";

export const useAdminData = () => {
  const queryClient = useQueryClient();

  const washersQuery = useQuery({
    queryKey: ['washers'],
    queryFn: getWashers
  });

  const bookingsQuery = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  });

  const metricsQuery = useQuery({
    queryKey: ['metrics'],
    queryFn: getMetrics
  });

  const assignWasherMutation = useMutation({
    mutationFn: ({ bookingId, washerId }: { bookingId: string, washerId: string }) => 
      assignWasher(bookingId, washerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });

  const updateBookingStatusMutation = useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: string, status: Booking['status'] }) => 
      updateBookingStatus(bookingId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });

  const updateWasherStatusMutation = useMutation({
    mutationFn: ({ washerId, status }: { washerId: string, status: Washer['status'] }) => 
      updateWasherStatus(washerId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['washers'] });
    }
  });

  const sendNotificationMutation = useMutation({
    mutationFn: ({ userId, message }: { userId: string, message: string }) => 
      sendNotification(userId, message)
  });

  return {
    washers: {
      data: washersQuery.data || [],
      isLoading: washersQuery.isLoading,
      error: washersQuery.error
    },
    bookings: {
      data: bookingsQuery.data || [],
      isLoading: bookingsQuery.isLoading,
      error: bookingsQuery.error
    },
    metrics: {
      data: metricsQuery.data,
      isLoading: metricsQuery.isLoading,
      error: metricsQuery.error
    },
    actions: {
      assignWasher: assignWasherMutation.mutate,
      isAssigning: assignWasherMutation.isPending,
      updateBookingStatus: updateBookingStatusMutation.mutate,
      isUpdatingBooking: updateBookingStatusMutation.isPending,
      updateWasherStatus: updateWasherStatusMutation.mutate,
      isUpdatingWasher: updateWasherStatusMutation.isPending,
      sendNotification: sendNotificationMutation.mutate,
      isSendingNotification: sendNotificationMutation.isPending
    }
  };
};
