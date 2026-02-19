
export type Role = 'CUSTOMER' | 'ADMIN' | 'MANAGER' | 'CREW' | 'VENDOR';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: Role;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  priceUnit: 'item' | 'head' | 'package';
  image: string;
  is3D?: boolean;
}

export interface OrderItem {
  id: string;
  serviceId: string;
  quantity: number;
  priceAtBooking: number;
}

export enum OrderStatus {
  NEW = 'New',
  QUOTE_SENT = 'Quote Sent',
  ACCEPTED = 'Accepted',
  CONFIRMED = 'Confirmed',
  PREPARING = 'Preparing',
  SETUP = 'Setup',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  eventDate: string;
  venue: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  orderId?: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isKTSStaff: boolean;
}
