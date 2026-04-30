export type OrderStatus = 'CREATED' | 'ASSIGNED' | 'TRIP_SCHEDULED' | 'IN_TERMINAL' | 'LOADING' | 'LOADED' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED' | 'REJECTED';

export type OrderType = 'SYSTEM' | 'MANUAL';

export interface Transporter {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  vehicles: number;
}

export interface Order {
  id: string;
  customerName: string;
  contactNumber: string;
  product: string;
  quantity: string;
  date: string;
  status: OrderStatus;
  type: OrderType;
  pickupLocation: string;
  deliveryLocation: string;
  deliveryDeadline: string;
  specialInstructions?: string;
  assignedTransporterId?: string;
  assignedTransporterName?: string;
  rejectionReason?: string;
  truckNumber?: string;
  driverName?: string;
  pickupTimeSlot?: string;
  pickupQuantity?: string;
  loadedQuantity?: string;
  loadingManagerName?: string;
  loadingTimestamp?: string;
}
