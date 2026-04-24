export type OrderStatus = 'WAITING_FOR_APPROVAL' | 'TRANSPORTER_ASSIGNED' | 'REJECTED' | 'ACCEPTED' | 'COMPLETED';

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
}
